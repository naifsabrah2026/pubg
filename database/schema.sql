-- PUBG Store Database Schema

-- Create database
CREATE DATABASE IF NOT EXISTS pubg_store CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE pubg_store;

-- Products table
CREATE TABLE products (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    category ENUM('conqueror', 'ace', 'crown', 'diamond', 'platinum', 'gold', 'silver', 'bronze', 'premium', 'various') NOT NULL,
    rank VARCHAR(100),
    level INT DEFAULT 1,
    skins_count INT DEFAULT 0,
    weapons TEXT,
    features JSON,
    main_image VARCHAR(500),
    images JSON,
    details JSON,
    status ENUM('active', 'sold', 'pending', 'inactive') DEFAULT 'active',
    featured BOOLEAN DEFAULT FALSE,
    views INT DEFAULT 0,
    whatsapp_number VARCHAR(20) DEFAULT '+967777826667',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_category (category),
    INDEX idx_status (status),
    INDEX idx_featured (featured),
    INDEX idx_price (price),
    INDEX idx_created_at (created_at)
);

-- Product images table
CREATE TABLE product_images (
    id INT PRIMARY KEY AUTO_INCREMENT,
    product_id INT NOT NULL,
    image_url VARCHAR(500) NOT NULL,
    alt_text VARCHAR(255),
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    INDEX idx_product_id (product_id),
    INDEX idx_sort_order (sort_order)
);

-- Users table
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(100) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255),
    phone VARCHAR(20),
    role ENUM('admin', 'editor', 'user') DEFAULT 'user',
    status ENUM('active', 'inactive', 'suspended') DEFAULT 'active',
    last_login TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_username (username),
    INDEX idx_email (email),
    INDEX idx_role (role),
    INDEX idx_status (status)
);

-- Orders table
CREATE TABLE orders (
    id INT PRIMARY KEY AUTO_INCREMENT,
    order_number VARCHAR(50) UNIQUE NOT NULL,
    customer_name VARCHAR(255) NOT NULL,
    customer_email VARCHAR(255),
    customer_phone VARCHAR(20) NOT NULL,
    total_amount DECIMAL(10,2) NOT NULL,
    status ENUM('pending', 'confirmed', 'processing', 'completed', 'cancelled', 'refunded') DEFAULT 'pending',
    payment_method ENUM('whatsapp', 'bank_transfer', 'cash', 'online') DEFAULT 'whatsapp',
    payment_status ENUM('pending', 'paid', 'failed', 'refunded') DEFAULT 'pending',
    notes TEXT,
    admin_notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_order_number (order_number),
    INDEX idx_status (status),
    INDEX idx_payment_status (payment_status),
    INDEX idx_created_at (created_at)
);

-- Order items table
CREATE TABLE order_items (
    id INT PRIMARY KEY AUTO_INCREMENT,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    product_title VARCHAR(255) NOT NULL,
    product_price DECIMAL(10,2) NOT NULL,
    quantity INT DEFAULT 1,
    subtotal DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE RESTRICT,
    INDEX idx_order_id (order_id),
    INDEX idx_product_id (product_id)
);

-- News/Announcements table
CREATE TABLE news (
    id INT PRIMARY KEY AUTO_INCREMENT,
    text TEXT NOT NULL,
    active BOOLEAN DEFAULT TRUE,
    views INT DEFAULT 0,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_active (active),
    INDEX idx_sort_order (sort_order)
);

-- Activities/Logs table
CREATE TABLE activities (
    id INT PRIMARY KEY AUTO_INCREMENT,
    type ENUM('product_added', 'product_updated', 'product_sold', 'order_created', 'order_updated', 'user_registered', 'admin_login', 'news_added', 'news_updated') NOT NULL,
    description TEXT NOT NULL,
    icon VARCHAR(50) DEFAULT 'fas fa-info-circle',
    user_id INT NULL,
    related_id INT NULL,
    amount DECIMAL(10,2) NULL,
    ip_address VARCHAR(45),
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_type (type),
    INDEX idx_created_at (created_at),
    INDEX idx_user_id (user_id)
);

-- Settings table
CREATE TABLE settings (
    id INT PRIMARY KEY AUTO_INCREMENT,
    setting_key VARCHAR(100) UNIQUE NOT NULL,
    setting_value TEXT,
    setting_type ENUM('string', 'number', 'boolean', 'json') DEFAULT 'string',
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_setting_key (setting_key)
);

-- Coupons table
CREATE TABLE coupons (
    id INT PRIMARY KEY AUTO_INCREMENT,
    code VARCHAR(50) UNIQUE NOT NULL,
    type ENUM('percentage', 'fixed') NOT NULL,
    value DECIMAL(10,2) NOT NULL,
    minimum_amount DECIMAL(10,2) DEFAULT 0,
    usage_limit INT DEFAULT NULL,
    used_count INT DEFAULT 0,
    active BOOLEAN DEFAULT TRUE,
    expires_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_code (code),
    INDEX idx_active (active),
    INDEX idx_expires_at (expires_at)
);

-- Reviews table
CREATE TABLE reviews (
    id INT PRIMARY KEY AUTO_INCREMENT,
    product_id INT NOT NULL,
    customer_name VARCHAR(255) NOT NULL,
    customer_email VARCHAR(255),
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    INDEX idx_product_id (product_id),
    INDEX idx_status (status),
    INDEX idx_rating (rating)
);

-- Page views table for analytics
CREATE TABLE page_views (
    id INT PRIMARY KEY AUTO_INCREMENT,
    page_url VARCHAR(500) NOT NULL,
    page_title VARCHAR(255),
    user_ip VARCHAR(45),
    user_agent TEXT,
    referrer VARCHAR(500),
    session_id VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    INDEX idx_page_url (page_url),
    INDEX idx_created_at (created_at),
    INDEX idx_session_id (session_id)
);

-- Create views for reporting
CREATE VIEW product_stats AS
SELECT 
    p.id,
    p.title,
    p.category,
    p.price,
    p.views,
    p.status,
    COUNT(oi.id) as sales_count,
    SUM(oi.subtotal) as total_revenue,
    AVG(r.rating) as avg_rating,
    COUNT(r.id) as review_count
FROM products p
LEFT JOIN order_items oi ON p.id = oi.product_id
LEFT JOIN orders o ON oi.order_id = o.id AND o.status = 'completed'
LEFT JOIN reviews r ON p.id = r.product_id AND r.status = 'approved'
GROUP BY p.id;

CREATE VIEW monthly_sales AS
SELECT 
    DATE_FORMAT(created_at, '%Y-%m') as month,
    COUNT(*) as order_count,
    SUM(total_amount) as total_amount,
    AVG(total_amount) as avg_order_value
FROM orders 
WHERE status = 'completed'
GROUP BY DATE_FORMAT(created_at, '%Y-%m')
ORDER BY month DESC;

CREATE VIEW daily_stats AS
SELECT 
    DATE(created_at) as date,
    COUNT(*) as total_orders,
    SUM(CASE WHEN status = 'completed' THEN total_amount ELSE 0 END) as revenue,
    COUNT(CASE WHEN status = 'completed' THEN 1 END) as completed_orders,
    COUNT(CASE WHEN status = 'pending' THEN 1 END) as pending_orders
FROM orders
WHERE created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)
GROUP BY DATE(created_at)
ORDER BY date DESC;
