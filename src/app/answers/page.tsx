"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase, ensureAnonymousSession } from "@/lib/supabase";

const OPTION_NAMES: Record<string, string> = {
  pizza: "🍕 Пицца", sushi: "🍣 Суши", burger: "🍔 Бургер",
  pasta: "🍝 Паста", ramen: "🍜 Рамен", rollton: "🍲 Ролтон",
  comedy: "🎭 Комедия", drama: "💔 Мелодрама", action: "💥 Боевик",
  cartoon: "🎨 Мультик", "sci-fi": "🚀 Фантастика", horror: "👻 Ужасы",
  walk: "🚶 Прогулка", cinema: "🎬 Кино", bowling: "🎳 Боулинг",
  museum: "🏛️ Музей", picnic: "🧺 Пикник", quest: "🔍 Квест",
  coffee: "☕ Кофе", tea: "🍵 Чай", juice: "🧃 Сок",
  smoothie: "🥤 Смузи", milkshake: "🍦 Милкшейк", lemonade: "🍋 Лимонад",
  restaurant: "🍽️ Ресторан", park: "🌳 Парк", embankment: "🌊 Набережная",
  rooftop: "🌃 Крыша", cafe: "☕ Кафе", home: "🏠 Дома",
};

export default function AnswersPage() {
  const [answers, setAnswers] = useState<any[]>([]);
  const [invites, setInvites] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const fetchData = async () => {
    const session = await ensureAnonymousSession();
    if (!session) { setIsLoading(false); return; }

    const { data: answersData } = await supabase
      .from("answers")
      .select(`*, invites!inner(creator_id, recipient_name, custom_text, viewed_at)`)
      .eq("invites.creator_id", session.user.id)
      .order("created_at", { ascending: false });

    const { data: invitesData } = await supabase
      .from("invites")
      .select("*")
      .eq("creator_id", session.user.id)
      .order("created_at", { ascending: false });

    if (answersData) setAnswers(answersData);
    if (invitesData) setInvites(invitesData);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (inviteId: string) => {
    if (!confirm("Удалить это приглашение и все ответы?")) return;
    await supabase.from("answers").delete().eq("invite_id", inviteId);
    await supabase.from("invites").delete().eq("id", inviteId);
    setAnswers(answers.filter((a) => a.invite_id !== inviteId));
    setInvites(invites.filter((i) => i.id !== inviteId));
  };

  const handleCopyLink = (id: string) => {
    const link = `${window.location.origin}/i/${id}`;
    navigator.clipboard.writeText(link);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-100 via-rose-50 to-blue-50 p-4 py-10">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <Link href="/" className="text-gray-500 hover:text-pink-500 font-medium">← На главную</Link>
        </div>

        <h1 className="text-3xl font-bold text-gray-800 mb-8">📋 Мои приглашения и ответы</h1>

        {/* Блок с приглашениями */}
        {invites.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-700 mb-4">📨 Мои приглашения</h2>
            <div className="space-y-3">
              {invites.map((invite) => {
                const hasAnswer = answers.some((a) => a.invite_id === invite.id);
                const isViewed = !!invite.viewed_at;
                return (
                  <div key={invite.id} className="bg-white/80 backdrop-blur-md rounded-2xl shadow-md p-5 border border-white/60">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <p className="font-semibold text-gray-800">
                          {invite.recipient_name ? `Для: ${invite.recipient_name}` : "Без имени"}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          {new Date(invite.created_at).toLocaleString("ru-RU")}
                        </p>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          hasAnswer ? "bg-green-100 text-green-700" :
                          isViewed ? "bg-yellow-100 text-yellow-700" :
                          "bg-gray-100 text-gray-500"
                        }`}>
                          {hasAnswer ? "✅ Ответили" : isViewed ? "👀 Просмотрено" : "⏳ Не открыто"}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-3">
                      <button
                        onClick={() => handleCopyLink(invite.id)}
                        className={`text-xs font-medium px-3 py-1.5 rounded-full transition-all ${copiedId === invite.id ? "bg-green-500 text-white" : "bg-pink-100 text-pink-600 hover:bg-pink-200"}`}
                      >
                        {copiedId === invite.id ? "✅ Скопировано!" : "📋 Скопировать ссылку"}
                      </button>
                      <button
                        onClick={() => handleDelete(invite.id)}
                        className="text-xs font-medium px-3 py-1.5 rounded-full bg-red-50 text-red-500 hover:bg-red-100 transition-all"
                      >
                        🗑 Удалить
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Блок с ответами */}
        <div>
          <h2 className="text-xl font-bold text-gray-700 mb-4">💌 Ответы</h2>
          {isLoading ? (
            <div className="bg-white p-8 rounded-2xl shadow text-center text-gray-500">Загрузка...</div>
          ) : answers.length === 0 ? (
            <div className="bg-white p-8 rounded-2xl shadow text-center text-gray-500">
              Пока нет ответов. Создайте приглашение и отправьте ссылку.
            </div>
          ) : (
            <div className="space-y-4">
              {answers.map((answer) => (
                <div key={answer.id} className="bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow border-l-4 border-pink-500">
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-sm text-gray-400">
                      {new Date(answer.created_at).toLocaleString("ru-RU")}
                    </span>
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">✅ Согласие</span>
                  </div>
                  <div className="space-y-2">
                    <p className="text-gray-600">
                      <span className="font-semibold">👤 Кому:</span> {answer.recipient_name || answer.invites?.recipient_name || "—"}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-semibold">🍽 Выбор:</span>{" "}
                      {Array.isArray(answer.foods) && answer.foods.length > 0
                        ? answer.foods.map((id: string) => OPTION_NAMES[id] || id).join(", ")
                        : "—"}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-semibold">📅 Дата встречи:</span> {answer.meeting_date} в {answer.meeting_time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}