<?php
session_start();
require_once 'includes/functions.php';

$productId = $_GET['id'] ?? null;
if (!$productId) {
    redirect('index.php');
}

$product = getProduct($productId);
if (!$product) {
    redirect('index.php');
}

// تحديث عدد المشاهدات
updateProductViews($productId);

$images = json_decode($product['images'], true) ?? [];
$features = json_decode($product['features'], true) ?? [];
?>

<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= htmlspecialchars($product['title']) ?> - متجر PUBG Mobile</title>
    <meta name="description" content="<?= htmlspecialchars($product['description']) ?>">
    <link rel="stylesheet" href="assets/css/style.css">
    <link rel="stylesheet" href="assets/css/product.css">
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
            <div class="loader-text">جاري تحميل تفاصيل المنتج...</div>
            <div class="progress-bar">
                <div class="progress-fill"></div>
            </div>
        </div>
    </div>

    <!-- Header -->
    <header class="header">
        <nav class="navbar">
            <div class="container">
                <div class="nav-brand">
                    <i class="fas fa-gamepad"></i>
                    <span>PUBG Store</span>
                </div>
                <div class="nav-actions">
                    <a href="index.php" class="btn btn-back">
                        <i class="fas fa-arrow-right"></i>
                        العودة
                    </a>
                </div>
            </div>
        </nav>
    </header>

    <!-- Product Details -->
    <main class="product-details">
        <div class="container">
            <div class="product-layout">
                <!-- Image Gallery -->
                <div class="product-gallery">
                    <div class="main-image">
                        <img id="mainImage" src="<?= $images[0] ?? 'assets/images/placeholder.jpg' ?>" 
                             alt="<?= htmlspecialchars($product['title']) ?>">
                        <div class="product-rank"><?= htmlspecialchars($product['rank_name']) ?></div>
                    </div>
                    <div class="thumbnail-gallery">
                        <?php foreach ($images as $index => $image): ?>
                            <img src="<?= $image ?>" 
                                 alt="صورة <?= $index + 1 ?>" 
                                 class="thumbnail <?= $index === 0 ? 'active' : '' ?>"
                                 onclick="changeMainImage('<?= $image ?>', this)">
                        <?php endforeach; ?>
                    </div>
                </div>

                <!-- Product Info -->
                <div class="product-info">
                    <div class="product-header">
                        <h1 class="product-title"><?= htmlspecialchars($product['title']) ?></h1>
                        <div class="product-actions-header">
                            <button class="btn-icon" onclick="toggleFavorite()">
                                <i class="fas fa-heart" id="favoriteIcon"></i>
                            </button>
                            <button class="btn-icon" onclick="shareProduct()">
                                <i class="fas fa-share-alt"></i>
                            </button>
                        </div>
                    </div>

                    <p class="product-description"><?= htmlspecialchars($product['description']) ?></p>

                    <!-- Price and Stats -->
                    <div class="product-stats">
                        <div class="price-section">
                            <span class="price"><?= formatPrice($product['price']) ?></span>
                            <div class="level-info">
                                <i class="fas fa-star"></i>
                                <span>المستوى <?= $product['level'] ?></span>
                            </div>
                        </div>

                        <div class="stats-grid">
                            <div class="stat-item">
                                <i class="fas fa-medal"></i>
                                <span>الرتبة: <?= htmlspecialchars($product['rank_name']) ?></span>
                            </div>
                            <div class="stat-item">
                                <i class="fas fa-users"></i>
                                <span><?= $product['skins_count'] ?>+ سكن</span>
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
                            <button class="btn btn-whatsapp btn-loading" onclick="contactWhatsApp()">
                                <span class="btn-text">
                                    <i class="fab fa-whatsapp"></i>
                                    تواصل عبر واتساب
                                </span>
                                <span class="btn-loader">
                                    <i class="fas fa-spinner fa-spin"></i>
                                    جاري الاتصال...
                                </span>
                            </button>
                            <button class="btn btn-buy btn-loading" onclick="buyNow()">
                                <span class="btn-text">
                                    <i class="fas fa-shopping-cart"></i>
                                    شراء الآن
                                </span>
                                <span class="btn-loader">
                                    <i class="fas fa-spinner fa-spin"></i>
                                    جاري المعالجة...
                                </span>
                            </button>
                        </div>
                    </div>

                    <!-- Features -->
                    <div class="features-section">
                        <h3>مميزات الحساب</h3>
                        <div class="features-list">
                            <?php foreach ($features as $feature): ?>
                                <div class="feature-item">
                                    <i class="fas fa-check-circle"></i>
                                    <span><?= htmlspecialchars($feature) ?></span>
                                </div>
                            <?php endforeach; ?>
                        </div>
                    </div>

                    <!-- Weapons & Items -->
                    <div class="weapons-section">
                        <h3>الأسلحة والعناصر</h3>
                        <p><?= htmlspecialchars($product['weapons']) ?></p>
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
    </main>

    <!-- Related Products -->
    <section class="related-products">
        <div class="container">
            <h2>منتجات مشابهة</h2>
            <div class="products-grid">
                <?php
                $relatedProducts = getProducts(4, $product['category']);
                foreach ($relatedProducts as $related):
                    if ($related['id'] == $product['id']) continue;
                ?>
                    <div class="product-card">
                        <div class="product-image">
                            <img src="<?= json_decode($related['images'])[0] ?? 'assets/images/placeholder.jpg' ?>" 
                                 alt="<?= htmlspecialchars($related['title']) ?>">
                            <div class="product-rank"><?= htmlspecialchars($related['rank_name']) ?></div>
                        </div>
                        <div class="product-info">
                            <h3><?= htmlspecialchars($related['title']) ?></h3>
                            <div class="product-price"><?= formatPrice($related['price']) ?></div>
                            <a href="product.php?id=<?= $related['id'] ?>" class="btn btn-primary">عرض التفاصيل</a>
                        </div>
                    </div>
                <?php endforeach; ?>
            </div>
        </div>
    </section>

    <script src="assets/js/main.js"></script>
    <script src="assets/js/product.js"></script>
    <script src="assets/js/loading.js"></script>
    <script>
        const productData = {
            id: <?= $product['id'] ?>,
            title: '<?= addslashes($product['title']) ?>',
            price: '<?= formatPrice($product['price']) ?>',
            whatsapp: '<?= $product['whatsapp_number'] ?>'
        };
    </script>
</body>
</html>
