-- Sample Data for PUBG Store

USE pubg_store;

-- Insert sample products
INSERT INTO products (title, description, price, category, rank, level, skins_count, weapons, features, main_image, images, details, featured) VALUES
('حساب كونكر مميز - سيزن 25', 'حساب كونكر مع أسلحة ذهبية نادرة وأزياء حصرية', 450.00, 'conqueror', 'كونكر', 85, 50, 'أسلحة ذهبية، M416 الجليدي، AKM التنين', 
 JSON_ARRAY('رتبة كونكر', 'أسلحة ذهبية', 'أزياء نادرة', 'UC متوفر', 'حساب آمن'), 
 'public/placeholder.jpg', 
 JSON_ARRAY('public/placeholder.jpg', 'public/placeholder.jpg', 'public/placeholder.jpg'),
 JSON_OBJECT('kd', '3.2', 'matches', '1250', 'wins', '320', 'uc', '15000', 'tier_points', '4500'),
 TRUE),

('حساب آيس مع M416 الجليدي', 'حساب آيس مستوى عالي مع أسلحة مميزة', 280.00, 'ace', 'آيس', 78, 35, 'M416 الجليدي، AKM الذهبي، AWM الأسود', 
 JSON_ARRAY('رتبة آيس', 'M416 الجليدي', 'أزياء متنوعة', 'مستوى عالي'), 
 'public/placeholder.jpg', 
 JSON_ARRAY('public/placeholder.jpg', 'public/placeholder.jpg'),
 JSON_OBJECT('kd', '2.8', 'matches', '980', 'wins', '245', 'uc', '8500', 'tier_points', '3200'),
 TRUE),

('حساب كراون مع أزياء حصرية', 'حساب كراون بأزياء نادرة ومجموعة أسلحة متميزة', 180.00, 'crown', 'كراون', 65, 28, 'SCAR-L الذهبي، Vector الأزرق، Kar98k المطور', 
 JSON_ARRAY('رتبة كراون', 'أزياء حصرية', 'أسلحة متطورة', 'حساب نظيف'), 
 'public/placeholder.jpg', 
 JSON_ARRAY('public/placeholder.jpg', 'public/placeholder.jpg'),
 JSON_OBJECT('kd', '2.5', 'matches', '750', 'wins', '180', 'uc', '5500', 'tier_points', '2800'),
 FALSE),

('حساب دايموند مع UC كثير', 'حساب دايموند مع رصيد UC عالي وأسلحة جيدة', 120.00, 'diamond', 'دايموند', 52, 22, 'M416 المطور، AKM الأحمر، UMP45 الذهبي', 
 JSON_ARRAY('رتبة دايموند', 'UC عالي', 'أسلحة جيدة', 'مستوى متوسط'), 
 'public/placeholder.jpg', 
 JSON_ARRAY('public/placeholder.jpg', 'public/placeholder.jpg'),
 JSON_OBJECT('kd', '2.1', 'matches', '650', 'wins', '140', 'uc', '12000', 'tier_points', '2200'),
 FALSE),

('حساب بلاتينيوم للمبتدئين', 'حساب بلاتينيوم مناسب للمبتدئين بسعر مناسب', 80.00, 'platinum', 'بلاتينيوم', 38, 15, 'M416 العادي، AKM الأزرق، Vector الأحمر', 
 JSON_ARRAY('رتبة بلاتينيوم', 'مناسب للمبتدئين', 'سعر مناسب', 'حساب نظيف'), 
 'public/placeholder.jpg', 
 JSON_ARRAY('public/placeholder.jpg'),
 JSON_OBJECT('kd', '1.8', 'matches', '450', 'wins', '95', 'uc', '3500', 'tier_points', '1800'),
 FALSE),

('حساب ذهبي مع أزياء', 'حساب ذهبي بأزياء متنوعة وأسلحة أساسية', 60.00, 'gold', 'ذهبي', 28, 12, 'M416 الأساسي، AKM العادي، SCAR-L الأزرق', 
 JSON_ARRAY('رتبة ذهبي', 'أزياء متنوعة', 'أسلحة أساسية', 'للمبتدئين'), 
 'public/placeholder.jpg', 
 JSON_ARRAY('public/placeholder.jpg'),
 JSON_OBJECT('kd', '1.5', 'matches', '320', 'wins', '65', 'uc', '2000', 'tier_points', '1200'),
 FALSE),

('حساب فضي اقتصادي', 'حساب فضي بسعر اقتصادي للبداية', 40.00, 'silver', 'فضي', 22, 8, 'M416 العادي، AKM الأساسي', 
 JSON_ARRAY('رتبة فضي', 'سعر اقتصادي', 'للمبتدئين', 'حساب آمن'), 
 'public/placeholder.jpg', 
 JSON_ARRAY('public/placeholder.jpg'),
 JSON_OBJECT('kd', '1.2', 'matches', '200', 'wins', '35', 'uc', '1000', 'tier_points', '800'),
 FALSE),

('حساب برونزي للبداية', 'حساب برونزي مثالي لبداية اللعب', 25.00, 'bronze', 'برونزي', 15, 5, 'أسلحة أساسية', 
 JSON_ARRAY('رتبة برونزي', 'للمبتدئين', 'سعر منخفض', 'بداية جيدة'), 
 'public/placeholder.jpg', 
 JSON_ARRAY('public/placeholder.jpg'),
 JSON_OBJECT('kd', '1.0', 'matches', '100', 'wins', '15', 'uc', '500', 'tier_points', '400'),
 FALSE),

('حساب مميز VIP', 'حساب VIP مع جميع الأزياء والأسلحة النادرة', 650.00, 'premium', 'كونكر', 95, 75, 'جميع الأسلحة الذهبية والنادرة', 
 JSON_ARRAY('حساب VIP', 'جميع الأزياء', 'أسلحة نادرة', 'مستوى عالي جداً'), 
 'public/placeholder.jpg', 
 JSON_ARRAY('public/placeholder.jpg', 'public/placeholder.jpg', 'public/placeholder.jpg', 'public/placeholder.jpg'),
 JSON_OBJECT('kd', '4.5', 'matches', '2000', 'wins', '650', 'uc', '25000', 'tier_points', '6000'),
 TRUE),

('حساب متنوع شامل', 'حساب متنوع يحتوي على مجموعة شاملة من الأسلحة والأزياء', 150.00, 'various', 'دايموند', 45, 30, 'مجموعة متنوعة من الأسلحة', 
 JSON_ARRAY('حساب متنوع', 'أسلحة متنوعة', 'أزياء مختلفة', 'قيمة جيدة'), 
 'public/placeholder.jpg', 
 JSON_ARRAY('public/placeholder.jpg', 'public/placeholder.jpg'),
 JSON_OBJECT('kd', '2.3', 'matches', '600', 'wins', '150', 'uc', '7000', 'tier_points', '2500'),
 FALSE);

-- Insert sample users
INSERT INTO users (username, email, password_hash, full_name, phone, role, status) VALUES
('admin', 'admin@pubgstore.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'مدير النظام', '+967777826667', 'admin', 'active'),
('editor1', 'editor@pubgstore.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'محرر المحتوى', '+967777826668', 'editor', 'active'),
('user1', 'user1@example.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'أحمد محمد', '+967777826669', 'user', 'active'),
('user2', 'user2@example.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'فاطمة علي', '+967777826670', 'user', 'active');

-- Insert sample orders
INSERT INTO orders (order_number, customer_name, customer_email, customer_phone, total_amount, status, payment_method, payment_status, notes) VALUES
('ORD-2024-001', 'خالد أحمد', 'khalid@example.com', '+967777111111', 450.00, 'completed', 'whatsapp', 'paid', 'طلب حساب كونكر مميز'),
('ORD-2024-002', 'سارة محمد', 'sara@example.com', '+967777111112', 280.00, 'completed', 'bank_transfer', 'paid', 'طلب حساب آيس'),
('ORD-2024-003', 'عبدالله سالم', 'abdullah@example.com', '+967777111113', 180.00, 'processing', 'whatsapp', 'paid', 'طلب حساب كراون'),
('ORD-2024-004', 'نورا حسن', 'nora@example.com', '+967777111114', 120.00, 'pending', 'whatsapp', 'pending', 'طلب حساب دايموند'),
('ORD-2024-005', 'محمد علي', 'mohamed@example.com', '+967777111115', 650.00, 'completed', 'bank_transfer', 'paid', 'طلب حساب VIP');

-- Insert order items
INSERT INTO order_items (order_id, product_id, product_title, product_price, quantity, subtotal) VALUES
(1, 1, 'حساب كونكر مميز - سيزن 25', 450.00, 1, 450.00),
(2, 2, 'حساب آيس مع M416 الجليدي', 280.00, 1, 280.00),
(3, 3, 'حساب كراون مع أزياء حصرية', 180.00, 1, 180.00),
(4, 4, 'حساب دايموند مع UC كثير', 120.00, 1, 120.00),
(5, 9, 'حساب مميز VIP', 650.00, 1, 650.00);

-- Insert sample news
INSERT INTO news (text, active, views, sort_order) VALUES
('🔥 عروض خاصة على حسابات الكونكر - خصم 20%', TRUE, 1250, 1),
('⭐ وصلت حسابات جديدة مع أسلحة ذهبية نادرة', TRUE, 890, 2),
('🎮 متوفر الآن: حسابات مع رتبة الكونكر للموسم الحالي', TRUE, 567, 3),
('💎 حسابات VIP مع جميع الأزياء المميزة', TRUE, 445, 4),
('🏆 ضمان 100% على جميع الحسابات المباعة', TRUE, 678, 5),
('🚀 تسليم فوري لجميع الحسابات بعد تأكيد الدفع', TRUE, 334, 6),
('🛡️ دعم فني متاح 24/7 لحل أي مشكلة', TRUE, 556, 7);

-- Insert sample activities
INSERT INTO activities (type, description, icon, user_id, related_id, amount, ip_address) VALUES
('product_sold', 'تم بيع حساب كونكر مميز', 'fas fa-shopping-cart', 1, 1, 450.00, '192.168.1.1'),
('order_created', 'تم إنشاء طلب جديد', 'fas fa-plus-circle', NULL, 1, 450.00, '192.168.1.2'),
('product_added', 'تم إضافة منتج جديد', 'fas fa-box', 1, 2, NULL, '192.168.1.1'),
('user_registered', 'مستخدم جديد سجل في الموقع', 'fas fa-user-plus', 3, NULL, NULL, '192.168.1.3'),
('admin_login', 'تسجيل دخول المدير', 'fas fa-sign-in-alt', 1, NULL, NULL, '192.168.1.1'),
('product_sold', 'تم بيع حساب آيس مع M416', 'fas fa-shopping-cart', 1, 2, 280.00, '192.168.1.4'),
('news_added', 'تم إضافة خبر جديد', 'fas fa-newspaper', 1, 1, NULL, '192.168.1.1'),
('order_updated', 'تم تحديث حالة الطلب', 'fas fa-edit', 1, 3, NULL, '192.168.1.1');

-- Insert sample settings
INSERT INTO settings (setting_key, setting_value, setting_type, description) VALUES
('site_name', 'متجر حسابات PUBG Mobile', 'string', 'اسم الموقع'),
('site_description', 'أفضل متجر لبيع حسابات PUBG Mobile المميزة', 'string', 'وصف الموقع'),
('whatsapp_number', '+967777826667', 'string', 'رقم الواتساب'),
('currency', 'SAR', 'string', 'العملة المستخدمة'),
('tax_rate', '0.15', 'number', 'معدل الضريبة'),
('free_shipping_threshold', '200', 'number', 'الحد الأدنى للشحن المجاني'),
('maintenance_mode', 'false', 'boolean', 'وضع الصيانة'),
('max_upload_size', '5', 'number', 'الحد الأقصى لحجم الملف بالميجابايت'),
('email_notifications', 'true', 'boolean', 'تفعيل إشعارات البريد الإلكتروني'),
('social_links', '{"facebook": "", "twitter": "", "instagram": "", "telegram": ""}', 'json', 'روابط وسائل التواصل الاجتماعي');

-- Insert sample coupons
INSERT INTO coupons (code, type, value, minimum_amount, usage_limit, active, expires_at) VALUES
('WELCOME20', 'percentage', 20.00, 100.00, 100, TRUE, DATE_ADD(NOW(), INTERVAL 30 DAY)),
('NEWUSER', 'fixed', 25.00, 150.00, 50, TRUE, DATE_ADD(NOW(), INTERVAL 60 DAY)),
('VIP50', 'fixed', 50.00, 500.00, 20, TRUE, DATE_ADD(NOW(), INTERVAL 90 DAY)),
('SUMMER15', 'percentage', 15.00, 80.00, 200, TRUE, DATE_ADD(NOW(), INTERVAL 45 DAY));

-- Insert sample reviews
INSERT INTO reviews (product_id, customer_name, customer_email, rating, comment, status) VALUES
(1, 'خالد أحمد', 'khalid@example.com', 5, 'حساب ممتاز وتسليم سريع، أنصح بالتعامل معهم', 'approved'),
(1, 'سارة محمد', 'sara@example.com', 5, 'حساب كما هو موصوف تماماً، شكراً لكم', 'approved'),
(2, 'عبدالله سالم', 'abdullah@example.com', 4, 'حساب جيد جداً، M416 الجليدي رائع', 'approved'),
(3, 'نورا حسن', 'nora@example.com', 5, 'أزياء جميلة وحساب نظيف، راضية جداً', 'approved'),
(9, 'محمد علي', 'mohamed@example.com', 5, 'حساب VIP استثنائي، يستحق السعر', 'approved'),
(4, 'أحمد حسن', 'ahmed@example.com', 4, 'UC كثير كما وعدتم، شكراً', 'approved');

-- Insert sample page views for analytics
INSERT INTO page_views (page_url, page_title, user_ip, referrer, session_id) VALUES
('/', 'الصفحة الرئيسية', '192.168.1.100', 'https://google.com', 'sess_001'),
('/accounts.php', 'حسابات PUBG', '192.168.1.101', '/', 'sess_002'),
('/product.php?id=1', 'حساب كونكر مميز', '192.168.1.102', '/accounts.php', 'sess_003'),
('/terms.php', 'شروط المتجر', '192.168.1.103', '/', 'sess_004'),
('/admin/', 'لوحة الإدارة', '192.168.1.1', 'direct', 'sess_admin_001');

-- Update product views
UPDATE products SET views = FLOOR(RAND() * 500) + 50;

-- Update news views
UPDATE news SET views = FLOOR(RAND() * 1000) + 100;
