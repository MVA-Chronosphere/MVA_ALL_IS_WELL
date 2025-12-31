<?php
// Load environment variables from .env file
$envFile = __DIR__ . '/.env';
if (file_exists($envFile)) {
    $lines = file($envFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lines as $line) {
        if (strpos($line, '=') !== false && strpos($line, '#') !== 0) {
            list($key, $value) = explode('=', $line, 2);
            $key = trim($key);
            $value = trim($value);
            if (!getenv($key)) { // Only set if not already set
                putenv("$key=$value");
                $_ENV[$key] = $value;
            }
        }
    }
}

// Database configuration - Load from environment variables or use defaults for localhost
$host = getenv('DB_HOST') ?: ($_ENV['DB_HOST'] ?? 'localhost');
$dbname = getenv('DB_NAME') ?: ($_ENV['DB_NAME'] ?? 'seo_management');
$user = getenv('DB_USER') ?: ($_ENV['DB_USER'] ?? 'root');
$pass = getenv('DB_PASS') ?: ($_ENV['DB_PASS'] ?? '');

echo "Testing database connection...\n";
echo "Host: $host\n";
echo "Database: $dbname\n";
echo "User: $user\n";

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    echo "SUCCESS: Database connection established.\n";

    // Check if tables exist and have data
    try {
        // Check seo_data table
        $stmt = $pdo->query("SELECT COUNT(*) FROM seo_data");
        $seo_count = $stmt->fetchColumn();
        echo "SEO data entries: $seo_count\n";
        
        // Check image_alt_text table
        $stmt = $pdo->query("SELECT COUNT(*) FROM image_alt_text");
        $image_count = $stmt->fetchColumn();
        echo "Image alt text entries: $image_count\n";
        
        // Check users table
        $stmt = $pdo->query("SELECT COUNT(*) FROM users");
        $user_count = $stmt->fetchColumn();
        echo "User entries: $user_count\n";
        
        // If tables exist, show sample data
        if ($seo_count > 0) {
            echo "\nSample SEO data:\n";
