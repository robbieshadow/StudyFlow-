// StudyFlow Backend Server
// npm install express cors mongodb dotenv axios

const express = require('express');
const cors = require('cors');
const { MongoClient, ObjectId } = require('mongodb');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/studyflow';
const client = new MongoClient(MONGO_URI);
let db;

async function connectDB() {
  try {
    await client.connect();
    db = client.db('studyflow');
    console.log('✅ MongoDB متصل شد');
  } catch (error) {
    console.error('❌ خطا در اتصال MongoDB:', error);
    process.exit(1);
  }
}

// Routes

// 1. داشبورد کاربر
app.get('/api/user/:userId', async (req, res) => {
  try {
    const users = db.collection('users');
    const user = await users.findOne({ _id: new ObjectId(req.params.userId) });
    
    if (!user) {
      return res.status(404).json({ error: 'کاربر یافت نشد' });
    }
    
    res.json({
      name: user.name,
      points: user.points || 0,
      streak: user.streak || 0,
      level: user.level || 1,
      joinDate: user.joinDate
    });
  } catch (error) {
    res.status(500).json({ error: 'خطا در بازیابی اطلاعات کاربر' });
  }
});

// 2. لیست مواد درسی
app.get('/api/materials', async (req, res) => {
  try {
    const materials = db.collection('materials');
    const allMaterials = await materials.find({}).toArray();
    res.json(allMaterials);
  } catch (error) {
    res.status(500).json({ error: 'خطا در بازیابی مواد درسی' });
  }
});

// 3. ایجاد مادی درسی جدید
app.post('/api/materials', async (req, res) => {
  try {
    const { title, difficulty, icon, description, content } = req.body;
    
    const materials = db.collection('materials');
    const result = await materials.insertOne({
      title,
      difficulty,
      icon,
      description,
      content,
      progress: 0,
      createdAt: new Date(),
      createdBy: 'admin'
    });
    
    res.status(201).json({
      id: result.insertedId,
      message: 'مادی درسی با موفقیت ایجاد شد'
    });
  } catch (error) {
    res.status(500).json({ error: 'خطا در ایجاد مادی درسی' });
  }
});

// 4. بروزرسانی پیشرفت
app.put('/api/materials/:materialId/progress', async (req, res) => {
  try {
    const { userId, progress } = req.body;
    const materials = db.collection('materials');
    
    const result = await materials.updateOne(
      { _id: new ObjectId(req.params.materialId) },
      { $set: { progress: Math.min(progress, 100) } }
    );
    
    // بروزرسانی امتیاز کاربر
    const users = db.collection('users');
    await users.updateOne(
      { _id: new ObjectId(userId) },
      { $inc: { points: 10 } }
    );
    
    res.json({ message: 'پیشرفت بروزرسانی شد' });
  } catch (error) {
    res.status(500).json({ error: 'خطا در بروزرسانی پیشرفت' });
  }
});

// 5. لیست آزمون‌ها
app.get('/api/quizzes', async (req, res) => {
  try {
    const quizzes = db.collection('quizzes');
    const allQuizzes = await quizzes.find({}).toArray();
    res.json(allQuizzes);
  } catch (error) {
    res.status(500).json({ error: 'خطا در بازیابی آزمون‌ها' });
  }
});

// 6. ثبت نتیجه آزمون
app.post('/api/quizzes/:quizId/result', async (req, res) => {
  try {
    const { userId, correct, total } = req.body;
    const results = db.collection('quiz_results');
    
    const percentage = (correct / total) * 100;
    const points = Math.round(percentage / 10);
    
    const result = await results.insertOne({
      quizId: new ObjectId(req.params.quizId),
      userId: new ObjectId(userId),
      correct,
      total,
      percentage,
      points,
      date: new Date()
    });
    
    // بروزرسانی امتیاز کاربر
    const users = db.collection('users');
    await users.updateOne(
      { _id: new ObjectId(userId) },
      { $inc: { points } }
    );
    
    res.status(201).json({
      resultId: result.insertedId,
      pointsEarned: points,
      message: 'نتیجه ثبت شد'
    });
  } catch (error) {
    res.status(500).json({ error: 'خطا در ثبت نتیجه' });
  }
});

// 7. توضیحات هوشمند (Claude API)
app.post('/api/ai-explanation', async (req, res) => {
  try {
    const { topic } = req.body;
    
    const response = await axios.post(
      'https://api.anthropic.com/v1/messages',
      {
        model: 'claude-sonnet-4-6',
        max_tokens: 500,
        messages: [
          {
            role: 'user',
            content: `به‌صورت خلاصه و ساده درباره "${topic}" توضیح بده. پاسخ به زبان فارسی و در سطح دانش‌آموز.`
          }
        ]
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': process.env.ANTHROPIC_API_KEY,
          'anthropic-version': '2023-06-01'
        }
      }
    );
    
    const explanation = response.data.content[0].text;
    res.json({ explanation });
  } catch (error) {
    console.error('خطا در Claude API:', error.message);
    res.status(500).json({ error: 'خطا در دریافت توضیح هوشمند' });
  }
});

// 8. پیشرفت کاربر (نمودار)
app.get('/api/user/:userId/stats', async (req, res) => {
  try {
    const results = db.collection('quiz_results');
    const userResults = await results
      .find({ userId: new ObjectId(req.params.userId) })
      .sort({ date: -1 })
      .limit(10)
      .toArray();
    
    const stats = {
      totalQuizzes: userResults.length,
      avgScore: userResults.length > 0 
        ? Math.round(userResults.reduce((sum, r) => sum + r.percentage, 0) / userResults.length)
        : 0,
      recentResults: userResults
    };
    
    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: 'خطا در بازیابی آمار' });
  }
});

// 9. ایجاد کاربر جدید
app.post('/api/users', async (req, res) => {
  try {
    const { name, email } = req.body;
    const users = db.collection('users');
    
    const result = await users.insertOne({
      name,
      email,
      points: 0,
      streak: 0,
      level: 1,
      joinDate: new Date(),
      preferences: {
        language: 'fa',
        theme: 'light'
      }
    });
    
    res.status(201).json({
      userId: result.insertedId,
      message: 'کاربر با موفقیت ثبت‌نام شد'
    });
  } catch (error) {
    res.status(500).json({ error: 'خطا در ثبت‌نام کاربر' });
  }
});

// 10. بروزرسانی استریک
app.put('/api/user/:userId/streak', async (req, res) => {
  try {
    const users = db.collection('users');
    const user = await users.findOne({ _id: new ObjectId(req.params.userId) });
    
    const lastActivityDate = user.lastActivityDate 
      ? new Date(user.lastActivityDate)
      : new Date(Date.now() - 2 * 24 * 60 * 60 * 1000);
    
    const today = new Date();
    const diff = (today - lastActivityDate) / (1000 * 60 * 60 * 24);
    
    let newStreak = user.streak || 0;
    if (diff < 2) {
      newStreak = (user.streak || 0) + 1;
    } else {
      newStreak = 1;
    }
    
    await users.updateOne(
      { _id: new ObjectId(req.params.userId) },
      {
        $set: {
          streak: newStreak,
          lastActivityDate: new Date()
        }
      }
    );
    
    res.json({ streak: newStreak });
  } catch (error) {
    res.status(500).json({ error: 'خطا در بروزرسانی استریک' });
  }
});

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: '✅ سرور در حال کار است' });
});

// Start Server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 سرور در پورت ${PORT} در حال کار است`);
    console.log(`📚 StudyFlow Backend آماده است`);
  });
});