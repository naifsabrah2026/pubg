<?php
session_start();
require_once 'includes/functions.php';

$products = getProducts(6);
$news = getNews(3);
?>

<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>متجر حسابات PUBG Mobile - أفضل الحسابات المميزة</title>
    <meta name="description" content="متجر متخصص في بيع حسابات PUBG Mobile المميزة بأفضل الأسعار. حسابات كونكر، آيس، كراون وأكثر مع ضمان الجودة والأمان.">
    <link rel="stylesheet" href="assets/css/style.css">
    <link rel="stylesheet" href="assets/css/loading.css">
    <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
</head>
<body>
    <!-- Page Loader -->
    <div id="pageLoader" class="page-loader">
        <div class="loader-container">
            <div class="pubg-logo">
                <i class="fas fa-gamepad"></i>
            </div>
            <div class="loader-rings">
                <div class="ring ring-1"></div>
                <div class="ring ring-2"></div>
                <div class="ring ring-3"></div>
            </div>
            <div class="loader-text">مرحباً بك في متجر PUBG Mobile</div>
            <div class="progress-bar">
                <div class="progress-fill"></div>
            </div>
        </div>
    </div>

    <!-- Navigation Loader -->
    <div id="navLoader" class="nav-loader">
        <div class="nav-progress"></div>
    </div>

    <!-- Header -->
    <header class="header">
        <nav class="navbar">
            <div class="container">
                <div class="nav-brand">
                    <i class="fas fa-gamepad"></i>
                    <span>PUBG Store</span>
                </div>
                <ul class="nav-menu">
                    <li><a href="index.php" class="nav-link active">الرئيسية</a></li>
                    <li><a href="products.php" class="nav-link">الحسابات</a></li>
                    <li><a href="about.php" class="nav-link">من نحن</a></li>
                    <li><a href="contact.php" class="nav-link">اتصل بنا</a></li>
                    <?php if (isAdmin()): ?>
                        <li><a href="admin/" class="nav-link">لوحة الإدارة</a></li>
                    <?php endif; ?>
                </ul>
                <div class="nav-toggle">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        </nav>
    </header>

    <!-- Hero Section -->
    <section class="hero">
        <div class="hero-background">
            <div class="hero-particles"></div>
        </div>
        <div class="container">
            <div class="hero-content">
                <h1 class="hero-title">أفضل حسابات PUBG Mobile</h1>
                <p class="hero-subtitle">احصل على حسابك المميز بأفضل الأسعار وضمان الجودة</p>
                <div class="hero-buttons">
                    <a href="products.php" class="btn btn-primary">تصفح الحسابات</a>
                    <a href="#contact" class="btn btn-secondary">تواصل معنا</a>
                </div>
            </div>
        </div>
    </section>

    <!-- News Ticker -->
    <div class="news-ticker">
        <div class="ticker-content">
            <span class="ticker-label">أخبار المتجر:</span>
            <div class="ticker-text">
                <?php foreach ($news as $item): ?>
                    <span><?= htmlspecialchars($item['title']) ?></span>
                <?php endforeach; ?>
            </div>
        </div>
    </div>

    <!-- Products Section -->
    <section class="products-section">
        <div class="container">
            <div class="section-header">
                <h2 class="section-title">حسابات PUBG Mobile المميزة</h2>
                <p class="section-subtitle">اختر من مجموعتنا المتنوعة من الحسابات المميزة</p>
            </div>

            <!-- Section Loader -->
            <div id="productsLoader" class="section-loader">
                <div class="section-loader-content">
                    <div class="loader-spinner"></div>
                    <p>جاري تحميل المنتجات...</p>
                </div>
            </div>

            <div id="productsGrid" class="products-grid" style="display: none;">
                <?php foreach ($products as $product): ?>
                    <div class="product-card" data-aos="fade-up">
                        <div class="product-image">
                            <img src="<?= json_decode($product['images'])[0] ?? 'assets/images/placeholder.jpg' ?>" 
                                 alt="<?= htmlspecialchars($product['title']) ?>" 
                                 loading="lazy">
                            <div class="product-rank"><?= htmlspecialchars($product['rank_name']) ?></div>
                            <div class="product-overlay">
                                <a href="product.php?id=<?= $product['id'] ?>" class="btn btn-view">
                                    <i class="fas fa-eye"></i>
                                    عرض التفاصيل
                                </a>
                            </div>
                        </div>
                        <div class="product-info">
                            <h3 class="product-title"><?= htmlspecialchars($product['title']) ?></h3>
                            <div class="product-meta">
                                <span class="product-price"><?= formatPrice($product['price']) ?></span>
                                <div class="product-level">
                                    <i class="fas fa-star"></i>
                                    <span>المستوى <?= $product['level'] ?></span>
                                </div>
                            </div>
                            <div class="product-features">
                                <span class="feature-tag"><?= $product['skins_count'] ?>+ سكن</span>
                                <span class="feature-tag">أسلحة مميزة</span>
                            </div>
                            <div class="product-actions">
                                <a href="https://wa.me/<?= $product['whatsapp_number'] ?>?text=مرحباً، أريد شراء الحساب: <?= urlencode($product['title']) ?>" 
                                   class="btn btn-whatsapp" target="_blank">
                                    <i class="fab fa-whatsapp"></i>
                                    واتساب
                                </a>
                                <a href="product.php?id=<?= $product['id'] ?>" class="btn btn-buy">
                                    <i class="fas fa-shopping-cart"></i>
                                    شراء
                                </a>
                            </div>
                        </div>
                    </div>
                <?php endforeach; ?>
            </div>

            <div class="text-center">
                <a href="products.php" class="btn btn-primary btn-lg">عرض جميع الحسابات</a>
            </div>
        </div>
    </section>

    <!-- Features Section -->
    <section class="features-section">
        <div class="container">
            <div class="features-grid">
                <div class="feature-card">
                    <div class="feature-icon">
                        <i class="fas fa-shield-alt"></i>
                    </div>
                    <h3>ضمان الأمان</h3>
                    <p>جميع حساباتنا آمنة ومضمونة 100%</p>
                </div>
                <div class="feature-card">
                    <div class="feature-icon">
                        <i class="fas fa-bolt"></i>
                    </div>
                    <h3>تسليم فوري</h3>
                    <p>احصل على حسابك خلال دقائق من الشراء</p>
                </div>
                <div class="feature-card">
                    <div class="feature-icon">
                        <i class="fas fa-headset"></i>
                    </div>
                    <h3>دعم 24/7</h3>
                    <p>فريق الدعم متاح على مدار الساعة</p>
                </div>
                <div class="feature-card">
                    <div class="feature-icon">
                        <i class="fas fa-medal"></i>
                    </div>
                    <h3>جودة عالية</h3>
                    <p>حسابات مميزة بأفضل الرتب والأسلحة</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
        <div class="container">
            <div class="footer-content">
                <div class="footer-section">
                    <h3>متجر PUBG Mobile</h3>
                    <p>متجر متخصص في بيع حسابات PUBG Mobile المميزة بأفضل الأسعار وضمان الجودة.</p>
                    <div class="social-links">
                        <a href="#"><i class="fab fa-whatsapp"></i></a>
                        <a href="#"><i class="fab fa-telegram"></i></a>
                        <a href="#"><i class="fab fa-instagram"></i></a>
                    </div>
                </div>
                <div class="footer-section">
                    <h4>روابط سريعة</h4>
                    <ul>
                        <li><a href="index.php">الرئيسية</a></li>
                        <li><a href="products.php">الحسابات</a></li>
                        <li><a href="about.php">من نحن</a></li>
                        <li><a href="contact.php">اتصل بنا</a></li>
                    </ul>
                </div>
                <div class="footer-section">
                    <h4>تواصل معنا</h4>
                    <div class="contact-info">
                        <p><i class="fab fa-whatsapp"></i> +967 777 826 667</p>
                        <p><i class="fas fa-envelope"></i> info@pubgstore.com</p>
                        <p><i class="fas fa-clock"></i> متاح 24/7</p>
                    </div>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; 2024 متجر PUBG Mobile. جميع الحقوق محفوظة.</p>
            </div>
        </div>
    </footer>

    <script src="assets/js/main.js"></script>
    <script src="assets/js/loading.js"></script>
</body>
</html>
