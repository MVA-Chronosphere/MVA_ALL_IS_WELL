<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');

ob_start();
ini_set('display_errors', 0);
ini_set('log_errors', 1);

require_once 'config.php';

/* ================= RESPONSE ================= */
function sendResponse($success, $message, $data = null, $code = 200) {
    while (ob_get_level()) ob_end_clean();
    http_response_code($code);
    echo json_encode([
        'success' => (bool)$success,
        'message' => $message,
        'data' => $data
    ]);
    exit;
}

/* ================= UTILS ================= */
function normalizePath($path) {
    if (!$path) return '/';
    $p = parse_url($path);
    $path = $p['path'] ?? $path;
    $path = '/' . ltrim($path, '/');
    return rtrim($path, '/') ?: '/';
}

/* ================= DB ================= */
$pdo = getConnection();
if (!$pdo) sendResponse(false, 'Database connection failed', null, 500);

$method = $_SERVER['REQUEST_METHOD'];
$input  = json_decode(file_get_contents('php://input'), true) ?? [];

/* ================= LOGIN ================= */
function login($pdo, $input) {
    $username = $input['username'] ?? '';
    $password = $input['password'] ?? '';

    if ($username === '' || $password === '') {
        sendResponse(false, 'Username and password required', null, 400);
    }

    $stmt = $pdo->prepare("SELECT * FROM users WHERE username = ?");
    $stmt->execute([$username]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$user || !password_verify($password, $user['password'])) {
        sendResponse(false, 'Invalid credentials', null, 401);
    }

    sendResponse(true, 'Login successful', [
        'id' => $user['id'],
        'username' => $user['username']
    ]);
}

/* ================= ROUTER ================= */
switch ($method) {

    /* ---------- GET ---------- */
    case 'GET':

        $action = $_GET['action'] ?? '';
        $path   = $_GET['path'] ?? '';

        if ($action === 'all') {
            $rows = $pdo->query("SELECT * FROM seo_data ORDER BY page_url")->fetchAll(PDO::FETCH_ASSOC);
            sendResponse(true, 'All SEO data', $rows);
        }

        if ($action === 'image-alt') {
            $rows = $pdo->query("SELECT * FROM image_alt_text ORDER BY image_path")->fetchAll(PDO::FETCH_ASSOC);
            sendResponse(true, 'All image alt data', $rows);
        }

        if ($path !== '') {
            if ($path === 'image-alt') {
                $rows = $pdo->query("SELECT * FROM image_alt_text ORDER BY image_path")->fetchAll(PDO::FETCH_ASSOC);
                sendResponse(true, 'All image alt data', $rows);
            }

            if (strpos($path, 'image-alt/') === 0) {
                $img = substr($path, strlen('image-alt/'));
                $stmt = $pdo->prepare("SELECT * FROM image_alt_text WHERE image_path = ?");
                $stmt->execute([$img]);
                sendResponse(true, 'Image alt', $stmt->fetch(PDO::FETCH_ASSOC));
            }

            $stmt = $pdo->prepare("SELECT * FROM seo_data WHERE page_url = ?");
            $stmt->execute([normalizePath($path)]);
            sendResponse(true, 'SEO data', $stmt->fetch(PDO::FETCH_ASSOC));
        }

        sendResponse(true, 'Default SEO', null);
        break;

    /* ---------- POST ---------- */
    case 'POST':

        $endpoint = $_GET['path'] ?? '';

        if ($endpoint === 'login') {
            login($pdo, $input);
        }

        if ($endpoint === 'seo') {
            $stmt = $pdo->prepare("
                INSERT INTO seo_data (page_url,title,description,keywords)
                VALUES (?,?,?,?)
                ON DUPLICATE KEY UPDATE
                    title=VALUES(title),
                    description=VALUES(description),
                    keywords=VALUES(keywords)
            ");
            $stmt->execute([
                normalizePath($input['page_url']),
                $input['title'],
                $input['description'],
                $input['keywords']
            ]);
            sendResponse(true, 'SEO saved');
        }

        if ($endpoint === 'image-alt') {
            $stmt = $pdo->prepare("
                INSERT INTO image_alt_text (image_path,alt_text,page_url)
                VALUES (?,?,?)
                ON DUPLICATE KEY UPDATE
                    alt_text=VALUES(alt_text),
                    page_url=VALUES(page_url)
            ");
            $stmt->execute([
                $input['image_path'],
                $input['alt_text'],
                $input['page_url']
            ]);
            sendResponse(true, 'Image alt saved');
        }

        sendResponse(false, 'Invalid POST', null, 400);

    /* ---------- PUT ---------- */
    case 'PUT':

        if (($_GET['path'] ?? '') === 'seo') {
            $stmt = $pdo->prepare("
                UPDATE seo_data
                SET title=?, description=?, keywords=?
                WHERE page_url=?
            ");
            $stmt->execute([
                $input['title'],
                $input['description'],
                $input['keywords'],
                normalizePath($input['page_url'])
            ]);
            sendResponse(true, 'SEO updated');
        }

        sendResponse(false, 'Invalid PUT', null, 400);

    /* ---------- DELETE ---------- */
    case 'DELETE':

        if (($_GET['path'] ?? '') === 'seo') {
            $stmt = $pdo->prepare("DELETE FROM seo_data WHERE page_url=?");
            $stmt->execute([normalizePath($input['page_url'])]);
            sendResponse(true, 'SEO deleted');
        }

        if (($_GET['path'] ?? '') === 'image-alt') {
            $stmt = $pdo->prepare("DELETE FROM image_alt_text WHERE image_path=?");
            $stmt->execute([$input['image_path']]);
            sendResponse(true, 'Image alt deleted');
        }

        sendResponse(false, 'Invalid DELETE', null, 400);

    default:
        sendResponse(false, 'Method not allowed', null, 405);
}
