// Seed Database Script
// این اسکریپت پایگاه‌داده را با داده‌های نمونه پر می‌کند
// اجرا: node seed-database.js

const { MongoClient } = require('mongodb');
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/studyflow';

async function seedDatabase() {
  const client = new MongoClient(MONGO_URI);

  try {
    await client.connect();
    console.log('✅ متصل به MongoDB');

    const db = client.db('studyflow');

    // 1. کاربر نمونه
    const users = db.collection('users');
    const sampleUser = {
      name: 'علی حسن‌زاده',
      email: 'ali@example.com',
      points: 1240,
      streak: 7,
      level: 8,
      joinDate: new Date('2024-01-15'),
      lastActivityDate: new Date(),
      preferences: {
        language: 'fa',
        theme: 'light'
      }
    };
    const userResult = await users.insertOne(sampleUser);
    console.log('✅ کاربر نمونه ایجاد شد');

    // 2. مواد درسی
    const materials = db.collection('materials');
    const sampleMaterials = [
      {
        title: 'ریاضیات - معادلات درجه دوم',
        difficulty: 'متوسط',
        icon: '📐',
        description: 'یادگیری حل معادلات درجه دوم به روش‌های مختلف',
        content: 'معادلات درجه دوم فرم‌های مختلفی دارند...',
        progress: 65,
        createdAt: new Date(),
        createdBy: 'admin'
      },
      {
        title: 'شیمی - جدول تناوبی',
        difficulty: 'آسان',
        icon: '⚗️',
        description: 'آشنایی با عناصر شیمیایی و جدول تناوبی',
        content: 'جدول تناوبی دمیتری مندلیف...',
        progress: 90,
        createdAt: new Date(),
        createdBy: 'admin'
      },
      {
        title: 'فیزیک - میکانیک کلاسیک',
        difficulty: 'سخت',
        icon: '🔬',
        description: 'قوانین نیوتن و حرکت اجسام',
        content: 'قانون اول نیوتن: اگر نیروی خارجی...',
        progress: 40,
        createdAt: new Date(),
        createdBy: 'admin'
      },
      {
        title: 'ادبیات - شاعری فارسی',
        difficulty: 'متوسط',
        icon: '📚',
        description: 'آشنایی با شاعران بزرگ فارسی',
        content: 'حافظ شیرازی یکی از بزرگ‌ترین شاعران...',
        progress: 75,
        createdAt: new Date(),
        createdBy: 'admin'
      },
      {
        title: 'انگلیسی - گرامر اساسی',
        difficulty: 'آسان',
        icon: '🌍',
        description: 'قواعد اساسی زبان انگلیسی',
        content: 'Present Simple استفاده برای حقایق عمومی...',
        progress: 50,
        createdAt: new Date(),
        createdBy: 'admin'
      },
      {
        title: 'تاریخ - دوران اسلامی',
        difficulty: 'متوسط',
        icon: '🏛️',
        description: 'تاریخ دوران اسلامی ایران',
        content: 'دوران فتح و تمدن اسلامی...',
        progress: 55,
        createdAt: new Date(),
        createdBy: 'admin'
      }
    ];
    const materialsResult = await materials.insertMany(sampleMaterials);
    console.log('✅ مواد درسی ایجاد شدند');

    // 3. آزمون‌ها
    const quizzes = db.collection('quizzes');
    const sampleQuizzes = [
      {
        title: 'آزمون ریاضی - معادلات درجه دوم',
        materialId: materialsResult.insertedIds[0],
        questionCount: 10,
        difficulty: 'متوسط',
        createdAt: new Date(),
        questions: [
          {
            id: 1,
            text: 'معادلهٔ x² + 5x + 6 = 0 چند ریشه دارد؟',
            options: ['بدون ریشه', 'یک ریشه', 'دو ریشه', 'سه ریشه'],
            answer: 2
          }
        ]
      },
      {
        title: 'آزمون شیمی - جدول تناوبی',
        materialId: materialsResult.insertedIds[1],
        questionCount: 15,
        difficulty: 'آسان',
        createdAt: new Date()
      },
      {
        title: 'آزمون فیزیک - قوانین نیوتن',
        materialId: materialsResult.insertedIds[2],
        questionCount: 8,
        difficulty: 'سخت',
        createdAt: new Date()
      }
    ];
    const quizzesResult = await quizzes.insertMany(sampleQuizzes);
    console.log('✅ آزمون‌ها ایجاد شدند');

    // 4. نتایج آزمون‌ها (برای نمایش نمودار)
    const quizResults = db.collection('quiz_results');
    const sampleResults = [
      {
        quizId: quizzesResult.insertedIds[0],
        userId: userResult.insertedId,
        correct: 8,
        total: 10,
        percentage: 80,
        points: 8,
        date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
      },
      {
        quizId: quizzesResult.insertedIds[1],
        userId: userResult.insertedId,
        correct: 9,
        total: 10,
        percentage: 90,
        points: 9,
        date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
      },
      {
        quizId: quizzesResult.insertedIds[2],
        userId: userResult.insertedId,
        correct: 6,
        total: 10,
        percentage: 60,
        points: 6,
        date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
      }
    ];
    const resultsResult = await quizResults.insertMany(sampleResults);
    console.log('✅ نتایج آزمون‌ها ایجاد شدند');

    // 5. ایجاد Index برای عملکرد بهتر
    await users.createIndex({ email: 1 });
    await materials.createIndex({ createdAt: -1 });
    await quizResults.createIndex({ userId: 1, date: -1 });
    console.log('✅ Index‌ها ایجاد شدند');

    console.log('');
    console.log('================================');
    console.log('✨ پایگاه‌داده آماده است!');
    console.log('================================');
    console.log('');
    console.log('📊 اطلاعات:');
    console.log(`   کاربر: ${userResult.insertedId}`);
    console.log(`   مواد: ${sampleMaterials.length}`);
    console.log(`   آزمون‌ها: ${sampleQuizzes.length}`);
    console.log(`   نتایج: ${sampleResults.length}`);
    console.log('');
    console.log('🎯 حالا می‌توانید سرور را شروع کنید:');
    console.log('   npm start');
    console.log('');

  } catch (error) {
    console.error('❌ خطا:', error.message);
  } finally {
    await client.close();
  }
}

// اجرا
seedDatabase();
