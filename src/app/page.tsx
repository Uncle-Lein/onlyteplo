import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="relative min-h-screen bg-gradient-to-b from-pink-100 via-pink-50 to-white overflow-hidden flex items-center justify-center p-4">

      {/* Плавающие сердечки на фоне */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[10%] left-[5%] text-4xl opacity-20 animate-float-slow">❤️</div>
        <div className="absolute top-[20%] right-[10%] text-3xl opacity-20 animate-float-medium">💖</div>
        <div className="absolute bottom-[15%] left-[15%] text-3xl opacity-20 animate-float-fast">💕</div>
        <div className="absolute top-[60%] right-[20%] text-4xl opacity-15 animate-float-slow">🌸</div>
        <div className="absolute bottom-[25%] right-[5%] text-3xl opacity-20 animate-float-medium">💗</div>
        <div className="absolute top-[40%] left-[8%] text-2xl opacity-15 animate-float-fast">✨</div>
      </div>

      {/* Основной контент */}
      <div className="relative z-10 max-w-2xl w-full bg-white/80 backdrop-blur-md rounded-[2.5rem] shadow-2xl p-8 md:p-12 text-center border border-white/60">

        {/* Логотип / Иконка */}
        <div className="text-7xl mb-4 animate-pulse-soft">💌</div>

        {/* Заголовок */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
          Создай <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-rose-500">приглашение</span> на свидание
        </h1>

        <p className="text-lg text-gray-600 mb-10 max-w-md mx-auto">
          Сделай милое приглашение и отправь ссылку человеку, который тебе дорог ❤️
        </p>

        {/* Кнопки */}
        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md mx-auto mb-10">
          <Link
            href="/create"
            className="flex-1 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold py-4 px-8 rounded-full transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:-translate-y-1 text-lg text-center"
          >
            Создать приглашение 💖
          </Link>
          <Link
            href="/answers"
            className="flex-1 bg-white hover:bg-gray-50 text-gray-700 font-bold py-4 px-8 rounded-full transition-all duration-300 shadow-md hover:shadow-lg border border-gray-200 text-lg text-center"
          >
            Мои ответы 📋
          </Link>
        </div>

        {/* Социальное доказательство */}
        <div className="flex flex-col items-center gap-3">
          <div className="flex -space-x-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-300 to-pink-500 border-2 border-white flex items-center justify-center text-white text-sm font-bold shadow-sm">А</div>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-300 to-blue-500 border-2 border-white flex items-center justify-center text-white text-sm font-bold shadow-sm">М</div>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-300 to-purple-500 border-2 border-white flex items-center justify-center text-white text-sm font-bold shadow-sm">К</div>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-300 to-rose-500 border-2 border-white flex items-center justify-center text-white text-sm font-bold shadow-sm">Д</div>
            <div className="w-10 h-10 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-gray-500 text-xs font-bold shadow-sm">+</div>
          </div>
          <p className="text-sm text-gray-500 font-medium">
            Уже <span className="font-bold text-pink-600">3000+</span> приглашений отправлено
          </p>
        </div>

      </div>

      {/* CSS-анимации (добавлены прямо в файл для простоты) */}
      <style jsx global>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(10deg); }
        }
        @keyframes float-medium {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(-10deg); }
        }
        @keyframes float-fast {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(5deg); }
        }
        @keyframes pulse-soft {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        .animate-float-slow { animation: float-slow 6s ease-in-out infinite; }
        .animate-float-medium { animation: float-medium 5s ease-in-out infinite; }
        .animate-float-fast { animation: float-fast 4s ease-in-out infinite; }
        .animate-pulse-soft { animation: pulse-soft 3s ease-in-out infinite; }
      `}</style>
    </main>
  );
}