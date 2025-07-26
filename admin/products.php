<?php
session_start();
require_once '../includes/functions.php';

if (!isLoggedIn() || !isAdmin()) {
    redirect('login.php');
}

$db = new Database();

// معالجة الإجراءات
if ($_POST) {
    try {
        if (isset($_POST['action'])) {
            switch ($_POST['action']) {
                case 'add':
                    $sql = "INSERT INTO products (title, description, price, rank_name, level, skins_count, weapons, category, features, images) 
                            VALUES (:title, :description, :price, :rank_name, :level, :skins_count, :weapons, :category, :features, :images)";
                    
                    $features = isset($_POST['features']) ? json_encode(explode(',', $_POST['features'])) : '[]';
                    $images = isset($_POST['images']) ? json_encode(explode(',', $_POST['images'])) : '["assets/images/placeholder.jpg"]';
                    
                    $db->query($sql, [
                        'title' => sanitize($_POST['title']),
                        'description' => sanitize($_POST['description']),
                        'price' => floatval($_POST['price']),
                        'rank_name' => sanitize($_POST['rank_name']),
                        'level' => intval($_POST['level']),
                        'skins_count' => intval($_POST['skins_count']),
                        'weapons' => sanitize($_POST['weapons']),
                        'category' => sanitize($_POST['category']),
                        'features' => $features,
                        'images' => $images
                    ]);
                    
                    $success = "تم إضافة المنتج بنجاح";
                    break;
                    
                case 'edit':
                    $sql = "UPDATE products SET title = :title, description = :description, price = :price, 
                            rank_name = :rank_name, level = :level, skins_count = :skins_count, 
                            weapons = :weapons, category = :category, status = :status 
                            WHERE id = :id";
                    
                    $db->query($sql, [
                        'id' => intval($_POST['id']),
                        'title' => sanitize($_POST['title']),
                        'description' => sanitize($_POST['description']),
                        'price' => floatval($_POST['price']),
                        'rank_name' => sanitize($_POST['rank_name']),
                        'level' => intval($_POST['level']),
                        'skins_count' => intval($_POST['skins_count']),
                        'weapons' => sanitize($_POST['weapons']),
                        'category' => sanitize($_POST['category']),
                        'status' => sanitize($_POST['status'])
                    ]);
                    
                    $success = "تم تحديث المنتج بنجاح";
                    break;
                    
                case 'delete':
                    $db->query("DELETE FROM products WHERE id = :id", ['id' => intval($_POST['id'])]);
                    $success = "تم حذف المنتج بنجاح";
                    break;
            }
        }
    } catch (Exception $e) {
        $error = "حدث خطأ: " . $e->getMessage();
    }
}

// جلب المنتجات مع البحث والتصفية
$search = $_GET['search'] ?? '';
$category = $_GET['category'] ?? '';
$status = $_GET['status'] ?? '';

$sql = "SELECT * FROM products WHERE 1=1";
$params = [];

if ($search) {
    $sql .= " AND (title LIKE :search OR description LIKE :search)";
    $params['search'] = "%$search%";
}

if ($category) {
    $sql .= " AND category = :category";
    $params['category'] = $category;
}

if ($status) {
    $sql .= " AND status = :status";
    $params['status'] = $status;
}

$sql .= " ORDER BY created_at DESC";
$products = $db->fetchAll($sql, $params);

// إحصائيات المنتجات
$stats = [
    'total' => $db->fetch("SELECT COUNT(*) as count FROM products")['count'],
    'active' => $db->fetch("SELECT COUNT(*) as count FROM products WHERE status = 'active'")['count'],
    'inactive' => $db->fetch("SELECT COUNT(*) as count FROM products WHERE status = 'inactive'")['count'],
    'sold' => $db->fetch("SELECT COUNT(*) as count FROM products WHERE status = 'sold'")['count']
];
?>

<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>إدارة المنتجات - لوحة إدارة PUBG Store</title>
    <meta name="description" content="إدارة منتجات متجر حسابات PUBG Mobile">
    <link rel="stylesheet" href="../assets/css/admin.css">
    <link rel="stylesheet" href="../assets/css/loading.css">
    <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
</head>
<body>
    <!-- Include Sidebar -->
    <?php include 'includes/sidebar.php'; ?>

    <main class="admin-main">
        <!-- Header -->
        <header class="admin-header">
            <div class="header-left">
                <button class="sidebar-toggle">
                    <i class="fas fa-bars"></i>
                </button>
                <h1>إدارة المنتجات</h1>
            </div>
            <div class="header-right">
                <button class="btn btn-primary" onclick="showAddProductModal()">
                    <i class="fas fa-plus"></i>
                    إضافة منتج جديد
                </button>
            </div>
        </header>

        <!-- Content -->
        <div class="admin-content">
            <?php if (isset($success)): ?>
                <div class="alert alert-success">
                    <i class="fas fa-check-circle"></i>
                    <?= $success ?>
                </div>
            <?php endif; ?>

            <?php if (isset($error)): ?>
                <div class="alert alert-error">
                    <i class="fas fa-exclamation-circle"></i>
                    <?= $error ?>
                </div>
            <?php endif; ?>

            <!-- Stats Cards -->
            <div class="stats-grid">
                <div class="stat-card">
                    <div class="stat-icon">
                        <i class="fas fa-box"></i>
                    </div>
                    <div class="stat-info">
                        <h3><?= $stats['total'] ?></h3>
                        <p>إجمالي المنتجات</p>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon active">
                        <i class="fas fa-check-circle"></i>
                    </div>
                    <div class="stat-info">
                        <h3><?= $stats['active'] ?></h3>
                        <p>المنتجات النشطة</p>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon sold">
                        <i class="fas fa-shopping-cart"></i>
                    </div>
                    <div class="stat-info">
                        <h3><?= $stats['sold'] ?></h3>
                        <p>المنتجات المباعة</p>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon inactive">
                        <i class="fas fa-pause-circle"></i>
                    </div>
                    <div class="stat-info">
                        <h3><?= $stats['inactive'] ?></h3>
                        <p>المنتجات المعطلة</p>
                    </div>
                </div>
            </div>

            <!-- Filters -->
            <div class="filters-section">
                <form method="GET" class="filters-form">
                    <div class="filter-group">
                        <input type="text" name="search" placeholder="البحث في المنتجات..." 
                               value="<?= htmlspecialchars($search) ?>">
                    </div>
                    <div class="filter-group">
                        <select name="category">
                            <option value="">جميع الفئات</option>
                            <option value="conqueror" <?= $category === 'conqueror' ? 'selected' : '' ?>>كونكر</option>
                            <option value="premium" <?= $category === 'premium' ? 'selected' : '' ?>>مميز</option>
                            <option value="various" <?= $category === 'various' ? 'selected' : '' ?>>متنوع</option>
                        </select>
                    </div>
                    <div class="filter-group">
                        <select name="status">
                            <option value="">جميع الحالات</option>
                            <option value="active" <?= $status === 'active' ? 'selected' : '' ?>>نشط</option>
                            <option value="inactive" <?= $status === 'inactive' ? 'selected' : '' ?>>معطل</option>
                            <option value="sold" <?= $status === 'sold' ? 'selected' : '' ?>>مباع</option>
                        </select>
                    </div>
                    <button type="submit" class="btn btn-primary">
                        <i class="fas fa-search"></i>
                        بحث
                    </button>
                    <a href="products.php" class="btn btn-secondary">
                        <i class="fas fa-refresh"></i>
                        إعادة تعيين
                    </a>
                </form>
            </div>

            <!-- Products Table -->
            <div class="table-container">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>المنتج</th>
                            <th>السعر</th>
                            <th>الرتبة</th>
                            <th>المستوى</th>
                            <th>الفئة</th>
                            <th>الحالة</th>
                            <th>المشاهدات</th>
                            <th>تاريخ الإضافة</th>
                            <th>الإجراءات</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php foreach ($products as $product): ?>
                            <tr>
                                <td>
                                    <div class="product-info">
                                        <img src="<?= json_decode($product['images'])[0] ?? 'assets/images/placeholder.jpg' ?>" 
                                             alt="<?= htmlspecialchars($product['title']) ?>" class="product-thumb">
                                        <div>
                                            <h4><?= htmlspecialchars($product['title']) ?></h4>
                                            <p><?= substr(htmlspecialchars($product['description']), 0, 50) ?>...</p>
                                        </div>
                                    </div>
                                </td>
                                <td class="price"><?= formatPrice($product['price']) ?></td>
                                <td>
                                    <span class="rank-badge rank-<?= strtolower($product['rank_name']) ?>">
                                        <?= htmlspecialchars($product['rank_name']) ?>
                                    </span>
                                </td>
                                <td><?= $product['level'] ?></td>
                                <td>
                                    <span class="category-badge category-<?= $product['category'] ?>">
                                        <?= getCategoryText($product['category']) ?>
                                    </span>
                                </td>
                                <td>
                                    <span class="status-badge status-<?= $product['status'] ?>">
                                        <?= getStatusText($product['status']) ?>
                                    </span>
                                </td>
                                <td>
                                    <i class="fas fa-eye"></i>
                                    <?= number_format($product['views']) ?>
                                </td>
                                <td><?= date('Y-m-d', strtotime($product['created_at'])) ?></td>
                                <td>
                                    <div class="action-buttons">
                                        <button class="btn-action btn-edit" onclick="editProduct(<?= $product['id'] ?>)">
                                            <i class="fas fa-edit"></i>
                                        </button>
                                        <button class="btn-action btn-delete" onclick="deleteProduct(<?= $product['id'] ?>)">
                                            <i class="fas fa-trash"></i>
                                        </button>
                                        <a href="../product.php?id=<?= $product['id'] ?>" target="_blank" class="btn-action btn-view">
                                            <i class="fas fa-eye"></i>
                                        </a>
                                    </div>
                                </td>
                            </tr>
                        <?php endforeach; ?>
                    </tbody>
                </table>
            </div>
        </div>
    </main>

    <!-- Add/Edit Product Modal -->
    <div id="productModal" class="modal">
        <div class="modal-content large">
            <div class="modal-header">
                <h3 id="modalTitle">إضافة منتج جديد</h3>
                <button class="modal-close" onclick="closeModal('productModal')">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <form id="productForm" class="modal-form">
                <input type="hidden" name="action" value="add">
                <input type="hidden" name="id" value="">
                
                <div class="form-grid">
                    <div class="form-group">
                        <label>عنوان المنتج *</label>
                        <input type="text" name="title" required>
                    </div>
                    <div class="form-group">
                        <label>السعر *</label>
                        <input type="number" name="price" step="0.01" required>
                    </div>
                    <div class="form-group">
                        <label>الرتبة *</label>
                        <select name="rank_name" required>
                            <option value="">اختر الرتبة</option>
                            <option value="Conqueror">Conqueror</option>
                            <option value="Ace">Ace</option>
                            <option value="Crown">Crown</option>
                            <option value="Diamond">Diamond</option>
                            <option value="Platinum">Platinum</option>
                            <option value="Gold">Gold</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>المستوى *</label>
                        <input type="number" name="level" min="1" max="100" required>
                    </div>
                    <div class="form-group">
                        <label>عدد السكنز</label>
                        <input type="number" name="skins_count" min="0" value="0">
                    </div>
                    <div class="form-group">
                        <label>الفئة *</label>
                        <select name="category" required>
                            <option value="">اختر الفئة</option>
                            <option value="conqueror">كونكر</option>
                            <option value="premium">مميز</option>
                            <option value="various">متنوع</option>
                        </select>
                    </div>
                </div>
                
                <div class="form-group">
                    <label>الوصف</label>
                    <textarea name="description" rows="3"></textarea>
                </div>
                
                <div class="form-group">
                    <label>الأسلحة والعناصر</label>
                    <textarea name="weapons" rows="2"></textarea>
                </div>
                
                <div class="form-group">
                    <label>المميزات (مفصولة بفاصلة)</label>
                    <input type="text" name="features" placeholder="رتبة عالية, أسلحة نادرة, أزياء مميزة">
                </div>
                
                <div class="form-group">
                    <label>روابط الصور (مفصولة بفاصلة)</label>
                    <input type="text" name="images" placeholder="assets/images/product1.jpg, assets/images/product2.jpg">
                </div>
                
                <div class="form-group" id="statusGroup" style="display: none;">
                    <label>الحالة</label>
                    <select name="status">
                        <option value="active">نشط</option>
                        <option value="inactive">معطل</option>
                        <option value="sold">مباع</option>
                    </select>
                </div>
                
                <div class="form-actions">
                    <button type="button" class="btn btn-secondary" onclick="closeModal('productModal')">
                        إلغاء
                    </button>
                    <button type="submit" class="btn btn-primary">
                        <i class="fas fa-save"></i>
                        حفظ المنتج
                    </button>
                </div>
            </form>
        </div>
    </div>

    <script src="../assets/js/admin.js"></script>
    <script src="../assets/js/products.js"></script>
</body>
</html>
