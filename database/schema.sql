-- =====================================================
-- Retail Shop Database Schema
-- =====================================================

-- Create database
CREATE DATABASE IF NOT EXISTS christ_blessed_brooms_and_mops_db
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE christ_blessed_brooms_and_mops_db;

-- =====================================================
-- Bills Table
-- =====================================================
CREATE TABLE IF NOT EXISTS bills (
    id INT AUTO_INCREMENT PRIMARY KEY,
    customer_name VARCHAR(255) NOT NULL,
    phone VARCHAR(15) NOT NULL,
    items_json JSON NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL,
    sms_status ENUM('SENT', 'FAILED', 'PENDING') DEFAULT 'PENDING',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_phone (phone),
    INDEX idx_created_at (created_at),
    INDEX idx_sms_status (sms_status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- Admin Users Table (Optional - for future expansion)
-- =====================================================
CREATE TABLE IF NOT EXISTS admin_users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- Sample Data (Optional)
-- =====================================================
INSERT INTO bills (customer_name, phone, items_json, total_amount, sms_status)
VALUES (
    'Test Customer',
    '9876543210',
    JSON_ARRAY(
        JSON_OBJECT('name', 'Mop', 'price', 120),
        JSON_OBJECT('name', 'Rope', 'price', 90)
    ),
    210.00,
    'SENT'
);
-- =====================================================
-- Useful Queries for Reference
-- =====================================================

-- View all bills
-- SELECT id, customer_name, phone, total_amount, sms_status, created_at FROM bills ORDER BY created_at DESC;

-- View bills with failed SMS
-- SELECT * FROM bills WHERE sms_status = 'FAILED';

-- Get bill details with items
-- SELECT 
--     id,
--     customer_name,
--     phone,
--     JSON_PRETTY(items_json) as items,
--     total_amount,
--     sms_status,
--     created_at
-- FROM bills
-- WHERE id = 1;

-- Count bills by status
-- SELECT sms_status, COUNT(*) as count FROM bills GROUP BY sms_status;