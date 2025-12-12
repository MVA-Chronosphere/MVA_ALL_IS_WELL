<?php
// seo_api.php - patched version to guarantee JSON responses and proper status codes

header('Content-Type: application/json; charset=utf-8');

// Allow requests from anywhere for development; consider restricting in production
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');

// Use output buffering to avoid accidental whitespace output
ob_start();

ini_set('display_errors', 0);
ini_set('log_errors', 1);

require_once 'config.php';

// Helper: send consistent JSON responses and set HTTP status code
function sendResponse($success, $message, $data = null, $httpStatus = 200) {
    // Clear any previous output so only JSON is returned
    while (ob_get_level()) {
        ob_end_clean();
    }

    http_response_code($httpStatus);

    $response = [
        'success' => $success ? true : false,
        'message' => $message
    ];

    if ($data !== null) {
        $response['data'] = $data;
    }

    $json = json_encode($response);

    if ($json === false) {
        // Fallback if encoding fails
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'message' => 'Internal Server Error'
        ]);
        exit;
    }

    echo $json;
    exit;
}

// Error handler logs and returns a 500 response
function handleError($errno, $errstr, $errfile, $errline) {
    error_log("PHP Error: $errstr in $errfile on line $errline");
    // Use a safe generic message for clients
    sendResponse(false, 'Internal Server Error', null, 500);
}

set_error_handler('handleError');

// Handle CORS preflight requests with JSON response
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    while (ob_get_level()) ob_end_clean();
    echo json_encode(["success" => true, "message" => "CORS preflight"]);
    exit();
}


// Utility: normalize a provided page URL/path to a consistent leading-slash path
function normalizePath($path) {
    if (!$path) return '/';
    $parsed = parse_url($path);
    if ($parsed && isset($parsed['path'])) {
        $path = $parsed['path'];
    }
    $path = '/' . ltrim($path, '/');
    $path = rtrim($path, '/');
    if ($path === '') $path = '/';
    return $path;
}

// --- Business logic functions (unchanged behavior, just use sendResponse) ---
function getSeoData($pdo, $page_url) {
    $page_url = normalizePath($page_url);

    error_log("DEBUG - Searching for page_url: " . $page_url);

    $stmt = $pdo->prepare("SELECT * FROM seo_data WHERE page_url = ?");
    if (!$stmt) {
        sendResponse(false, 'Database prepare failed', null, 500);
    }
    $stmt->execute([$page_url]);
    $result = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($result) {
        sendResponse(true, 'SEO data retrieved successfully', $result, 200);
    }

    // Hierarchical parent search
    if ($page_url !== '/') {
        $segments = explode('/', trim($page_url, '/'));
        while (count($segments) > 0) {
            $candidate = '/' . implode('/', $segments);
            error_log("DEBUG - Trying candidate: " . $candidate);
            $stmt->execute([$candidate]);
            $result = $stmt->fetch(PDO::FETCH_ASSOC);
            if ($result) {
                sendResponse(true, 'SEO data retrieved successfully (parent)', $result, 200);
            }
            array_pop($segments);
        }
    }

    // Default fallback
    sendResponse(true, 'No specific SEO data found, using defaults', [
        'page_url' => $page_url,
        'title' => 'All Is Well Hospital - Best Healthcare Services',
        'description' => 'All Is Well Hospital provides comprehensive healthcare services including cardiology, orthopedics, neurology, and emergency care. Quality healthcare you can trust.',
        'keywords' => 'hospital, healthcare, medical services, emergency care, cardiology, orthopedics, neurology',
        'og_title' => 'All Is Well Hospital - Best Healthcare Services',
        'og_description' => 'All Is Well Hospital provides comprehensive healthcare services including cardiology, orthopedics, neurology, and emergency care. Quality healthcare you can trust.',
        'og_image' => '/aiwlogo.webp',
        'twitter_title' => 'All Is Well Hospital - Best Healthcare Services',
        'twitter_description' => 'All Is Well Hospital provides comprehensive healthcare services including cardiology, orthopedics, neurology, and emergency care. Quality healthcare you can trust.',
        'twitter_image' => '/aiwlogo.webp'
    ], 200);
}

function getAllSeoData($pdo) {
    $stmt = $pdo->query("SELECT * FROM seo_data ORDER BY page_url");
    if ($stmt === false) {
        sendResponse(false, 'Failed to query SEO data', null, 500);
    }
    $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
    sendResponse(true, 'All SEO data retrieved successfully', $results, 200);
}

function getAllImageAltText($pdo) {
    $stmt = $pdo->query("SELECT * FROM image_alt_text ORDER BY image_path");
    if ($stmt === false) {
        sendResponse(false, 'Failed to query image alt text', null, 500);
    }
    $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
    sendResponse(true, 'All image alt text data retrieved successfully', $results, 200);
}

function getImageAltText($pdo, $image_path) {
    if (empty($image_path)) {
        sendResponse(false, 'Image path is required', null, 400);
    }
    $stmt = $pdo->prepare("SELECT * FROM image_alt_text WHERE image_path = ?");
    if (!$stmt) {
        sendResponse(false, 'Database prepare failed', null, 500);
    }
    $stmt->execute([$image_path]);
    $result = $stmt->fetch(PDO::FETCH_ASSOC);
    if ($result) {
        sendResponse(true, 'Image alt text retrieved successfully', $result, 200);
    } else {
        sendResponse(true, 'No specific alt text found, using default', [
            'image_path' => $image_path,
            'alt_text' => 'All Is Well Hospital Image'
        ], 200);
    }
}

function addOrUpdateSeoData($pdo, $input) {
    $page_url = $input['page_url'] ?? '';
    $title = $input['title'] ?? '';
    $description = $input['description'] ?? '';
    $keywords = $input['keywords'] ?? '';

    if (empty($page_url) || empty($title)) {
        sendResponse(false, 'Page URL and title are required', null, 400);
    }

    $page_url = normalizePath($page_url);

    $stmt = $pdo->prepare("SELECT id FROM seo_data WHERE page_url = ?");
    if (!$stmt) sendResponse(false, 'Database prepare failed', null, 500);
    $stmt->execute([$page_url]);
    $existing = $stmt->fetch();

    if ($existing) {
        $stmt = $pdo->prepare("
            UPDATE seo_data 
            SET title=?, description=?, keywords=?, updated_at=NOW()
            WHERE page_url=?
        ");
        if (!$stmt) sendResponse(false, 'Database prepare failed', null, 500);

        $result = $stmt->execute([$title, $description, $keywords, $page_url]);
        if ($result) {
            sendResponse(true, 'SEO data updated successfully', null, 200);
        } else {
            sendResponse(false, 'Failed to update SEO data', null, 500);
        }
    } else {
        $stmt = $pdo->prepare("
            INSERT INTO seo_data (
                page_url, title, description, keywords
            ) VALUES (?, ?, ?, ?)
        ");
        if (!$stmt) sendResponse(false, 'Database prepare failed', null, 500);

        $result = $stmt->execute([$page_url, $title, $description, $keywords]);
        if ($result) {
            sendResponse(true, 'SEO data added successfully', null, 201);
        } else {
            sendResponse(false, 'Failed to add SEO data', null, 500);
        }
    }
}

function addOrUpdateImageAlt($pdo, $input) {
    $image_path = $input['image_path'] ?? '';
    $alt_text = $input['alt_text'] ?? '';
    $page_url = $input['page_url'] ?? '';

    if (empty($image_path)) {
        sendResponse(false, 'Image path is required', null, 400);
    }

    $stmt = $pdo->prepare("SELECT id FROM image_alt_text WHERE image_path = ?");
    if (!$stmt) sendResponse(false, 'Database prepare failed', null, 500);
    $stmt->execute([$image_path]);
    $existing = $stmt->fetch();

    if ($existing) {
        $stmt = $pdo->prepare("UPDATE image_alt_text SET alt_text=?, page_url=?, updated_at=NOW() WHERE image_path=?");
        if (!$stmt) sendResponse(false, 'Database prepare failed', null, 500);
        $result = $stmt->execute([$alt_text, $page_url, $image_path]);

        if ($result) {
            sendResponse(true, 'Image alt text updated successfully', null, 200);
        } else {
            sendResponse(false, 'Failed to update image alt text', null, 500);
        }
    } else {
        $stmt = $pdo->prepare("INSERT INTO image_alt_text (image_path, alt_text, page_url) VALUES (?, ?, ?)");
        if (!$stmt) sendResponse(false, 'Database prepare failed', null, 500);
        $result = $stmt->execute([$image_path, $alt_text, $page_url]);

        if ($result) {
            sendResponse(true, 'Image alt text added successfully', null, 201);
        } else {
            sendResponse(false, 'Failed to add image alt text', null, 500);
        }
    }
}

function updateSeoData($pdo, $input) {
    $page_url = $input['page_url'] ?? '';
    $title = $input['title'] ?? '';
    $description = $input['description'] ?? '';
    $keywords = $input['keywords'] ?? '';

    if (empty($page_url)) {
        sendResponse(false, 'Page URL is required', null, 400);
    }

    $page_url = normalizePath($page_url);

    $stmt = $pdo->prepare("
        UPDATE seo_data 
        SET title=?, description=?, keywords=?, updated_at=NOW()
        WHERE page_url=?
    ");
    if (!$stmt) sendResponse(false, 'Database prepare failed', null, 500);

    $result = $stmt->execute([$title, $description, $keywords, $page_url]);
    if ($result) {
        sendResponse(true, 'SEO data updated successfully', null, 200);
    } else {
        sendResponse(false, 'Failed to update SEO data', null, 500);
    }
}

function updateImageAlt($pdo, $input) {
    $image_path = $input['image_path'] ?? '';
    $alt_text = $input['alt_text'] ?? '';
    $page_url = $input['page_url'] ?? '';

    if (empty($image_path)) {
        sendResponse(false, 'Image path is required', null, 400);
    }

    $stmt = $pdo->prepare("UPDATE image_alt_text SET alt_text=?, page_url=?, updated_at=NOW() WHERE image_path=?");
    if (!$stmt) sendResponse(false, 'Database prepare failed', null, 500);
    $result = $stmt->execute([$alt_text, $page_url, $image_path]);

    if ($result) {
        sendResponse(true, 'Image alt text updated successfully', null, 200);
    } else {
        sendResponse(false, 'Failed to update image alt text', null, 500);
    }
}

function deleteSeoData($pdo, $page_url) {
    if (empty($page_url)) {
        sendResponse(false, 'Page URL is required', null, 400);
    }

    error_log("DEBUG - deleteSeoData called with page_url: " . $page_url);
    
    $page_url = normalizePath($page_url);
    error_log("DEBUG - After normalization: " . $page_url);

    // First, check if the record exists before attempting to delete
    $checkStmt = $pdo->prepare("SELECT id FROM seo_data WHERE page_url = ?");
    if (!$checkStmt) sendResponse(false, 'Database prepare failed', null, 500);
    $checkStmt->execute([$page_url]);
    $existingRecord = $checkStmt->fetch(PDO::FETCH_ASSOC);
    
    if (!$existingRecord) {
        error_log("DEBUG - No record found for page_url: " . $page_url);
        // Try to check all records to see what's actually in the database
        $allRecordsStmt = $pdo->query("SELECT page_url FROM seo_data LIMIT 10");
        $allRecords = $allRecordsStmt->fetchAll(PDO::FETCH_COLUMN);
        error_log("DEBUG - Sample of existing page URLs: " . json_encode($allRecords));
    } else {
        error_log("DEBUG - Found record to delete for page_url: " . $page_url);
    }

    $stmt = $pdo->prepare("DELETE FROM seo_data WHERE page_url = ?");
    if (!$stmt) sendResponse(false, 'Database prepare failed', null, 500);
    
    $result = $stmt->execute([$page_url]);
    error_log("DEBUG - Delete query executed, rows affected: " . $stmt->rowCount());

    // $result being true only means the statement executed; check rows affected for real deletion
    if ($result && $stmt->rowCount() > 0) {
        sendResponse(true, 'SEO data deleted successfully', null, 200);
    } elseif ($result && $stmt->rowCount() === 0) {
        sendResponse(false, 'SEO data not found', null, 404);
    } else {
        sendResponse(false, 'Failed to delete SEO data', null, 500);
    }
}

function deleteImageAlt($pdo, $image_path) {
    if (empty($image_path)) {
        sendResponse(false, 'Image path is required', null, 400);
    }

    error_log("DEBUG - deleteImageAlt called with image_path: " . $image_path);

    // First, check if the record exists before attempting to delete
    $checkStmt = $pdo->prepare("SELECT id FROM image_alt_text WHERE image_path = ?");
    if (!$checkStmt) sendResponse(false, 'Database prepare failed', null, 500);
    $checkStmt->execute([$image_path]);
    $existingRecord = $checkStmt->fetch(PDO::FETCH_ASSOC);
    
    if (!$existingRecord) {
        error_log("DEBUG - No record found for image_path: " . $image_path);
        sendResponse(false, 'Image alt text not found', null, 404);
    } else {
        error_log("DEBUG - Found record to delete for image_path: " . $image_path);
        
        $stmt = $pdo->prepare("DELETE FROM image_alt_text WHERE image_path = ?");
        if (!$stmt) sendResponse(false, 'Database prepare failed', null, 500);
        
        $result = $stmt->execute([$image_path]);
        $affectedRows = $stmt->rowCount();
        error_log("DEBUG - Delete image query executed, rows affected: " . $affectedRows);

        if ($result && $affectedRows > 0) {
            sendResponse(true, 'Image alt text deleted successfully', null, 200);
        } else {
            error_log("DEBUG - Delete query executed but no rows affected");
            sendResponse(false, 'Failed to delete image alt text', null, 500);
        }
    }
}

function login($pdo, $input) {
    $username = $input['username'] ?? '';
    $password = $input['password'] ?? '';

    if (empty($username) || empty($password)) {
        sendResponse(false, 'Username and password are required', null, 400);
    }

    $stmt = $pdo->prepare("SELECT * FROM users WHERE username = ?");
    if (!$stmt) sendResponse(false, 'Database prepare failed', null, 500);
    $stmt->execute([$username]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user && password_verify($password, $user['password'])) {
        sendResponse(true, 'Login successful', [
            'user_id' => $user['id'],
            'username' => $user['username']
        ], 200);
    } else {
        sendResponse(false, 'Invalid username or password', null, 401);
    }
}

// NOTE: This is a placeholder verification. Replace with real token check in prod.
function verifyAuth($pdo) {
    return ['success' => true, 'message' => 'Authentication successful'];
}

// -------------------- Main request processing --------------------
$method = $_SERVER['REQUEST_METHOD'];

// Support segmented routes in both query-string style (?path=/a/b) and path in REQUEST_URI
$pathInfo = $_GET['path'] ?? '/';
$pathInfo = strtok($pathInfo, '?');
$pathInfo = '/' . trim($pathInfo, '/');

// Read raw input
$inputRaw = file_get_contents('php://input');
$input = null;
if (!empty($inputRaw)) {
    $input = json_decode($inputRaw, true);
    if (json_last_error() !== JSON_ERROR_NONE) {
        sendResponse(false, 'Invalid JSON input: ' . json_last_error_msg(), null, 400);
    }
}

// Prepare $request from REQUEST_URI for route segments
$request = [];
if (isset($_SERVER['REQUEST_URI'])) {
    $request = explode('/', trim(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH), '/'));
}

// Establish DB connection
$pdo = getConnection();
if (!$pdo) {
    sendResponse(false, 'Database connection failed. Please check your database configuration.', null, 500);
}

try {
    switch ($method) {
        case 'GET':
            if (isset($_GET['path'])) {
                if ($_GET['path'] === 'all') {
                    getAllSeoData($pdo);
                } elseif ($_GET['path'] === 'image-alt') {
                    getAllImageAltText($pdo);
                } elseif (str_starts_with($_GET['path'], 'image-alt/')) {
                    $image_path = substr($_GET['path'], strlen('image-alt/'));
                    getImageAltText($pdo, $image_path);
                } else {
                    // Use full pathInfo for SEO lookup
                    getSeoData($pdo, $pathInfo);
                }
            } else {
                getSeoData($pdo, '/');
            }
            break;

        case 'POST':
            // Support both path segments and query parameter (?path=) for consistency
            // Prioritize query parameter over path segments
            $endpoint = $_GET['path'] ?? '';
            
            // Only use path segments if query parameter is not provided
            if (empty($endpoint) && isset($request[0]) && $request[0] !== '') {
                $endpoint = $request[0];
            }
            
            if ($endpoint !== '') {
                if ($endpoint === 'login') {
                    login($pdo, $input ?? []);
                } else {
                    $authResult = verifyAuth($pdo);
                    if (!$authResult['success']) {
                        sendResponse(false, $authResult['message'], null, 401);
                    }

                    if ($endpoint === 'seo') {
                        addOrUpdateSeoData($pdo, $input ?? []);
                    } elseif ($endpoint === 'image-alt') {
                        addOrUpdateImageAlt($pdo, $input ?? []);
                    } else {
                        sendResponse(false, 'Unknown POST endpoint', null, 404);
                    }
                }
            } else {
                sendResponse(false, 'Invalid request', null, 400);
            }
            break;

        case 'PUT':
            // Support both path segments and query parameter (?path=) for consistency
            // Prioritize query parameter over path segments
            $endpoint = $_GET['path'] ?? '';
            
            // Only use path segments if query parameter is not provided
            if (empty($endpoint) && isset($request[0]) && $request[0] !== '') {
                $endpoint = $request[0];
            }
            
            if ($endpoint !== '') {
                $authResult = verifyAuth($pdo);
                if (!$authResult['success']) {
                    sendResponse(false, $authResult['message'], null, 401);
                }

                if ($endpoint === 'seo') {
                    updateSeoData($pdo, $input ?? []);
                } elseif ($endpoint === 'image-alt') {
                    updateImageAlt($pdo, $input ?? []);
                } else {
                    sendResponse(false, 'Unknown PUT endpoint', null, 404);
                }
            } else {
                sendResponse(false, 'Invalid request', null, 400);
            }
            break;

        case 'DELETE':
            // Support both path segments and query parameter (?path=) for consistency
            // Prioritize query parameter over path segments
            $endpoint = $_GET['path'] ?? '';
            
            // Only use path segments if query parameter is not provided
            if (empty($endpoint) && isset($request[0]) && $request[0] !== '') {
                $endpoint = $request[0];
            }
            
            if ($endpoint !== '') {
                $authResult = verifyAuth($pdo);
                if (!$authResult['success']) {
                    sendResponse(false, $authResult['message'], null, 401);
                }

                if ($endpoint === 'seo') {
                    // allow page_url via URL segment or request body
                    error_log("DEBUG - DELETE endpoint: seo, input: " . json_encode($input));
                    $page_url = $request[1] ?? ($input['page_url'] ?? '');
                    error_log("DEBUG - DELETE page_url extracted: " . $page_url);
                    
                    // Additional fallback: if page_url is still empty, try to get it from the request body directly
                    if (empty($page_url) && isset($input) && is_array($input)) {
                        // Try to find the page_url from the input array
                        foreach ($input as $key => $value) {
                            if ($key === 'page_url' || $key === 'url' || strpos($key, 'page') !== false) {
                                $page_url = $value;
                                break;
                            }
                        }
                    }
                    
                    deleteSeoData($pdo, $page_url);
                } elseif ($endpoint === 'image-alt') {
                    // For image-alt deletion, try multiple methods to extract image_path
                    // Priority order: 1) Request body image_path field, 2) URL path segment, 3) other fallbacks
                    
                    // First, check if image_path is directly in the request body
                    $image_path = $input['image_path'] ?? '';
                    
                    // Additional fallback: if image_path is still empty, try to get it from the request body with different keys
                    if (empty($image_path) && isset($input) && is_array($input)) {
                        // Try to find the image_path from the input array
                        foreach ($input as $key => $value) {
                            if ($key === 'image_path' || $key === 'path' || strpos($key, 'image') !== false) {
                                $image_path = $value;
                                break;
                            }
                        }
                    }
                    
                    // Check if image_path is still empty and try to extract it differently
                    if (empty($image_path) && isset($input) && is_array($input) && count($input) === 1) {
                        // If there's only one key-value pair in the input, use its value as the image_path
                        $keys = array_keys($input);
                        $image_path = $input[$keys[0]];
                    }
                    
                    // Additional check: if image_path is still empty, try getting it from URL path segment
                    // This handles the case where URL is: /seo_api.php/image-alt/encoded_image_path
                    if (empty($image_path) && isset($request[1])) {
                        $image_path = urldecode($request[1]);
                    }
                    
                    // Also check if the path_info has the image path (for URLs like /seo_api.php?path=image-alt/someimage.jpg)
                    if (empty($image_path) && isset($_GET['path'])) {
                        $path_parts = explode('/', $_GET['path']);
                        if (count($path_parts) >= 2 && $path_parts[0] === 'image-alt' && !empty($path_parts[1])) {
                            $image_path = urldecode($path_parts[1]);
                        }
                    }
                    
                    error_log("DEBUG - DELETE image_path extracted: " . $image_path);
                    deleteImageAlt($pdo, $image_path);
                } else {
                    sendResponse(false, 'Unknown DELETE endpoint', null, 404);
                }
            } else {
                sendResponse(false, 'Invalid request', null, 400);
            }
            break;

        default:
            sendResponse(false, 'Method not allowed', null, 405);
    }
} catch (Exception $e) {
    error_log('SEO API Exception: ' . $e->getMessage());
    error_log('Trace: ' . $e->getTraceAsString());
    sendResponse(false, 'Server error', null, 500);
}

// Fallback: If execution reaches here without sending a JSON response,
// return a safe default JSON error so the frontend never receives an empty body.
if (!headers_sent()) {
    sendResponse(false, "Unhandled server path reached", null, 500);
}
