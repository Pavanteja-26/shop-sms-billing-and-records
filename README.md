# 🛒 Retail Shop Billing System with SMS Integration

A complete full-stack web application for managing retail shop bills and automatically sending SMS receipts to customers.

## 📋 Features

### Public Website
- **Home Page**: Shop information and product showcase
- **Return Policy**: Clear return/exchange guidelines
- **Contact Page**: Multiple contact options with WhatsApp integration
- **Mobile Responsive**: Works perfectly on all devices

### Admin Panel
- **Secure Login**: Password-protected admin access
- **Bill Creation**: Easy-to-use form for creating bills
- **Dynamic Items**: Add/remove items dynamically
- **Auto SMS**: Automatically sends SMS to customers
- **Bill History**: View recent bills and SMS status
- **Status Tracking**: Track SMS delivery status

## 🏗️ Architecture

### Tech Stack
- **Frontend**: React 18 + React Router
- **Backend**: Node.js + Express.js
- **Database**: MySQL
- **SMS**: MSG91 / Fast2SMS integration
- **Styling**: Custom CSS with responsive design

### System Flow
```
Customer Purchase → Manual Entry → Bill Form → 
Database Storage → SMS Service → Customer Phone
```

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MySQL (v8 or higher)
- SMS API credentials (MSG91 or Fast2SMS)

### Step 1: Clone and Setup

```bash
# Navigate to project directory
cd retail-shop-system
```

### Step 2: Database Setup

```bash
# Login to MySQL
mysql -u root -p

# Run the schema file
mysql -u root -p < database/schema.sql
```

Or manually execute the SQL commands from `database/schema.sql`

### Step 3: Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create .env file
copy .env.example .env

# Edit .env with your configuration
notepad .env
```

**Required Environment Variables:**
```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=retail_shop_db
ADMIN_PASSWORD=your_secure_password

# MSG91 Configuration
SMS_API_KEY=your_msg91_api_key
SMS_SENDER_ID=SHOPNA

# Shop Details
SHOP_NAME=Your Shop Name
SHOP_WEBSITE=https://yourshop.com
SHOP_PHONE=+919876543210
SHOP_ADDRESS=Your shop address
```

### Step 4: Frontend Setup

```bash
cd ../frontend

# Install dependencies
npm install

# Create .env file
copy .env.example .env

# Edit .env
notepad .env
```

**Required Environment Variables:**
```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_SHOP_NAME=Your Shop Name
REACT_APP_SHOP_PHONE=+919876543210
REACT_APP_SHOP_WHATSAPP=919876543210
REACT_APP_SHOP_ADDRESS=Your shop address
```

### Step 5: Run the Application

**Terminal 1 (Backend):**
```bash
cd backend
npm start
# or for development with auto-reload
npm run dev
```

**Terminal 2 (Frontend):**
```bash
cd frontend
npm start
```

The application will be available at:
- **Public Website**: http://localhost:3000
- **Admin Panel**: http://localhost:3000/admin
- **API**: http://localhost:5000

## 📱 SMS Configuration

### MSG91 Setup
1. Sign up at https://msg91.com
2. Get your Auth Key from dashboard
3. Create a sender ID (e.g., SHOPNA)
4. Add credentials to backend `.env`

### Fast2SMS Setup (Alternative)
1. Sign up at https://fast2sms.com
2. Get your API key
3. Update `.env`:
```env
SMS_PROVIDER=fast2sms
FAST2SMS_API_KEY=your_key
```

## 🔐 Security Features

- Password-protected admin panel
- Input validation on all forms
- SQL injection prevention
- Rate limiting on API endpoints
- CORS configuration
- Environment variable protection

## 📊 Database Schema

### `bills` Table
- `id`: Auto-increment primary key
- `customer_name`: Customer name
- `phone`: 10-digit phone number
- `items_json`: JSON array of items
- `total_amount`: Total bill amount
- `sms_status`: SENT / FAILED / PENDING
- `created_at`: Timestamp

## 🎯 Usage Guide

### Creating a Bill

1. Login to admin panel at `/admin`
2. Enter customer details (name, phone)
3. Add items with prices
4. System auto-calculates total
5. Click "Create Bill & Send SMS"
6. Bill is saved and SMS is sent automatically

### SMS Format
```
Thank you for shopping at [Shop Name]!
Items: Mop ₹120, Rope ₹90
Total: ₹210
Defective return within 24 hrs only with bill.
Details: [Website URL]
```

## 🌐 Deployment

### Backend Deployment (e.g., Heroku, Railway)
```bash
# Ensure all environment variables are set
# Database should be accessible
# Deploy using platform-specific commands
```

### Frontend Deployment (e.g., Vercel, Netlify)
```bash
npm run build
# Deploy the build folder
# Update REACT_APP_API_URL to production backend URL
```

### Database Deployment
- Use cloud MySQL (AWS RDS, DigitalOcean, etc.)
- Update DB_HOST in backend .env
- Ensure firewall allows connections

## 🐛 Troubleshooting

### Database Connection Issues
```bash
# Check MySQL is running
net start MySQL80

# Test connection
mysql -u root -p
```

### SMS Not Sending
- Verify API credentials
- Check SMS provider balance
- Review backend logs for errors
- Ensure phone number format is correct

### Port Already in Use
```bash
# Kill process on port 5000
netstat -ano | findstr :5000
taskkill /PID [process_id] /F
```

## 📁 Project Structure

```
retail-shop-system/
├── backend/
│   ├── config/          # Database configuration
│   ├── controllers/     # Request handlers
│   ├── middleware/      # Auth & rate limiting
│   ├── models/          # Database models
│   ├── routes/          # API routes
│   ├── services/        # SMS service
│   ├── utils/           # Validation utilities
│   └── server.js        # Main server file
├── frontend/
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── services/    # API client
│   │   └── App.jsx      # Main app component
│   └── public/          # Static files
├── database/
│   └── schema.sql       # Database schema
└── README.md
```

## 🔄 API Endpoints

### Authentication
- `POST /api/auth/login` - Admin login
- `GET /api/auth/verify` - Verify auth token

### Bills
- `POST /api/bills` - Create new bill
- `GET /api/bills` - Get all bills (paginated)
- `GET /api/bills/:id` - Get specific bill
- `GET /api/bills/status/:status` - Get bills by SMS status
- `POST /api/bills/:id/retry-sms` - Retry failed SMS

## 📝 License

This project is created for a specific use case. Modify as needed.

## 💡 Support

For issues or questions:
1. Check the troubleshooting section
2. Review backend logs
3. Verify all environment variables
4. Ensure database is properly configured

## 🎓 Development Notes

- Uses localStorage for admin authentication (suitable for single admin)
- SMS sending is non-blocking (bill saves even if SMS fails)
- All prices are stored with 2 decimal precision
- Phone numbers must be 10 digits starting with 6-9
- Items are stored as JSON for flexibility

---

**Built with ❤️ for small retail businesses**