# 🚀 Complete Setup Guide for Windows

## Step-by-Step Installation

### 1️⃣ Prerequisites Installation

#### Install Node.js
1. Download from: https://nodejs.org/ (LTS version)
2. Run installer and follow instructions
3. Verify installation:
```cmd
node --version
npm --version
```

#### Install MySQL
1. Download from: https://dev.mysql.com/downloads/installer/
2. Choose "MySQL Installer for Windows"
3. During installation:
   - Choose "Developer Default"
   - Set root password (remember this!)
   - Complete installation
4. Verify installation:
```cmd
mysql --version
```

### 2️⃣ Create Project Structure

Open Command Prompt and run:

```cmd
mkdir retail-shop-system
cd retail-shop-system

mkdir backend frontend database

REM Backend structure
cd backend
mkdir config controllers middleware models routes services utils
type nul > .env
type nul > .gitignore
type nul > server.js
type nul > package.json
cd config
type nul > database.js
cd ..
cd controllers
type nul > authController.js
type nul > billController.js
cd ..
cd middleware
type nul > auth.js
type nul > rateLimiter.js
cd ..
cd models
type nul > billModel.js
cd ..
cd routes
type nul > authRoutes.js
type nul > billRoutes.js
cd ..
cd services
type nul > smsService.js
cd ..
cd utils
type nul > validator.js
cd ..
cd ..

REM Frontend structure
cd frontend
mkdir public src
cd src
mkdir components services
cd components
mkdir admin public
cd admin
type nul > AdminLogin.jsx
type nul > AdminDashboard.jsx
type nul > BillForm.jsx
cd ..
cd public
type nul > Home.jsx
type nul > ReturnPolicy.jsx
type nul > Contact.jsx
type nul > Navbar.jsx
cd ..
cd ..
type nul > Layout.jsx
cd services
type nul > api.js
cd ..
type nul > App.jsx
type nul > App.css
type nul > index.js
type nul > index.css
cd ..
cd public
type nul > index.html
cd ..
type nul > .env
type nul > .gitignore
type nul > package.json
cd ..

REM Database
cd database
type nul > schema.sql
cd ..

type nul > README.md
type nul > SETUP_GUIDE.md
```

### 3️⃣ Setup MySQL Database

1. **Start MySQL Service** (if not running):
```cmd
net start MySQL80
```

2. **Login to MySQL**:
```cmd
mysql -u root -p
```
Enter your root password

3. **Create Database**:
```sql
CREATE DATABASE IF NOT EXISTS retail_shop_db
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE retail_shop_db;

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

EXIT;
```

### 4️⃣ Backend Setup

```cmd
cd retail-shop-system\backend

REM Install dependencies
npm install express mysql2 dotenv cors express-rate-limit joi axios

REM Install dev dependencies
npm install --save-dev nodemon
```

**Configure .env file:**

Open `backend\.env` in notepad and add:
```env
PORT=5000
NODE_ENV=development

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=YOUR_MYSQL_ROOT_PASSWORD
DB_NAME=retail_shop_db
DB_PORT=3306

ADMIN_PASSWORD=admin123

SMS_API_KEY=YOUR_MSG91_API_KEY
SMS_SENDER_ID=SHOPNA
SMS_ROUTE=4

SHOP_NAME=My Retail Shop
SHOP_WEBSITE=http://localhost:3000
SHOP_PHONE=+919876543210
SHOP_ADDRESS=123 Main Street, City, State - 123456

FRONTEND_URL=http://localhost:3000
```

### 5️⃣ Frontend Setup

```cmd
cd ..\frontend

REM Create React app (if not already created)
REM npx create-react-app .

REM Install dependencies
npm install react-router-dom axios
```

**Configure .env file:**

Open `frontend\.env` in notepad and add:
```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_SHOP_NAME=My Retail Shop
REACT_APP_SHOP_PHONE=+919876543210
REACT_APP_SHOP_WHATSAPP=919876543210
REACT_APP_SHOP_ADDRESS=123 Main Street, City, State - 123456
REACT_APP_SHOP_EMAIL=info@myshop.com
REACT_APP_GOOGLE_MAPS_URL=https://maps.google.com/?q=My+Shop
```

### 6️⃣ Get SMS API Credentials

#### Option 1: MSG91
1. Visit: https://msg91.com/signup
2. Sign up for free account
3. Verify your email and phone
4. Go to Dashboard → Settings → API Keys
5. Copy your Auth Key
6. Create Sender ID (like SHOPNA)
7. Add to backend `.env`:
```env
SMS_API_KEY=your_auth_key_here
SMS_SENDER_ID=SHOPNA
```

#### Option 2: Fast2SMS
1. Visit: https://www.fast2sms.com/signup
2. Sign up and verify
3. Go to Dev API → Get API Key
4. Copy your API Key
5. Add to backend `.env`:
```env
SMS_PROVIDER=fast2sms
FAST2SMS_API_KEY=your_api_key_here
```

### 7️⃣ Copy All Code Files

Now copy all the code I provided into their respective files:

**Backend Files:**
- `backend/package.json`
- `backend/server.js`
- `backend/config/database.js`
- `backend/controllers/authController.js`
- `backend/controllers/billController.js`
- `backend/middleware/auth.js`
- `backend/middleware/rateLimiter.js`
- `backend/models/billModel.js`
- `backend/routes/authRoutes.js`
- `backend/routes/billRoutes.js`
- `backend/services/smsService.js`
- `backend/utils/validator.js`

**Frontend Files:**
- `frontend/package.json`
- `frontend/public/index.html`
- `frontend/src/index.js`
- `frontend/src/index.css`
- `frontend/src/App.jsx`
- `frontend/src/App.css`
- `frontend/src/components/Layout.jsx`
- `frontend/src/components/public/Home.jsx`
- `frontend/src/components/public/ReturnPolicy.jsx`
- `frontend/src/components/public/Contact.jsx`
- `frontend/src/components/public/Navbar.jsx`
- `frontend/src/components/admin/AdminLogin.jsx`
- `frontend/src/components/admin/AdminDashboard.jsx`
- `frontend/src/components/admin/BillForm.jsx`
- `frontend/src/services/api.js`

**Database:**
- `database/schema.sql`

### 8️⃣ Run the Application

**Terminal 1 - Backend:**
```cmd
cd retail-shop-system\backend
npm start
```

You should see:
```
🚀 Server running on port 5000
✅ Database connected successfully
```

**Terminal 2 - Frontend:**
```cmd
cd retail-shop-system\frontend
npm start
```

Browser will automatically open to `http://localhost:3000`

### 9️⃣ Test the Application

1. **Test Public Website:**
   - Visit: http://localhost:3000
   - Navigate to Home, Return Policy, Contact pages

2. **Test Admin Panel:**
   - Visit: http://localhost:3000/admin
   - Login with password from `.env` (default: `admin123`)
   - Create a test bill
   - Check if SMS is sent (if API configured)

3. **Test Database:**
```cmd
mysql -u root -p
USE retail_shop_db;
SELECT * FROM bills;
```

### 🔧 Troubleshooting

#### Issue: Port 5000 already in use
```cmd
netstat -ano | findstr :5000
taskkill /PID [process_id] /F
```

#### Issue: MySQL not starting
```cmd
net start MySQL80
```

#### Issue: Cannot connect to database
- Check MySQL is running
- Verify password in `.env`
- Check DB_NAME exists
```cmd
mysql -u root -p
SHOW DATABASES;
```

#### Issue: SMS not sending
- Verify API credentials
- Check API provider balance
- Review backend console for errors
- Test with a valid phone number

#### Issue: Module not found
```cmd
cd backend
npm install

cd ../frontend
npm install
```

### 📦 Deployment Checklist

Before deploying to production:

- [ ] Change `ADMIN_PASSWORD` to strong password
- [ ] Update `SHOP_NAME`, `SHOP_WEBSITE`, `SHOP_PHONE`
- [ ] Configure production database
- [ ] Get production SMS API credentials
- [ ] Set `NODE_ENV=production`
- [ ] Update CORS settings
- [ ] Enable HTTPS
- [ ] Set up backup for database
- [ ] Test all features

### 🎯 Quick Commands Reference

**Start Backend:**
```cmd
cd backend && npm start
```

**Start Frontend:**
```cmd
cd frontend && npm start
```

**View Database:**
```cmd
mysql -u root -p
USE retail_shop_db;
SELECT * FROM bills ORDER BY created_at DESC LIMIT 10;
```

**Clear All Bills (Testing):**
```cmd
mysql -u root -p
USE retail_shop_db;
TRUNCATE TABLE bills;
```

---

**You're all set! 🎉**

Your retail shop billing system is now ready to use!