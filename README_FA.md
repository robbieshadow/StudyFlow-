# 📚 StudyFlow - سیستم یادگیری هوشمند

<div dir="rtl">

## 🎯 درباره‌ی پروژه

**StudyFlow** یک سیستم یادگیری جامع است که مشکلات دانش‌آموزان را با:

✨ **رابط کاربری مدرن** - طراحی زیبا و جذاب
🤖 **توضیحات هوشمند** - از Claude AI برای فهم بهتر
📊 **ردگیری پیشرفت** - نمودارها و آمار
🎯 **سیستم امتیاز** - انگیزه و پاداش
📱 **واکنش‌پذیر** - کار بر روی همه‌ی دستگاه‌ها
🌍 **فارسی نویسی** - رابط کاملاً فارسی
💰 **رایگان** - بدون هیچ هزینه‌ای

---

## 🏗️ معماری

```
StudyFlow
├── Frontend (React)
│   ├── صفحات: داشبورد، مواد، آزمون‌ها، پیشرفت
│   ├── انیمیشن‌ها و لودینگ
│   └── رابط فارسی
│
├── Backend (Express + Node.js)
│   ├── API Endpoints
│   ├── مدیریت کاربران
│   ├── پایگاه‌داده MongoDB
│   └── Claude AI Integration
│
└── Database (MongoDB)
    ├── Users
    ├── Materials
    ├── Quizzes
    └── Results
```

---

## 📦 فایل‌های پروژه

| فایل | توضیح |
|------|-------|
| `study-app.jsx` | فرانت‌اند React (رابط کاربری) |
| `server.js` | بک‌اند Express (API) |
| `package.json` | وابستگی‌های npm |
| `.env.example` | متغیرهای محیطی |
| `seed-database.js` | داده‌های نمونه |
| `quick-start.sh` | اسکریپت شروع سریع |
| `SETUP_GUIDE_FA.md` | راهنمای تفصیلی نصب |

---

## 🚀 شروع سریع (۵ دقیقه)

### Step 1: نصب Node.js
```bash
# بررسی نصخه
node --version   # v16 یا بالاتر
npm --version
```

### Step 2: کپی فایل‌ها
```bash
# ایجاد پوشه
mkdir studyflow && cd studyflow

# کپی تمام فایل‌ها به این پوشه
```

### Step 3: نصب وابستگی‌ها
```bash
npm install
```

### Step 4: تنظیم متغیرهای محیطی
```bash
# نام‌گذاری مجدد
mv .env.example .env

# ویرایش .env:
# MONGO_URI=mongodb://localhost:27017/studyflow
# ANTHROPIC_API_KEY=your_api_key_here
```

### Step 5: اجرای سرور
```bash
npm start

# یا برای development
npm run dev
```

### Step 6: اجرای فرانت‌اند
```bash
# در پنجره جدید:
npx create-react-app studyflow-frontend
cd studyflow-frontend
cp ../study-app.jsx src/App.jsx
npm start
```

### ✅ بس! 🎉
- سرور: `http://localhost:5000`
- فرانت‌اند: `http://localhost:3000`

---

## 🔐 تنظیم API Keys

### Anthropic API (برای توضیحات هوشمند)
```
1. رفتن به: https://console.anthropic.com
2. ایجاد API Key جدید
3. کپی در فایل .env
```

### MongoDB
**گزینه 1: محلی**
```bash
# macOS
brew install mongodb-community
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

**گزینه 2: ابری (Atlas)**
```
1. ثبت‌نام: https://www.mongodb.com/cloud/atlas
2. Create Cluster
3. کپی Connection String
4. تنظیم در .env
```

---

## 🛠️ API Reference

### 👤 کاربران
```http
GET /api/user/:userId
GET /api/user/:userId/stats
POST /api/users
PUT /api/user/:userId/streak
```

### 📚 مواد درسی
```http
GET /api/materials
POST /api/materials
PUT /api/materials/:materialId/progress
```

### ✏️ آزمون‌ها
```http
GET /api/quizzes
POST /api/quizzes/:quizId/result
```

### 🤖 هوشمند
```http
POST /api/ai-explanation
body: { topic: "موضوع درسی" }
```

---

## 📱 نمایش صفحات

### 1. داشبورد
- خلاصه‌ی امتیاز و استریک
- درس‌های درحال‌مطالعه
- نتایج آزمون‌های اخیر

### 2. مواد درسی
- لیست تمام درس‌ها
- نوار پیشرفت
- درخواست توضیح هوشمند

### 3. آزمون‌ها
- لیست آزمون‌های موجود
- نتایج و درصد
- مرور پاسخ‌ها

### 4. پیشرفت
- نمودار ساعات مطالعه
- آمار کل
- تحلیل عملکرد

---

## 🎨 ویژگی‌های طراحی

### رنگ‌های درجه‌یک
- **آبی**: اصلی و اعتماد
- **بنفش**: هوشمندی و تعمق
- **صورتی**: دوستانه و مثبت

### فونت‌ها
- **Display**: عنوان‌های جسورانه
- **Body**: خوانایی بالا

### انیمیشن‌ها
- لودینگ spinners
- fade-in transitions
- progress bar animations

---

## 🔄 Workflow استفاده

```
1. ورود / ثبت‌نام
   ↓
2. انتخاب درس
   ↓
3. مطالعه و درخواست توضیح (AI)
   ↓
4. حل تمرین‌ها
   ↓
5. شرکت در آزمون
   ↓
6. مشاهده نتایج و پیشرفت
   ↓
7. تکرار برای درس بعدی
```

---

## 📊 ساختار پایگاه‌داده

### مجموعه users
```javascript
{
  _id: ObjectId,
  name: "نام",
  email: "email@test.com",
  points: 1240,
  streak: 7,
  level: 8,
  joinDate: Date,
  preferences: {
    language: "fa",
    theme: "light"
  }
}
```

### مجموعه materials
```javascript
{
  _id: ObjectId,
  title: "عنوان درس",
  difficulty: "متوسط",
  icon: "📚",
  description: "توضیح کوتاه",
  progress: 65,
  createdAt: Date
}
```

### مجموعه quizzes
```javascript
{
  _id: ObjectId,
  title: "عنوان آزمون",
  materialId: ObjectId,
  questionCount: 10,
  difficulty: "سخت"
}
```

### مجموعه quiz_results
```javascript
{
  _id: ObjectId,
  quizId: ObjectId,
  userId: ObjectId,
  correct: 8,
  total: 10,
  percentage: 80,
  points: 8,
  date: Date
}
```

---

## 🐛 حل مشکلات رایج

### ❌ MongoDB متصل نمی‌شود
```bash
# بررسی MongoDB
ps aux | grep mongod

# یا شروع MongoDB
brew services start mongodb-community
```

### ❌ CORS Error
```javascript
// تنظیم CORS_ORIGIN در .env
CORS_ORIGIN=http://localhost:3000
```

### ❌ API Key مشکل
```bash
# بررسی .env
cat .env

# API Key از اینجا: https://console.anthropic.com
```

### ❌ پورت 5000 مشغول
```bash
# تغییر PORT در .env
PORT=5001

# یا پاک کردن
kill -9 $(lsof -ti:5000)
```

---

## 📈 بهبود‌های آینده

- [ ] ویدئوی آموزشی
- [ ] نشریات روزانه
- [ ] گروپ‌های مطالعه
- [ ] مسابقات آزمون
- [ ] اپلیکیشن موبایل (React Native)
- [ ] تحلیل پیشرفت با ML
- [ ] نشان‌های پیشرفت
- [ ] سیستم دعوت

---

## 🚀 استقرار

### Heroku
```bash
heroku create studyflow
heroku config:set MONGO_URI=...
heroku config:set ANTHROPIC_API_KEY=...
git push heroku main
```

### Railway
```bash
npm i -g @railway/cli
railway login
railway init
railway up
```

### DigitalOcean
```bash
# بر روی Ubuntu 22.04
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install nodejs
npm install -g pm2
pm2 start server.js
```

---

## 📞 کمک و حمایت

- 📧 ایمیل: support@studyflow.local
- 🐛 Issues: GitHub Issues
- 💬 Discussion: GitHub Discussions

---

## 📄 لایسنس

```
MIT License

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software...
```

---

## 🙏 تشکر

ساختن این پروژه بدون تعاون شما ممکن نبود.

**هر روز ۳۰ دقیقه مطالعه = بهتری درس‌ها ⭐**

</div>

---

**Created with ❤️ for Students**

