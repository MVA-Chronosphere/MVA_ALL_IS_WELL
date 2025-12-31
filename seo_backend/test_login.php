<?php
// Simple test script to verify login functionality
header('Content-Type: application/json');

require_once 'config.php';

// Create connection
$pdo = getConnection();
if (!$pdo) {
    echo json_encode(['success' => false, 'message' => 'Database connection failed']);
    exit;
}

// Test login with the admin credentials
$username = 'admin';
$password = 'admin#mva#1';

$stmt = $pdo->prepare("SELECT * FROM users WHERE username = ?");
$stmt->execute([$username]);
$user = $stmt->fetch(PDO::FETCH_ASSOC);

if ($user && password_verify($password, $user['password'])) {
    echo json_encode([
        'success' => true,
        'message' => 'Login test successful',
        'data' => [
            'user_id' => $user['id'],
            'username' => $user['username']
        ]
    ]);
} else {
    echo json_encode([
        'success' => false,
        'message' => 'Login test failed - check if admin user exists and password is correct'
    ]);
}
