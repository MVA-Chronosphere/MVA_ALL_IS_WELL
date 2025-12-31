<?php
// Simple test script to verify the SEO API fix
echo "Testing SEO API fix...\n";

// Test 1: Check if we can make a request to the API
$apiUrl = 'http://localhost/seo_backend/seo_api.php?action=all';

// For local testing without a web server, we'll simulate the request by including the file
// and manually setting the $_GET parameters

// Save original $_GET
$originalGet = $_GET;

// Simulate action=all request
$_GET['action'] = 'all';
$_SERVER['REQUEST_METHOD'] = 'GET';

// Capture output
ob_start();
include '../seo_backend/seo_api.php';
$output = ob_get_clean();

// Restore original $_GET
$_GET = $originalGet;

echo "Output for action=all request:\n";
echo $output . "\n";

// Test 2: Check action=image-alt
$_GET['action'] = 'image-alt';
$_SERVER['REQUEST_METHOD'] = 'GET';

ob_start();
include '../seo_backend/seo_api.php';
$output2 = ob_get_clean();

$_GET = $originalGet;

echo "Output for action=image-alt request:\n";
echo $output2 . "\n";

// Test 3: Check default path request
$_GET['path'] = '/';
$_SERVER['REQUEST_METHOD'] = 'GET';

ob_start();
include '../seo_backend/seo_api.php';
$output3 = ob_get_clean();

$_GET = $originalGet;

echo "Output for path=/ request:\n";
echo $output3 . "\n";
?>
