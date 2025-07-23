<?php
require_once 'config.php';

// Get featured products
function getFeaturedProducts($limit = 6) {
    global $pdo;
    
    try {
        $stmt = $pdo->prepare("
            SELECT * FROM products 
            WHERE status = 'active' AND featured = 1 
            ORDER BY created_at DESC 
            LIMIT :limit
        ");
        $stmt->bindValue(':limit', $limit, PDO::PARAM_INT);
        $stmt->execute();
        return $stmt->fetchAll();
    } catch (PDOException $e) {
        error_log("Error fetching featured products: " . $e->getMessage());
        return [];
    }
}

// Get accounts by category
function getAccountsByCategory($category, $limit = 8) {
    global $pdo;
    
    try {
        $stmt = $pdo->prepare("
            SELECT * FROM products 
            WHERE status = 'active' AND category = :category 
            ORDER BY created_at DESC 
            LIMIT :limit
        ");
        $stmt->bindValue(':category', $category, PDO::PARAM_STR);
        $stmt->bindValue(':limit', $limit, PDO::PARAM_INT);
        $stmt->execute();
        return $stmt->fetchAll();
    } catch (PDOException $e) {
        error_log("Error fetching accounts by category: " . $e->getMessage());
        return [];
    }
}

// Get product by ID
function getProductById($id) {
    global $pdo;
    
    try {
        $stmt = $pdo->prepare("SELECT * FROM products WHERE id = :id AND status = 'active'");
        $stmt->bindValue(':id', $id, PDO::PARAM_INT);
        $stmt->execute();
        return $stmt->fetch();
    } catch (PDOException $e) {
        error_log("Error fetching product: " . $e->getMessage());
        return false;
    }
}

// Get product images
function getProductImages($product_id) {
    global $pdo;
    
    try {
        $stmt = $pdo->prepare("
            SELECT * FROM product_images 
            WHERE product_id = :product_id 
            ORDER BY sort_order ASC
        ");
        $stmt->bindValue(':product_id', $product_id, PDO::PARAM_INT);
        $stmt->execute();
        return $stmt->fetchAll();
    } catch (PDOException $e) {
        error_log("Error fetching product images: " . $e->getMessage());
        return [];
    }
}

// Update product views
function updateProductViews($product_id) {
    global $pdo;
    
    try {
        $stmt = $pdo->prepare("UPDATE products SET views = views + 1 WHERE id = :id");
        $stmt->bindValue(':id', $product_id, PDO::PARAM_INT);
        $stmt->execute();
    } catch (PDOException $e) {
        error_log("Error updating product views: " . $e->getMessage());
    }
}

// Get active news
function getActiveNews() {
    global $pdo;
    
    try {
        $stmt = $pdo->prepare("
            SELECT * FROM news 
            WHERE active = 1 
            ORDER BY created_at DESC
        ");
        $stmt->execute();
        return $stmt->fetchAll();
    } catch (PDOException $e) {
        error_log("Error fetching news: " . $e->getMessage());
        return [];
    }
}

// Admin Functions
function getAdminStats() {
    global $pdo;
    
    try {
        $stats = [];
        
        // Total products
        $stmt = $pdo->query("SELECT COUNT(*) as count FROM products WHERE status = 'active'");
        $stats['total_products'] = $stmt->fetch()['count'];
        
        // Sold products
        $stmt = $pdo->query("SELECT COUNT(*) as count FROM orders WHERE status = 'completed'");
        $stats['sold_products'] = $stmt->fetch()['count'];
        
        // Active users
        $stmt = $pdo->query("SELECT COUNT(*) as count FROM users WHERE status = 'active'");
        $stats['active_users'] = $stmt->fetch()['count'];
        
        // Total revenue
        $stmt = $pdo->query("SELECT SUM(total_amount) as total FROM orders WHERE status = 'completed'");
        $stats['total_revenue'] = $stmt->fetch()['total'] ?: 0;
        
        return $stats;
    } catch (PDOException $e) {
        error_log("Error fetching admin stats: " . $e->getMessage());
        return [
            'total_products' => 0,
            'sold_products' => 0,
            'active_users' => 0,
            'total_revenue' => 0
        ];
    }
}

// Get recent activities
function getRecentActivities($limit = 10) {
    global $pdo;
    
    try {
        $stmt = $pdo->prepare("
            SELECT * FROM activities 
            ORDER BY created_at DESC 
            LIMIT :limit
        ");
        $stmt->bindValue(':limit', $limit, PDO::PARAM_INT);
        $stmt->execute();
        return $stmt->fetchAll();
    } catch (PDOException $e) {
        error_log("Error fetching recent activities: " . $e->getMessage());
        return [];
    }
}

// Get monthly sales
function getMonthlySales() {
    global $pdo;
    
    try {
        $stmt = $pdo->query("
            SELECT 
                DATE_FORMAT(created_at, '%Y-%m') as month,
                SUM(total_amount) as amount
            FROM orders 
            WHERE status = 'completed' 
                AND created_at >= DATE_SUB(NOW(), INTERVAL 12 MONTH)
            GROUP BY DATE_FORMAT(created_at, '%Y-%m')
            ORDER BY month ASC
        ");
        return $stmt->fetchAll();
    } catch (PDOException $e) {
        error_log("Error fetching monthly sales: " . $e->getMessage());
        return [];
    }
}

// Get top products
function getTopProducts($limit = 5) {
    global $pdo;
    
    try {
        $stmt = $pdo->prepare("
            SELECT p.*, COUNT(o.id) as sales_count
            FROM products p
            LEFT JOIN order_items oi ON p.id = oi.product_id
            LEFT JOIN orders o ON oi.order_id = o.id AND o.status = 'completed'
            WHERE p.status = 'active'
            GROUP BY p.id
            ORDER BY sales_count DESC
            LIMIT :limit
        ");
        $stmt->bindValue(':limit', $limit, PDO::PARAM_INT);
        $stmt->execute();
        return $stmt->fetchAll();
    } catch (PDOException $e) {
        error_log("Error fetching top products: " . $e->getMessage());
        return [];
    }
}

// Time ago function
function timeAgo($datetime) {
    $time = time() - strtotime($datetime);
    
    if ($time < 60) return 'منذ لحظات';
    if ($time < 3600) return 'منذ ' . floor($time/60) . ' دقيقة';
    if ($time < 86400) return 'منذ ' . floor($time/3600) . ' ساعة';
    if ($time < 2592000) return 'منذ ' . floor($time/86400) . ' يوم';
    if ($time < 31536000) return 'منذ ' . floor($time/2592000) . ' شهر';
    
    return 'منذ ' . floor($time/31536000) . ' سنة';
}

// Sanitize input
function sanitizeInput($input) {
    return htmlspecialchars(trim($input), ENT_QUOTES, 'UTF-8');
}

// Generate random string
function generateRandomString($length = 10) {
    return substr(str_shuffle(str_repeat($x='0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', ceil($length/strlen($x)) )),1,$length);
}
?>
