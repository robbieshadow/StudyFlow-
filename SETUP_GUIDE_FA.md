# 📚 راهنمای نصب و راه‌اندازی StudyFlow

یک سیستم یادگیری جامع و رایگان با رابط کاربری زیبا و بک‌اند قوی

---

## 🎯 ویژگی‌ها

✅ **رابط کاربری جذاب** - طراحی مدرن با gradients و انیمیشن‌ها
✅ **منو و ناویگیشن** - راحت و سریع
✅ **لودینگ states** - تجربه کاربری روان
✅ **گرافیک عالی** - React Lucide Icons
✅ **رایگان** - بدون هزینه‌ی اشتراک
✅ **تکاملی** - هوشمند‌ترین توضیحات هستند
✅ **پشتیبانی از فارسی** - رابط کاملاً فارسی

---

## 📋 پیش‌نیازها

- **Node.js** (نسخه 16+)
- **MongoDB** (محلی یا Atlas)
- **کلید Anthropic API** (برای توضیحات هوشمند)
- **npm** یا **yarn**

---

## 🚀 مراحل نصب

### 1️⃣ نصب Node.js و npm
```bash
# بررسی نسخه
node --version
npm --version
```

### 2️⃣ ایجاد پوشه پروژه
```bash
mkdir studyflow
cd studyflow
```

### 3️⃣ کپی فایل‌ها
فایل‌های زیر را در پوشه کپی کنید:
- `server.js` - سرور Express
- `package.json` - وابستگی‌ها
- `.env.example` - متغیرهای محیطی

### 4️⃣ نصب وابستگی‌ها
```bash
npm install
```

### 5️⃣ پیکربندی .env
```bash
# نام‌گذاری مجدد فایل
mv .env.example .env

# ویرایش .env و تکمیل:
MONGO_URI=mongodb://localhost:27017/studyflow
ANTHROPIC_API_KEY=your_actual_api_key
PORT=5000
```

### 6️⃣ راه‌اندازی MongoDB

**گزینه 1: MongoDB محلی**
```bash
# نصب MongoDB (macOS)
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community

# یا Windows: دانلود از https://www.mongodb.com/try/download/community
```

**گزینه 2: MongoDB Atlas (ابری)**
```
1. ثبت‌نام در https://www.mongodb.com/cloud/atlas
2. ایجاد cluster
3. کپی connection string
4. تنظیم MONGO_URI در .env
```

### 7️⃣ دریافت Anthropic API Key
```
1. رفتن به https://console.anthropic.com
2. ایجاد یک کلید API
3. کپی کلید در .env
```

---

## 🖥️ اجرای اپلیکیشن

### سرور (Backend)
```bash
npm start          # حالت production
npm run dev        # حالت development (با hot reload)
```

سرور در `http://localhost:5000` اجرا می‌شود

### فرانت‌اند (Frontend)

**گزینه 1: استفاده از React Desktop**
```bash
# نصب Create React App
npx create-react-app studyflow-frontend
cd studyflow-frontend

# کپی فایل study-app.jsx
cp ../study-app.jsx src/App.jsx

# اجرا
npm start
```

**گزینه 2: استفاده از Vite (سریع‌تر)**
```bash
npm create vite@latest studyflow-frontend -- --template react
cd studyflow-frontend
npm install
cp ../study-app.jsx src/App.jsx
npm run dev
```

**گزینه 3: فرانت‌اند قائم‌به‌خود**
```bash
# ایجاد فایل HTML
# کپی کد React به صفحه HTML
# استفاده مستقیم از CDN React
```

---

## 📱 استقرار بر روی سرور

### Heroku
```bash
# نصب CLI
npm install -g heroku

# ورود
heroku login

# ایجاد اپلیکیشن
heroku create studyflow-app

# تنظیم متغیرهای محیطی
heroku config:set MONGO_URI=your_mongodb_uri
heroku config:set ANTHROPIC_API_KEY=your_api_key

# deploy
git push heroku main
```

### DigitalOcean
```bash
1. ایجاد Droplet (Ubuntu 22.04)
2. نصب Node.js: curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
3. کپی فایل‌ها
4. npm install
5. استفاده از PM2 برای مدیریت:
   npm install -g pm2
   pm2 start server.js --name studyflow
```

### Railway.app (پیشنهادی)
```bash
# نصب CLI
npm i -g @railway/cli

# ورود و deploy
railway login
railway init
railway up
```

---

## 🔌 API Endpoints

### کاربران
```
GET    /api/user/:userId              # اطلاعات کاربر
POST   /api/users                     # ایجاد کاربر جدید
PUT    /api/user/:userId/streak       # بروزرسانی استریک
GET    /api/user/:userId/stats        # آمار کاربر
```

### مواد درسی
```
GET    /api/materials                 # لیست تمام مواد
POST   /api/materials                 # ایجاد مادی جدید
PUT    /api/materials/:materialId/progress  # بروزرسانی پیشرفت
```

### آزمون‌ها
```
GET    /api/quizzes                   # لیست آزمون‌ها
POST   /api/quizzes/:quizId/result    # ثبت نتیجه
```

### هوشمند
```
POST   /api/ai-explanation            # درخواست توضیح از Claude
```

---

## 🛠️ Troubleshooting

### خطا: Cannot connect to MongoDB
```bash
# بررسی MongoDB
sudo systemctl status mongod

# یا شروع MongoDB
sudo systemctl start mongod
```

### خطا: ANTHROPIC_API_KEY not defined
```bash
# بررسی فایل .env
cat .env

# بدون نقل‌قول، تنظیم کنید
```

### خطا: CORS issues
```bash
# تنظیم CORS_ORIGIN در .env
CORS_ORIGIN=http://localhost:3000
```

### پورت 5000 مشغول است
```bash
# تغییر PORT در .env
PORT=5001

# یا پاک‌سازی پورت
lsof -ti:5000 | xargs kill -9
```

---

## 📊 ساختار پایگاه‌داده

### مجموعه‌های MongoDB:

**users**
```json
{
  "_id": ObjectId,
  "name": "نام کاربر",
  "email": "email@example.com",
  "points": 1240,
  "streak": 7,
  "level": 8,
  "joinDate": ISODate,
  "lastActivityDate": ISODate
}
```

**materials**
```json
{
  "_id": ObjectId,
  "title": "عنوان درس",
  "difficulty": "متوسط",
  "icon": "📚",
  "description": "توضیح",
  "content": "محتوای درس",
  "progress": 65,
  "createdAt": ISODate,
  "createdBy": "admin"
}
```

**quizzes**
```json
{
  "_id": ObjectId,
  "title": "عنوان آزمون",
  "materialId": ObjectId,
  "questions": [],
  "createdAt": ISODate
}
```

**quiz_results**
```json
{
  "_id": ObjectId,
  "quizId": ObjectId,
  "userId": ObjectId,
  "correct": 8,
  "total": 10,
  "percentage": 80,
  "points": 8,
  "date": ISODate
}
```

---

## 🚀 بهینه‌سازی و نکات

1. **استفاده از Redis** برای کش کردن
2. **CDN برای تصاویر** - Cloudinary
3. **Authentication** - JWT tokens
4. **Rate limiting** - express-rate-limit
5. **Compression** - gzip
6. **Database indexing** - سرعت بیشتر

---

## 📞 پشتیبانی و تعاون

برای مشکلات:
- بررسی logs: `npm run dev`
- تماس با تیم: support@studyflow.local

---

## 📄 لایسنس

MIT License - استفاده آزاد

---

## 🎉 موفق‌ترین‌ها!

هر روز ۳۰ دقیقه مطالعه = بهتری در درس‌ها ⭐
