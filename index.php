<?php
require_once 'includes/config.php';
require_once 'includes/functions.php';
require_once 'includes/seo_helper.php';

$seo = new SEOHelper();
$seo->setTitle('متجر حسابات PUBG Mobile - أفضل الحسابات المميزة');
$seo->setDescription('متجر متخصص في بيع حسابات PUBG Mobile المميزة بأسعار منافسة. حسابات كونكر وآيس وكراون مضمونة 100%');
$seo->setKeywords('PUBG Mobile, حسابات ببجي, كونكر, آيس, كراون, متجر حسابات');

// جلب المنتجات المميزة
$featured_products = getFeaturedProducts(6);
$news_items = getActiveNews();
?>

<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <?php echo $seo->generateMetaTags(); ?>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="assets/css/style.css" rel="stylesheet">
    <link href="assets/css/loading.css" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
</head>
<body class="bg-black text-white">
    <!-- Loading Screen -->
    <div id="loading-screen" class="loading-screen">
        <div class="loading-content">
            <div class="pubg-logo">
                <img src="public/placeholder-logo.png" alt="PUBG Mobile" class="logo-img">
            </div>
            <div class="loading-spinner">
                <div class="spinner-ring"></div>
                <div class="spinner-ring"></div>
                <div class="spinner-ring"></div>
            </div>
            <h2 class="loading-text">مرحباً بك في متجر PUBG Mobile</h2>
            <div class="progress-bar">
                <div class="progress-fill"></div>
            </div>
            <div class="loading-dots">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    </div>

    <!-- Header -->
    <?php include 'includes/header.php'; ?>

    <!-- Hero Section -->
    <section class="hero-section">
        <div class="hero-slider">
            <div class="hero-slide active">
                <img src="public/placeholder.jpg" alt="PUBG Banner 1" class="hero-image">
                <div class="hero-overlay"></div>
            </div>
            <div class="hero-slide">
                <img src="public/placeholder.jpg" alt="PUBG Banner 2" class="hero-image">
                <div class="hero-overlay"></div>
            </div>
            <div class="hero-slide">
                <img src="public/placeholder.jpg" alt="PUBG Banner 3" class="hero-image">
                <div class="hero-overlay"></div>
            </div>
        </div>
        
        <div class="hero-content">
            <h1 class="hero-title">متجر حسابات PUBG Mobile</h1>
            <p class="hero-subtitle">أفضل الحسابات المميزة بأسعار منافسة</p>
            <a href="accounts.php" class="hero-btn">تصفح الحسابات</a>
        </div>
        
        <div class="hero-indicators">
            <button class="indicator active" data-slide="0"></button>
            <button class="indicator" data-slide="1"></button>
            <button class="indicator" data-slide="2"></button>
        </div>
    </section>

    <!-- News Ticker -->
    <div class="news-ticker">
        <div class="ticker-content">
            <?php foreach ($news_items as $news): ?>
                <span class="ticker-item"><?php echo htmlspecialchars($news['text']); ?></span>
            <?php endforeach; ?>
        </div>
    </div>

    <!-- Featured Products -->
    <section class="featured-products">
        <div class="container">
            <h2 class="section-title">حسابات PUBG Mobile المميزة</h2>
            <div class="products-grid" id="products-grid">
                <!-- Loading Skeletons -->
                <div class="loading-skeletons">
                    <?php for ($i = 0; $i < 6; $i++): ?>
                        <div class="product-skeleton">
                            <div class="skeleton-image"></div>
                            <div class="skeleton-content">
                                <div class="skeleton-title"></div>
                                <div class="skeleton-price"></div>
                                <div class="skeleton-features"></div>
                                <div class="skeleton-buttons"></div>
                            </div>
                        </div>
                    <?php endfor; ?>
                </div>

                <!-- Actual Products -->
                <div class="products-container" style="display: none;">
                    <?php foreach ($featured_products as $product): ?>
                        <div class="product-card" data-aos="fade-up">
                            <div class="product-image">
                                <img src="<?php echo $product['main_image'] ?: 'public/placeholder.jpg'; ?>" 
                                     alt="<?php echo htmlspecialchars($product['title']); ?>" 
                                     class="product-img">
                                <div class="product-rank"><?php echo htmlspecialchars($product['rank']); ?></div>
                                <div class="product-overlay">
                                    <a href="product.php?id=<?php echo $product['id']; ?>" class="view-details-btn">
                                        <i class="fas fa-eye"></i> عرض التفاصيل
                                    </a>
                                </div>
                            </div>
                            
                            <div class="product-info">
                                <h3 class="product-title"><?php echo htmlspecialchars($product['title']); ?></h3>
                                <div class="product-meta">
                                    <span class="product-price"><?php echo number_format($product['price']); ?> ريال</span>
                                    <div class="product-level">
                                        <i class="fas fa-star"></i>
                                        <span>المستوى <?php echo $product['level']; ?></span>
                                    </div>
                                </div>
                                
                                <div class="product-features">
                                    <h4>المميزات:</h4>
                                    <div class="features-tags">
                                        <span class="feature-tag"><?php echo $product['skins_count']; ?>+ سكن</span>
                                        <span class="feature-tag"><?php echo htmlspecialchars($product['weapons']); ?></span>
                                    </div>
                                </div>
                                
                                <div class="product-actions">
                                    <button class="whatsapp-btn" onclick="contactWhatsApp('<?php echo htmlspecialchars($product['title']); ?>', <?php echo $product['price']; ?>)">
                                        <i class="fab fa-whatsapp"></i> واتساب
                                    </button>
                                    <a href="product.php?id=<?php echo $product['id']; ?>" class="buy-btn">
                                        <i class="fas fa-shopping-cart"></i> شراء
                                    </a>
                                </div>
                            </div>
                        </div>
                    <?php endforeach; ?>
                </div>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <?php include 'includes/footer.php'; ?>

    <!-- Scripts -->
    <script src="assets/js/main.js"></script>
    <script src="assets/js/loading.js"></script>
    <script>
        // WhatsApp Contact Function
        function contactWhatsApp(title, price) {
            const message = `مرحباً، أريد شراء الحساب: ${title} - السعر: ${price} ريال`;
            const whatsappUrl = `https://wa.me/967777826667?text=${encodeURIComponent(message)}`;
            window.open(whatsappUrl, '_blank');
        }

        // Initialize page
        document.addEventListener('DOMContentLoaded', function() {
            // Simulate loading
            setTimeout(() => {
                document.getElementById('loading-screen').style.display = 'none';
                document.querySelector('.products-container').style.display = 'grid';
                document.querySelector('.loading-skeletons').style.display = 'none';
            }, 2000);
        });
    </script>
</body>
</html>
