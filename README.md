# HireMe - Recruitment Platform Prototype

A modern, full-stack recruitment platform built with React and Node.js that provides user authentication and profile management.

![HireMe Platform](https://img.shields.io/badge/Platform-Recruitment-blue) ![React](https://img.shields.io/badge/React-18.2.0-61DAFB) ![Node.js](https://img.shields.io/badge/Node.js-Express-green) ![MongoDB](https://img.shields.io/badge/Database-MongoDB-green) ![JWT](https://img.shields.io/badge/Auth-JWT-orange)

## 🌟 Features

### 🔐 Authentication & Security
- **JWT-based authentication** with secure token management
- **Role-based access control** (Job Seeker/Recruiter)
- **Password encryption** using bcrypt
- **Protected routes** and session management

### 👤 User Profile Management
- **Complete profile system** with progress tracking
- **Image upload** with Cloudinary integration
- **Real-time validation** and error handling
- **Profile completion scoring** with visual progress bar

### 📱 Responsive Design
- **Mobile-first approach** with seamless cross-device experience
- **Interactive sidebar** with smooth animations
- **Touch-friendly interface** optimized for mobile devices

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- Cloudinary account (for image uploads)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/HireMe.git
cd HireMe
```

2. **Backend Setup**
```bash
cd server
npm install
```

3. **Environment Configuration**
Create `.env` file in server directory:
```env
MONGODB_URI=mongodb://localhost:27017/hireme
JWT_SECRET=your_jwt_secret_here
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
PORT=5000
```

4. **Frontend Setup**
```bash
cd ../client
npm install
```

5. **Frontend Environment**
Create `.env` file in client directory:
```env
VITE_API_URL=http://localhost:5000
```

6. **Run the Application**
```bash
# Start backend (from server directory)
npm run dev

# Start frontend (from client directory)
npm run dev
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

## 📁 Project Structure

```
HireMe/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── api/           # API integration
│   │   └── assets/        # Static files
│   └── package.json
├── server/                # Express.js backend
│   ├── models/            # MongoDB models
│   ├── routes/            # API routes
│   ├── middleware/        # Authentication middleware
│   └── config/           # Database & Cloudinary config
└── README.md
```

## 🎯 Core Functionality

### User Authentication
- Registration with email verification
- Secure login with JWT tokens
- Password reset functionality
- Session persistence

### Profile Management
- Complete user profile setup
- Profile image upload with Cloudinary
- Real-time profile completion tracking
- Editable personal and address information

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile

### Profile Management
- `PUT /api/auth/profile` - Update profile information
- `PUT /api/auth/profile/image` - Upload profile image
- `DELETE /api/auth/profile/image` - Remove profile image

## 🛡 Security Features

- **JWT Token Validation** for all protected routes
- **Password Hashing** with bcrypt
- **Input Sanitization** to prevent XSS attacks
- **File Type Validation** for image uploads
- **CORS Configuration** for secure cross-origin requests

## 📱 Responsive Design

The application features a fully responsive design that works seamlessly across all devices:

- **Mobile**: Collapsible sidebar with hamburger menu
- **Tablet**: Optimized layout with adaptive spacing
- **Desktop**: Full-featured interface with sidebar navigation

---

## 📸 Screenshots

![Landing Page 1](https://raw.githubusercontent.com/adityarajsrv/HireMe/main/client/src/assets/LandingPage1.png)
![Landing Page 2](https://raw.githubusercontent.com/adityarajsrv/HireMe/main/client/src/assets/LandingPage2.png)
![Landing Page 3](https://raw.githubusercontent.com/adityarajsrv/HireMe/main/client/src/assets/LandingPage3.png)
![Landing Page 4](https://raw.githubusercontent.com/adityarajsrv/HireMe/main/client/src/assets/LandingPage4.png)
![Sign Up Page](https://raw.githubusercontent.com/adityarajsrv/HireMe/main/client/src/assets/SignUpPage.png)
![Login Page](https://raw.githubusercontent.com/adityarajsrv/HireMe/main/client/src/assets/LoginPage.png)
![Profile Page](https://raw.githubusercontent.com/adityarajsrv/HireMe/main/client/src/assets/ProfilePage.png)


## ⭐ Support the Project

If you find this project helpful or interesting, please consider giving it a star on GitHub! Your support helps me continue to improve and maintain the project.

---
