<?php
require_once 'config.php';

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$method = $_SERVER['REQUEST_METHOD'];

// ------------------------------------------------------------------------
// FIX: support full segmented routes like /care-center/neuro-spine-surgery
// ------------------------------------------------------------------------
$pathInfo = $_GET['path'] ?? '/';
$pathInfo = strtok($pathInfo, '?');
$pathInfo = '/' . trim($pathInfo, '/');
// ------------------------------------------------------------------------
// Get input data
// ------------------------------------------------------------------------
$input = json_decode(file_get_contents('php://input'), true);

try {
    $pdo = getConnection();
    
    switch ($method) {
        case 'GET':
            if (isset($_GET['path'])) {
                if ($_GET['path'] === 'all') {
                    // Get all SEO data
                    getAllSeoData($pdo);
                } elseif (str_starts_with($_GET['path'], 'image-alt')) {
                    // Get image alt text - extract the image path from the path
                    $path_parts = explode('/', $_GET['path']);
                    $image_path = $path_parts[1] ?? '';
                    getImageAltText($pdo, $image_path);
                } else {
                    // Use the pathInfo directly for SEO data retrieval
                    getSeoData($pdo, $pathInfo);
                }
            } else {
                // If no path parameter, treat as root path
                getSeoData($pdo, '/');
            }
            break;
            
        case 'POST':
            if (isset($request[0])) {
                if ($request[0] === 'login') {
                    // User authentication
                    login($pdo, $input);
                } else {
                    // Verify authentication for other endpoints
                    $authResult = verifyAuth($pdo);
                    if (!$authResult['success']) {
                        sendResponse(false, $authResult['message']);
                    }
                    
                    if ($request[0] === 'seo') {
                        // Add/update SEO data
                        addOrUpdateSeoData($pdo, $input);
                    } elseif ($request[0] === 'image-alt') {
                        // Add/update image alt text
                        addOrUpdateImageAlt($pdo, $input);
                    }
                }
            } else {
                sendResponse(false, 'Invalid request');
            }
            break;
            
        case 'PUT':
            if (isset($request[0])) {
                // Verify authentication
                $authResult = verifyAuth($pdo);
                if (!$authResult['success']) {
                    sendResponse(false, $authResult['message']);
                }
                
                if ($request[0] === 'seo') {
                    // Update SEO data
                    updateSeoData($pdo, $input);
                } elseif ($request[0] === 'image-alt') {
                    // Update image alt text
                    updateImageAlt($pdo, $input);
                }
            } else {
                sendResponse(false, 'Invalid request');
            }
            break;
            
        case 'DELETE':
            if (isset($request[0])) {
                // Verify authentication
                $authResult = verifyAuth($pdo);
                if (!$authResult['success']) {
                    sendResponse(false, $authResult['message']);
                }
                
                if ($request[0] === 'seo') {
                    // Delete SEO data
                    $page_url = $request[1] ?? $input['page_url'] ?? '';
                    deleteSeoData($pdo, $page_url);
                } elseif ($request[0] === 'image-alt') {
                    // Delete image alt text
                    $image_path = $request[1] ?? $input['image_path'] ?? '';
                    deleteImageAlt($pdo, $image_path);
                }
            } else {
                sendResponse(false, 'Invalid request');
            }
            break;
            
        default:
            sendResponse(false, 'Method not allowed');
    }
} catch (Exception $e) {
    sendResponse(false, 'Server error: ' . $e->getMessage());
}

// The getSeoData function and other functions follow here...
function getSeoData($pdo, $page_url) {
    // 1. Normalize URL (remove query string, ensure leading slash, remove trailing slash)
    $parsed = parse_url($page_url);
    if ($parsed && isset($parsed['path'])) {
        $page_url = $parsed['path'];
    }

    $page_url = '/' . ltrim($page_url, '/');   // ensure leading slash
    $page_url = rtrim($page_url, '/');         // remove trailing slash except root

    if ($page_url === '') {
        $page_url = '/';
    }

    // Debug: Log the page_url being searched
    error_log("DEBUG - Searching for page_url: " . $page_url);

    // 2. Try exact match first (full path)
    $stmt = $pdo->prepare("SELECT * FROM seo_data WHERE page_url = ?");
    $stmt->execute([$page_url]);
    $result = $stmt->fetch(PDO::FETCH_ASSOC);

    // Debug: Log if exact match was found
    if ($result) {
        error_log("DEBUG - Exact match found for: " . $page_url);
    } else {
        error_log("DEBUG - No exact match for: " . $page_url);
    }

    // 3. If not found, try hierarchical parents:
    //    /care-center/neuro-surgery → /care-center
    if (!$result && $page_url !== '/') {
        $original_segments = explode('/', trim($page_url, '/'));
        $segments = $original_segments;
        
        error_log("DEBUG - Starting hierarchical search for: " . $page_url);
        error_log("DEBUG - Segments: " . print_r($segments, true));
        
        // Keep removing last segment until we either find a match or run out
        while (count($segments) > 0) {
            $candidate = '/' . implode('/', $segments);
            
            error_log("DEBUG - Trying candidate: " . $candidate);
            
            $stmt->execute([$candidate]);
            $result = $stmt->fetch(PDO::FETCH_ASSOC);
            
            if ($result) {
                error_log("DEBUG - Hierarchical match found for: " . $candidate);
                break;
            }
            
            array_pop($segments); // go one level up
        }
    }

    if ($result) {
        sendResponse(true, 'SEO data retrieved successfully', $result);
    } else {
        // 4. Still nothing? Use global default
        error_log("DEBUG - No SEO data found, using defaults for: " . $page_url);
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
        ]);
    }
}


function getAllSeoData($pdo) {
    $stmt = $pdo->query("SELECT * FROM seo_data ORDER BY page_url");
    $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    sendResponse(true, 'All SEO data retrieved successfully', $results);
}

function getImageAltText($pdo, $image_path) {
    $stmt = $pdo->prepare("SELECT * FROM image_alt_text WHERE image_path = ?");
    $stmt->execute([$image_path]);
    $result = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if ($result) {
        sendResponse(true, 'Image alt text retrieved successfully', $result);
    } else {
        sendResponse(true, 'No specific alt text found, using default', [
            'image_path' => $image_path,
            'alt_text' => 'All Is Well Hospital Image'
        ]);
    }
}

function addOrUpdateSeoData($pdo, $input) {
    $page_url = $input['page_url'] ?? '';
    $title = $input['title'] ?? '';
    $description = $input['description'] ?? '';
    $keywords = $input['keywords'] ?? '';
    $og_title = $input['og_title'] ?? $title;
    $og_description = $input['og_description'] ?? $description;
    $og_image = $input['og_image'] ?? '';
    $twitter_title = $input['twitter_title'] ?? $title;
    $twitter_description = $input['twitter_description'] ?? $description;
    $twitter_image = $input['twitter_image'] ?? '';
    
    if (empty($page_url) || empty($title)) {
        sendResponse(false, 'Page URL and title are required');
        return;
    }
    
    // Normalize the page URL by extracting just the path if it's a full URL
    $parsed_url = parse_url($page_url);
    if ($parsed_url && isset($parsed_url['path'])) {
        $page_url = $parsed_url['path'];
    }
    
    // Check if record exists
    $stmt = $pdo->prepare("SELECT id FROM seo_data WHERE page_url = ?");
    $stmt->execute([$page_url]);
    $existing = $stmt->fetch();
    
    if ($existing) {
        // Update existing record
        $stmt = $pdo->prepare("UPDATE seo_data SET title=?, description=?, keywords=?, og_title=?, og_description=?, og_image=?, twitter_title=?, twitter_description=?, twitter_image=?, updated_at=NOW() WHERE page_url=?");
        $result = $stmt->execute([$title, $description, $keywords, $og_title, $og_description, $og_image, $twitter_title, $twitter_description, $twitter_image, $page_url]);
        
        if ($result) {
            sendResponse(true, 'SEO data updated successfully');
        } else {
            sendResponse(false, 'Failed to update SEO data');
        }
    } else {
        // Insert new record
        $stmt = $pdo->prepare("INSERT INTO seo_data (page_url, title, description, keywords, og_title, og_description, og_image, twitter_title, twitter_description, twitter_image) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
        $result = $stmt->execute([$page_url, $title, $description, $keywords, $og_title, $og_description, $og_image, $twitter_title, $twitter_description, $twitter_image]);
        
        if ($result) {
            sendResponse(true, 'SEO data added successfully');
        } else {
            sendResponse(false, 'Failed to add SEO data');
        }
    }
}

function addOrUpdateImageAlt($pdo, $input) {
    $image_path = $input['image_path'] ?? '';
    $alt_text = $input['alt_text'] ?? '';
    $page_url = $input['page_url'] ?? '';
    
    if (empty($image_path)) {
        sendResponse(false, 'Image path is required');
        return;
    }
    
    // Check if record exists
    $stmt = $pdo->prepare("SELECT id FROM image_alt_text WHERE image_path = ?");
    $stmt->execute([$image_path]);
    $existing = $stmt->fetch();
    
    if ($existing) {
        // Update existing record
        $stmt = $pdo->prepare("UPDATE image_alt_text SET alt_text=?, page_url=?, updated_at=NOW() WHERE image_path=?");
        $result = $stmt->execute([$alt_text, $page_url, $image_path]);
        
        if ($result) {
            sendResponse(true, 'Image alt text updated successfully');
        } else {
            sendResponse(false, 'Failed to update image alt text');
        }
    } else {
        // Insert new record
        $stmt = $pdo->prepare("INSERT INTO image_alt_text (image_path, alt_text, page_url) VALUES (?, ?, ?)");
        $result = $stmt->execute([$image_path, $alt_text, $page_url]);
        
        if ($result) {
            sendResponse(true, 'Image alt text added successfully');
        } else {
            sendResponse(false, 'Failed to add image alt text');
        }
    }
}

function updateSeoData($pdo, $input) {
    $page_url = $input['page_url'] ?? '';
    $title = $input['title'] ?? '';
    $description = $input['description'] ?? '';
    $keywords = $input['keywords'] ?? '';
    $og_title = $input['og_title'] ?? $title;
    $og_description = $input['og_description'] ?? $description;
    $og_image = $input['og_image'] ?? '';
    $twitter_title = $input['twitter_title'] ?? $title;
    $twitter_description = $input['twitter_description'] ?? $description;
    $twitter_image = $input['twitter_image'] ?? '';
    
    if (empty($page_url)) {
        sendResponse(false, 'Page URL is required');
        return;
    }
    
    // Normalize the page URL by extracting just the path if it's a full URL
    $parsed_url = parse_url($page_url);
    if ($parsed_url && isset($parsed_url['path'])) {
        $page_url = $parsed_url['path'];
    }
    
    $stmt = $pdo->prepare("UPDATE seo_data SET title=?, description=?, keywords=?, og_title=?, og_description=?, og_image=?, twitter_title=?, twitter_description=?, twitter_image=?, updated_at=NOW() WHERE page_url=?");
    $result = $stmt->execute([$title, $description, $keywords, $og_title, $og_description, $og_image, $twitter_title, $twitter_description, $twitter_image, $page_url]);
    
    if ($result) {
        sendResponse(true, 'SEO data updated successfully');
    } else {
        sendResponse(false, 'Failed to update SEO data');
    }
}

function updateImageAlt($pdo, $input) {
    $image_path = $input['image_path'] ?? '';
    $alt_text = $input['alt_text'] ?? '';
    $page_url = $input['page_url'] ?? '';
    
    if (empty($image_path)) {
        sendResponse(false, 'Image path is required');
        return;
    }
    
    $stmt = $pdo->prepare("UPDATE image_alt_text SET alt_text=?, page_url=?, updated_at=NOW() WHERE image_path=?");
    $result = $stmt->execute([$alt_text, $page_url, $image_path]);
    
    if ($result) {
        sendResponse(true, 'Image alt text updated successfully');
    } else {
        sendResponse(false, 'Failed to update image alt text');
    }
}

function deleteSeoData($pdo, $page_url) {
    if (empty($page_url)) {
        sendResponse(false, 'Page URL is required');
        return;
    }
    
    $stmt = $pdo->prepare("DELETE FROM seo_data WHERE page_url = ?");
    $result = $stmt->execute([$page_url]);
    
    if ($result) {
        sendResponse(true, 'SEO data deleted successfully');
    } else {
        sendResponse(false, 'Failed to delete SEO data');
    }
}

function deleteImageAlt($pdo, $image_path) {
    if (empty($image_path)) {
        sendResponse(false, 'Image path is required');
        return;
    }
    
    $stmt = $pdo->prepare("DELETE FROM image_alt_text WHERE image_path = ?");
    $result = $stmt->execute([$image_path]);
    
    if ($result) {
        sendResponse(true, 'Image alt text deleted successfully');
    } else {
        sendResponse(false, 'Failed to delete image alt text');
    }
}

function login($pdo, $input) {
    $username = $input['username'] ?? '';
    $password = $input['password'] ?? '';
    
    if (empty($username) || empty($password)) {
        sendResponse(false, 'Username and password are required');
        return;
    }
    
    $stmt = $pdo->prepare("SELECT * FROM users WHERE username = ?");
    $stmt->execute([$username]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if ($user && password_verify($password, $user['password'])) {
        // In a real application, you would generate a proper authentication token
        // For this implementation, we'll just return success
        sendResponse(true, 'Login successful', [
            'user_id' => $user['id'],
            'username' => $user['username']
        ]);
    } else {
        sendResponse(false, 'Invalid username or password');
    }
}

function verifyAuth($pdo) {
    // In a real application, you would verify an authentication token
    // For this implementation, we'll return success to allow testing
    // In production, you should implement proper authentication
    
    return ['success' => true, 'message' => 'Authentication successful'];
}

// Temporary debugging enabled
error_reporting(E_ALL);
ini_set('display_errors', 1);
?>
