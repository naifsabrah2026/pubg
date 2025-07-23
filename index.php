<?php
session_start();
require_once 'includes/functions.php';

try {
    $products = getProducts(6, null, 'active', true); // Featured products first
    $news = getNews(5);
    $categories = getCategories();
    
    // SEO data
    $pageTitle = 'أفضل حسابات PUBG Mobile المميزة';
    $pageDescription = 'متجر متخصص في بيع حسابات PUBG Mobile المميزة بأفضل الأسعار. حسابات كونكر، آيس، كراون وأكثر مع ضمان الجودة والأمان.';
    $pageKeywords = 'PUBG Mobile, حسابات ببجي, كونكر, آيس, حسابات مميزة, بيع حسابات';
    
} catch (Exception $e) {
    handleError('خطأ في تحميل البيانات: ' . $e->getMessage());
}
?>

<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <?= generateMetaTags($pageTitle, $pageDescription, $pageKeywords, '', 'https://pubgstore.com') ?>
    
    <!-- Preload critical resources -->
    <link rel="preload" href="assets/css/style.css" as="style">
    <link rel="preload" href="assets/js/main.js" as="script">
    <link rel="preload" href="https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;600;700&display=swap" as="style">
    
    <link rel="stylesheet" href="assets/css/style.css">
    <link rel="stylesheet" href="assets/css/loading.css">
    <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    
    <!-- Favicon -->
    <link rel="icon" type="image/x-icon" href="assets/images/favicon.ico">
    <link rel="apple-touch-icon" href="assets/images/apple-touch-icon.png">
    
    <!-- Canonical URL -->
    <link rel="canonical" href="https://pubgstore.com/">
    
    <?= generateStructuredData('Organization', [
        'name' => getSetting('site_name', 'متجر حسابات PUBG Mobile'),
        'description' => getSetting('site_description', 'أفضل متجر لبيع حسابات PUBG Mobile المميزة'),
        'url' => 'https://pubgstore.com',
        'logo' => 'https://pubgstore.com/assets/images/logo.png',
        'contactPoint' => [
            '@type' => 'ContactPoint',
            'telephone' => '+' . getSetting('contact_whatsapp', '967777826667'),
            'contactType' => 'customer service'
        ]
    ]) ?>
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
                    <span><?= getSetting('site_name', 'PUBG Store') ?></span>
                </div>
                <ul class="nav-menu">
                    <li><a href="index.php" class="nav-link active">الرئيسية</a></li>
                    <li><a href="products.php" class="nav-link">الحسابات</a></li>
                    <li class="nav-dropdown">
                        <a href="#" class="nav-link">الفئات <i class="fas fa-chevron-down"></i></a>
                        <ul class="dropdown-menu">
                            <?php foreach ($categories as $category): ?>
                                <li><a href="products.php?category=<?= $category['slug'] ?>"><?= htmlspecialchars($category['name']) ?></a></li>
                            <?php endforeach; ?>
                        </ul>
                    </li>
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
                <div class="hero-stats">
                    <?php $stats = getStatistics(); ?>
                    <div class="stat-item">
                        <span class="stat-number"><?= $stats['total_products'] ?? 0 ?></span>
                        <span class="stat-label">حساب متاح</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-number"><?= $stats['total_orders'] ?? 0 ?></span>
                        <span class="stat-label">عملية بيع</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-number">24/7</span>
                        <span class="stat-label">دعم فني</span>
                    </div>
                </div>
                <div class="hero-buttons">
                    <a href="products.php" class="btn btn-primary">تصفح الحسابات</a>
                    <a href="https://wa.me/<?= getSetting('contact_whatsapp', '967777826667') ?>" class="btn btn-secondary" target="_blank">
                        <i class="fab fa-whatsapp"></i>
                        تواصل معنا
                    </a>
                </div>
            </div>
        </div>
    </section>

    <!-- News Ticker -->
    <?php if (!empty($news)): ?>
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
    <?php endif; ?>

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
                <?php if (empty($products)): ?>
                    <div class="no-products">
                        <i class="fas fa-box-open"></i>
                        <h3>لا توجد منتجات متاحة حالياً</h3>
                        <p>نعمل على إضافة منتجات جديدة قريباً</p>
                    </div>
                <?php else: ?>
                    <?php foreach ($products as $product): 
                        $images = json_decode($product['images'], true) ?? [];
                        $features = json_decode($product['features'], true) ?? [];
                    ?>
                        <div class="product-card" data-aos="fade-up">
                            <?php if ($product['featured']): ?>
                                <div class="featured-badge">
                                    <i class="fas fa-star"></i>
                                    مميز
                                </div>
                            <?php endif; ?>
                            
                            <div class="product-image">
                                <img src="<?= !empty($images) ? htmlspecialchars($images[0]) : 'assets/images/placeholder.jpg' ?>" 
                                     alt="<?= htmlspecialchars($product['title']) ?>" 
                                     loading="lazy"
                                     onerror="this.src='assets/images/placeholder.jpg'">
                                <div class="product-rank"><?= htmlspecialchars($product['rank_name']) ?></div>
                                <div class="product-overlay">
                                    <a href="product.php?slug=<?= htmlspecialchars($product['slug']) ?>" class="btn btn-view">
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
                                    <?php if ($product['views'] > 0): ?>
                                        <span class="feature-tag views">
                                            <i class="fas fa-eye"></i>
                                            <?= $product['views'] ?>
                                        </span>
                                    <?php endif; ?>
                                </div>
                                <div class="product-actions">
                                    <a href="https://wa.me/<?= $product['whatsapp_number'] ?>?text=مرحباً، أريد شراء الحساب: <?= urlencode($product['title']) ?> - السعر: <?= urlencode(formatPrice($product['price'])) ?>" 
                                       class="btn btn-whatsapp" target="_blank">
                                        <i class="fab fa-whatsapp"></i>
                                        واتساب
                                    </a>
                                    <a href="product.php?slug=<?= htmlspecialchars($product['slug']) ?>" class="btn btn-buy">
                                        <i class="fas fa-shopping-cart"></i>
                                        شراء
                                    </a>
                                </div>
                            </div>
                        </div>
                    <?php endforeach; ?>
                <?php endif; ?>
            </div>

            <div class="text-center">
                <a href="products.php" class="btn btn-primary btn-lg">عرض جميع الحسابات</a>
            </div>
        </div>
    </section>

    <!-- Categories Section -->
    <section class="categories-section">
        <div class="container">
            <div class="section-header">
                <h2 class="section-title">تصفح حسب الفئة</h2>
                <p class="section-subtitle">اختر الفئة المناسبة لك</p>
            </div>
            <div class="categories-grid">
                <?php foreach ($categories as $category): ?>
                    <a href="products.php?category=<?= $category['slug'] ?>" class="category-card">
                        <div class="category-icon">
                            <i class="fas fa-medal"></i>
                        </div>
                        <h3><?= htmlspecialchars($category['name']) ?></h3>
                        <p><?= htmlspecialchars($category['description']) ?></p>
                    </a>
                <?php endforeach; ?>
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

    <!-- Testimonials Section -->
    <section class="testimonials-section">
        <div class="container">
            <div class="section-header">
                <h2 class="section-title">آراء العملاء</h2>
                <p class="section-subtitle">ماذا يقول عملاؤنا عنا</p>
            </div>
            <div class="testimonials-grid">
                <div class="testimonial-card">
                    <div class="testimonial-content">
                        <p>"حصلت على حساب كونكر رائع بسعر ممتاز. الخدمة سريعة والحساب آمن تماماً."</p>
                    </div>
                    <div class="testimonial-author">
                        <div class="author-avatar">
                            <i class="fas fa-user"></i>
                        </div>
                        <div class="author-info">
                            <h4>أحمد محمد</h4>
                            <span>عميل مميز</span>
                        </div>
                    </div>
                    <div class="testimonial-rating">
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i
