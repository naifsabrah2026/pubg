<?php
require_once 'config/database.php';

function sanitize($data) {
    return htmlspecialchars(strip_tags(trim($data)));
}

function redirect($url) {
    header("Location: $url");
    exit();
}

function isLoggedIn() {
    return isset($_SESSION['user_id']);
}

function isAdmin() {
    return isset($_SESSION['role']) && $_SESSION['role'] === 'admin';
}

function formatPrice($price) {
    return number_format($price, 0) . ' ريال';
}

function timeAgo($datetime) {
    $time = time() - strtotime($datetime);
    
    if ($time < 60) return 'الآن';
    if ($time < 3600) return floor($time/60) . ' دقيقة';
    if ($time < 86400) return floor($time/3600) . ' ساعة';
    if ($time < 2592000) return floor($time/86400) . ' يوم';
    if ($time < 31536000) return floor($time/2592000) . ' شهر';
    
    return floor($time/31536000) . ' سنة';
}

function getProducts($limit = null, $category = null, $status = 'active') {
    $db = new Database();
    $sql = "SELECT * FROM products WHERE status = :status";
    $params = ['status' => $status];
    
    if ($category) {
        $sql .= " AND category = :category";
        $params['category'] = $category;
    }
    
    $sql .= " ORDER BY created_at DESC";
    
    if ($limit) {
        $sql .= " LIMIT :limit";
        $params['limit'] = $limit;
    }
    
    return $db->fetchAll($sql, $params);
}

function getProduct($id) {
    $db = new Database();
    $sql = "SELECT * FROM products WHERE id = :id";
    return $db->fetch($sql, ['id' => $id]);
}

function updateProductViews($id) {
    $db = new Database();
    $sql = "UPDATE products SET views = views + 1 WHERE id = :id";
    $db->query($sql, ['id' => $id]);
}

function getNews($limit = null) {
    $db = new Database();
    $sql = "SELECT * FROM news WHERE is_active = 1 ORDER BY created_at DESC";
    
    if ($limit) {
        $sql .= " LIMIT :limit";
        return $db->fetchAll($sql, ['limit' => $limit]);
    }
    
    return $db->fetchAll($sql);
}

function getStatistics() {
    $db = new Database();
    return $db->fetch("SELECT * FROM statistics ORDER BY id DESC LIMIT 1");
}

function updateStatistics() {
    $db = new Database();
    
    $totalProducts = $db->fetch("SELECT COUNT(*) as count FROM products WHERE status = 'active'")['count'];
    $totalOrders = $db->fetch("SELECT COUNT(*) as count FROM orders")['count'];
    $totalSales = $db->fetch("SELECT SUM(total_amount) as total FROM orders WHERE status = 'completed'")['total'] ?? 0;
    $totalUsers = $db->fetch("SELECT COUNT(*) as count FROM users")['count'];
    
    $sql = "UPDATE statistics SET total_products = :products, total_orders = :orders, total_sales = :sales, total_users = :users";
    $db->query($sql, [
        'products' => $totalProducts,
        'orders' => $totalOrders,
        'sales' => $totalSales,
        'users' => $totalUsers
    ]);
}
?>
