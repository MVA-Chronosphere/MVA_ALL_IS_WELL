<?php
require_once 'config.php';

try {
    $pdo = getConnection();
    
    // Fetch all current SEO data
    $stmt = $pdo->query("SELECT id, page_url FROM seo_data");
    $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    foreach ($results as $row) {
        $original_url = $row['page_url'];
        
        // Parse the URL and extract just the path
        $parsed = parse_url($original_url);
        if ($parsed && isset($parsed['path'])) {
            $normalized_url = $parsed['path'];
            
            // Update the record with the normalized URL
            $update_stmt = $pdo->prepare("UPDATE seo_data SET page_url = ? WHERE id = ?");
            $update_stmt->execute([$normalized_url, $row['id']]);
            
            echo "Updated ID {$row['id']}: {$original_url} -> {$normalized_url}\n";
        }
    }
    
    echo "URL normalization completed.\n";
    
} catch (Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
}
?>
