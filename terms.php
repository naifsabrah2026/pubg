<?php
require_once 'includes/config.php';
require_once 'includes/seo_helper.php';

$seo = new SEOHelper();
$seo->setTitle('شروط المتجر - متجر PUBG Mobile');
$seo->setDescription('اطلع على شروط وأحكام متجر PUBG Mobile للبيع والشراء والضمانات المقدمة');
?>

<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <?php echo $seo->generateMetaTags(); ?>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="assets/css/style.css" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
</head>
<body class="bg-black text-white">
    <!-- Header -->
    <?php include 'includes/header.php'; ?>

    <!-- Terms Content -->
    <div class="terms-page">
        <div class="container">
            <h1 class="page-title">شروط المتجر</h1>

            <!-- شروط بيع الحساب -->
            <section class="terms-section">
                <h2 class="section-title">شروط بيع حسابك لنا</h2>
                <div class="terms-card">
                    <h3 class="terms-subtitle">1- تصفير حسابك من كل الارتباطات</h3>
                    <ul class="terms-list">
                        <li>
                            <i class="fas fa-check-circle"></i>
                            إزالة كل بريد إلكتروني في اللعبة
                        </li>
                        <li>
                            <i class="fas fa-check-circle"></i>
                            إزالة كل حساب تواصل اجتماعي (منصة X تويتر، منصة الفيس بوك وغيرها) إذا تواجد في اللعبة
                        </li>
                        <li>
                            <i class="fas fa-check-circle"></i>
                            اجعل فقط ارتباط الهاتف الخاص بك في اللعبة
                        </li>
                        <li>
                            <i class="fas fa-check-circle"></i>
                            تواصل معنا وعند الاتفاق سنقوم بعمل إيميل جديد لحسابك وسنرسله لك لكي تضيف الإيميل الجديد وتقوم بحذف رقم هاتفك
                        </li>
                        <li>
                            <i class="fas fa-check-circle"></i>
                            سنرسل أموالك خلال 21 يوم لسياسة شركة ببجي للاسترجاع
                        </li>
                    </ul>

                    <h3 class="terms-subtitle">2- تواصل معنا على الواتساب</h3>
                    <div class="whatsapp-contact">
                        <a href="https://wa.me/967777826667" class="whatsapp-btn-large">
                            <i class="fab fa-whatsapp"></i>
                            <span>+967777826667</span>
                        </a>
                    </div>
                </div>
            </section>

            <!-- شروط شراء الحساب -->
            <section class="terms-section">
                <h2 class="section-title">شروط شراء حساب</h2>
                <div class="terms-card">
                    <ul class="terms-list">
                        <li>
                            <i class="fas fa-shopping-cart"></i>
                            قم باختيار الحساب ثم قم بإضافة معلوماتك واضغط على إرسال إلى الواتساب
                        </li>
                        <li>
                            <i class="fab fa-whatsapp"></i>
                            سيتم إرسالك إلى الواتساب تلقائياً مع معلوماتك (اسمك ورقمك وهاتفك) وكذلك سيتم إرسال معلومات الحساب الذي تريده
                        </li>
                        <li>
                            <i class="fas fa-shield-alt"></i>
                            جميع الحسابات مضمونة 100% مع إمكانية الاسترداد حسب الشروط
                        </li>
                        <li>
                            <i class="fas fa-clock"></i>
                            التسليم فوري بعد تأكيد الدفع
                        </li>
                        <li>
                            <i class="fas fa-headset"></i>
                            دعم فني متاح 24/7 لحل أي مشكلة
                        </li>
                    </ul>

                    <div class="contact-section">
                        <h3 class="contact-title">للتواصل والشراء</h3>
                        <a href="https://wa.me/967777826667" class="whatsapp-btn-large">
                            <i class="fab fa-whatsapp"></i>
                            <span>+967777826667</span>
                        </a>
                    </div>
                </div>
            </section>

            <!-- معلومات إضافية -->
            <section class="terms-section">
                <h2 class="section-title">معلومات مهمة</h2>
                <div class="terms-card">
                    <div class="info-grid">
                        <div class="info-item">
                            <h3 class="info-title">
                                <i class="fas fa-shield-alt"></i>
                                الضمانات
                            </h3>
                            <ul class="info-list">
                                <li>ضمان على جميع الحسابات</li>
                                <li>إمكانية الاسترداد</li>
                                <li>دعم فني مستمر</li>
                                <li>تسليم آمن ومضمون</li>
                            </ul>
                        </div>
                        <div class="info-item">
                            <h3 class="info-title">
                                <i class="fas fa-credit-card"></i>
                                طرق الدفع
                            </h3>
                            <ul class="info-list">
                                <li>تحويل بنكي</li>
                                <li>محافظ إلكترونية</li>
                                <li>كاش عند التسليم (حسب المنطقة)</li>
                                <li>عملات رقمية</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </div>

    <!-- Footer -->
    <?php include 'includes/footer.php'; ?>

    <!-- Scripts -->
    <script src="assets/js/main.js"></script>
</body>
</html>

<style>
.terms-page {
    padding: 64px 0;
    min-height: calc(100vh - 200px);
}

.terms-section {
    margin-bottom: 48px;
}

.terms-card {
    background: #1f2937;
    border: 1px solid #f59e0b;
    border-radius: 12px;
    padding: 32px;
    margin-bottom: 32px;
}

.terms-subtitle {
    font-size: 24px;
    font-weight: bold;
    color: #f59e0b;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    gap: 12px;
}

.terms-list {
    list-style: none;
    padding: 0;
    margin-bottom: 32px;
}

.terms-list li {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    margin-bottom: 16px;
    font-size: 18px;
    line-height: 1.6;
}

.terms-list i {
    color: #f59e0b;
    margin-top: 4px;
    flex-shrink: 0;
}

.whatsapp-contact,
.contact-section {
    text-align: center;
    margin-top: 32px;
}

.contact-title {
    font-size: 20px;
    font-weight: bold;
    color: #f59e0b;
    margin-bottom: 16px;
}

.whatsapp-btn-large {
    display: inline-flex;
    align-items: center;
    gap: 12px;
    background: #25d366;
    color: #fff;
    padding: 16px 32px;
    border-radius: 12px;
    text-decoration: none;
    font-size: 20px;
    font-weight: bold;
    transition: all 0.3s;
    box-shadow: 0 4px 15px rgba(37, 211, 102, 0.3);
}

.whatsapp-btn-large:hover {
    background: #128c7e;
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(37, 211, 102, 0.4);
}

.whatsapp-btn-large i {
    font-size: 24px;
}

.info-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 32px;
    margin-top: 24px;
}

.info-item {
    background: #374151;
    padding: 24px;
    border-radius: 8px;
}

.info-title {
    font-size: 18px;
    font-weight: bold;
    color: #f59e0b;
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    gap: 8px;
}

.info-list {
    list-style: none;
    padding: 0;
}

.info-list li {
    padding: 8px 0;
    border-bottom: 1px solid #4b5563;
    color: #e5e7eb;
}

.info-list li:last-child {
    border-bottom: none;
}

.info-list li::before {
    content: '•';
    color: #f59e0b;
    margin-left: 8px;
    font-weight: bold;
}

@media (max-width: 768px) {
    .terms-card {
        padding: 20px;
    }
    
    .terms-list li {
        font-size: 16px;
    }
    
    .whatsapp-btn-large {
        font-size: 18px;
        padding: 12px 24px;
    }
    
    .info-grid {
        grid-template-columns: 1fr;
        gap: 20px;
    }
}
</style>
