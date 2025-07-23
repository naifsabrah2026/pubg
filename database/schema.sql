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
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- جدول المستخدمين
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('admin', 'user') DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP NULL
);

-- جدول الأخبار
CREATE TABLE news (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- جدول الطلبات
CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT,
    customer_name VARCHAR(255) NOT NULL,
    customer_phone VARCHAR(20) NOT NULL,
    customer_email VARCHAR(255),
    status ENUM('pending', 'confirmed', 'completed', 'cancelled') DEFAULT 'pending',
    total_amount DECIMAL(10,2) NOT NULL,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE SET NULL
);

-- جدول الإحصائيات
CREATE TABLE statistics (
    id INT AUTO_INCREMENT PRIMARY KEY,
    total_products INT DEFAULT 0,
    total_orders INT DEFAULT 0,
    total_sales DECIMAL(12,2) DEFAULT 0,
    total_users INT DEFAULT 0,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- إدراج بيانات تجريبية للمنتجات
INSERT INTO products (title, description, price, rank_name, level, skins_count, weapons, features, images, category) VALUES
('حساب كونكر مع أسلحة ذهبية', 'حساب مميز برتبة كونكر مع مجموعة كبيرة من الأسلحة الذهبية والأزياء النادرة. يحتوي على أكثر من 50 سكن نادر وأسلحة مطورة بالكامل.', 500.00, 'Conqueror', 100, 50, 'أسلحة ذهبية، M416 الجليدي، AKM الذهبي، AWM المطور، Groza النادر', '["رتبة كونكر", "أسلحة ذهبية", "أزياء نادرة", "مستوى عالي", "UC متوفر"]', '["assets/images/conqueror1.jpg", "assets/images/conqueror2.jpg", "assets/images/conqueror3.jpg"]', 'conqueror'),

('حساب آيس مع أزياء نادرة', 'حساب برتبة آيس يحتوي على أزياء نادرة ومركبات مميزة. مثالي للاعبين المحترفين الذين يريدون التميز في اللعبة.', 350.00, 'Ace', 85, 30, 'أسلحة مطورة، سكارل الأزرق، M24 المطور، Vector الذهبي', '["رتبة آيس", "أزياء نادرة", "مركبات مميزة", "UC متوفر", "شخصيات مميزة"]', '["assets/images/ace1.jpg", "assets/images/ace2.jpg", "assets/images/ace3.jpg"]', 'premium'),

('حساب كراون مع مركبات', 'حساب برتبة كراون مع مجموعة من المركبات النادرة والأسلحة المطورة. يحتوي على دراجة نارية ذهبية وسيارة مدرعة.', 250.00, 'Crown', 70, 20, 'مركبات نادرة، دراجة نارية ذهبية، سيارة مدرعة، أسلحة متنوعة', '["رتبة كراون", "مركبات نادرة", "أسلحة مطورة", "أزياء متنوعة"]', '["assets/images/crown1.jpg", "assets/images/crown2.jpg", "assets/images/crown3.jpg"]', 'various'),

('حساب ديامند مع UC', 'حساب برتبة ديامند يحتوي على UC ومجموعة من الأسلحة والأزياء. مناسب للاعبين الذين يريدون حساب متوسط بسعر معقول.', 200.00, 'Diamond', 60, 15, 'UC متوفر، أسلحة متنوعة، أزياء كلاسيكية، شخصيات أساسية', '["رتبة ديامند", "UC متوفر", "أسلحة متنوعة", "أزياء كلاسيكية"]', '["assets/images/diamond1.jpg", "assets/images/diamond2.jpg", "assets/images/diamond3.jpg"]', 'various'),

('حساب بلاتينيوم مميز', 'حساب برتبة بلاتينيوم مع أسلحة نادرة وأزياء متميزة. خيار ممتاز للاعبين المتوسطين.', 150.00, 'Platinum', 50, 10, 'أسلحة نادرة، M416 الأزرق، VSS المطور، UMP45 الذهبي', '["رتبة بلاتينيوم", "أسلحة نادرة", "أزياء متميزة", "مستوى متوسط"]', '["assets/images/platinum1.jpg", "assets/images/platinum2.jpg", "assets/images/platinum3.jpg"]', 'various'),

('حساب جولد للمبتدئين', 'حساب مناسب للمبتدئين برتبة جولد مع الأساسيات. سعر مناسب وجودة مضمونة.', 100.00, 'Gold', 40, 5, 'أسلحة أساسية، M416 عادي، AKM عادي، Kar98k أساسي', '["رتبة جولد", "مناسب للمبتدئين", "أسلحة أساسية", "سعر مناسب"]', '["assets/images/gold1.jpg", "assets/images/gold2.jpg", "assets/images/gold3.jpg"]', 'various');

-- إدراج بيانات تجريبية للأخبار
INSERT INTO news (title, content, is_active) VALUES
('🔥 عروض خاصة على حسابات الكونكر!', 'خصم 20% على جميع حسابات الكونكر لفترة محدودة. استغل الفرصة الآن!', TRUE),
('⭐ وصول حسابات جديدة مع أسلحة نادرة', 'تم إضافة مجموعة جديدة من الحسابات المميزة مع أسلحة ذهبية نادرة', TRUE),
('💰 تحديث أسعار الحسابات', 'تم تحديث أسعار بعض الحسابات لتكون أكثر تنافسية في السوق', TRUE),
('🎮 نصائح للعب PUBG Mobile', 'تعلم أفضل الاستراتيجيات للفوز في PUBG Mobile من خبرائنا', TRUE);

-- إدراج مستخدم إداري افتراضي
INSERT INTO users (username, email, password_hash, role) VALUES
('admin', 'admin@pubgstore.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin');

-- إدراج إحصائيات أولية
INSERT INTO statistics (total_products, total_orders, total_sales, total_users) VALUES
(6, 0, 0.00, 1);
