<?php
// Test script to verify SEO backend connection on localhost
header('Content-Type: application/json');

require_once 'config.php';

// Test database connection
$pdo = getConnection();

if (!$pdo) {
    echo json_encode([
        'success' => false,
        'message' => 'Database connection failed',
        'details' => 'Please check your database configuration in .env file'
    ]);
    exit;
}

// Test if tables exist and can be queried
try {
    // Test seo_data table
    $stmt = $pdo->query("SELECT COUNT(*) FROM seo_data");
    $seoCount = $stmt->fetchColumn();
    
    // Test image_alt_text table
    $stmt = $pdo->query("SELECT COUNT(*) FROM image_alt_text");
    $imageCount = $stmt->fetchColumn();
    
    // Test users table and check if admin exists
    $stmt = $pdo->prepare("SELECT username FROM users WHERE username = ?");
    $stmt->execute(['admin']);
    $adminExists = $stmt->fetch() !== false;
    
    echo json_encode([
        'success' => true,
        'message' => 'SEO backend is working correctly on localhost',
        'database' => [
            'connection' => 'OK',
            'seo_data_count' => $seoCount,
            'image_alt_text_count' => $imageCount,
            'admin_user_exists' => $adminExists
        ],
        'config' => [
            'host' => DB_HOST,
            'database' => DB_NAME,
            'user' => DB_USER
        ]
    ]);
    
} catch (Exception $e) {
    echo json_encode([
        'success' => false,
        'message' => 'Database query failed',
        'error' => $e->getMessage()
    ]);
}
?>
