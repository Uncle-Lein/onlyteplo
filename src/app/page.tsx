import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-pink-100 to-white p-4">
      <div className="max-w-2xl w-full bg-white rounded-3xl shadow-xl p-10 flex flex-col items-center text-center">
        <div className="text-6xl mb-6">💌</div>
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Создай приглашение на свидание
        </h1>
        <p className="text-lg text-gray-500 mb-10 max-w-md">
          Сделай милое приглашение и отправь ссылку человеку, который тебе дорог ❤️
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
          <Link
            href="/create"
            className="flex-1 bg-pink-500 hover:bg-pink-600 text-white font-bold py-4 px-8 rounded-full transition-all duration-300 shadow-lg text-lg text-center"
          >
            Создать приглашение 💖
          </Link>
          <Link
            href="/answers"
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-4 px-8 rounded-full transition-all duration-300 text-lg text-center"
          >
            Мои ответы 📋
          </Link>
        </div>

        <p className="mt-8 text-sm text-gray-400">Уже отправлено 3000+ приглашений</p>
      </div>
    </main>
  );
}