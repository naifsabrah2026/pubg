<?php
require_once 'config/database.php';

// Error handling
function handleError($message, $code = 500) {
    error_log($message);
    http_response_code($code);
    
    if (isAjaxRequest()) {
        header('Content-Type: application/json');
        echo json_encode(['error' => true, 'message' => $message]);
        exit;
    }
    
    include 'templates/error.php';
    exit;
}

function isAjaxRequest() {
    return !empty($_SERVER['HTTP_X_REQUESTED_WITH']) && 
           strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest';
}

// Security functions
function sanitize($data) {
    if (is_array($data)) {
        return array_map('sanitize', $data);
    }
    return htmlspecialchars(strip_tags(trim($data)), ENT_QUOTES, 'UTF-8');
}

function generateCSRFToken() {
    if (!isset($_SESSION['csrf_token'])) {
        $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
    }
    return $_SESSION['csrf_token'];
}

function verifyCSRFToken($token) {
    return isset($_SESSION['csrf_token']) && hash_equals($_SESSION['csrf_token'], $token);
}

function redirect($url, $permanent = false) {
    if ($permanent) {
        header("HTTP/1.1 301 Moved Permanently");
    }
    header("Location: $url");
    exit();
}

// Authentication functions
function isLoggedIn() {
    return isset($_SESSION['user_id']) && !empty($_SESSION['user_id']);
}

function isAdmin() {
    return isset($_SESSION['role']) && $_SESSION['role'] === 'admin';
}

function isEditor() {
    return isset($_SESSION['role']) && in_array($_SESSION['role'], ['admin', 'editor']);
}

function requireLogin() {
    if (!isLoggedIn()) {
        redirect('login.php');
    }
}

function requireAdmin() {
    if (!isAdmin()) {
        handleError('غير مصرح لك بالوصول لهذه الصفحة', 403);
    }
}

// Utility functions
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

function generateSlug($text) {
    $text = trim($text);
    $text = preg_replace('/[^\p{L}\p{N}\s-]/u', '', $text);
    $text = preg_replace('/[\s-]+/', '-', $text);
    return strtolower($text);
}

function uploadImage($file, $directory = 'uploads/') {
    try {
        if (!isset($file['error']) || is_array($file['error'])) {
            throw new RuntimeException('معاملات الملف غير صحيحة');
        }

        switch ($file['error']) {
            case UPLOAD_ERR_OK:
                break;
            case UPLOAD_ERR_NO_FILE:
                throw new RuntimeException('لم يتم اختيار ملف');
            case UPLOAD_ERR_INI_SIZE:
            case UPLOAD_ERR_FORM_SIZE:
                throw new RuntimeException('حجم الملف كبير جداً');
            default:
                throw new RuntimeException('خطأ غير معروف');
        }

        if ($file['size'] > 5000000) {
            throw new RuntimeException('حجم الملف يجب أن يكون أقل من 5 ميجابايت');
        }

        $finfo = new finfo(FILEINFO_MIME_TYPE);
        $mimeType = $finfo->file($file['tmp_name']);
        $allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
        
        if (!in_array($mimeType, $allowedTypes)) {
            throw new RuntimeException('نوع الملف غير مدعوم');
        }

        $extension = array_search($mimeType, [
            'jpg' => 'image/jpeg',
            'png' => 'image/png',
            'gif' => 'image/gif',
            'webp' => 'image/webp'
        ]);

        $filename = sprintf('%s.%s', sha1_file($file['tmp_name']), $extension);
        $destination = $directory . $filename;

        if (!move_uploaded_file($file['tmp_name'], $destination)) {
            throw new RuntimeException('فشل في رفع الملف');
        }

        return $destination;
    } catch (Exception $e) {
        error_log("File upload error: " . $e->getMessage());
        throw $e;
    }
}

// Database functions
function getProducts($limit = null, $category = null, $status = 'active', $featured = null) {
    try {
        $db = Database::getInstance();
        $sql = "SELECT p.*, c.name as category_name FROM products p 
                LEFT JOIN categories c ON p.category = c.slug 
                WHERE p.status = :status";
        $params = ['status' => $status];
        
        if ($category) {
            $sql .= " AND p.category = :category";
            $params['category'] = $category;
        }
        
        if ($featured !== null) {
            $sql .= " AND p.featured = :featured";
            $params['featured'] = $featured ? 1 : 0;
        }
        
        $sql .= " ORDER BY p.featured DESC, p.created_at DESC";
        
        if ($limit) {
            $sql .= " LIMIT :limit";
            $params['limit'] = (int)$limit;
        }
        
        return $db->fetchAll($sql, $params);
    } catch (Exception $e) {
        error_log("Error fetching products: " . $e->getMessage());
        return [];
    }
}

function getProduct($id) {
    try {
        $db = Database::getInstance();
        $sql = "SELECT p.*, c.name as category_name FROM products p 
                LEFT JOIN categories c ON p.category = c.slug 
                WHERE p.id = :id";
        return $db->fetch($sql, ['id' => $id]);
    } catch (Exception $e) {
        error_log("Error fetching product: " . $e->getMessage());
        return null;
    }
}

function getProductBySlug($slug) {
    try {
        $db = Database::getInstance();
        $sql = "SELECT p.*, c.name as category_name FROM products p 
                LEFT JOIN categories c ON p.category = c.slug 
                WHERE p.slug = :slug AND p.status = 'active'";
        return $db->fetch($sql, ['slug' => $slug]);
    } catch (Exception $e) {
        error_log("Error fetching product by slug: " . $e->getMessage());
        return null;
    }
}

function updateProductViews($id) {
    try {
        $db = Database::getInstance();
        $sql = "UPDATE products SET views = views + 1 WHERE id = :id";
        $db->query($sql, ['id' => $id]);
    } catch (Exception $e) {
        error_log("Error updating product views: " . $e->getMessage());
    }
}

function getNews($limit = null, $active = true) {
    try {
        $db = Database::getInstance();
        $sql = "SELECT n.*, u.first_name, u.last_name FROM news n 
                LEFT JOIN users u ON n.author_id = u.id";
        
        if ($active) {
            $sql .= " WHERE n.is_active = 1";
        }
        
        $sql .= " ORDER BY n.created_at DESC";
        
        if ($limit) {
            $sql .= " LIMIT :limit";
            return $db->fetchAll($sql, ['limit' => (int)$limit]);
        }
        
        return $db->fetchAll($sql);
    } catch (Exception $e) {
        error_log("Error fetching news: " . $e->getMessage());
        return [];
    }
}

function getCategories($active = true) {
    try {
        $db = Database::getInstance();
        $sql = "SELECT * FROM categories";
        
        if ($active) {
            $sql .= " WHERE is_active = 1";
        }
        
        $sql .= " ORDER BY sort_order ASC, name ASC";
        
        return $db->fetchAll($sql);
    } catch (Exception $e) {
        error_log("Error fetching categories: " . $e->getMessage());
        return [];
    }
}

function getStatistics() {
    try {
        $db = Database::getInstance();
        return $db->fetch("SELECT * FROM statistics ORDER BY id DESC LIMIT 1");
    } catch (Exception $e) {
        error_log("Error fetching statistics: " . $e->getMessage());
        return null;
    }
}

function updateStatistics() {
    try {
        $db = Database::getInstance();
        
        $totalProducts = $db->fetch("SELECT COUNT(*) as count FROM products WHERE status = 'active'")['count'];
        $totalOrders = $db->fetch("SELECT COUNT(*) as count FROM orders")['count'];
        $totalSales = $db->fetch("SELECT SUM(total_amount) as total FROM orders WHERE status = 'completed'")['total'] ?? 0;
        $totalUsers = $db->fetch("SELECT COUNT(*) as count FROM users WHERE status = 'active'")['count'];
        
        // Monthly statistics
        $monthlyOrders = $db->fetch("SELECT COUNT(*) as count FROM orders WHERE MONTH(created_at) = MONTH(CURRENT_DATE()) AND YEAR(created_at) = YEAR(CURRENT_DATE())")['count'];
        $monthlySales = $db->fetch("SELECT SUM(total_amount) as total FROM orders WHERE status = 'completed' AND MONTH(created_at) = MONTH(CURRENT_DATE()) AND YEAR(created_at) = YEAR(CURRENT_DATE())")['total'] ?? 0;
        
        // Top category
        $topCategory = $db->fetch("SELECT category FROM products WHERE status = 'active' GROUP BY category ORDER BY COUNT(*) DESC LIMIT 1")['category'] ?? 'various';
        
        $sql = "UPDATE statistics SET 
                total_products = :products, 
                total_orders = :orders, 
                total_sales = :sales, 
                total_users = :users,
                monthly_orders = :monthly_orders,
                monthly_sales = :monthly_sales,
                top_category = :top_category";
                
        $db->query($sql, [
            'products' => $totalProducts,
            'orders' => $totalOrders,
            'sales' => $totalSales,
            'users' => $totalUsers,
            'monthly_orders' => $monthlyOrders,
            'monthly_sales' => $monthlySales,
            'top_category' => $topCategory
        ]);
    } catch (Exception $e) {
        error_log("Error updating statistics: " . $e->getMessage());
    }
}

function logActivity($userId, $action, $tableName = null, $recordId = null, $oldValues = null, $newValues = null) {
    try {
        $db = Database::getInstance();
        $sql = "INSERT INTO activity_logs (user_id, action, table_name, record_id, old_values, new_values, ip_address, user_agent) 
                VALUES (:user_id, :action, :table_name, :record_id, :old_values, :new_values, :ip_address, :user_agent)";
        
        $db->query($sql, [
            'user_id' => $userId,
            'action' => $action,
            'table_name' => $tableName,
            'record_id' => $recordId,
            'old_values' => $oldValues ? json_encode($oldValues) : null,
            'new_values' => $newValues ? json_encode($newValues) : null,
            'ip_address' => $_SERVER['REMOTE_ADDR'] ?? null,
            'user_agent' => $_SERVER['HTTP_USER_AGENT'] ?? null
        ]);
    } catch (Exception $e) {
        error_log("Error logging activity: " . $e->getMessage());
    }
}

function getSetting($key, $default = null) {
    try {
        $db = Database::getInstance();
        $result = $db->fetch("SELECT setting_value, setting_type FROM settings WHERE setting_key = :key", ['key' => $key]);
        
        if (!$result) {
            return $default;
        }
        
        $value = $result['setting_value'];
        
        switch ($result['setting_type']) {
            case 'boolean':
                return filter_var($value, FILTER_VALIDATE_BOOLEAN);
            case 'number':
                return is_numeric($value) ? (float)$value : $default;
            case 'json':
                return json_decode($value, true) ?? $default;
            default:
                return $value;
        }
    } catch (Exception $e) {
        error_log("Error getting setting: " . $e->getMessage());
        return $default;
    }
}

function setSetting($key, $value, $type = 'string') {
    try {
        $db = Database::getInstance();
        
        if ($type === 'json') {
            $value = json_encode($value);
        } elseif ($type === 'boolean') {
            $value = $value ? 'true' : 'false';
        }
        
        $sql = "INSERT INTO settings (setting_key, setting_value, setting_type) 
                VALUES (:key, :value, :type) 
                ON DUPLICATE KEY UPDATE setting_value = :value, setting_type = :type";
        
        $db->query($sql, [
            'key' => $key,
            'value' => $value,
            'type' => $type
        ]);
    } catch (Exception $e) {
        error_log("Error setting value: " . $e->getMessage());
    }
}

// SEO functions
function generateMetaTags($title, $description, $keywords = '', $image = '', $url = '') {
    $siteName = getSetting('site_name', 'متجر حسابات PUBG Mobile');
    $fullTitle = $title . ' | ' . $siteName;
    
    $tags = [
        '<title>' . htmlspecialchars($fullTitle) . '</title>',
        '<meta name="description" content="' . htmlspecialchars($description) . '">',
    ];
    
    if ($keywords) {
        $tags[] = '<meta name="keywords" content="' . htmlspecialchars($keywords) . '">';
    }
    
    // Open Graph tags
    $tags[] = '<meta property="og:title" content="' . htmlspecialchars($fullTitle) . '">';
    $tags[] = '<meta property="og:description" content="' . htmlspecialchars($description) . '">';
    $tags[] = '<meta property="og:type" content="website">';
    
    if ($image) {
        $tags[] = '<meta property="og:image" content="' . htmlspecialchars($image) . '">';
    }
    
    if ($url) {
        $tags[] = '<meta property="og:url" content="' . htmlspecialchars($url) . '">';
    }
    
    // Twitter Card tags
    $tags[] = '<meta name="twitter:card" content="summary_large_image">';
    $tags[] = '<meta name="twitter:title" content="' . htmlspecialchars($fullTitle) . '">';
    $tags[] = '<meta name="twitter:description" content="' . htmlspecialchars($description) . '">';
    
    if ($image) {
        $tags[] = '<meta name="twitter:image" content="' . htmlspecialchars($image) . '">';
    }
    
    return implode("\n    ", $tags);
}

function generateStructuredData($type, $data) {
    $structuredData = [
        '@context' => 'https://schema.org',
        '@type' => $type
    ];
    
    $structuredData = array_merge($structuredData, $data);
    
    return '<script type="application/ld+json">' . json_encode($structuredData, JSON_UNESCAPED_UNICODE) . '</script>';
}
?>
