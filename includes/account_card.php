<div class="account-card" data-aos="fade-up">
    <div class="account-image">
        <?php 
        $images = json_decode($account['images'], true) ?: [];
        $main_image = !empty($images) ? $images[0] : 'public/placeholder.jpg';
        ?>
        <img src="<?php echo $main_image; ?>" 
             alt="<?php echo htmlspecialchars($account['title']); ?>" 
             class="account-img">
        <div class="account-rank"><?php echo htmlspecialchars($account['rank']); ?></div>
        
        <?php if (count($images) > 1): ?>
            <div class="image-indicators">
                <?php foreach ($images as $index => $image): ?>
                    <button class="indicator <?php echo $index === 0 ? 'active' : ''; ?>" 
                            onclick="changeAccountImage(this, '<?php echo $image; ?>')"></button>
                <?php endforeach; ?>
            </div>
        <?php endif; ?>
    </div>
    
    <div class="account-info">
        <h3 class="account-title"><?php echo htmlspecialchars($account['title']); ?></h3>
        <div class="account-meta">
            <span class="account-price"><?php echo number_format($account['price']); ?> ريال</span>
            <div class="account-level">
                <i class="fas fa-star"></i>
                <span>المستوى <?php echo $account['level']; ?></span>
            </div>
        </div>
        
        <!-- Quick Stats -->
        <div class="account-stats">
            <?php 
            $details = json_decode($account['details'], true) ?: [];
            ?>
            <div class="stat-item">
                <span class="stat-label">K/D:</span>
                <span class="stat-value"><?php echo $details['kd'] ?? 'غير محدد'; ?></span>
            </div>
            <div class="stat-item">
                <span class="stat-label">المباريات:</span>
                <span class="stat-value"><?php echo $details['matches'] ?? 'غير محدد'; ?></span>
            </div>
            <div class="stat-item">
                <span class="stat-label">الانتصارات:</span>
                <span class="stat-value"><?php echo $details['wins'] ?? 'غير محدد'; ?></span>
            </div>
            <div class="stat-item">
                <span class="stat-label">UC:</span>
                <span class="stat-value"><?php echo $details['uc'] ?? 'غير محدد'; ?></span>
            </div>
        </div>
        
        <!-- Action Buttons -->
        <div class="account-actions">
            <button class="details-btn" onclick="toggleAccountDetails(this)">
                <i class="fas fa-eye"></i>
                <span class="show-text">عرض التفاصيل</span>
                <span class="hide-text">إخفاء التفاصيل</span>
            </button>
        </div>
        
        <div class="account-buttons">
            <button class="whatsapp-btn" onclick="contactWhatsAppAccount('<?php echo htmlspecialchars($account['title']); ?>', <?php echo $account['price']; ?>, <?php echo htmlspecialchars(json_encode($details)); ?>)">
                <i class="fab fa-whatsapp"></i> واتساب
            </button>
            <a href="product.php?id=<?php echo $account['id']; ?>" class="buy-btn">
                <i class="fas fa-shopping-cart"></i> شراء
            </a>
        </div>
        
        <!-- Detailed Information -->
        <div class="account-details" style="display: none;">
            <h4>تفاصيل الحساب الكاملة:</h4>
            <div class="details-list">
                <?php foreach ($details as $key => $value): ?>
                    <div class="detail-item">
                        <span class="detail-key"><?php echo htmlspecialchars($key); ?>:</span>
                        <span class="detail-value"><?php echo is_array($value) ? implode(', ', $value) : htmlspecialchars($value); ?></span>
                    </div>
                <?php endforeach; ?>
            </div>
        </div>
    </div>
</div>

<script>
function changeAccountImage(indicator, imageSrc) {
    const card = indicator.closest('.account-card');
    const img = card.querySelector('.account-img');
    const indicators = card.querySelectorAll('.indicator');
    
    img.src = imageSrc;
    indicators.forEach(ind => ind.classList.remove('active'));
    indicator.classList.add('active');
}

function toggleAccountDetails(button) {
    const card = button.closest('.account-card');
    const details = card.querySelector('.account-details');
    const showText = button.querySelector('.show-text');
    const hideText = button.querySelector('.hide-text');
    
    if (details.style.display === 'none') {
        details.style.display = 'block';
        showText.style.display = 'none';
        hideText.style.display = 'inline';
        button.classList.add('active');
    } else {
        details.style.display = 'none';
        showText.style.display = 'inline';
        hideText.style.display = 'none';
        button.classList.remove('active');
    }
}

function contactWhatsAppAccount(title, price, details) {
    let accountInfo = '';
    
    for (const [key, value] of Object.entries(details)) {
        accountInfo += `${key}: ${Array.isArray(value) ? value.join(', ') : value}\n`;
    }
    
    const message = `مرحباً، أريد شراء الحساب: ${title}\nالسعر: ${price} ريال\n\nتفاصيل الحساب:\n${accountInfo}`;
    const whatsappUrl = `https://wa.me/967777826667?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
}
</script>
