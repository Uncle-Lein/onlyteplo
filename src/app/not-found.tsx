import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-pink-100 to-white p-4 text-center">
      <div className="text-8xl mb-6">😕</div>
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Страница не найдена</h1>
      <p className="text-xl text-gray-500 mb-8 max-w-md">
        Возможно, ссылка устарела или была удалена. Попробуйте создать новое приглашение.
      </p>
      <Link
        href="/"
        className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-4 px-8 rounded-full transition-all duration-300 shadow-lg text-lg"
      >
        На главную
      </Link>
    </main>
  );
}