-- Create database
CREATE DATABASE IF NOT EXISTS baofei_coffee;
USE baofei_coffee;

-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('customer', 'employee', 'admin') DEFAULT 'customer',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create products table
CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    category ENUM('coffee', 'tea', 'bakery', 'lunch', 'other') NOT NULL,
    image_url VARCHAR(255),
    is_popular BOOLEAN DEFAULT FALSE,
    is_available BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT,
    total DECIMAL(10, 2) NOT NULL,
    status ENUM('pending', 'completed', 'cancelled') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES users(id) ON DELETE SET NULL
);

-- Create order_items table
CREATE TABLE IF NOT EXISTS order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    options JSON,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE RESTRICT
);

-- Create inventory table
CREATE TABLE IF NOT EXISTS inventory (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT,
    stock DECIMAL(10, 2) NOT NULL,
    unit VARCHAR(20) NOT NULL,
    unit_price DECIMAL(10, 2) NOT NULL,
    reorder_level DECIMAL(10, 2) NOT NULL,
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE SET NULL
);

-- Create settings table
CREATE TABLE IF NOT EXISTS settings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    store_name VARCHAR(100) DEFAULT 'BAOFEI COFFEE SHOP',
    address VARCHAR(255),
    phone VARCHAR(20),
    email VARCHAR(100),
    tax_rate DECIMAL(5, 2) DEFAULT 1.00,
    accept_cash BOOLEAN DEFAULT TRUE,
    accept_credit BOOLEAN DEFAULT TRUE,
    accept_debit BOOLEAN DEFAULT TRUE,
    accept_mobile BOOLEAN DEFAULT FALSE,
    show_logo BOOLEAN DEFAULT TRUE,
    print_receipt BOOLEAN DEFAULT TRUE,
    email_receipt BOOLEAN DEFAULT FALSE,
    include_discounts BOOLEAN DEFAULT TRUE,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert sample data
-- Sample admin user (password: admin123)
INSERT INTO users (name, email, password, role) VALUES
('Admin User', 'admin@baofeicoffee.com', '$2y$10$0x6YV8UxTzSyW9HGV.VHquH0TDTjS1RPz3n/4Ow0F1iZqg.w8XPfG', 'admin');

-- Sample products
INSERT INTO products (name, description, price, category, image_url, is_popular) VALUES
('Espresso', 'Rich and intense single shot of espresso', 2.50, 'coffee', 'https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg', 1),
('Cappuccino', 'Classic Italian coffee with equal parts espresso, steamed milk, and milk foam', 4.50, 'coffee', 'https://images.pexels.com/photos/350478/pexels-photo-350478.jpeg', 1),
('Latte', 'Smooth and creamy espresso with steamed milk', 4.75, 'coffee', 'https://images.pexels.com/photos/2396220/pexels-photo-2396220.jpeg', 1),
('Cold Brew', 'Smooth, full-bodied coffee brewed with cold water for 12 hours', 5.00, 'coffee', 'https://images.pexels.com/photos/2074122/pexels-photo-2074122.jpeg', 0),
('Mocha', 'Espresso with steamed milk and chocolate syrup', 5.25, 'coffee', 'https://images.pexels.com/photos/6802983/pexels-photo-6802983.jpeg', 0),
('Green Tea', 'Delicate and fresh traditional green tea', 3.75, 'tea', 'https://images.pexels.com/photos/1417945/pexels-photo-1417945.jpeg', 0),
('Earl Grey', 'Black tea infused with bergamot oil', 3.50, 'tea', 'https://images.pexels.com/photos/1793035/pexels-photo-1793035.jpeg', 0),
('Croissant', 'Flaky, buttery French pastry', 3.25, 'bakery', 'https://images.pexels.com/photos/2135/food-france-morning-breakfast.jpg', 1),
('Cheese Platter', 'Selection of artisanal cheeses with crackers and fruits', 12.50, 'lunch', 'https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg', 0);

-- Sample inventory
INSERT INTO inventory (product_id, stock, unit, unit_price, reorder_level) VALUES
(1, 25, 'kg', 15.50, 10),  -- Espresso beans
(2, 15, 'kg', 12.75, 8),   -- Cappuccino ingredients
(3, 45, 'L', 2.25, 20),    -- Latte milk
(8, 30, 'pcs', 1.25, 15);  -- Croissants

-- Default settings
INSERT INTO settings (store_name, address, phone, email) VALUES
('BAOFEI COFFEE SHOP', '123 Coffee Street, Brew City', '(555) 123-4567', 'info@baofeicoffee.com');