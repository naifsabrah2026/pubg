<header class="main-header">
    <div class="container">
        <div class="header-content">
            <!-- Logo -->
            <div class="logo">
                <a href="index.php">
                    <div class="logo-icon">
                        <span>P</span>
                    </div>
                    <span class="logo-text">PUBG Store</span>
                </a>
            </div>

            <!-- Desktop Navigation -->
            <nav class="desktop-nav">
                <a href="index.php" class="nav-link">الرئيسية</a>
                <a href="accounts.php" class="nav-link">حسابات PUBG</a>
                <a href="terms.php" class="nav-link">شروط المتجر</a>
                <a href="admin/index.php" class="nav-link">
                    <i class="fas fa-user"></i>
                </a>
            </nav>

            <!-- Mobile Menu Button -->
            <button class="mobile-menu-btn" onclick="toggleMobileMenu()">
                <span class="hamburger"></span>
                <span class="hamburger"></span>
                <span class="hamburger"></span>
            </button>
        </div>

        <!-- Mobile Navigation -->
        <nav class="mobile-nav" id="mobileNav">
            <a href="index.php" class="mobile-nav-link">الرئيسية</a>
            <a href="accounts.php" class="mobile-nav-link">حسابات PUBG</a>
            <a href="terms.php" class="mobile-nav-link">شروط المتجر</a>
            <a href="admin/index.php" class="mobile-nav-link">لوحة الإدارة</a>
        </nav>
    </div>
</header>

<script>
function toggleMobileMenu() {
    const mobileNav = document.getElementById('mobileNav');
    const menuBtn = document.querySelector('.mobile-menu-btn');
    
    mobileNav.classList.toggle('active');
    menuBtn.classList.toggle('active');
}
</script>
