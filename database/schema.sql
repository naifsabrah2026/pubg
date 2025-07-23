-- إنشاء قاعدة البيانات
CREATE DATABASE IF NOT EXISTS pubg_store CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE pubg_store;

-- جدول المنتجات
CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    rank_name VARCHAR(50) NOT NULL,
    level INT NOT NULL,
    skins_count INT DEFAULT 0,
    weapons TEXT,
    features JSON,
    images JSON,
    category VARCHAR(50) DEFAULT 'general',
    status ENUM('active', 'inactive', 'sold') DEFAULT 'active',
    whatsapp_number VARCHAR(20) DEFAULT '967777826667',
    views INT DEFAULT 0,
    meta_title VARCHAR(255),
    meta_description TEXT,
    slug VARCHAR(255) UNIQUE,
    featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_category (category),
    INDEX idx_status (status),
    INDEX idx_featured (featured),
    INDEX idx_slug (slug)
);

-- جدول المستخدمين
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('admin', 'editor', 'user') DEFAULT 'user',
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    phone VARCHAR(20),
    avatar VARCHAR(255),
    status ENUM('active', 'inactive', 'banned') DEFAULT 'active',
    email_verified BOOLEAN DEFAULT FALSE,
    last_login TIMESTAMP NULL,
    login_attempts INT DEFAULT 0,
    locked_until TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- جدول الأخبار
CREATE TABLE news (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT,
    excerpt VARCHAR(500),
    image VARCHAR(255),
    is_active BOOLEAN DEFAULT TRUE,
    views INT DEFAULT 0,
    meta_title VARCHAR(255),
    meta_description TEXT,
    slug VARCHAR(255) UNIQUE,
    author_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_active (is_active),
    INDEX idx_slug (slug)
);

-- جدول الطلبات
CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_number VARCHAR(50) UNIQUE NOT NULL,
    product_id INT,
    customer_name VARCHAR(255) NOT NULL,
    customer_phone VARCHAR(20) NOT NULL,
    customer_email VARCHAR(255),
    status ENUM('pending', 'confirmed', 'processing', 'completed', 'cancelled', 'refunded') DEFAULT 'pending',
    total_amount DECIMAL(10,2) NOT NULL,
    payment_method ENUM('whatsapp', 'bank_transfer', 'paypal', 'cash') DEFAULT 'whatsapp',
    payment_status ENUM('pending', 'paid', 'failed', 'refunded') DEFAULT 'pending',
    notes TEXT,
    admin_notes TEXT,
    delivery_info JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE SET NULL,
    INDEX idx_status (status),
    INDEX idx_payment_status (payment_status),
    INDEX idx_order_number (order_number)
);

-- جدول الإحصائيات
CREATE TABLE statistics (
    id INT AUTO_INCREMENT PRIMARY KEY,
    total_products INT DEFAULT 0,
    total_orders INT DEFAULT 0,
    total_sales DECIMAL(12,2) DEFAULT 0,
    total_users INT DEFAULT 0,
    monthly_sales DECIMAL(12,2) DEFAULT 0,
    monthly_orders INT DEFAULT 0,
    top_category VARCHAR(50),
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- جدول الفئات
CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    image VARCHAR(255),
    is_active BOOLEAN DEFAULT TRUE,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- جدول سجل النشاطات
CREATE TABLE activity_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    action VARCHAR(100) NOT NULL,
    table_name VARCHAR(50),
    record_id INT,
    old_values JSON,
    new_values JSON,
    ip_address VARCHAR(45),
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_user_id (user_id),
    INDEX idx_action (action),
    INDEX idx_created_at (created_at)
);

-- جدول الإعدادات
CREATE TABLE settings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    setting_key VARCHAR(100) UNIQUE NOT NULL,
    setting_value TEXT,
    setting_type ENUM('string', 'number', 'boolean', 'json') DEFAULT 'string',
    description TEXT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- إدراج الفئات
INSERT INTO categories (name, slug, description, is_active, sort_order) VALUES
('كونكر', 'conqueror', 'حسابات برتبة الكونكر المميزة', TRUE, 1),
('آيس', 'ace', 'حسابات برتبة الآيس', TRUE, 2),
('كراون', 'crown', 'حسابات برتبة الكراون', TRUE, 3),
('ديامند', 'diamond', 'حسابات برتبة الديامند', TRUE, 4),
('بلاتينيوم', 'platinum', 'حسابات برتبة البلاتينيوم', TRUE, 5),
('متنوعة', 'various', 'حسابات متنوعة بمختلف الرتب', TRUE, 6);

-- إدراج بيانات تجريبية للمنتجات (محسنة)
INSERT INTO products (title, description, price, rank_name, level, skins_count, weapons, features, images, category, meta_title, meta_description, slug, featured) VALUES
('حساب كونكر مع أسلحة ذهبية نادرة', 'حساب مميز برتبة كونكر مع مجموعة كبيرة من الأسلحة الذهبية والأزياء النادرة. يحتوي على أكثر من 50 سكن نادر وأسلحة مطورة بالكامل مع شخصيات مميزة وإكسسوارات حصرية.', 500.00, 'Conqueror', 100, 50, 'أسلحة ذهبية، M416 الجليدي، AKM الذهبي، AWM المطور، Groza النادر، Kar98k الأسطوري', '["رتبة كونكر", "أسلحة ذهبية", "أزياء نادرة", "مستوى عالي", "UC متوفر", "شخصيات مميزة", "إكسسوارات حصرية"]', '["assets/images/conqueror1.jpg", "assets/images/conqueror2.jpg", "assets/images/conqueror3.jpg", "assets/images/conqueror4.jpg"]', 'conqueror', 'حساب كونكر PUBG Mobile مع أسلحة ذهبية - متجر PUBG', 'احصل على حساب كونكر مميز في PUBG Mobile مع أسلحة ذهبية نادرة وأزياء حصرية. ضمان الجودة والأمان.', 'conqueror-golden-weapons-account', TRUE),

('حساب آيس مع أزياء نادرة ومركبات', 'حساب برتبة آيس يحتوي على أزياء نادرة ومركبات مميزة. مثالي للاعبين المحترفين الذين يريدون التميز في اللعبة مع مجموعة واسعة من الأسلحة المطورة.', 350.00, 'Ace', 85, 30, 'أسلحة مطورة، سكارل الأزرق، M24 المطور، Vector الذهبي، UMP45 النادر', '["رتبة آيس", "أزياء نادرة", "مركبات مميزة", "UC متوفر", "شخصيات مميزة", "أسلحة مطورة"]', '["assets/images/ace1.jpg", "assets/images/ace2.jpg", "assets/images/ace3.jpg"]', 'ace', 'حساب آيس PUBG Mobile مع أزياء نادرة - متجر PUBG', 'حساب آيس مميز في PUBG Mobile مع أزياء نادرة ومركبات حصرية. جودة عالية وأسعار منافسة.', 'ace-rare-skins-account', TRUE),

('حساب كراون مع مركبات ذهبية', 'حساب برتبة كراون مع مجموعة من المركبات النادرة والأسلحة المطورة. يحتوي على دراجة نارية ذهبية وسيارة مدرعة مع تشكيلة واسعة من الأسلحة.', 250.00, 'Crown', 70, 20, 'مركبات نادرة، دراجة نارية ذهبية، سيارة مدرعة، أسلحة متنوعة، M416 المطور', '["رتبة كراون", "مركبات نادرة", "أسلحة مطورة", "أزياء متنوعة", "دراجة ذهبية"]', '["assets/images/crown1.jpg", "assets/images/crown2.jpg", "assets/images/crown3.jpg"]', 'crown', 'حساب كراون PUBG Mobile مع مركبات ذهبية - متجر PUBG', 'حساب كراون مميز مع مركبات نادرة ودراجة ذهبية. تسليم فوري وضمان الجودة.', 'crown-golden-vehicles-account', FALSE),

('حساب ديامند مع UC وأسلحة مميزة', 'حساب برتبة ديامند يحتوي على UC ومجموعة من الأسلحة والأزياء المميزة. مناسب للاعبين الذين يريدون حساب متوسط بسعر معقول مع جودة عالية.', 200.00, 'Diamond', 60, 15, 'UC متوفر، أسلحة متنوعة، أزياء كلاسيكية، شخصيات أساسية، M416 الأزرق', '["رتبة ديامند", "UC متوفر", "أسلحة متنوعة", "أزياء كلاسيكية", "سعر مناسب"]', '["assets/images/diamond1.jpg", "assets/images/diamond2.jpg", "assets/images/diamond3.jpg"]', 'diamond', 'حساب ديامند PUBG Mobile مع UC - متجر PUBG', 'حساب ديامند بسعر مناسب مع UC وأسلحة متنوعة. خيار مثالي للاعبين المتوسطين.', 'diamond-uc-account', FALSE),

('حساب بلاتينيوم مميز مع أسلحة نادرة', 'حساب برتبة بلاتينيوم مع أسلحة نادرة وأزياء متميزة. خيار ممتاز للاعبين المتوسطين الذين يبحثون عن جودة بسعر معقول.', 150.00, 'Platinum', 50, 10, 'أسلحة نادرة، M416 الأزرق، VSS المطور، UMP45 الذهبي، AKM الكلاسيكي', '["رتبة بلاتينيوم", "أسلحة نادرة", "أزياء متميزة", "مستوى متوسط", "جودة عالية"]', '["assets/images/platinum1.jpg", "assets/images/platinum2.jpg", "assets/images/platinum3.jpg"]', 'platinum', 'حساب بلاتينيوم PUBG Mobile مع أسلحة نادرة - متجر PUBG', 'حساب بلاتينيوم مميز بأسلحة نادرة وأزياء متميزة. جودة ممتازة بسعر معقول.', 'platinum-rare-weapons-account', FALSE),

('حساب جولد للمبتدئين - عرض خاص', 'حساب مناسب للمبتدئين برتبة جولد مع الأساسيات المطلوبة. سعر مناسب وجودة مضمونة مع دعم فني مجاني لمدة شهر.', 100.00, 'Gold', 40, 5, 'أسلحة أساسية، M416 عادي، AKM عادي، Kar98k أساسي، VSS عادي', '["رتبة جولد", "مناسب للمبتدئين", "أسلحة أساسية", "سعر مناسب", "دعم فني مجاني"]', '["assets/images/gold1.jpg", "assets/images/gold2.jpg", "assets/images/gold3.jpg"]', 'various', 'حساب جولد PUBG Mobile للمبتدئين - متجر PUBG', 'حساب جولد مثالي للمبتدئين بسعر مناسب. يشمل الأساسيات ودعم فني مجاني.', 'gold-beginners-account', FALSE),

('حساب كونكر سيزون 20 - حصري', 'حساب كونكر حصري من السيزون 20 مع جميع المكافآت والأزياء الخاصة. يحتوي على أسلحة أسطورية وشخصيات نادرة جداً.', 750.00, 'Conqueror', 100, 75, 'أسلحة أسطورية، M416 الجليدي الأسطوري، AKM التنين، AWM الذهبي، Groza الأسطوري', '["كونكر سيزون 20", "أسلحة أسطورية", "أزياء حصرية", "شخصيات نادرة", "مكافآت السيزون"]', '["assets/images/conqueror-s20-1.jpg", "assets/images/conqueror-s20-2.jpg", "assets/images/conqueror-s20-3.jpg"]', 'conqueror', 'حساب كونكر سيزون 20 حصري PUBG Mobile - متجر PUBG', 'حساب كونكر حصري من السيزون 20 مع أسلحة أسطورية وأزياء نادرة. فرصة محدودة!', 'conqueror-season-20-exclusive', TRUE),

('حساب آيس مع مجموعة الأساطير', 'حساب آيس يحتوي على مجموعة الأساطير الكاملة مع أسلحة وأزياء من مختلف المواسم. مثالي للجامعين والمحترفين.', 450.00, 'Ace', 90, 40, 'مجموعة الأساطير، أسلحة من جميع المواسم، M416 الجليدي، AKM التنين الأحمر', '["رتبة آيس", "مجموعة الأساطير", "أسلحة متعددة المواسم", "أزياء نادرة", "للجامعين"]', '["assets/images/ace-legends1.jpg", "assets/images/ace-legends2.jpg", "assets/images/ace-legends3.jpg"]', 'ace', 'حساب آيس مع مجموعة الأساطير PUBG Mobile - متجر PUBG', 'حساب آيس مميز يحتوي على مجموعة الأساطير الكاملة. مثالي للجامعين والمحترفين.', 'ace-legends-collection-account', TRUE);

-- إدراج بيانات تجريبية للأخبار (محسنة)
INSERT INTO news (title, content, excerpt, is_active, meta_title, meta_description, slug, author_id) VALUES
('🔥 عروض خاصة على حسابات الكونكر - خصم 25%!', 'نقدم لكم عروض استثنائية على جميع حسابات الكونكر لفترة محدودة! احصل على خصم 25% على جميع حسابات الكونكر المميزة. العرض ساري حتى نهاية الشهر الجاري. لا تفوت هذه الفرصة الذهبية للحصول على حسابك المفضل بأفضل سعر.', 'خصم 25% على جميع حسابات الكونكر لفترة محدودة. استغل الفرصة الآن!', TRUE, 'عروض خاصة على حسابات الكونكر - خصم 25% | متجر PUBG', 'احصل على خصم 25% على جميع حسابات الكونكر في PUBG Mobile. عرض محدود لفترة قصيرة!', 'conqueror-accounts-25-percent-discount', 1),

('⭐ وصول حسابات السيزون الجديد مع أسلحة أسطورية', 'تم إضافة مجموعة جديدة من الحسابات المميزة من السيزون الجديد! تحتوي هذه الحسابات على أسلحة أسطورية نادرة وأزياء حصرية لم تكن متوفرة من قبل. جميع الحسابات مضمونة وآمنة 100%.', 'حسابات جديدة من السيزون الحالي مع أسلحة أسطورية وأزياء حصرية', TRUE, 'حسابات السيزون الجديد مع أسلحة أسطورية | متجر PUBG', 'اكتشف حسابات السيزون الجديد في PUBG Mobile مع أسلحة أسطورية وأزياء حصرية نادرة.', 'new-season-legendary-weapons-accounts', 1),

('💰 تحديث أسعار الحسابات - أسعار أكثر تنافسية', 'قمنا بتحديث أسعار جميع الحسابات لتكون أكثر تنافسية في السوق. هدفنا هو تقديم أفضل قيمة مقابل المال مع الحفاظ على أعلى معايير الجودة والأمان. تحقق من الأسعار الجديدة الآن!', 'تحديث شامل لأسعار الحسابات لتكون أكثر تنافسية مع الحفاظ على الجودة', TRUE, 'تحديث أسعار حسابات PUBG Mobile - أسعار تنافسية | متجر PUBG', 'أسعار جديدة ومنافسة لجميع حسابات PUBG Mobile مع الحفاظ على أعلى معايير الجودة.', 'competitive-prices-update', 1),

('🎮 دليل شامل: كيفية اختيار الحساب المناسب', 'دليل مفصل يساعدك في اختيار الحساب المناسب لاحتياجاتك. نغطي جميع الجوانب من الرتب والأسلحة إلى الأزياء والمركبات. تعلم كيفية تقييم الحسابات واختيار الأفضل لك.', 'دليل شامل لمساعدتك في اختيار حساب PUBG Mobile المناسب لاحتياجاتك', TRUE, 'دليل اختيار حساب PUBG Mobile المناسب | متجر PUBG', 'تعلم كيفية اختيار حساب PUBG Mobile المثالي مع دليلنا الشامل للرتب والأسلحة والأزياء.', 'how-to-choose-right-pubg-account', 1),

('🛡️ ضمان الأمان: كيف نحمي حساباتكم', 'نشرح لكم الإجراءات الأمنية المتقدمة التي نتبعها لضمان أمان جميع الحسابات. من التحقق المتعدد إلى التشفير المتقدم، نحن نضمن حماية استثمارك.', 'تعرف على الإجراءات الأمنية المتقدمة التي نستخدمها لحماية حساباتكم', TRUE, 'ضمان أمان حسابات PUBG Mobile | متجر PUBG', 'اكتشف كيف نحمي حسابات PUBG Mobile بأحدث تقنيات الأمان والحماية المتقدمة.', 'account-security-guarantee', 1);

-- إدراج مستخدم إداري افتراضي
INSERT INTO users (username, email, password_hash, role, first_name, last_name, status, email_verified) VALUES
('admin', 'admin@pubgstore.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin', 'مدير', 'النظام', 'active', TRUE),
('editor', 'editor@pubgstore.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'editor', 'محرر', 'المحتوى', 'active', TRUE);

-- إدراج إحصائيات أولية
INSERT INTO statistics (total_products, total_orders, total_sales, total_users, monthly_sales, monthly_orders, top_category) VALUES
(8, 0, 0.00, 2, 0.00, 0, 'conqueror');

-- إدراج الإعدادات الأساسية
INSERT INTO settings (setting_key, setting_value, setting_type, description) VALUES
('site_name', 'متجر حسابات PUBG Mobile', 'string', 'اسم الموقع'),
('site_description', 'أفضل متجر لبيع حسابات PUBG Mobile المميزة', 'string', 'وصف الموقع'),
('contact_whatsapp', '967777826667', 'string', 'رقم الواتساب'),
('contact_email', 'info@pubgstore.com', 'string', 'البريد الإلكتروني'),
('currency', 'ريال', 'string', 'العملة المستخدمة'),
('maintenance_mode', 'false', 'boolean', 'وضع الصيانة'),
('max_login_attempts', '5', 'number', 'عدد محاولات تسجيل الدخول المسموحة'),
('session_timeout', '3600', 'number', 'مدة انتهاء الجلسة بالثواني');
