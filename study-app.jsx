import React, { useState, useEffect } from 'react';
import { ChevronDown, BookOpen, Brain, BarChart3, Menu, X, Loader } from 'lucide-react';

export default function StudyApp() {
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({ name: 'دانش‌آموز', points: 1240, streak: 7 });
  const [materials, setMaterials] = useState([
    { id: 1, title: 'ریاضیات - معادلات درجه دوم', difficulty: 'متوسط', progress: 65, icon: '📐' },
    { id: 2, title: 'شیمی - جدول تناوبی', difficulty: 'آسان', progress: 90, icon: '⚗️' },
    { id: 3, title: 'فیزیک - میکانیک کلاسیک', difficulty: 'سخت', progress: 40, icon: '🔬' },
    { id: 4, title: 'ادبیات - شاعری فارسی', difficulty: 'متوسط', progress: 75, icon: '📚' },
  ]);
  const [quizzes, setQuizzes] = useState([
    { id: 1, title: 'آزمون ریاضی - هفته ۱', correct: 8, total: 10, date: '۳ تیر' },
    { id: 2, title: 'آزمون شیمی - مقدمه', correct: 9, total: 10, date: '۲ تیر' },
    { id: 3, title: 'آزمون فیزیک - آزمایشی', correct: 6, total: 10, date: '۱ تیر' },
  ]);
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [aiResponse, setAiResponse] = useState(null);

  const menuItems = [
    { id: 'dashboard', label: 'داشبورد', icon: '📊' },
    { id: 'materials', label: 'مواد درسی', icon: '📚' },
    { id: 'quizzes', label: 'آزمون‌ها', icon: '✏️' },
    { id: 'progress', label: 'پیشرفت', icon: '📈' },
  ];

  const getAiExplanation = async (topic) => {
    setLoading(true);
    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-6',
          max_tokens: 500,
          messages: [
            {
              role: 'user',
              content: `به‌طور خلاصه و ساده درباره "${topic}" توضیح بده. پاسخ به زبان فارسی و در حد یک دانش‌آموز کتاب بخوان.`
            }
          ]
        })
      });
      const data = await response.json();
      const explanation = data.content[0]?.text || 'متأسفانه توضیح دریافت نشد';
      setAiResponse(explanation);
    } catch (error) {
      setAiResponse('خطا در دریافت توضیح. لطفاً دوباره تلاش کنید.');
    }
    setLoading(false);
  };

  const Dashboard = () => (
    <div className="space-y-6">
      {/* کارت بالا */}
      <div className="bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl p-8 text-white shadow-2xl">
        <div className="flex justify-between items-start mb-8">
          <div>
            <p className="text-blue-100 text-sm mb-2">خوش‌آمدید</p>
            <h1 className="text-4xl font-bold">{user.name}</h1>
          </div>
          <div className="text-5xl">🎯</div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white/20 backdrop-blur rounded-lg p-4">
            <p className="text-blue-100 text-sm">امتیاز کل</p>
            <p className="text-3xl font-bold">{user.points}</p>
          </div>
          <div className="bg-white/20 backdrop-blur rounded-lg p-4">
            <p className="text-blue-100 text-sm">روزهای متوالی</p>
            <p className="text-3xl font-bold">{user.streak}🔥</p>
          </div>
          <div className="bg-white/20 backdrop-blur rounded-lg p-4">
            <p className="text-blue-100 text-sm">سطح</p>
            <p className="text-3xl font-bold">8</p>
          </div>
        </div>
      </div>

      {/* مواد درسی */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">درس‌های درحال‌مطالعه</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {materials.slice(0, 4).map(material => (
            <div key={material.id} className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition">
              <div className="flex items-start justify-between mb-3">
                <div className="text-3xl">{material.icon}</div>
                <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full">{material.difficulty}</span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">{material.title}</h3>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all"
                  style={{ width: `${material.progress}%` }}
                />
              </div>
              <p className="text-xs text-gray-500 mt-2">{material.progress}% تکمیل‌شده</p>
            </div>
          ))}
        </div>
      </div>

      {/* آزمون‌های اخیر */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">نتایج آزمون‌ها</h2>
        <div className="space-y-3">
          {quizzes.map(quiz => (
            <div key={quiz.id} className="bg-white rounded-lg p-4 flex justify-between items-center shadow-sm hover:shadow-md transition">
              <div>
                <p className="font-semibold text-gray-800">{quiz.title}</p>
                <p className="text-xs text-gray-500">{quiz.date}</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-green-600">{quiz.correct}/{quiz.total}</p>
                <p className="text-xs text-gray-500">{Math.round((quiz.correct/quiz.total)*100)}%</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const Materials = () => (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">مواد درسی</h1>
      {materials.map(material => (
        <div key={material.id} className="bg-white rounded-xl p-5 shadow-md hover:shadow-lg transition cursor-pointer" onClick={() => setSelectedMaterial(material)}>
          <div className="flex items-start justify-between">
            <div className="flex gap-4 flex-1">
              <div className="text-4xl">{material.icon}</div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-gray-800">{material.title}</h3>
                <div className="flex gap-4 mt-3">
                  <span className="text-xs px-3 py-1 bg-blue-100 text-blue-700 rounded-full">{material.difficulty}</span>
                  <p className="text-sm text-gray-600">{material.progress}% مطالعه‌شده</p>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                    style={{ width: `${material.progress}%` }}
                  />
                </div>
              </div>
            </div>
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">درخواست توضیح</button>
          </div>
        </div>
      ))}
    </div>
  );

  const Quizzes = () => (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">آزمون‌ها</h1>
      <div className="grid grid-cols-1 gap-4">
        {quizzes.map(quiz => (
          <div key={quiz.id} className="bg-white rounded-xl p-5 shadow-md hover:shadow-lg transition">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-semibold text-lg text-gray-800">{quiz.title}</h3>
                <p className="text-xs text-gray-500 mt-1">📅 {quiz.date}</p>
              </div>
              <div className="text-right bg-green-100 px-4 py-2 rounded-lg">
                <p className="text-2xl font-bold text-green-600">{quiz.correct}/{quiz.total}</p>
                <p className="text-xs text-green-700">{Math.round((quiz.correct/quiz.total)*100)}%</p>
              </div>
            </div>
            <button className="w-full mt-3 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition">مرور پاسخ‌ها</button>
          </div>
        ))}
      </div>
      <button className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:shadow-lg transition mt-6">
        ✨ آزمون جدید شروع کنید
      </button>
    </div>
  );

  const Progress = () => (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">پیشرفت شما</h1>
      
      <div className="bg-white rounded-xl p-6 shadow-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">این‌هفته</h2>
        <div className="space-y-3">
          {[
            { day: 'شنبه', hours: 2.5 },
            { day: 'یک‌شنبه', hours: 1.8 },
            { day: 'دوشنبه', hours: 3.2 },
            { day: 'سه‌شنبه', hours: 2.1 },
          ].map((item, idx) => (
            <div key={idx} className="flex items-center justify-between">
              <span className="text-sm text-gray-600">{item.day}</span>
              <div className="flex-1 mx-4 bg-gray-200 rounded-full h-3">
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full" style={{ width: `${(item.hours/3.5)*100}%` }} />
              </div>
              <span className="text-sm font-semibold text-gray-800">{item.hours}h</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gradient-to-br from-green-400 to-blue-500 rounded-xl p-6 text-white shadow-md">
          <p className="text-sm opacity-90">کل ساعات</p>
          <p className="text-4xl font-bold">24.6</p>
          <p className="text-xs opacity-75 mt-2">ساعت مطالعه</p>
        </div>
        <div className="bg-gradient-to-br from-orange-400 to-red-500 rounded-xl p-6 text-white shadow-md">
          <p className="text-sm opacity-90">درس‌های تکمیل‌شده</p>
          <p className="text-4xl font-bold">12</p>
          <p className="text-xs opacity-75 mt-2">درس</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-50" dir="rtl">
      {/* منو کناری */}
      <div className={`${mobileMenuOpen ? 'block' : 'hidden'} md:block fixed md:relative w-64 h-screen bg-gradient-to-b from-gray-900 to-gray-800 shadow-2xl z-40 transition-all`}>
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-2xl font-bold text-white">StudyFlow</h1>
            <button onClick={() => setMobileMenuOpen(false)} className="md:hidden text-white">
              <X size={24} />
            </button>
          </div>
          <p className="text-gray-400 text-sm">یادگیری هوشمند</p>
        </div>
        
        <nav className="mt-6">
          {menuItems.map(item => (
            <button
              key={item.id}
              onClick={() => {
                setActiveMenu(item.id);
                setMobileMenuOpen(false);
                setSelectedMaterial(null);
                setAiResponse(null);
              }}
              className={`w-full text-right px-6 py-4 flex items-center gap-3 transition ${
                activeMenu === item.id
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white border-r-4 border-white'
                  : 'text-gray-300 hover:text-white hover:bg-gray-700'
              }`}
            >
              <span>{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="absolute bottom-6 left-6 right-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg p-4 text-white text-sm">
          <p className="font-semibold mb-2">🚀 نکته روز</p>
          <p className="text-xs opacity-90">هر روز ۳۰ دقیقه مطالعه، ۱۰۰ امتیاز!</p>
        </div>
      </div>

      {/* محتوای اصلی */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* هدر */}
        <div className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden text-gray-800">
            <Menu size={24} />
          </button>
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="font-semibold text-gray-800">{user.name}</p>
              <p className="text-xs text-gray-500">⭐ {user.points} امتیاز</p>
            </div>
            <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
              {user.name.charAt(0)}
            </div>
          </div>
        </div>

        {/* محتوای صفحه */}
        <div className="flex-1 overflow-auto">
          <div className="p-6 max-w-6xl mx-auto">
            {selectedMaterial && !aiResponse && (
              <button
                onClick={() => setSelectedMaterial(null)}
                className="mb-4 px-4 py-2 text-blue-500 hover:text-blue-700 font-semibold flex items-center gap-2"
              >
                ← بازگشت
              </button>
            )}

            {aiResponse && (
              <div className="mb-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 shadow-md">
                <button
                  onClick={() => setAiResponse(null)}
                  className="mb-4 px-4 py-2 text-blue-500 hover:text-blue-700 font-semibold flex items-center gap-2"
                >
                  ← بازگشت
                </button>
                <h2 className="text-xl font-bold text-gray-800 mb-3">💡 توضیح هوشمند</h2>
                <div className="bg-white rounded-lg p-4">
                  <p className="text-gray-800 leading-relaxed">{aiResponse}</p>
                </div>
              </div>
            )}

            {!selectedMaterial && !aiResponse && (
              <>
                {activeMenu === 'dashboard' && <Dashboard />}
                {activeMenu === 'materials' && <Materials />}
                {activeMenu === 'quizzes' && <Quizzes />}
                {activeMenu === 'progress' && <Progress />}
              </>
            )}

            {selectedMaterial && !aiResponse && (
              <div className="bg-white rounded-xl p-8 shadow-md">
                <div className="flex items-start gap-6 mb-6">
                  <div className="text-6xl">{selectedMaterial.icon}</div>
                  <div className="flex-1">
                    <h1 className="text-3xl font-bold text-gray-800">{selectedMaterial.title}</h1>
                    <div className="flex gap-3 mt-3">
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">{selectedMaterial.difficulty}</span>
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">{selectedMaterial.progress}% پیشرفت</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-6 mb-6">
                  <h2 className="font-semibold text-gray-800 mb-4">مرحله‌های یادگیری</h2>
                  <div className="space-y-3">
                    {['مطالعه پایه', 'مثال‌ها', 'تمرین‌ها', 'آزمون'].map((step, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold ${
                          idx < (selectedMaterial.progress / 25) 
                            ? 'bg-green-500 text-white' 
                            : 'bg-gray-300 text-gray-600'
                        }`}>
                          {idx < (selectedMaterial.progress / 25) ? '✓' : idx + 1}
                        </div>
                        <span className="text-gray-700">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button
                    onClick={() => getAiExplanation(selectedMaterial.title)}
                    disabled={loading}
                    className="py-3 px-6 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-semibold hover:shadow-lg transition disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {loading ? <Loader className="animate-spin" size={20} /> : '🤖'}
                    {loading ? 'در حال بارگیری...' : 'درخواست توضیح هوشمند'}
                  </button>
                  <button className="py-3 px-6 bg-gray-200 text-gray-800 rounded-lg font-semibold hover:bg-gray-300 transition">
                    📝 شروع تمرین
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}