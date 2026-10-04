"use client";

import { useState } from "react";
import Link from "next/link";
import { supabase, ensureAnonymousSession } from "@/lib/supabase";

export default function CreatePage() {
  const [forWhom, setForWhom] = useState<"her" | "him">("her");
  const [recipientName, setRecipientName] = useState("");
  const [selectedImage, setSelectedImage] = useState("cats");
  const [customText, setCustomText] = useState("Ты пойдешь со мной на свидание?");
  const [generatedLink, setGeneratedLink] = useState("");
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const images = [
    { id: "cats", emoji: "🐱🌹🐰", label: "Котики" },
    { id: "hearts", emoji: "❤️💕💖", label: "Сердечки" },
    { id: "flowers", emoji: "🌻🌷🌹", label: "Цветы" },
  ];

  const handleCreate = async () => {
    if (!recipientName.trim()) {
      alert("Пожалуйста, введите имя получателя!");
      return;
    }

    setIsLoading(true);

    // Создаем анонимную сессию (если её нет)
    const session = await ensureAnonymousSession();
    if (!session) {
      alert("Ошибка авторизации. Попробуйте позже.");
      setIsLoading(false);
      return;
    }

    // Генерируем уникальный ID
    const inviteId = Math.random().toString(36).substring(2, 10);

    // Сохраняем в Supabase с привязкой к создателю
    const { error } = await supabase.from("invites").insert({
      id: inviteId,
      for_whom: forWhom,
      recipient_name: recipientName,
      image: selectedImage,
      custom_text: customText,
      creator_id: session.user.id, // Привязываем к создателю
    });

    setIsLoading(false);

    if (error) {
      alert("Ошибка сохранения: " + error.message);
      console.error("Детали:", error);
      return;
    }

    // Формируем ссылку
    const link = `${window.location.origin}/i/${inviteId}`;
    setGeneratedLink(link);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (generatedLink) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-pink-100 to-white flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 text-center">
          <div className="text-6xl mb-6">🎉</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Приглашение создано!</h1>
          <p className="text-gray-500 mb-6">Отправьте эту ссылку получателю:</p>

          <div className="bg-gray-100 p-4 rounded-xl mb-4 break-all text-sm text-gray-700 border-2 border-dashed border-gray-300">
            {generatedLink}
          </div>

          <button
            onClick={copyToClipboard}
            className={`w-full font-bold py-4 px-6 rounded-full transition-all duration-300 shadow-lg text-lg mb-4 ${
              copied ? "bg-green-500 text-white" : "bg-pink-500 hover:bg-pink-600 text-white"
            }`}
          >
            {copied ? "✅ Скопировано!" : "📋 Скопировать ссылку"}
          </button>

          <Link href="/" className="text-gray-500 hover:text-pink-500 font-medium">
            ← Вернуться на главную
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-pink-100 to-white p-4 py-10">
      <div className="max-w-2xl mx-auto">
        <Link href="/" className="text-gray-500 hover:text-pink-500 mb-6 inline-block">← На главную</Link>

        <div className="bg-white rounded-3xl shadow-xl p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Создание приглашения</h1>

          <div className="mb-8">
            <label className="block text-gray-700 font-medium mb-3">Кому адресовано?</label>
            <div className="flex gap-4">
              <button onClick={() => setForWhom("her")} className={`flex-1 py-3 px-6 rounded-2xl border-2 font-medium transition-all ${forWhom === "her" ? "border-pink-500 bg-pink-50 text-pink-600" : "border-gray-200 text-gray-600"}`}>👩 Для неё</button>
              <button onClick={() => setForWhom("him")} className={`flex-1 py-3 px-6 rounded-2xl border-2 font-medium transition-all ${forWhom === "him" ? "border-blue-500 bg-blue-50 text-blue-600" : "border-gray-200 text-gray-600"}`}>👨 Для него</button>
            </div>
          </div>

          <div className="mb-8">
            <label className="block text-gray-700 font-medium mb-3">Имя получателя</label>
            <input type="text" value={recipientName} onChange={(e) => setRecipientName(e.target.value)} placeholder="Например: Аня" className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-pink-500 outline-none text-lg" />
          </div>

          <div className="mb-8">
            <label className="block text-gray-700 font-medium mb-3">Выбери стикер</label>
            <div className="grid grid-cols-3 gap-4">
              {images.map((img) => (
                <button key={img.id} onClick={() => setSelectedImage(img.id)} className={`flex flex-col items-center p-4 rounded-2xl border-2 transition-all ${selectedImage === img.id ? "border-pink-500 bg-pink-50" : "border-gray-200"}`}>
                  <span className="text-4xl mb-2">{img.emoji}</span>
                  <span className="text-sm text-gray-600">{img.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <label className="block text-gray-700 font-medium mb-3">Текст приглашения</label>
            <textarea value={customText} onChange={(e) => setCustomText(e.target.value)} rows={3} className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-pink-500 outline-none text-lg resize-none" />
          </div>

          <button onClick={handleCreate} disabled={isLoading} className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-4 px-8 rounded-full transition-all duration-300 shadow-lg text-lg disabled:opacity-50">
            {isLoading ? "Создаем..." : "Создать приглашение 💖"}
          </button>
        </div>
      </div>
    </main>
  );
}