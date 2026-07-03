# 1. نصب وابستگی‌ها
npm install

# 2. تنظیم .env
mv .env.example .env
# سپس کلید Anthropic API را اضافه کنید

# 3. شروع سرور
npm start

# 4. در Terminal جدید، فرانت‌اند را شروع کنید
npx create-react-app studyflow-frontend
cd studyflow-frontend
cp ../study-app.jsx src/App.jsx
npm start

✨ سرور: http://localhost:5000
✨ اپلیکیشن: http://localhost:3000
