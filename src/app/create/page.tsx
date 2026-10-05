"use client";

import { useState } from "react";
import Link from "next/link";
import { supabase, ensureAnonymousSession } from "@/lib/supabase";

// Фоны
const BACKGROUNDS = [
  { id: "pink", label: "Розовый", class: "from-pink-100 to-white", preview: "bg-pink-100" },
  { id: "blue", label: "Голубой", class: "from-blue-100 to-white", preview: "bg-blue-100" },
  { id: "beige", label: "Бежевый", class: "from-amber-50 to-white", preview: "bg-amber-50" },
  { id: "mint", label: "Мятный", class: "from-green-100 to-white", preview: "bg-green-100" },
];

// Картинки (SVG)
function CatsImage() {
  return (
    <svg viewBox="0 0 200 100" className="w-full h-full">
      <g transform="translate(30, 20)">
        <ellipse cx="40" cy="60" rx="30" ry="35" fill="#F4A460" />
        <polygon points="15,30 5,0 30,20" fill="#F4A460" />
        <polygon points="65,30 75,0 50,20" fill="#F4A460" />
        <circle cx="30" cy="55" r="4" fill="#000" />
        <circle cx="50" cy="55" r="4" fill="#000" />
        <ellipse cx="40" cy="65" rx="5" ry="3" fill="#FF69B4" />
      </g>
      <g transform="translate(100, 25)">
        <ellipse cx="40" cy="55" rx="28" ry="32" fill="#FFFFFF" stroke="#E0E0E0" strokeWidth="2" />
        <polygon points="17,28 8,2 32,20" fill="#FFFFFF" stroke="#E0E0E0" strokeWidth="2" />
        <polygon points="63,28 72,2 48,20" fill="#FFFFFF" stroke="#E0E0E0" strokeWidth="2" />
        <circle cx="30" cy="50" r="4" fill="#000" />
        <circle cx="50" cy="50" r="4" fill="#000" />
        <ellipse cx="40" cy="60" rx="5" ry="3" fill="#FFB6C1" />
      </g>
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
      <g transform="translate(40, 20)">
        <line x1="15" y1="40" x2="15" y2="70" stroke="#228B22" strokeWidth="3" />
        <circle cx="15" cy="30" r="10" fill="#FFD700" />
        <circle cx="5" cy="25" r="8" fill="#FF69B4" />
        <circle cx="25" cy="25" r="8" fill="#FF69B4" />
        <circle cx="5" cy="35" r="8" fill="#FF69B4" />
        <circle cx="25" cy="35" r="8" fill="#FF69B4" />
      </g>
      <g transform="translate(100, 25)">
        <line x1="15" y1="40" x2="15" y2="65" stroke="#228B22" strokeWidth="3" />
        <circle cx="15" cy="30" r="10" fill="#FFD700" />
        <circle cx="5" cy="25" r="8" fill="#FF1493" />
        <circle cx="25" cy="25" r="8" fill="#FF1493" />
        <circle cx="5" cy="35" r="8" fill="#FF1493" />
        <circle cx="25" cy="35" r="8" fill="#FF1493" />
      </g>
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
      <g transform="translate(40, 25)">
        <ellipse cx="30" cy="50" rx="22" ry="25" fill="#FFFFFF" stroke="#E0E0E0" strokeWidth="2" />
        <ellipse cx="20" cy="15" rx="6" ry="18" fill="#FFFFFF" stroke="#E0E0E0" strokeWidth="2" />
        <ellipse cx="40" cy="15" rx="6" ry="18" fill="#FFFFFF" stroke="#E0E0E0" strokeWidth="2" />
        <circle cx="23" cy="45" r="3" fill="#000" />
        <circle cx="37" cy="45" r="3" fill="#000" />
        <ellipse cx="30" cy="55" rx="4" ry="3" fill="#FFB6C1" />
      </g>
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

const IMAGES = [
  { id: "cats", label: "Котики", component: CatsImage },
  { id: "hearts", label: "Сердечки", component: HeartsImage },
  { id: "flowers", label: "Цветы", component: FlowersImage },
  { id: "bunnies", label: "Зайчики", component: BunniesImage },
];

export default function CreatePage() {
  const [step, setStep] = useState(1);
  const [forWhom, setForWhom] = useState<"her" | "him">("her");
  const [recipientName, setRecipientName] = useState("");
  const [selectedImage, setSelectedImage] = useState("cats");
  const [selectedBackground, setSelectedBackground] = useState("pink");
  const [customText, setCustomText] = useState("Ты пойдешь со мной на свидание?");
  const [buttonYesText, setButtonYesText] = useState("Да");
  const [buttonNoText, setButtonNoText] = useState("Нет");
  const [generatedLink, setGeneratedLink] = useState("");
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const totalSteps = 6;
  const progress = (step / totalSteps) * 100;

  const handleCreate = async () => {
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
      button_yes_text: buttonYesText,
      button_no_text: buttonNoText,
      creator_id: session.user.id,
    });

    setIsLoading(false);
    if (error) {
      alert("Ошибка сохранения: " + error.message);
      return;
    }
    setGeneratedLink(`${window.location.origin}/i/${inviteId}`);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Экран с готовой ссылкой
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

  const SelectedImage = IMAGES.find((i) => i.id === selectedImage)?.component || CatsImage;
  const bgClass = BACKGROUNDS.find((b) => b.id === selectedBackground)?.class || "from-pink-100 to-white";

  return (
    <main className={`min-h-screen bg-gradient-to-b ${bgClass} transition-all duration-500 p-4 py-10`}>
      <div className="max-w-2xl mx-auto">
        <Link href="/" className="text-gray-500 hover:text-pink-500 mb-6 inline-block">← На главную</Link>

        {/* Прогресс-бар */}
        <div className="w-full bg-white/50 rounded-full h-2 mb-8">
          <div
            className="bg-pink-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-8 min-h-[400px] flex flex-col">
          {/* ШАГ 1: Кому */}
          {step === 1 && (
            <div className="flex-1 flex flex-col items-center justify-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">Кому адресовано?</h2>
              <div className="flex gap-4 w-full max-w-md">
                <button onClick={() => setForWhom("her")} className={`flex-1 py-4 px-6 rounded-2xl border-2 font-medium text-lg transition-all ${forWhom === "her" ? "border-pink-500 bg-pink-50 text-pink-600 scale-105" : "border-gray-200 text-gray-600"}`}>👩 Для неё</button>
                <button onClick={() => setForWhom("him")} className={`flex-1 py-4 px-6 rounded-2xl border-2 font-medium text-lg transition-all ${forWhom === "him" ? "border-blue-500 bg-blue-50 text-blue-600 scale-105" : "border-gray-200 text-gray-600"}`}>👨 Для него</button>
              </div>
            </div>
          )}

          {/* ШАГ 2: Имя */}
          {step === 2 && (
            <div className="flex-1 flex flex-col items-center justify-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">Как зовут получателя?</h2>
              <input
                type="text"
                value={recipientName}
                onChange={(e) => setRecipientName(e.target.value)}
                placeholder="Например: Аня"
                autoFocus
                className="w-full max-w-md p-4 border-2 border-gray-200 rounded-xl focus:border-pink-500 outline-none text-lg text-center transition-all"
              />
            </div>
          )}

          {/* ШАГ 3: Картинка */}
          {step === 3 && (
            <div className="flex-1 flex flex-col items-center justify-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">Выбери картинку</h2>
              <div className="grid grid-cols-2 gap-4 w-full max-w-md">
                {IMAGES.map((img) => {
                  const Img = img.component;
                  return (
                    <button key={img.id} onClick={() => setSelectedImage(img.id)} className={`flex flex-col items-center p-4 rounded-2xl border-2 transition-all ${selectedImage === img.id ? "border-pink-500 bg-pink-50 scale-105" : "border-gray-200 hover:border-pink-300"}`}>
                      <div className="w-full h-16 mb-2"><Img /></div>
                      <span className="text-sm text-gray-600 font-medium">{img.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* ШАГ 4: Фон */}
          {step === 4 && (
            <div className="flex-1 flex flex-col items-center justify-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">Выбери цвет фона</h2>
              <div className="grid grid-cols-2 gap-4 w-full max-w-md">
                {BACKGROUNDS.map((bg) => (
                  <button key={bg.id} onClick={() => setSelectedBackground(bg.id)} className={`flex flex-col items-center p-4 rounded-2xl border-2 transition-all ${selectedBackground === bg.id ? "border-pink-500 scale-105" : "border-gray-200"}`}>
                    <div className={`w-16 h-16 rounded-full ${bg.preview} border-2 border-gray-300 mb-2`}></div>
                    <span className="text-sm text-gray-600 font-medium">{bg.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ШАГ 5: Текст вопроса */}
          {step === 5 && (
            <div className="flex-1 flex flex-col items-center justify-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">Текст приглашения</h2>
              <textarea
                value={customText}
                onChange={(e) => setCustomText(e.target.value)}
                rows={3}
                autoFocus
                className="w-full max-w-md p-4 border-2 border-gray-200 rounded-xl focus:border-pink-500 outline-none text-lg resize-none"
              />
            </div>
          )}

          {/* ШАГ 6: Текст кнопок */}
          {step === 6 && (
            <div className="flex-1 flex flex-col items-center justify-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">Текст на кнопках</h2>
              <div className="w-full max-w-md space-y-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Кнопка «Да»</label>
                  <input type="text" value={buttonYesText} onChange={(e) => setButtonYesText(e.target.value)} className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-pink-500 outline-none text-lg" />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Кнопка «Нет»</label>
                  <input type="text" value={buttonNoText} onChange={(e) => setButtonNoText(e.target.value)} className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-pink-500 outline-none text-lg" />
                </div>
              </div>
            </div>
          )}

          {/* Кнопки навигации */}
          <div className="flex gap-4 mt-8">
            {step > 1 && (
              <button
                onClick={() => setStep(step - 1)}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-4 px-6 rounded-full transition-all duration-300 text-lg"
              >
                ← Назад
              </button>
            )}
            {step < totalSteps ? (
              <button
                onClick={() => {
                  if (step === 2 && !recipientName.trim()) {
                    alert("Пожалуйста, введите имя получателя!");
                    return;
                  }
                  setStep(step + 1);
                }}
                className="flex-1 bg-pink-500 hover:bg-pink-600 text-white font-bold py-4 px-6 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 text-lg"
              >
                Далее →
              </button>
            ) : (
              <button
                onClick={handleCreate}
                disabled={isLoading}
                className="flex-1 bg-pink-500 hover:bg-pink-600 text-white font-bold py-4 px-6 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 text-lg disabled:opacity-50 disabled:transform-none"
              >
                {isLoading ? "Создаем..." : "Создать приглашение 💖"}
              </button>
            )}
          </div>
        </div>

        {/* Превью */}
        {step >= 3 && (
          <div className="mt-8">
            <p className="text-gray-500 text-sm mb-2 text-center">Предпросмотр</p>
            <div className={`p-6 rounded-2xl bg-gradient-to-b ${bgClass} border-2 border-gray-200 transition-all duration-500`}>
              <div className="bg-white rounded-2xl p-4 shadow-md">
                <div className="w-full h-20 mb-3"><SelectedImage /></div>
                <p className="text-center text-sm font-semibold text-gray-700 mb-3">
                  {recipientName ? `${recipientName}, ` : ""}{customText}
                </p>
                <div className="flex gap-2 justify-center">
                  <span className="bg-pink-500 text-white text-xs font-bold px-4 py-2 rounded-full">{buttonYesText}</span>
                  <span className="bg-gray-300 text-gray-700 text-xs font-bold px-4 py-2 rounded-full">{buttonNoText}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}