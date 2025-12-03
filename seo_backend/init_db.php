<?php
require_once 'config.php';

try {
    $pdo = new PDO("mysql:host=" . DB_HOST, DB_USER, DB_PASS);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // Create database if it doesn't exist
    $pdo->exec("CREATE DATABASE IF NOT EXISTS " . DB_NAME);
    $pdo->exec("USE " . DB_NAME);
    
    // Create seo_data table
    $sql = "CREATE TABLE IF NOT EXISTS seo_data (
        id INT AUTO_INCREMENT PRIMARY KEY,
        page_url VARCHAR(500) NOT NULL UNIQUE,
        title VARCHAR(500) NOT NULL,
        description TEXT,
        keywords TEXT,
        og_title VARCHAR(500),
        og_description TEXT,
        og_image VARCHAR(500),
        twitter_title VARCHAR(500),
        twitter_description TEXT,
        twitter_image VARCHAR(500),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )";
    
    $pdo->exec($sql);
    
    // Create image_alt_text table
    $sql = "CREATE TABLE IF NOT EXISTS image_alt_text (
        id INT AUTO_INCREMENT PRIMARY KEY,
        image_path VARCHAR(500) NOT NULL UNIQUE,
        alt_text TEXT,
        page_url VARCHAR(500),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )";
    
    $pdo->exec($sql);
    
    // Create users table for authentication
    $sql = "CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(100) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        email VARCHAR(100) NOT NULL UNIQUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )";
    
    $pdo->exec($sql);
    
    // Insert default admin user (username: admin, password: admin123)
    $defaultUserSql = "INSERT IGNORE INTO users (username, password, email) VALUES (?, ?, ?)";
    $stmt = $pdo->prepare($defaultUserSql);
    $defaultPassword = password_hash('admin123', PASSWORD_DEFAULT);
    $stmt->execute(['admin', $defaultPassword, 'admin@alliswellhospital.com']);
    
    echo "Database and tables created successfully!";
    
} catch(PDOException $e) {
    die("Error creating database: " . $e->getMessage());
}
?>
