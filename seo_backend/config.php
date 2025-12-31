<?php
// Database configuration - Load from environment variables or use defaults for localhost
$host = getenv('DB_HOST') ?: ($_ENV['DB_HOST'] ?? 'localhost');
$dbname = getenv('DB_NAME') ?: ($_ENV['DB_NAME'] ?? 'seo_management');
$user = getenv('DB_USER') ?: ($_ENV['DB_USER'] ?? 'root');
$pass = getenv('DB_PASS') ?: ($_ENV['DB_PASS'] ?? '');

define('DB_HOST', $host);
define('DB_NAME', $dbname);
define('DB_USER', $user);
define('DB_PASS', $pass);

// Create connection and ensure tables exist
function getConnection() {
    try {
        $pdo = new PDO("mysql:host=" . DB_HOST . ";dbname=" . DB_NAME, DB_USER, DB_PASS);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        
        // Create tables if they don't exist
        createTablesIfNotExists($pdo);
        
        return $pdo;
    } catch(PDOException $e) {
        // Log the error and return false instead of dying, so we can handle it gracefully
        error_log("Database connection failed: " . $e->getMessage());
        return false;
    }
}

// Function to create required tables if they don't exist
function createTablesIfNotExists($pdo) {
    try {
        // Create seo_data table
        $sql = "CREATE TABLE IF NOT EXISTS seo_data (
            id INT AUTO_INCREMENT PRIMARY KEY,
            page_url VARCHAR(255) NOT NULL UNIQUE,
            title VARCHAR(255),
            description TEXT,
            keywords TEXT,
            og_title VARCHAR(255),
            og_description TEXT,
            og_image VARCHAR(255),
            twitter_title VARCHAR(255),
            twitter_description TEXT,
            twitter_image VARCHAR(255),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )";
        $pdo->exec($sql);
        
        // Create image_alt_text table
        $sql = "CREATE TABLE IF NOT EXISTS image_alt_text (
            id INT AUTO_INCREMENT PRIMARY KEY,
            image_path VARCHAR(255) NOT NULL UNIQUE,
            alt_text TEXT,
            page_url VARCHAR(255),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )";
        $pdo->exec($sql);
        
        // Create users table
        $sql = "CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            username VARCHAR(255) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )";
        $pdo->exec($sql);
        
        // Check if admin user exists, if not, create one
        $stmt = $pdo->prepare("SELECT COUNT(*) FROM users WHERE username = ?");
        $stmt->execute(['admin']);
        $count = $stmt->fetchColumn();
        
        if ($count == 0) {
            // Create admin user with username 'admin' and password 'admin#mva#1'
            $hashedPassword = password_hash('admin#mva#1', PASSWORD_DEFAULT);
            $stmt = $pdo->prepare("INSERT INTO users (username, password) VALUES (?, ?)");
            $stmt->execute(['admin', $hashedPassword]);
            error_log("Admin user created successfully");
        }
        
        error_log("Database tables checked/created successfully");
    } catch(PDOException $e) {
        error_log("Error creating tables: " . $e->getMessage());
    }
}

// API response function - only define if it doesn't exist
if (!function_exists('sendResponse')) {
    function sendResponse($success, $message, $data = null) {
        header('Content-Type: application/json');
        echo json_encode([
            'success' => $success,
            'message' => $message,
            'data' => $data
        ]);
        exit;
    }
}
?>
