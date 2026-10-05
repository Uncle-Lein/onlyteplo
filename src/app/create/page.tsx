"use client";

import { useState } from "react";
import Link from "next/link";
import { supabase, ensureAnonymousSession } from "@/lib/supabase";

// Варианты фона
const BACKGROUNDS = [
  { id: "pink", label: "Розовый", class: "from-pink-100 to-white", preview: "bg-pink-100" },
  { id: "blue", label: "Голубой", class: "from-blue-100 to-white", preview: "bg-blue-100" },
  { id: "beige", label: "Бежевый", class: "from-amber-50 to-white", preview: "bg-amber-50" },
  { id: "mint", label: "Мятный", class: "from-green-100 to-white", preview: "bg-green-100" },
];

// Варианты картинок (SVG-иконки, встроенные в код)
const IMAGES = [
  { id: "cats", label: "Котики" },
  { id: "hearts", label: "Сердечки" },
  { id: "flowers", label: "Цветы" },
  { id: "bunnies", label: "Зайчики" },
];

// SVG-компоненты для картинок
function CatsImage() {
  return (
    <svg viewBox="0 0 200 100" className="w-full h-full">
      {/* Котик 1 */}
      <g transform="translate(30, 20)">
        <ellipse cx="40" cy="60" rx="30" ry="35" fill="#F4A460" />
        <polygon points="15,30 5,0 30,20" fill="#F4A460" />
        <polygon points="65,30 75,0 50,20" fill="#F4A460" />
        <circle cx="30" cy="55" r="4" fill="#000" />
        <circle cx="50" cy="55" r="4" fill="#000" />
        <ellipse cx="40" cy="65" rx="5" ry="3" fill="#FF69B4" />
      </g>
      {/* Котик 2 */}
      <g transform="translate(100, 25)">
        <ellipse cx="40" cy="55" rx="28" ry="32" fill="#FFFFFF" stroke="#E0E0E0" strokeWidth="2" />
        <polygon points="17,28 8,2 32,20" fill="#FFFFFF" stroke="#E0E0E0" strokeWidth="2" />
        <polygon points="63,28 72,2 48,20" fill="#FFFFFF" stroke="#E0E0E0" strokeWidth="2" />
        <circle cx="30" cy="50" r="4" fill="#000" />
        <circle cx="50" cy="50" r="4" fill="#000" />
        <ellipse cx="40" cy="60" rx="5" ry="3" fill="#FFB6C1" />
      </g>
      {/* Сердечко между ними */}
      <path d="M95 70 C95 65, 100 60, 105 65 C110 60, 115 65, 115 70 C115 78, 105 85, 105 85 C105 85, 95 78, 95 70 Z" fill="#FF1493" />
    </svg>
  );
}

function HeartsImage() {
  return (
    <svg viewBox="0 0 200 100" className="w-full h-full">
      <path d="M50 80 C50 60, 30 50, 30 35 C30 20, 45 15, 50 25 C55 15, 70 20, 70 35 C70 50, 50 60, 50 80 Z" fill="#FF1493" />
      <path d="M100 85 C100 65, 80 55, 80 40 C80 25, 95 20, 100 30 C105 20, 120 25, 120 40 C120 55, 100 65, 100 85 Z" fill="#FF69B4" />
      <path d="M150 80 C150 60, 130 50, 130 35 C130 20, 145 15, 150 25 C155 15, 170 20, 170 35 C170 50, 150 60, 150 80 Z" fill="#FF1493" />
    </svg>
  );
}

function FlowersImage() {
  return (
    <svg viewBox="0 0 200 100" className="w-full h-full">
      {/* Цветок 1 */}
      <g transform="translate(40, 20)">
        <line x1="15" y1="40" x2="15" y2="70" stroke="#228B22" strokeWidth="3" />
        <circle cx="15" cy="30" r="10" fill="#FFD700" />
        <circle cx="5" cy="25" r="8" fill="#FF69B4" />
        <circle cx="25" cy="25" r="8" fill="#FF69B4" />
        <circle cx="5" cy="35" r="8" fill="#FF69B4" />
        <circle cx="25" cy="35" r="8" fill="#FF69B4" />
      </g>
      {/* Цветок 2 */}
      <g transform="translate(100, 25)">
        <line x1="15" y1="40" x2="15" y2="65" stroke="#228B22" strokeWidth="3" />
        <circle cx="15" cy="30" r="10" fill="#FFD700" />
        <circle cx="5" cy="25" r="8" fill="#FF1493" />
        <circle cx="25" cy="25" r="8" fill="#FF1493" />
        <circle cx="5" cy="35" r="8" fill="#FF1493" />
        <circle cx="25" cy="35" r="8" fill="#FF1493" />
      </g>
      {/* Цветок 3 */}
      <g transform="translate(160, 20)">
        <line x1="15" y1="40" x2="15" y2="70" stroke="#228B22" strokeWidth="3" />
        <circle cx="15" cy="30" r="10" fill="#FFD700" />
        <circle cx="5" cy="25" r="8" fill="#9B59B6" />
        <circle cx="25" cy="25" r="8" fill="#9B59B6" />
        <circle cx="5" cy="35" r="8" fill="#9B59B6" />
        <circle cx="25" cy="35" r="8" fill="#9B59B6" />
      </g>
    </svg>
  );
}

function BunniesImage() {
  return (
    <svg viewBox="0 0 200 100" className="w-full h-full">
      {/* Зайчик 1 */}
      <g transform="translate(40, 25)">
        <ellipse cx="30" cy="50" rx="22" ry="25" fill="#FFFFFF" stroke="#E0E0E0" strokeWidth="2" />
        <ellipse cx="20" cy="15" rx="6" ry="18" fill="#FFFFFF" stroke="#E0E0E0" strokeWidth="2" />
        <ellipse cx="40" cy="15" rx="6" ry="18" fill="#FFFFFF" stroke="#E0E0E0" strokeWidth="2" />
        <circle cx="23" cy="45" r="3" fill="#000" />
        <circle cx="37" cy="45" r="3" fill="#000" />
        <ellipse cx="30" cy="55" rx="4" ry="3" fill="#FFB6C1" />
      </g>
      {/* Зайчик 2 */}
      <g transform="translate(110, 30)">
        <ellipse cx="30" cy="45" rx="20" ry="22" fill="#FFE4E1" stroke="#E0E0E0" strokeWidth="2" />
        <ellipse cx="22" cy="15" rx="5" ry="15" fill="#FFE4E1" stroke="#E0E0E0" strokeWidth="2" />
        <ellipse cx="38" cy="15" rx="5" ry="15" fill="#FFE4E1" stroke="#E0E0E0" strokeWidth="2" />
        <circle cx="23" cy="40" r="3" fill="#000" />
        <circle cx="37" cy="40" r="3" fill="#000" />
        <ellipse cx="30" cy="50" rx="4" ry="3" fill="#FF69B4" />
      </g>
    </svg>
  );
}

const IMAGE_COMPONENTS: Record<string, React.FC> = {
  cats: CatsImage,
  hearts: HeartsImage,
  flowers: FlowersImage,
  bunnies: BunniesImage,
};

export default function CreatePage() {
  const [forWhom, setForWhom] = useState<"her" | "him">("her");
  const [recipientName, setRecipientName] = useState("");
  const [selectedImage, setSelectedImage] = useState("cats");
  const [selectedBackground, setSelectedBackground] = useState("pink");
  const [customText, setCustomText] = useState("Ты пойдешь со мной на свидание?");
  const [generatedLink, setGeneratedLink] = useState("");
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const SelectedImageComponent = IMAGE_COMPONENTS[selectedImage];

  const handleCreate = async () => {
    if (!recipientName.trim()) {
      alert("Пожалуйста, введите имя получателя!");
      return;
    }

    setIsLoading(true);

    const session = await ensureAnonymousSession();
    if (!session) {
      alert("Ошибка авторизации. Попробуйте позже.");
      setIsLoading(false);
      return;
    }

    const inviteId = Math.random().toString(36).substring(2, 10);

    const { error } = await supabase.from("invites").insert({
      id: inviteId,
      for_whom: forWhom,
      recipient_name: recipientName,
      image: selectedImage,
      background_color: selectedBackground,
      custom_text: customText,
      creator_id: session.user.id,
    });

    setIsLoading(false);

    if (error) {
      alert("Ошибка сохранения: " + error.message);
      console.error("Детали:", error);
      return;
    }

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

  const bgClass = BACKGROUNDS.find((b) => b.id === selectedBackground)?.class || "from-pink-100 to-white";

  return (
    <main className={`min-h-screen bg-gradient-to-b ${bgClass} p-4 py-10`}>
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

          {/* Выбор фона */}
          <div className="mb-8">
            <label className="block text-gray-700 font-medium mb-3">Цвет фона</label>
            <div className="grid grid-cols-4 gap-3">
              {BACKGROUNDS.map((bg) => (
                <button
                  key={bg.id}
                  onClick={() => setSelectedBackground(bg.id)}
                  className={`flex flex-col items-center p-3 rounded-2xl border-2 transition-all ${selectedBackground === bg.id ? "border-pink-500 scale-105" : "border-gray-200"}`}
                >
                  <div className={`w-10 h-10 rounded-full ${bg.preview} border border-gray-300 mb-2`}></div>
                  <span className="text-xs text-gray-600">{bg.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Выбор картинки */}
          <div className="mb-8">
            <label className="block text-gray-700 font-medium mb-3">Выбери картинку</label>
            <div className="grid grid-cols-4 gap-3">
              {IMAGES.map((img) => {
                const ImgComponent = IMAGE_COMPONENTS[img.id];
                return (
                  <button
                    key={img.id}
                    onClick={() => setSelectedImage(img.id)}
                    className={`flex flex-col items-center p-2 rounded-2xl border-2 transition-all ${selectedImage === img.id ? "border-pink-500 bg-pink-50" : "border-gray-200"}`}
                  >
                    <div className="w-full h-12 mb-1">
                      <ImgComponent />
                    </div>
                    <span className="text-xs text-gray-600">{img.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mb-8">
            <label className="block text-gray-700 font-medium mb-3">Текст приглашения</label>
            <textarea value={customText} onChange={(e) => setCustomText(e.target.value)} rows={3} className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-pink-500 outline-none text-lg resize-none" />
          </div>

          {/* Превью */}
          <div className="mb-8">
            <label className="block text-gray-700 font-medium mb-3">Предпросмотр</label>
            <div className={`p-6 rounded-2xl bg-gradient-to-b ${bgClass} border-2 border-gray-200`}>
              <div className="bg-white rounded-2xl p-4 shadow-md">
                <div className="w-full h-20 mb-2">
                  <SelectedImageComponent />
                </div>
                <p className="text-center text-sm font-semibold text-gray-700">
                  {recipientName ? `${recipientName}, ` : ""}{customText}
                </p>
              </div>
            </div>
          </div>

          <button onClick={handleCreate} disabled={isLoading} className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-4 px-8 rounded-full transition-all duration-300 shadow-lg text-lg disabled:opacity-50">
            {isLoading ? "Создаем..." : "Создать приглашение 💖"}
          </button>
        </div>
      </div>
    </main>
  );
}