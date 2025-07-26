-- إنشاء جدول المنتجات
CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  rank VARCHAR(50) NOT NULL,
  level INTEGER NOT NULL,
  skins_count INTEGER DEFAULT 0,
  weapons TEXT,
  features TEXT[],
  images TEXT[],
  category VARCHAR(50) DEFAULT 'general',
  status VARCHAR(20) DEFAULT 'active',
  whatsapp_number VARCHAR(20) DEFAULT '967777826667',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- إنشاء جدول المستخدمين
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(100) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(20) DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_login TIMESTAMP
);

-- إنشاء جدول الأخبار
CREATE TABLE IF NOT EXISTS news (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- إنشاء جدول الطلبات
CREATE TABLE IF NOT EXISTS orders (
  id SERIAL PRIMARY KEY,
  product_id INTEGER REFERENCES products(id),
  customer_name VARCHAR(255) NOT NULL,
  customer_phone VARCHAR(20) NOT NULL,
  customer_email VARCHAR(255),
  status VARCHAR(20) DEFAULT 'pending',
  total_amount DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- إدراج بيانات تجريبية للمنتجات
INSERT INTO products (title, description, price, rank, level, skins_count, weapons, features, images, category) VALUES
('حساب كونكر مع أسلحة ذهبية', 'حساب مميز برتبة كونكر مع مجموعة كبيرة من الأسلحة الذهبية والأزياء النادرة', 500.00, 'Conqueror', 100, 50, 'أسلحة ذهبية، M416 الجليدي، AKM الذهبي', ARRAY['رتبة كونكر', 'أسلحة ذهبية', 'أزياء نادرة', 'مستوى عالي'], ARRAY['/placeholder.svg?height=400&width=600&text=PUBG+Conqueror', '/placeholder.svg?height=400&width=600&text=Golden+Weapons', '/placeholder.svg?height=400&width=600&text=Rare+Skins'], 'conqueror'),

('حساب آيس مع أزياء نادرة', 'حساب برتبة آيس يحتوي على أزياء نادرة ومركبات مميزة', 350.00, 'Ace', 85, 30, 'أسلحة مطورة، سكارل الأزرق، M24 المطور', ARRAY['رتبة آيس', 'أزياء نادرة', 'مركبات مميزة', 'UC متوفر'], ARRAY['/placeholder.svg?height=400&width=600&text=PUBG+Ace', '/placeholder.svg?height=400&width=600&text=Rare+Outfits', '/placeholder.svg?height=400&width=600&text=Vehicles'], 'premium'),

('حساب كراون مع مركبات', 'حساب برتبة كراون مع مجموعة من المركبات النادرة والأسلحة المطورة', 250.00, 'Crown', 70, 20, 'مركبات نادرة، دراجة نارية ذهبية، سيارة مدرعة', ARRAY['رتبة كراون', 'مركبات نادرة', 'أسلحة مطورة', 'أزياء متنوعة'], ARRAY['/placeholder.svg?height=400&width=600&text=PUBG+Crown', '/placeholder.svg?height=400&width=600&text=Rare+Vehicles', '/placeholder.svg?height=400&width=600&text=Weapons'], 'various'),

('حساب ديامند مع UC', 'حساب برتبة ديامند يحتوي على UC ومجموعة من الأسلحة والأزياء', 200.00, 'Diamond', 60, 15, 'UC متوفر، أسلحة متنوعة، أزياء كلاسيكية', ARRAY['رتبة ديامند', 'UC متوفر', 'أسلحة متنوعة', 'أزياء كلاسيكية'], ARRAY['/placeholder.svg?height=400&width=600&text=PUBG+Diamond', '/placeholder.svg?height=400&width=600&text=UC+Available', '/placeholder.svg?height=400&width=600&text=Classic+Items'], 'various'),

('حساب بلاتينيوم مميز', 'حساب برتبة بلاتينيوم مع أسلحة نادرة وأزياء متميزة', 150.00, 'Platinum', 50, 10, 'أسلحة نادرة، M416 الأزرق، VSS المطور', ARRAY['رتبة بلاتينيوم', 'أسلحة نادرة', 'أزياء متميزة', 'مستوى متوسط'], ARRAY['/placeholder.svg?height=400&width=600&text=PUBG+Platinum', '/placeholder.svg?height=400&width=600&text=Rare+Weapons', '/placeholder.svg?height=400&width=600&text=Outfits'], 'various'),

('حساب جولد للمبتدئين', 'حساب مناسب للمبتدئين برتبة جولد مع الأساسيات', 100.00, 'Gold', 40, 5, 'أسلحة أساسية، M416 عادي، AKM عادي', ARRAY['رتبة جولد', 'مناسب للمبتدئين', 'أسلحة أساسية', 'سعر مناسب'], ARRAY['/placeholder.svg?height=400&width=600&text=PUBG+Gold', '/placeholder.svg?height=400&width=600&text=Basic+Weapons', '/placeholder.svg?height=400&width=600&text=Starter+Pack'], 'various');

-- إدراج بيانات تجريبية للأخبار
INSERT INTO news (title, content, is_active) VALUES
('عروض خاصة على حسابات الكونكر!', 'خصم 20% على جميع حسابات الكونكر لفترة محدودة', true),
('وصول حسابات جديدة مع أسلحة نادرة', 'تم إضافة مجموعة جديدة من الحسابات المميزة', true),
('تحديث أسعار الحسابات', 'تم تحديث أسعار بعض الحسابات لتكون أكثر تنافسية', true);

-- إدراج مستخدم إداري افتراضي
INSERT INTO users (username, email, password_hash, role) VALUES
('admin', 'admin@pubgstore.com', '$2b$10$example_hash_here', 'admin');
