<?php
session_start();
require_once '../includes/functions.php';

// التحقق من تسجيل الدخول
if (!isLoggedIn() || !isAdmin()) {
    redirect('login.php');
}

$db = new Database();

// إحصائيات اللوحة
$stats = [
    'total_products' => $db->fetch("SELECT COUNT(*) as count FROM products")['count'],
    'active_products' => $db->fetch("SELECT COUNT(*) as count FROM products WHERE status = 'active'")['count'],
    'total_orders' => $db->fetch("SELECT COUNT(*) as count FROM orders")['count'],
    'pending_orders' => $db->fetch("SELECT COUNT(*) as count FROM orders WHERE status = 'pending'")['count'],
    'total_users' => $db->fetch("SELECT COUNT(*) as count FROM users")['count'],
    'total_revenue' => $db->fetch("SELECT SUM(total_amount) as total FROM orders WHERE status = 'completed'")['total'] ?? 0,
    'monthly_sales' => $db->fetch("SELECT SUM(total_amount) as total FROM orders WHERE status = 'completed' AND MONTH(created_at) = MONTH(CURRENT_DATE())")['total'] ?? 0,
    'daily_views' => $db->fetch("SELECT SUM(views) as total FROM products WHERE DATE(updated_at) = CURDATE()")['total'] ?? 0
];

// الأنشطة الأخيرة
$recent_activities = $db->fetchAll("
    SELECT 'order' as type, id, customer_name as title, total_amount as amount, created_at 
    FROM orders 
    WHERE created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)
    UNION ALL
    SELECT 'product' as type, id, title, price as amount, created_at 
    FROM products 
    WHERE created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)
    ORDER BY created_at DESC 
    LIMIT 10
");

// الطلبات الأخيرة
$recent_orders = $db->fetchAll("
    SELECT o.*, p.title as product_title 
    FROM orders o 
    LEFT JOIN products p ON o.product_id = p.id 
    ORDER BY o.created_at DESC 
    LIMIT 5
");
?>

<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>لوحة إدارة متجر PUBG Mobile</title>
    <meta name="description" content="لوحة إدارة شاملة لمتجر حسابات PUBG Mobile">
    <link rel="stylesheet" href="../assets/css/admin.css">
    <link rel="stylesheet" href="../assets/css/loading.css">
    <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/chart.js@3.9.1/dist/chart.min.css">
</head>
<body>
    <!-- Page Loader -->
    <div id="pageLoader" class="page-loader">
        <div class="loader-container">
            <div class="admin-logo">
                <i class="fas fa-cogs"></i>
            </div>
            <div class="loader-rings">
                <div class="ring ring-1"></div>
                <div class="ring ring-2"></div>
            </div>
            <div class="loader-text">جاري تحميل لوحة الإدارة...</div>
            <div class="progress-bar">
                <div class="progress-fill"></div>
            </div>
        </div>
    </div>

    <div class="admin-layout">
        <!-- Sidebar -->
        <aside class="admin-sidebar">
            <div class="sidebar-header">
                <div class="logo">
                    <i class="fas fa-gamepad"></i>
                    <span>PUBG Admin</span>
                </div>
            </div>
            
            <nav class="sidebar-nav">
                <ul>
                    <li class="nav-item active">
                        <a href="index.php" class="nav-link">
                            <i class="fas fa-tachometer-alt"></i>
                            <span>لوحة التحكم</span>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a href="products.php" class="nav-link">
                            <i class="fas fa-box"></i>
                            <span>المنتجات</span>
                            <span class="badge"><?= $stats['total_products'] ?></span>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a href="orders.php" class="nav-link">
                            <i class="fas fa-shopping-cart"></i>
                            <span>الطلبات</span>
                            <?php if ($stats['pending_orders'] > 0): ?>
                                <span class="badge badge-warning"><?= $stats['pending_orders'] ?></span>
                            <?php endif; ?>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a href="users.php" class="nav-link">
                            <i class="fas fa-users"></i>
                            <span>المستخدمين</span>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a href="news.php" class="nav-link">
                            <i class="fas fa-newspaper"></i>
                            <span>الأخبار</span>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a href="analytics.php" class="nav-link">
                            <i class="fas fa-chart-bar"></i>
                            <span>التحليلات</span>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a href="settings.php" class="nav-link">
                            <i class="fas fa-cog"></i>
                            <span>الإعدادات</span>
                        </a>
                    </li>
                </ul>
            </nav>

            <div class="sidebar-footer">
                <a href="logout.php" class="logout-btn">
                    <i class="fas fa-sign-out-alt"></i>
                    <span>تسجيل الخروج</span>
                </a>
            </div>
        </aside>

        <!-- Main Content -->
        <main class="admin-main">
            <!-- Header -->
            <header class="admin-header">
                <div class="header-left">
                    <button class="sidebar-toggle">
                        <i class="fas fa-bars"></i>
                    </button>
                    <h1>لوحة التحكم</h1>
                </div>
                <div class="header-right">
                    <div class="header-actions">
                        <button class="btn btn-primary" onclick="showAddProductModal()">
                            <i class="fas fa-plus"></i>
                            إضافة منتج
                        </button>
                        <div class="notifications">
                            <button class="notification-btn">
                                <i class="fas fa-bell"></i>
                                <?php if ($stats['pending_orders'] > 0): ?>
                                    <span class="notification-badge"><?= $stats['pending_orders'] ?></span>
                                <?php endif; ?>
                            </button>
                        </div>
                        <div class="user-menu">
                            <button class="user-btn">
                                <i class="fas fa-user-circle"></i>
                                <span>المدير</span>
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <!-- Dashboard Content -->
            <div class="dashboard-content">
                <!-- Stats Cards -->
                <div class="stats-grid">
                    <div class="stat-card">
                        <div class="stat-icon">
                            <i class="fas fa-box"></i>
                        </div>
                        <div class="stat-info">
                            <h3><?= number_format($stats['total_products']) ?></h3>
                            <p>إجمالي المنتجات</p>
                            <span class="stat-change positive">+12%</span>
                        </div>
                    </div>

                    <div class="stat-card">
                        <div class="stat-icon">
                            <i class="fas fa-shopping-cart"></i>
                        </div>
                        <div class="stat-info">
                            <h3><?= number_format($stats['total_orders']) ?></h3>
                            <p>إجمالي الطلبات</p>
                            <span class="stat-change positive">+8%</span>
                        </div>
                    </div>

                    <div class="stat-card">
                        <div class="stat-icon">
                            <i class="fas fa-dollar-sign"></i>
                        </div>
                        <div class="stat-info">
                            <h3><?= formatPrice($stats['total_revenue']) ?></h3>
                            <p>إجمالي الإيرادات</p>
                            <span class="stat-change positive">+15%</span>
                        </div>
                    </div>

                    <div class="stat-card">
                        <div class="stat-icon">
                            <i class="fas fa-users"></i>
                        </div>
                        <div class="stat-info">
                            <h3><?= number_format($stats['total_users']) ?></h3>
                            <p>المستخدمين</p>
                            <span class="stat-change positive">+5%</span>
                        </div>
                    </div>
                </div>

                <!-- Charts Section -->
                <div class="charts-section">
                    <div class="chart-card">
                        <div class="chart-header">
                            <h3>إحصائيات المبيعات</h3>
                            <div class="chart-controls">
                                <select id="chartPeriod">
                                    <option value="week">هذا الأسبوع</option>
                                    <option value="month">هذا الشهر</option>
                                    <option value="year">هذا العام</option>
                                </select>
                            </div>
                        </div>
                        <div class="chart-container">
                            <canvas id="salesChart"></canvas>
                        </div>
                    </div>

                    <div class="chart-card">
                        <div class="chart-header">
                            <h3>توزيع المنتجات</h3>
                        </div>
                        <div class="chart-container">
                            <canvas id="productsChart"></canvas>
                        </div>
                    </div>
                </div>

                <!-- Recent Activities & Orders -->
                <div class="dashboard-grid">
                    <!-- Recent Activities -->
                    <div class="dashboard-card">
                        <div class="card-header">
                            <h3>النشاط الأخير</h3>
                            <a href="#" class="view-all">عرض الكل</a>
                        </div>
                        <div class="activities-list">
                            <?php foreach ($recent_activities as $activity): ?>
                                <div class="activity-item">
                                    <div class="activity-icon">
                                        <i class="fas fa-<?= $activity['type'] === 'order' ? 'shopping-cart' : 'box' ?>"></i>
                                    </div>
                                    <div class="activity-info">
                                        <p>
                                            <?php if ($activity['type'] === 'order'): ?>
                                                طلب جديد من <?= htmlspecialchars($activity['title']) ?>
                                            <?php else: ?>
                                                تم إضافة منتج: <?= htmlspecialchars($activity['title']) ?>
                                            <?php endif; ?>
                                        </p>
                                        <span class="activity-time"><?= timeAgo($activity['created_at']) ?></span>
                                    </div>
                                    <div class="activity-amount">
                                        <?= formatPrice($activity['amount']) ?>
                                    </div>
                                </div>
                            <?php endforeach; ?>
                        </div>
                    </div>

                    <!-- Recent Orders -->
                    <div class="dashboard-card">
                        <div class="card-header">
                            <h3>الطلبات الأخيرة</h3>
                            <a href="orders.php" class="view-all">عرض الكل</a>
                        </div>
                        <div class="orders-list">
                            <?php foreach ($recent_orders as $order): ?>
                                <div class="order-item">
                                    <div class="order-info">
                                        <h4><?= htmlspecialchars($order['customer_name']) ?></h4>
                                        <p><?= htmlspecialchars($order['product_title'] ?? 'منتج محذوف') ?></p>
                                        <span class="order-time"><?= timeAgo($order['created_at']) ?></span>
                                    </div>
                                    <div class="order-status">
                                        <span class="status-badge status-<?= $order['status'] ?>">
                                            <?= getStatusText($order['status']) ?>
                                        </span>
                                        <div class="order-amount">
                                            <?= formatPrice($order['total_amount']) ?>
                                        </div>
                                    </div>
                                </div>
                            <?php endforeach; ?>
                        </div>
                    </div>
                </div>

                <!-- Quick Actions -->
                <div class="quick-actions">
                    <h3>إجراءات سريعة</h3>
                    <div class="actions-grid">
                        <button class="action-btn" onclick="showAddProductModal()">
                            <i class="fas fa-plus"></i>
                            <span>إضافة منتج جديد</span>
                        </button>
                        <button class="action-btn" onclick="location.href='orders.php'">
                            <i class="fas fa-eye"></i>
                            <span>مراجعة الطلبات</span>
                        </button>
                        <button class="action-btn" onclick="showAddNewsModal()">
                            <i class="fas fa-newspaper"></i>
                            <span>إضافة خبر</span>
                        </button>
                        <button class="action-btn" onclick="exportData()">
                            <i class="fas fa-download"></i>
                            <span>تصدير البيانات</span>
                        </button>
                    </div>
                </div>
            </div>
        </main>
    </div>

    <!-- Add Product Modal -->
    <div id="addProductModal" class="modal">
        <div class="modal-content">
            <div class="modal-header">
                <h3>إضافة منتج جديد</h3>
                <button class="modal-close" onclick="closeModal('addProductModal')">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <form id="addProductForm" class="modal-form">
                <div class="form-grid">
                    <div class="form-group">
                        <label>عنوان المنتج</label>
                        <input type="text" name="title" required>
                    </div>
                    <div class="form-group">
                        <label>السعر</label>
                        <input type="number" name="price" step="0.01" required>
                    </div>
                    <div class="form-group">
                        <label>الرتبة</label>
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
                        <label>المستوى</label>
                        <input type="number" name="level" min="1" max="100" required>
                    </div>
                    <div class="form-group">
                        <label>عدد السكنز</label>
                        <input type="number" name="skins_count" min="0">
                    </div>
                    <div class="form-group">
                        <label>الفئة</label>
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
                <div class="form-actions">
                    <button type="button" class="btn btn-secondary" onclick="closeModal('addProductModal')">
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

    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script src="../assets/js/admin.js"></script>
    <script src="../assets/js/loading.js"></script>
</body>
</html>
