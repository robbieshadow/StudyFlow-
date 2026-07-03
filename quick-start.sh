#!/bin/bash

# StudyFlow - Quick Start Script
# این اسکریپت تمام مراحل نصب را خودکار می‌کند

echo "================================"
echo "🚀 StudyFlow - شروع سریع"
echo "================================"
echo ""

# بررسی Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js نصب نشده است"
    echo "برای دانلود: https://nodejs.org"
    exit 1
fi

echo "✅ Node.js نصب‌شده: $(node --version)"
echo ""

# 1. نصب وابستگی‌ها
echo "📦 در حال نصب وابستگی‌ها..."
npm install
if [ $? -ne 0 ]; then
    echo "❌ خطا در نصب وابستگی‌ها"
    exit 1
fi
echo "✅ وابستگی‌ها نصب شدند"
echo ""

# 2. تنظیم .env
if [ ! -f ".env" ]; then
    echo "⚙️  در حال ایجاد فایل .env..."
    cp .env.example .env
    
    # خواسته‌ی کاربر برای API Key
    echo ""
    echo "🔑 کلید Anthropic API خود را وارد کنید:"
    echo "   (برای دریافت: https://console.anthropic.com)"
    read -p "API Key: " api_key
    
    if [ ! -z "$api_key" ]; then
        sed -i "s/your_api_key_here/$api_key/" .env
    fi
    
    echo "✅ فایل .env آماده‌شده"
fi
echo ""

# 3. بررسی MongoDB
echo "🗄️  بررسی MongoDB..."
if command -v mongod &> /dev/null; then
    echo "✅ MongoDB نصب‌شده است"
else
    echo "⚠️  MongoDB نصب نشده است"
    echo "برای نصب MongoDB:"
    echo "  macOS: brew install mongodb-community"
    echo "  یا استفاده کنید: MongoDB Atlas (https://www.mongodb.com/cloud/atlas)"
fi
echo ""

# 4. شروع سرور
echo "🎯 شروع سرور..."
echo ""
echo "================================"
echo "✨ StudyFlow آماده است!"
echo "================================"
echo ""
echo "📝 برای فرانت‌اند:"
echo "   npx create-react-app studyflow-frontend"
echo "   cd studyflow-frontend"
echo "   cp ../study-app.jsx src/App.jsx"
echo "   npm start"
echo ""
echo "🔗 سرور: http://localhost:5000"
echo "📚 فرانت‌اند: http://localhost:3000"
echo ""
echo "برای متوقف کردن: Ctrl+C"
echo ""

npm start
