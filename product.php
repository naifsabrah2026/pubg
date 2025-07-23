<?php
require_once 'includes/config.php';
require_once 'includes/functions.php';
require_once 'includes/seo_helper.php';

$product_id = isset($_GET['id']) ? (int)$_GET['id'] : 0;

if (!$product_id) {
    header('Location: index.php');
    exit;
}

$product = getProductById($product_id);

if (!$product) {
    header('Location: index.php');
    exit;
}

// تحديث عدد المشاهدات
updateProductViews($product_id);

$seo = new SEOHelper();
$seo->setTitle($product['title'] . ' - متجر PUBG Mobile');
$seo->setDescription($product['description']);
$seo->setImage($product['main_image']);

// جلب صور المنتج
$product_images = getProductImages($product_id);
?>

<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <?php echo $seo->generateMetaTags(); ?>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="assets/css/style.css" rel="stylesheet">
    <link href="assets/css/product.css" rel="stylesheet">
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
            <h2 class="loading-text">جاري تحميل تفاصيل المنتج...</h2>
            <div class="progress-bar">
                <div class="progress-fill"></div>
            </div>
        </div>
    </div>

    <!-- Header -->
    <div class="product-header">
        <div class="container">
            <div class="header-content">
                <a href="index.php" class="back-btn">
                    <i class="fas fa-arrow-left"></i> العودة
                </a>
                <div class="header-actions">
                    <button class="favorite-btn" onclick="toggleFavorite(<?php echo $product['id']; ?>)">
                        <i class="far fa-heart"></i>
                    </button>
                    <button class="share-btn" onclick="shareProduct()">
                        <i class="fas fa-share-alt"></i>
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- Product Details -->
    <div class="product-details">
        <div class="container">
            <div class="product-layout">
                <!-- Image Gallery -->
                <div class="product-gallery">
                    <div class="main-image">
                        <img id="main-product-image" 
                             src="<?php echo $product['main_image'] ?: 'public/placeholder.jpg'; ?>" 
                             alt="<?php echo htmlspecialchars($product['title']); ?>">
                        <div class="product-rank"><?php echo htmlspecialchars($product['rank']); ?></div>
                    </div>
                    
                    <div class="image-thumbnails">
                        <?php foreach ($product_images as $index => $image): ?>
                            <button class="thumbnail <?php echo $index === 0 ? 'active' : ''; ?>" 
                                    onclick="changeMainImage('<?php echo $image['image_url']; ?>', this)">
                                <img src="<?php echo $image['image_url']; ?>" 
                                     alt="<?php echo htmlspecialchars($product['title']); ?> - صورة <?php echo $index + 1; ?>">
                            </button>
                        <?php endforeach; ?>
                    </div>
                </div>

                <!-- Product Info -->
                <div class="product-info">
                    <h1 class="product-title"><?php echo htmlspecialchars($product['title']); ?></h1>
                    <p class="product-description"><?php echo htmlspecialchars($product['description']); ?></p>

                    <!-- Price and Stats -->
                    <div class="product-stats">
                        <div class="price-section">
                            <div class="product-price"><?php echo number_format($product['price']); ?> ريال</div>
                            <div class="product-level">
                                <i class="fas fa-star"></i>
                                <span>المستوى <?php echo $product['level']; ?></span>
                            </div>
                        </div>

                        <!-- Quick Stats -->
                        <div class="quick-stats">
                            <div class="stat-item">
                                <i class="fas fa-trophy"></i>
                                <span>الرتبة: <?php echo htmlspecialchars($product['rank']); ?></span>
                            </div>
                            <div class="stat-item">
                                <i class="fas fa-users"></i>
                                <span><?php echo $product['skins_count']; ?>+ سكن</span>
                            </div>
                            <div class="stat-item">
                                <i class="fas fa-shield-alt"></i>
                                <span>حساب آمن</span>
                            </div>
                            <div class="stat-item">
                                <i class="fas fa-clock"></i>
                                <span>تسليم فوري</span>
                            </div>
                        </div>

                        <!-- Action Buttons -->
                        <div class="action-buttons">
                            <button class="whatsapp-btn loading-btn" 
                                    onclick="contactWhatsApp('<?php echo htmlspecialchars($product['title']); ?>', <?php echo $product['price']; ?>)">
                                <i class="fab fa-whatsapp"></i>
                                <span class="btn-text">تواصل عبر واتساب</span>
                                <span class="btn-loading">جاري الاتصال...</span>
                            </button>
                            <button class="buy-btn loading-btn" onclick="buyNow(<?php echo $product['id']; ?>)">
                                <i class="fas fa-shopping-cart"></i>
                                <span class="btn-text">شراء الآن</span>
                                <span class="btn-loading">جاري المعالجة...</span>
                            </button>
                        </div>
                    </div>

                    <!-- Features -->
                    <div class="product-features">
                        <h3>مميزات الحساب</h3>
                        <div class="features-list">
                            <?php 
                            $features = json_decode($product['features'], true) ?: [];
                            foreach ($features as $feature): 
                            ?>
                                <div class="feature-item">
                                    <div class="feature-dot"></div>
                                    <span><?php echo htmlspecialchars($feature); ?></span>
                                </div>
                            <?php endforeach; ?>
                        </div>
                    </div>

                    <!-- Weapons & Items -->
                    <div class="product-weapons">
                        <h3>الأسلحة والعناصر</h3>
                        <p><?php echo htmlspecialchars($product['weapons']); ?></p>
                    </div>

                    <!-- Security Notice -->
                    <div class="security-notice">
                        <div class="notice-header">
                            <i class="fas fa-shield-alt"></i>
                            <span>ضمان الأمان</span>
                        </div>
                        <p>جميع حساباتنا آمنة ومضمونة. نوفر الدعم الفني بعد البيع ونضمن سلامة الحساب.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Footer -->
    <?php include 'includes/footer.php'; ?>

    <!-- Scripts -->
    <script src="assets/js/main.js"></script>
    <script src="assets/js/product.js"></script>
    <script src="assets/js/loading.js"></script>
    <script>
        function changeMainImage(imageSrc, thumbnail) {
            document.getElementById('main-product-image').src = imageSrc;
            document.querySelectorAll('.thumbnail').forEach(t => t.classList.remove('active'));
            thumbnail.classList.add('active');
        }

        function contactWhatsApp(title, price) {
            const btn = document.querySelector('.whatsapp-btn');
            btn.classList.add('loading');
            
            setTimeout(() => {
                const message = `مرحباً، أريد شراء الحساب: ${title} - السعر: ${price} ريال`;
                const whatsappUrl = `https://wa.me/967777826667?text=${encodeURIComponent(message)}`;
                window.open(whatsappUrl, '_blank');
                btn.classList.remove('loading');
            }, 1000);
        }

        function buyNow(productId) {
            const btn = document.querySelector('.buy-btn');
            btn.classList.add('loading');
            
            setTimeout(() => {
                // Redirect to purchase page or show purchase modal
                alert('سيتم توجيهك لإتمام عملية الشراء');
                btn.classList.remove('loading');
            }, 1000);
        }

        function toggleFavorite(productId) {
            const btn = document.querySelector('.favorite-btn i');
            btn.classList.toggle('far');
            btn.classList.toggle('fas');
        }

        function shareProduct() {
            if (navigator.share) {
                navigator.share({
                    title: '<?php echo htmlspecialchars($product['title']); ?>',
                    text: 'تحقق من هذا الحساب المميز',
                    url: window.location.href
                });
            } else {
                navigator.clipboard.writeText(window.location.href);
                alert('تم نسخ الرابط!');
            }
        }
    </script>
</body>
</html>
