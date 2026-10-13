"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function AdminPage() {
  const [isAuthed, setIsAuthed] = useState(false);
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [activeTab, setActiveTab] = useState<"stats" | "invites" | "answers">("stats");
  const [data, setData] = useState<any>(null);
  const [isDataLoading, setIsDataLoading] = useState(false);

  // Проверяем, авторизован ли (из localStorage)
  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (token) {
      setIsAuthed(true);
      fetchData(token);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ login, password }),
      });
      const result = await res.json();

      if (res.ok && result.token) {
        localStorage.setItem("admin_token", result.token);
        setIsAuthed(true);
        fetchData(result.token);
      } else {
        setError(result.error || "Ошибка входа");
      }
    } catch (err) {
      setError("Ошибка соединения");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    setIsAuthed(false);
    setData(null);
  };

  const fetchData = async (token: string) => {
    setIsDataLoading(true);
    try {
      const res = await fetch("/api/admin/stats", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const result = await res.json();
      if (res.ok) setData(result);
    } catch (err) {
      console.error(err);
    } finally {
      setIsDataLoading(false);
    }
  };

  // Экран входа
  if (!isAuthed) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-pink-100 via-rose-50 to-blue-50 flex items-center justify-center p-4">
        <form onSubmit={handleLogin} className="max-w-md w-full bg-white/90 backdrop-blur-xl rounded-[2rem] shadow-2xl p-8 border border-white/80">
          <div className="text-center mb-8">
            <div className="text-5xl mb-3">🔐</div>
            <h1 className="text-2xl font-bold text-gray-800">Админ-панель</h1>
            <p className="text-gray-500 text-sm mt-1">Вход только для владельца</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Логин</label>
              <input
                type="email"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                placeholder="email"
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-pink-500 outline-none text-gray-900"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Пароль</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-pink-500 outline-none text-gray-900"
                required
              />
            </div>

            {error && <p className="text-red-500 text-sm text-center">{error}</p>}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold py-4 px-6 rounded-full transition-all duration-300 shadow-lg text-lg disabled:opacity-50"
            >
              {isLoading ? "Входим..." : "Войти"}
            </button>
          </div>

          <Link href="/" className="block text-center mt-6 text-gray-500 hover:text-pink-500 text-sm">
            ← На главную
          </Link>
        </form>
      </main>
    );
  }

  // Админ-панель
  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-100 via-rose-50 to-blue-50 p-4 py-10">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">🔐 Админ-панель</h1>
          <button
            onClick={handleLogout}
            className="bg-red-50 hover:bg-red-100 text-red-600 font-medium px-4 py-2 rounded-full transition-all"
          >
            Выйти
          </button>
        </div>

        {/* Вкладки */}
        <div className="flex gap-2 mb-6 bg-white/60 backdrop-blur-md rounded-2xl p-1.5 border border-white/80 shadow-md">
          <button
            onClick={() => setActiveTab("stats")}
            className={`flex-1 py-3 px-4 rounded-xl font-semibold text-sm transition-all ${
              activeTab === "stats" ? "bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg" : "text-gray-600 hover:bg-pink-50"
            }`}
          >
            📊 Статистика
          </button>
          <button
            onClick={() => setActiveTab("invites")}
            className={`flex-1 py-3 px-4 rounded-xl font-semibold text-sm transition-all ${
              activeTab === "invites" ? "bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg" : "text-gray-600 hover:bg-pink-50"
            }`}
          >
            📨 Приглашения {data?.stats?.invites ? `(${data.stats.invites})` : ""}
          </button>
          <button
            onClick={() => setActiveTab("answers")}
            className={`flex-1 py-3 px-4 rounded-xl font-semibold text-sm transition-all ${
              activeTab === "answers" ? "bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg" : "text-gray-600 hover:bg-pink-50"
            }`}
          >
            💌 Ответы {data?.stats?.answers ? `(${data.stats.answers})` : ""}
          </button>
        </div>

        {isDataLoading && (
          <div className="bg-white p-8 rounded-2xl shadow text-center text-gray-500">Загрузка данных...</div>
        )}

        {/* Статистика */}
        {!isDataLoading && activeTab === "stats" && data && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-md p-5 border border-white/60 text-center">
              <div className="text-3xl font-bold text-pink-600">{data.stats.invites}</div>
              <div className="text-xs text-gray-500 mt-1">Приглашений</div>
            </div>
            <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-md p-5 border border-white/60 text-center">
              <div className="text-3xl font-bold text-pink-600">{data.stats.answers}</div>
              <div className="text-xs text-gray-500 mt-1">Ответов</div>
            </div>
            <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-md p-5 border border-white/60 text-center">
              <div className="text-3xl font-bold text-pink-600">{data.stats.viewed}</div>
              <div className="text-xs text-gray-500 mt-1">Просмотрено</div>
            </div>
            <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-md p-5 border border-white/60 text-center">
              <div className="text-3xl font-bold text-green-600">{data.stats.conversion}%</div>
              <div className="text-xs text-gray-500 mt-1">Конверсия</div>
            </div>
          </div>
        )}

        {/* Приглашения */}
        {!isDataLoading && activeTab === "invites" && data && (
          <div className="space-y-3">
            {data.invites.length === 0 ? (
              <div className="bg-white p-8 rounded-2xl shadow text-center text-gray-500">Приглашений пока нет</div>
            ) : (
              data.invites.map((invite: any) => (
                <div key={invite.id} className="bg-white/80 backdrop-blur-md rounded-2xl shadow-md p-4 border border-white/60">
                  <div className="flex justify-between items-start">
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-800 truncate">
                        {invite.recipient_name || "Без имени"}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        ID: {invite.id} · {new Date(invite.created_at).toLocaleString("ru-RU")}
                      </p>
                      <div className="flex gap-1 mt-2 text-xs">
                        <span className={`px-2 py-0.5 rounded-full ${invite.viewed_at ? "bg-yellow-100 text-yellow-700" : "bg-gray-100 text-gray-500"}`}>
                          {invite.viewed_at ? "👀 Просмотрено" : "⏳ Не открыто"}
                        </span>
                      </div>
                    </div>
                    <a
                      href={`/i/${invite.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs bg-pink-100 text-pink-600 hover:bg-pink-200 px-3 py-1.5 rounded-full font-medium ml-2"
                    >
                      Открыть →
                    </a>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Ответы */}
        {!isDataLoading && activeTab === "answers" && data && (
          <div className="space-y-3">
            {data.answers.length === 0 ? (
              <div className="bg-white p-8 rounded-2xl shadow text-center text-gray-500">Ответов пока нет</div>
            ) : (
              data.answers.map((answer: any) => (
                <div key={answer.id} className="bg-white/80 backdrop-blur-md rounded-2xl shadow-md p-4 border-l-4 border-pink-500">
                  <div className="flex justify-between items-start mb-2">
                    <p className="font-semibold text-gray-800">
                      {answer.recipient_name || answer.invites?.recipient_name || "—"}
                    </p>
                    <span className="text-xs text-gray-400">
                      {new Date(answer.created_at).toLocaleString("ru-RU")}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">
                    📅 {answer.meeting_date} в {answer.meeting_time}
                  </p>
                  {answer.foods && answer.foods.length > 0 && (
                    <p className="text-sm text-gray-600 mt-1">
                      🍽 {answer.foods.join(", ")}
                    </p>
                  )}
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </main>
  );
}