import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="relative min-h-screen bg-gradient-to-br from-pink-200 via-rose-100 to-blue-100 overflow-hidden">

      {/* Декоративные размытые круги */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob"></div>
        <div className="absolute top-1/3 -right-20 w-96 h-96 bg-rose-300 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-20 left-1/3 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-4000"></div>
      </div>

      {/* Плавающие сердечки */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[10%] left-[5%] text-5xl opacity-40 animate-float-slow">❤️</div>
        <div className="absolute top-[20%] right-[10%] text-4xl opacity-40 animate-float-medium">💖</div>
        <div className="absolute bottom-[15%] left-[15%] text-4xl opacity-40 animate-float-fast">💕</div>
        <div className="absolute top-[60%] right-[20%] text-5xl opacity-30 animate-float-slow">🌸</div>
        <div className="absolute bottom-[25%] right-[5%] text-4xl opacity-40 animate-float-medium">💗</div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto p-4 py-12">

        {/* Главная карточка */}
        <div className="bg-white/90 backdrop-blur-xl rounded-[2.5rem] shadow-2xl p-8 md:p-12 text-center border border-white/80 mb-8">
          <div className="text-7xl mb-4 animate-pulse-soft">💌</div>

          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
            Создай <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-rose-500">приглашение</span> на свидание
          </h1>

          <p className="text-lg text-gray-600 mb-10 max-w-md mx-auto">
            Сделай милое приглашение и отправь ссылку человеку, который тебе дорог ❤️
          </p>

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

        {/* Блок "Что такое date-with-me" */}
        <div className="bg-white/80 backdrop-blur-md rounded-[2rem] shadow-xl p-8 md:p-10 border border-white/60 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Что такое date-with-me</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            <strong className="text-pink-600">date-with-me</strong> — сайт, где можно сделать интерактивное приглашение на свидание онлайн за 2 минуты и получить его ссылкой. Приглашённый открывает ссылку в обычном браузере — без регистрации и приложений — и отвечает прямо внутри: кнопка «Нет» убегает от курсора, а «Да» растёт. Ответ придёт вам на страницу «Мои ответы».
          </p>
          <p className="text-gray-600 leading-relaxed">
            Собрать приглашение и посмотреть, как оно будет выглядеть, можно <strong className="text-green-600">бесплатно</strong>. Приглашение живёт 30 дней, потом удаляется автоматически.
          </p>
        </div>

        {/* Блок "Как это работает" */}
        <div className="bg-white/80 backdrop-blur-md rounded-[2rem] shadow-xl p-8 md:p-10 border border-white/60 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Как это работает</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-4">
              <div className="text-5xl mb-3">1️⃣</div>
              <h3 className="font-bold text-gray-800 mb-2">Создай</h3>
              <p className="text-gray-600 text-sm">Выбери картинку, фон, текст и настрой кнопки</p>
            </div>
            <div className="text-center p-4">
              <div className="text-5xl mb-3">2️⃣</div>
              <h3 className="font-bold text-gray-800 mb-2">Отправь</h3>
              <p className="text-gray-600 text-sm">Скопируй ссылку и отправь её в любом мессенджере</p>
            </div>
            <div className="text-center p-4">
              <div className="text-5xl mb-3">3️⃣</div>
              <h3 className="font-bold text-gray-800 mb-2">Получи ответ</h3>
              <p className="text-gray-600 text-sm">Узнай, что выбрал получатель, на странице «Мои ответы»</p>
            </div>
          </div>
        </div>

        {/* Блок "Связаться с автором" */}
        <div className="bg-white/80 backdrop-blur-md rounded-[2rem] shadow-xl p-8 md:p-10 border border-white/60 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">Связаться с автором</h2>
          <p className="text-gray-600 text-center mb-6 max-w-md mx-auto">
            Есть идеи, вопросы или предложения? Напишите мне — я всегда рад обратной связи!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <a
              href="https://t.me/Arsenii3370"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white font-bold py-4 px-6 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-lg"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.26-1.91.178-.184 3.266-2.992 3.326-3.25.007-.03.014-.14-.052-.198-.066-.058-.162-.038-.232-.022-.1.022-1.69 1.07-4.77 3.15-.45.31-.86.46-1.22.45-.4-.01-1.17-.23-1.74-.41-.7-.23-1.26-.35-1.21-.74.02-.2.3-.4.84-.61 3.28-1.43 5.47-2.37 6.56-2.83 3.12-1.3 3.77-1.53 4.19-1.53z"/>
              </svg>
              Telegram
            </a>
            <a
              href="mailto:arsenijm518@gmail.com"
              className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-rose-400 to-rose-500 hover:from-rose-500 hover:to-rose-600 text-white font-bold py-4 px-6 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-lg"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
              </svg>
              Email
            </a>
          </div>
        </div>

        {/* Футер */}
        <div className="text-center text-sm text-gray-500 py-6">
          <p className="mb-2">© 2026 date-with-me.online</p>
          <p>
            <Link href="/create" className="hover:text-pink-500 mx-2">Создать приглашение</Link>
            ·
            <Link href="/answers" className="hover:text-pink-500 mx-2">Мои ответы</Link>
          </p>
        </div>

      </div>
    </main>
  );
}