<?php
require_once 'includes/config.php';
require_once 'includes/functions.php';
require_once 'includes/seo_helper.php';

$seo = new SEOHelper();
$seo->setTitle('حسابات PUBG Mobile - جميع الفئات');
$seo->setDescription('تصفح جميع حسابات PUBG Mobile المتاحة - كونكر، آيس، كراون، وحسابات متنوعة بأسعار مناسبة');

// جلب الحسابات حسب الفئة
$conqueror_accounts = getAccountsByCategory('conqueror', 8);
$premium_accounts = getAccountsByCategory('premium', 8);
$various_accounts = getAccountsByCategory('various', 8);
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
            <h2 class="loading-text">جاري تحميل الحسابات المميزة...</h2>
            <div class="progress-bar">
                <div class="progress-fill"></div>
            </div>
        </div>
    </div>

    <!-- Header -->
    <?php include 'includes/header.php'; ?>

    <!-- Page Content -->
    <div class="accounts-page">
        <div class="container">
            <h1 class="page-title">حسابات PUBG Mobile</h1>

            <!-- Conqueror Accounts -->
            <section class="accounts-section">
                <h2 class="section-title">حسابات مميزة - كونكر</h2>
                <div class="accounts-grid">
                    <?php foreach ($conqueror_accounts as $account): ?>
                        <?php include 'includes/account_card.php'; ?>
                    <?php endforeach; ?>
                </div>
            </section>

            <!-- Premium Accounts -->
            <section class="accounts-section">
                <h2 class="section-title">حسابات مميزة - بدون كونكر</h2>
                <div class="accounts-grid">
                    <?php foreach ($premium_accounts as $account): ?>
                        <?php include 'includes/account_card.php'; ?>
                    <?php endforeach; ?>
                </div>
            </section>

            <!-- Various Accounts -->
            <section class="accounts-section">
                <h2 class="section-title">حسابات متنوعة</h2>
                <div class="accounts-grid">
                    <?php foreach ($various_accounts as $account): ?>
                        <?php include 'includes/account_card.php'; ?>
                    <?php endforeach; ?>
                </div>
            </section>
        </div>
    </div>

    <!-- Footer -->
    <?php include 'includes/footer.php'; ?>

    <!-- Scripts -->
    <script src="assets/js/main.js"></script>
    <script src="assets/js/loading.js"></script>
</body>
</html>
