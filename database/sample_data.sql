-- إدراج بيانات تجريبية شاملة للمتجر

-- إدراج المزيد من المنتجات
INSERT INTO products (title, description, price, rank_name, level, skins_count, weapons, features, images, category, views) VALUES

-- حسابات كونكر مميزة
('حساب كونكر S1 مع M416 الجليدي', 'حساب كونكر مميز للموسم الأول مع M416 الجليدي النادر وأكثر من 80 سكن مميز. يحتوي على جميع الأسلحة الذهبية والأزياء النادرة.', 750.00, 'Conqueror', 100, 80, 'M416 الجليدي، AKM الذهبي، AWM المطور، Groza النادر، VSS الأسطوري، Kar98k الذهبي', '["رتبة كونكر S1", "M416 الجليدي", "أسلحة ذهبية", "أزياء نادرة", "UC متوفر", "شخصيات مميزة"]', '["assets/images/conqueror-s1-1.jpg", "assets/images/conqueror-s1-2.jpg", "assets/images/conqueror-s1-3.jpg", "assets/images/conqueror-s1-4.jpg"]', 'conqueror', 245),

('حساب كونكر S2 مع Glacier M416', 'حساب كونكر للموسم الثاني مع سلاح Glacier M416 الأسطوري. يحتوي على مجموعة كاملة من الأسلحة المطورة والأزياء الحصرية.', 850.00, 'Conqueror', 100, 95, 'Glacier M416، AKM الأسطوري، AWM الجليدي، Groza المطور، UMP45 الذهبي، Tommy Gun النادر', '["رتبة كونكر S2", "Glacier M416", "أسلحة أسطورية", "أزياء حصرية", "UC كبير", "مركبات نادرة"]', '["assets/images/conqueror-s2-1.jpg", "assets/images/conqueror-s2-2.jpg", "assets/images/conqueror-s2-3.jpg", "assets/images/conqueror-s2-4.jpg"]', 'conqueror', 189),

('حساب كونكر S3 مع Fool M416', 'حساب كونكر للموسم الثالث مع سلاح Fool M416 النادر جداً. مجموعة شاملة من الأسلحة والأزياء والمركبات.', 950.00, 'Conqueror', 100, 110, 'Fool M416، AKM الأحمر، AWM الأسود، Groza الذهبي، VSS المطور، Vector الأسطوري', '["رتبة كونكر S3", "Fool M416", "أسلحة نادرة جداً", "أزياء أسطورية", "UC ضخم", "مركبات حصرية"]', '["assets/images/conqueror-s3-1.jpg", "assets/images/conqueror-s3-2.jpg", "assets/images/conqueror-s3-3.jpg", "assets/images/conqueror-s3-4.jpg"]', 'conqueror', 312),

-- حسابات آيس مميزة
('حساب آيس مع أسلحة ذهبية متنوعة', 'حساب برتبة آيس يحتوي على مجموعة متنوعة من الأسلحة الذهبية والأزياء المميزة. مثالي للاعبين المحترفين.', 450.00, 'Ace', 90, 45, 'M416 الذهبي، AKM الأزرق، AWM المطور، SCAR-L الأحمر، UMP45 الذهبي', '["رتبة آيس", "أسلحة ذهبية", "أزياء مميزة", "مركبات جميلة", "UC متوسط"]', '["assets/images/ace-1.jpg", "assets/images/ace-2.jpg", "assets/images/ace-3.jpg"]', 'premium', 156),

('حساب آيس مع مجموعة الأزياء النادرة', 'حساب آيس مع تركيز على الأزياء النادرة والشخصيات المميزة. يحتوي على أكثر من 60 زي نادر.', 520.00, 'Ace', 85, 60, 'M416 الأزرق، AKM المطور، AWM الأحمر، Groza العادي، VSS المحسن', '["رتبة آيس", "أزياء نادرة", "شخصيات مميزة", "UC جيد", "مركبات متنوعة"]', '["assets/images/ace-premium-1.jpg", "assets/images/ace-premium-2.jpg", "assets/images/ace-premium-3.jpg"]', 'premium', 198),

-- حسابات كراون
('حساب كراون مع مركبات نادرة', 'حساب برتبة كراون يحتوي على مجموعة رائعة من المركبات النادرة والأسلحة المطورة.', 320.00, 'Crown', 75, 35, 'M416 المحسن، AKM العادي، AWM الأساسي، SCAR-L المطور، UMP45 العادي', '["رتبة كراون", "مركبات نادرة", "أسلحة مطورة", "أزياء جميلة", "UC قليل"]', '["assets/images/crown-1.jpg", "assets/images/crown-2.jpg", "assets/images/crown-3.jpg"]', 'various', 134),

('حساب كراون للمبتدئين المتقدمين', 'حساب مثالي للاعبين الذين يريدون الانتقال من المستوى المبتدئ إلى المتقدم. يحتوي على أساسيات جيدة.', 280.00, 'Crown', 70, 25, 'M416 العادي، AKM الأساسي، AWM العادي، SCAR-L العادي، Vector الأساسي', '["رتبة كراون", "مناسب للمتقدمين", "أسلحة أساسية", "أزياء عادية"]', '["assets/images/crown-beginner-1.jpg", "assets/images/crown-beginner-2.jpg"]', 'various', 89),

-- حسابات ديامند
('حساب ديامند مع UC كبير', 'حساب برتبة ديامند يحتوي على كمية كبيرة من UC والأسلحة المتنوعة. خيار اقتصادي ممتاز.', 220.00, 'Diamond', 65, 20, 'M416 العادي، AKM العادي، AWM الأساسي، SCAR-L العادي، UMP45 العادي', '["رتبة ديامند", "UC كبير", "أسلحة متنوعة", "قيمة ممتازة"]', '["assets/images/diamond-1.jpg", "assets/images/diamond-2.jpg", "assets/images/diamond-3.jpg"]', 'various', 167),

('حساب ديامند مع أسلحة محسنة', 'حساب ديامند يركز على الأسلحة المحسنة والمطورة. مناسب للاعبين الذين يهتمون بالأداء.', 250.00, 'Diamond', 68, 18, 'M416 المحسن، AKM المطور، AWM المحسن، SCAR-L المطور، Vector المحسن', '["رتبة ديامند", "أسلحة محسنة", "أداء ممتاز", "UC متوسط"]', '["assets/images/diamond-enhanced-1.jpg", "assets/images/diamond-enhanced-2.jpg"]', 'various', 123),

-- حسابات بلاتينيوم
('حساب بلاتينيوم مع مجموعة متوازنة', 'حساب بلاتينيوم يوفر توازن جيد بين الأسلحة والأزياء والسعر. خيار ممتاز للاعبين المتوسطين.', 180.00, 'Platinum', 55, 15, 'M416 العادي، AKM العادي، AWM العادي، SCAR-L العادي، UMP45 العادي', '["رتبة بلاتينيوم", "مجموعة متوازنة", "سعر مناسب", "جودة جيدة"]', '["assets/images/platinum-1.jpg", "assets/images/platinum-2.jpg"]', 'various', 145),

('حساب بلاتينيوم للمبتدئين المتميزين', 'حساب مصمم خصيصاً للمبتدئين الذين يريدون البدء بحساب جيد دون إنفاق مبلغ كبير.', 160.00, 'Platinum', 50, 12, 'M416 الأساسي، AKM الأساسي، AWM العادي، SCAR-L الأساسي', '["رتبة بلاتينيوم", "مناسب للمبتدئين", "سعر اقتصادي", "جودة مضمونة"]', '["assets/images/platinum-starter-1.jpg", "assets/images/platinum-starter-2.jpg"]', 'various', 98),

-- حسابات جولد
('حساب جولد الاقتصادي', 'حساب برتبة جولد بسعر اقتصادي جداً. يحتوي على الأساسيات المطلوبة للبدء في اللعبة.', 120.00, 'Gold', 45, 8, 'M416 الأساسي، AKM الأساسي، AWM العادي، SCAR-L الأساسي', '["رتبة جولد", "سعر اقتصادي", "أساسيات اللعبة", "مناسب للمبتدئين"]', '["assets/images/gold-1.jpg", "assets/images/gold-2.jpg"]', 'various', 234),

('حساب جولد مع أزياء جميلة', 'حساب جولد يركز على الأزياء الجميلة والشخصيات اللطيفة. مثالي للاعبين الذين يحبون المظهر الجميل.', 140.00, 'Gold', 48, 10, 'M416 العادي، AKM العادي، AWM الأساسي، SCAR-L العادي', '["رتبة جولد", "أزياء جميلة", "شخصيات لطيفة", "مظهر مميز"]', '["assets/images/gold-fashion-1.jpg", "assets/images/gold-fashion-2.jpg"]', 'various', 176),

-- حسابات خاصة ونادرة
('حساب نادر مع Pharaoh X-Suit', 'حساب نادر جداً يحتوي على بدلة Pharaoh X-Suit الأسطورية. قطعة مجموعات نادرة للغاية.', 1200.00, 'Conqueror', 100, 120, 'جميع الأسلحة الأسطورية، Pharaoh X-Suit، مجموعة كاملة من الأسلحة النادرة', '["Pharaoh X-Suit", "حساب نادر جداً", "مجموعة أسطورية", "قيمة استثمارية"]', '["assets/images/pharaoh-1.jpg", "assets/images/pharaoh-2.jpg", "assets/images/pharaoh-3.jpg", "assets/images/pharaoh-4.jpg"]', 'conqueror', 89),

('حساب مع Godzilla Set كامل', 'حساب يحتوي على مجموعة Godzilla الكاملة النادرة. تشمل جميع عناصر المجموعة والأسلحة المرتبطة.', 1100.00, 'Ace', 95, 100, 'Godzilla AKM، Kong M416، جميع أسلحة المجموعة، مركبات Godzilla', '["Godzilla Set كامل", "مجموعة نادرة", "أسلحة خاصة", "مركبات مميزة"]', '["assets/images/godzilla-1.jpg", "assets/images/godzilla-2.jpg", "assets/images/godzilla-3.jpg"]', 'premium', 156),

('حساب مع McLaren 765LT', 'حساب يحتوي على سيارة McLaren 765LT النادرة مع مجموعة من الأسلحة المميزة والأزياء الرياضية.', 800.00, 'Crown', 80, 55, 'M416 الرياضي، AKM السريع، AWM المتطور، مجموعة أسلحة رياضية', '["McLaren 765LT", "سيارة نادرة", "أزياء رياضية", "مجموعة سريعة"]', '["assets/images/mclaren-1.jpg", "assets/images/mclaren-2.jpg", "assets/images/mclaren-3.jpg"]', 'premium', 201);

-- إدراج المزيد من الأخبار
INSERT INTO news (title, content, is_active) VALUES
('🎉 افتتاح قسم الحسابات النادرة!', 'تم افتتاح قسم جديد للحسابات النادرة والمجموعات الخاصة. اكتشف مجموعتنا الحصرية من الحسابات الأسطورية!', TRUE),
('💎 عرض خاص: خصم 25% على حسابات الآيس', 'لفترة محدودة! احصل على خصم 25% على جميع حسابات الآيس. العرض ساري حتى نهاية الشهر.', TRUE),
('🚗 وصول حسابات McLaren الجديدة', 'وصلت مجموعة جديدة من الحسابات التي تحتوي على سيارات McLaren النادرة. كميات محدودة!', TRUE),
('🔥 تخفيضات الجمعة البيضاء قادمة!', 'استعدوا لأكبر تخفيضات السنة! تخفيضات تصل إلى 50% على مجموعة مختارة من الحسابات.', TRUE),
('⚡ تحديث: تحسين خدمة التسليم', 'تم تحسين خدمة التسليم لتصبح أسرع وأكثر أماناً. التسليم الآن خلال 5 دقائق من تأكيد الدفع!', TRUE),
('🎮 نصائح للعب PUBG Mobile بشكل أفضل', 'تعلم أفضل الاستراتيجيات والتكتيكات للفوز في PUBG Mobile من خبرائنا المحترفين.', TRUE),
('🛡️ ضمان الأمان المحدث', 'تم تحديث سياسة ضمان الأمان لتشمل حماية إضافية لجميع العملاء. حسابك آمن معنا 100%!', TRUE),
('📱 تطبيق المتجر قادم قريباً', 'نعمل على تطوير تطبيق محمول للمتجر لتسهيل عملية التصفح والشراء. ترقبوا الإطلاق قريباً!', FALSE);

-- إدراج طلبات تجريبية
INSERT INTO orders (product_id, customer_name, customer_phone, customer_email, status, total_amount, notes) VALUES
(1, 'أحمد محمد علي', '+966501234567', 'ahmed.mohamed@email.com', 'completed', 500.00, 'تم التسليم بنجاح والعميل راضي جداً'),
(3, 'فاطمة أحمد', '+966507654321', 'fatima.ahmed@email.com', 'completed', 250.00, 'عميلة مميزة، طلبت حسابات إضافية'),
(2, 'محمد حسن', '+966509876543', 'mohamed.hassan@email.com', 'pending', 350.00, 'في انتظار تأكيد الدفع'),
(5, 'سارة عبدالله', '+966502468135', 'sara.abdullah@email.com', 'confirmed', 450.00, 'تم تأكيد الطلب، جاري التحضير'),
(4, 'عبدالرحمن خالد', '+966508642097', 'abdulrahman.khalid@email.com', 'completed', 200.00, 'عميل دائم، خدمة ممتازة'),
(6, 'نورا سعد', '+966503691472', 'nora.saad@email.com', 'pending', 280.00, 'طلب جديد، في انتظار المراجعة'),
(1, 'خالد العتيبي', '+966505827394', 'khalid.otaibi@email.com', 'cancelled', 500.00, 'ألغى العميل الطلب لظروف شخصية'),
(7, 'ريم المطيري', '+966504938261', 'reem.mutairi@email.com', 'completed', 320.00, 'تسليم سريع وخدمة ممتازة'),
(8, 'سلطان الدوسري', '+966506174829', 'sultan.dosari@email.com', 'confirmed', 220.00, 'عميل جديد، طلب أول'),
(9, 'هند القحطاني', '+966507395184', 'hind.qahtani@email.com', 'pending', 250.00, 'استفسارات إضافية حول الحساب');

-- إدراج مستخدمين إضافيين
INSERT INTO users (username, email, password_hash, role) VALUES
('manager', 'manager@pubgstore.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin'),
('support1', 'support1@pubgstore.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'user'),
('support2', 'support2@pubgstore.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'user'),
('sales_manager', 'sales@pubgstore.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin');

-- تحديث الإحصائيات
UPDATE statistics SET 
    total_products = (SELECT COUNT(*) FROM products WHERE status = 'active'),
    total_orders = (SELECT COUNT(*) FROM orders),
    total_sales = (SELECT COALESCE(SUM(total_amount), 0) FROM orders WHERE status = 'completed'),
    total_users = (SELECT COUNT(*) FROM users),
    updated_at = CURRENT_TIMESTAMP;

-- إنشاء جدول للتقييمات والمراجعات
CREATE TABLE IF NOT EXISTS reviews (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT,
    customer_name VARCHAR(255) NOT NULL,
    customer_email VARCHAR(255),
    rating INT CHECK (rating >= 1 AND rating <= 5),
    review_text TEXT,
    is_approved BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- إدراج تقييمات تجريبية
INSERT INTO reviews (product_id, customer_name, customer_email, rating, review_text, is_approved) VALUES
(1, 'أحمد محمد', 'ahmed@email.com', 5, 'حساب ممتاز جداً! الأسلحة رائعة والخدمة سريعة. أنصح بشدة!', TRUE),
(1, 'فاطمة علي', 'fatima@email.com', 5, 'أفضل متجر للحسابات! جودة عالية وأسعار مناسبة.', TRUE),
(2, 'محمد حسن', 'mohamed@email.com', 4, 'حساب جيد جداً، الأسلحة كما هو موصوف. التسليم كان سريع.', TRUE),
(3, 'سارة أحمد', 'sara@email.com', 5, 'خدمة ممتازة! الحساب أفضل من المتوقع. شكراً لكم.', TRUE),
(4, 'عبدالله خالد', 'abdullah@email.com', 4, 'حساب جيد بسعر مناسب. التعامل مهني وسريع.', TRUE),
(5, 'نورا سعد', 'nora@email.com', 5, 'متجر موثوق وحسابات أصلية. تجربة رائعة!', TRUE);

-- إنشاء جدول للكوبونات والخصومات
CREATE TABLE IF NOT EXISTS coupons (
    id INT AUTO_INCREMENT PRIMARY KEY,
    code VARCHAR(50) UNIQUE NOT NULL,
    discount_type ENUM('percentage', 'fixed') DEFAULT 'percentage',
    discount_value DECIMAL(10,2) NOT NULL,
    min_order_amount DECIMAL(10,2) DEFAULT 0,
    max_uses INT DEFAULT NULL,
    used_count INT DEFAULT 0,
    valid_from TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    valid_until TIMESTAMP NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- إدراج كوبونات تجريبية
INSERT INTO coupons (code, discount_type, discount_value, min_order_amount, max_uses, valid_until) VALUES
('WELCOME20', 'percentage', 20.00, 100.00, 100, DATE_ADD(NOW(), INTERVAL 30 DAY)),
('SAVE50', 'fixed', 50.00, 200.00, 50, DATE_ADD(NOW(), INTERVAL 15 DAY)),
('NEWUSER', 'percentage', 15.00, 50.00, 200, DATE_ADD(NOW(), INTERVAL 60 DAY)),
('BLACKFRIDAY', 'percentage', 40.00, 300.00, 1000, DATE_ADD(NOW(), INTERVAL 7 DAY)),
('VIP10', 'percentage', 10.00, 0.00, NULL, DATE_ADD(NOW(), INTERVAL 365 DAY));

-- إنشاء جدول لسجل النشاطات
CREATE TABLE IF NOT EXISTS activity_log (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    action_type VARCHAR(50) NOT NULL,
    action_description TEXT,
    ip_address VARCHAR(45),
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

-- إدراج سجل نشاطات تجريبي
INSERT INTO activity_log (user_id, action_type, action_description, ip_address) VALUES
(1, 'login', 'تسجيل دخول المدير إلى لوحة التحكم', '192.168.1.100'),
(1, 'product_add', 'إضافة منتج جديد: حساب كونكر مميز', '192.168.1.100'),
(1, 'order_update', 'تحديث حالة الطلب #1 إلى مكتمل', '192.168.1.100'),
(2, 'login', 'تسجيل دخول مدير المبيعات', '192.168.1.101'),
(2, 'product_edit', 'تعديل سعر المنتج #3', '192.168.1.101'),
(1, 'user_add', 'إضافة مستخدم جديد: support1', '192.168.1.100');

-- إنشاء فهارس لتحسين الأداء
CREATE INDEX idx_products_status ON products(status);
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_created_at ON products(created_at);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_created_at ON orders(created_at);
CREATE INDEX idx_reviews_product_id ON reviews(product_id);
CREATE INDEX idx_reviews_approved ON reviews(is_approved);
CREATE INDEX idx_activity_log_user_id ON activity_log(user_id);
CREATE INDEX idx_activity_log_created_at ON activity_log(created_at);

-- إنشاء views مفيدة للتقارير
CREATE VIEW popular_products AS
SELECT 
    p.*,
    COALESCE(AVG(r.rating), 0) as average_rating,
    COUNT(r.id) as review_count,
    COUNT(o.id) as order_count
FROM products p
LEFT JOIN reviews r ON p.id = r.product_id AND r.is_approved = TRUE
LEFT JOIN orders o ON p.id = o.product_id
GROUP BY p.id
ORDER BY p.views DESC, order_count DESC;

CREATE VIEW monthly_sales AS
SELECT 
    YEAR(created_at) as year,
    MONTH(created_at) as month,
    COUNT(*) as total_orders,
    SUM(total_amount) as total_revenue,
    AVG(total_amount) as average_order_value
FROM orders 
WHERE status = 'completed'
GROUP BY YEAR(created_at), MONTH(created_at)
ORDER BY year DESC, month DESC;

-- إنشاء stored procedures مفيدة
DELIMITER //

CREATE PROCEDURE GetProductStats(IN product_id INT)
BEGIN
    SELECT 
        p.*,
        COALESCE(AVG(r.rating), 0) as average_rating,
        COUNT(DISTINCT r.id) as review_count,
        COUNT(DISTINCT o.id) as order_count,
        SUM(CASE WHEN o.status = 'completed' THEN o.total_amount ELSE 0 END) as total_revenue
    FROM products p
    LEFT JOIN reviews r ON p.id = r.product_id AND r.is_approved = TRUE
    LEFT JOIN orders o ON p.id = o.product_id
    WHERE p.id = product_id
    GROUP BY p.id;
END //

CREATE PROCEDURE GetTopSellingProducts(IN limit_count INT)
BEGIN
    SELECT 
        p.*,
        COUNT(o.id) as order_count,
        SUM(o.total_amount) as total_revenue
    FROM products p
    LEFT JOIN orders o ON p.id = o.product_id AND o.status = 'completed'
    GROUP BY p.id
    ORDER BY order_count DESC, total_revenue DESC
    LIMIT limit_count;
END //

DELIMITER ;
