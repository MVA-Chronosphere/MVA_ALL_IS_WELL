<?php
// Simple test script to verify the SEO API functionality

// Test URL parsing logic
$path_info = '/care-center/neuro-spine-surgery';
$request = explode('/', trim($path_info, '/'));

echo "PATH_INFO: " . $path_info . "\n";
echo "Request array: " . print_r($request, true) . "\n";

// Test the logic we're using in the API
if (isset($request[0])) {
    // Treat the full PATH_INFO as the SEO page URL automatically
    // Build page_url as "/" + implode('/', $request) no matter how many segments
    $page_url = '/' . implode('/', $request);
    
    echo "Constructed page_url: " . $page_url . "\n";
    
    // Normalize full URLs using parse_url()
    $parsed_url = parse_url($page_url);
    if ($parsed_url && isset($parsed_url['path'])) {
        $page_url = $parsed_url['path'];
    }
    
    echo "Final page_url after normalization: " . $page_url . "\n";
}

echo "\nTesting other paths:\n";

$test_paths = [
    '/find-doctor',
    '/services/cardiology',
    '/departments/emergency/ambulance',
    '/branches/khandwa/doctors/specialists'
];

foreach ($test_paths as $path) {
    $request = explode('/', trim($path, '/'));
    $page_url = '/' . implode('/', $request);
    
    echo "Input: $path => Output: $page_url\n";
}
?>
