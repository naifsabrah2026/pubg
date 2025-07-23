<?php
session_start();
require_once '../includes/config.php';
require_once '../includes/functions.php';

// التحقق من تسجيل الدخول
if (!isset($_SESSION['admin_logged_in'])) {
    include 'login.php';
    exit;
}

// جلب الإحصائيات
$stats = getAdminStats();
$recent_activities = getRecentActivities();
$monthly_sales = getMonthlySales();
?>

<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>لوحة إدارة متجر PUBG</title>
    <link href="../assets/css/admin.css" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
</head>
<body class="admin-body">
    <!-- Sidebar -->
    <div class="admin-sidebar">
        <div class="sidebar-header">
            <div class="logo">
                <img src="../public/placeholder-logo.png" alt="PUBG Store">
                <span>لوحة الإدارة</span>
            </div>
        </div>
        
        <nav class="sidebar-nav">
            <a href="index.php" class="nav-item active">
                <i class="fas fa-chart-bar"></i>
                <span>نظرة عامة</span>
            </a>
            <a href="products.php" class="nav-item">
                <i class="fas fa-box"></i>
                <span>المنتجات</span>
            </a>
            <a href="orders.php" class="nav-item">
                <i class="fas fa-shopping-cart"></i>
                <span>الطلبات</span>
            </a>
            <a href="users.php" class="nav-item">
                <i class="fas fa-users"></i>
                <span>المستخدمين</span>
            </a>
            <a href="news.php" class="nav-item">
                <i class="fas fa-newspaper"></i>
                <span>الأخبار</span>
            </a>
            <a href="media.php" class="nav-item">
                <i class="fas fa-images"></i>
                <span>الوسائط</span>
            </a>
            <a href="settings.php" class="nav-item">
                <i class="fas fa-cog"></i>
                <span>الإعدادات</span>
            </a>
        </nav>
        
        <div class="sidebar-footer">
            <a href="logout.php" class="logout-btn">
                <i class="fas fa-sign-out-alt"></i>
                <span>تسجيل الخروج</span>
            </a>
        </div>
    </div>

    <!-- Main Content -->
    <div class="admin-main">
        <!-- Header -->
        <header class="admin-header">
            <div class="header-content">
                <div class="header-title">
                    <h1>لوحة إدارة متجر PUBG</h1>
                    <p>إدارة شاملة لمتجرك الإلكتروني</p>
                </div>
                <div class="header-actions">
                    <button class="export-btn">
                        <i class="fas fa-download"></i>
                        تصدير البيانات
                    </button>
                    <div class="admin-profile">
                        <img src="../public/placeholder-user.jpg" alt="Admin" class="profile-img">
                        <span>المدير</span>
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
                        <h3><?php echo number_format($stats['total_products']); ?></h3>
                        <p>إجمالي المنتجات</p>
                        <span class="stat-change positive">+12% من الشهر الماضي</span>
                    </div>
                </div>

                <div class="stat-card">
                    <div class="stat-icon">
                        <i class="fas fa-chart-line"></i>
                    </div>
                    <div class="stat-info">
                        <h3><?php echo number_format($stats['sold_products']); ?></h3>
                        <p>المنتجات المباعة</p>
                        <span class="stat-change positive">+8% من الشهر الماضي</span>
                    </div>
                </div>

                <div class="stat-card">
                    <div class="stat-icon">
                        <i class="fas fa-users"></i>
                    </div>
                    <div class="stat-info">
                        <h3><?php echo number_format($stats['active_users']); ?></h3>
                        <p>المستخدمين النشطين</p>
                        <span class="stat-change positive">+15% من الشهر الماضي</span>
                    </div>
                </div>

                <div class="stat-card">
                    <div class="stat-icon">
                        <i class="fas fa-dollar-sign"></i>
                    </div>
                    <div class="stat-info">
                        <h3><?php echo number_format($stats['total_revenue']); ?> ريال</h3>
                        <p>إجمالي الإيرادات</p>
                        <span class="stat-change positive">+23.5% من الشهر الماضي</span>
                    </div>
                </div>
            </div>

            <!-- Charts and Activities -->
            <div class="dashboard-grid">
                <!-- Sales Chart -->
                <div class="dashboard-card">
                    <div class="card-header">
                        <h3>المبيعات الشهرية</h3>
                        <div class="card-actions">
                            <button class="btn-icon">
                                <i class="fas fa-ellipsis-v"></i>
                            </button>
                        </div>
                    </div>
                    <div class="card-content">
                        <canvas id="salesChart"></canvas>
                    </div>
                </div>

                <!-- Recent Activities -->
                <div class="dashboard-card">
                    <div class="card-header">
                        <h3>النشاط الأخير</h3>
                        <a href="#" class="view-all">عرض الكل</a>
                    </div>
                    <div class="card-content">
                        <div class="activities-list">
                            <?php foreach ($recent_activities as $activity): ?>
                                <div class="activity-item">
                                    <div class="activity-icon">
                                        <i class="<?php echo $activity['icon']; ?>"></i>
                                    </div>
                                    <div class="activity-info">
                                        <p class="activity-text"><?php echo htmlspecialchars($activity['description']); ?></p>
                                        <span class="activity-time"><?php echo timeAgo($activity['created_at']); ?></span>
                                    </div>
                                    <?php if ($activity['amount']): ?>
                                        <div class="activity-amount">
                                            <?php echo number_format($activity['amount']); ?> ريال
                                        </div>
                                    <?php endif; ?>
                                </div>
                            <?php endforeach; ?>
                        </div>
                    </div>
                </div>

                <!-- Top Products -->
                <div class="dashboard-card">
                    <div class="card-header">
                        <h3>المنتجات الأكثر مبيعاً</h3>
                        <a href="products.php" class="view-all">عرض الكل</a>
                    </div>
                    <div class="card-content">
                        <div class="top-products">
                            <?php 
                            $top_products = getTopProducts(5);
                            foreach ($top_products as $product): 
                            ?>
                                <div class="product-item">
                                    <img src="<?php echo $product['main_image'] ?: '../public/placeholder.jpg'; ?>" 
                                         alt="<?php echo htmlspecialchars($product['title']); ?>" 
                                         class="product-thumb">
                                    <div class="product-info">
                                        <h4><?php echo htmlspecialchars($product['title']); ?></h4>
                                        <p><?php echo number_format($product['price']); ?> ريال</p>
                                    </div>
                                    <div class="product-sales">
                                        <span><?php echo $product['sales_count']; ?> مبيعة</span>
                                    </div>
                                </div>
                            <?php endforeach; ?>
                        </div>
                    </div>
                </div>

                <!-- Quick Actions -->
                <div class="dashboard-card">
                    <div class="card-header">
                        <h3>إجراءات سريعة</h3>
                    </div>
                    <div class="card-content">
                        <div class="quick-actions">
                            <a href="products.php?action=add" class="quick-action">
                                <i class="fas fa-plus"></i>
                                <span>إضافة منتج جديد</span>
                            </a>
                            <a href="orders.php" class="quick-action">
                                <i class="fas fa-shopping-cart"></i>
                                <span>عرض الطلبات</span>
                            </a>
                            <a href="news.php?action=add" class="quick-action">
                                <i class="fas fa-newspaper"></i>
                                <span>إضافة خبر</span>
                            </a>
                            <a href="settings.php" class="quick-action">
                                <i class="fas fa-cog"></i>
                                <span>الإعدادات</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Scripts -->
    <script src="../assets/js/admin.js"></script>
    <script>
        // Sales Chart
        const ctx = document.getElementById('salesChart').getContext('2d');
        const salesChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: <?php echo json_encode(array_column($monthly_sales, 'month')); ?>,
                datasets: [{
                    label: 'المبيعات (ريال)',
                    data: <?php echo json_encode(array_column($monthly_sales, 'amount')); ?>,
                    borderColor: '#f59e0b',
                    backgroundColor: 'rgba(245, 158, 11, 0.1)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        },
                        ticks: {
                            color: '#9ca3af'
                        }
                    },
                    x: {
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        },
                        ticks: {
                            color: '#9ca3af'
                        }
                    }
                }
            }
        });
    </script>
</body>
</html>
