"use client";

import { useState } from "react";
import Link from "next/link";
import { supabase, ensureAnonymousSession } from "@/lib/supabase";

const BACKGROUNDS = [
  { id: "pink", label: "Розовый", class: "from-pink-100 to-white", preview: "bg-pink-100" },
  { id: "blue", label: "Голубой", class: "from-blue-100 to-white", preview: "bg-blue-100" },
  { id: "beige", label: "Бежевый", class: "from-amber-50 to-white", preview: "bg-amber-50" },
  { id: "mint", label: "Мятный", class: "from-green-100 to-white", preview: "bg-green-100" },
];

const CATEGORIES = [
  { id: "food", label: "Блюда", icon: "🍕" },
  { id: "movie", label: "Кино", icon: "🎬" },
  { id: "activity", label: "Активности", icon: "🎨" },
  { id: "drink", label: "Напитки", icon: "☕" },
  { id: "place", label: "Места", icon: "📍" },
];

const NO_ANIMATIONS = [
  { id: "run", label: "Убегание", emoji: "🏃" },
  { id: "kiss", label: "Поцелуй", emoji: "💋" },
  { id: "shrink", label: "Уменьшение", emoji: "🔽" },
];

// Готовые заготовки для заголовка приглашения
const TEXT_PRESETS = [
  "Ты пойдешь со мной на свидание? ❤️",
  "У меня есть к тебе один вопрос... 💌",
  "Хочешь провести вечер вместе? 🌙",
  "Ты свободна в пятницу? 😏",
  "Давай устроим свидание мечты ✨",
];

// Готовые заготовки для кнопок
const BUTTON_YES_PRESETS = ["Да", "Конечно 💖", "С радостью!", "Я не против 😊", "Почему бы и нет?"];
const BUTTON_NO_PRESETS = ["Нет", "Не сейчас 😅", "Может, в другой раз", "Не сегодня 🙈"];

// Готовые заготовки для финального экрана
const FINAL_TITLE_PRESETS = [
  "Рад, что ты согласилась!",
  "Ура! Я знал, что ты согласишься 💖",
  "Отлично! Жду нашей встречи ✨",
];
const FINAL_DESC_PRESETS = [
  "Буду ждать тебя {date} в {time}, я приеду за тобой",
  "Встречаемся {date} в {time}. Не опаздывай! 😉",
  "{date} в {time} — я уже считаю минуты ⏰",
];

// ============ SVG-КОМПОНЕНТЫ (УЛУЧШЕННЫЕ) ============

function CatsImage() {
  return (
    <svg viewBox="0 0 200 120" className="w-full h-full">
      {/* Котик 1 (рыжий) */}
      <g transform="translate(35, 25)">
        <path d="M-5 65 Q-20 50 -10 30 Q-5 25 0 35" stroke="#E8A05C" strokeWidth="7" fill="none" strokeLinecap="round"/>
        <ellipse cx="30" cy="65" rx="32" ry="30" fill="#F4A460"/>
        <path d="M5 45 L0 15 L25 35 Z" fill="#F4A460"/>
        <path d="M55 45 L60 15 L35 35 Z" fill="#F4A460"/>
        <path d="M8 42 L5 22 L22 37 Z" fill="#FFB6C1"/>
        <path d="M52 42 L55 22 L38 37 Z" fill="#FFB6C1"/>
        <ellipse cx="30" cy="60" rx="22" ry="20" fill="#FDD9A0"/>
        <circle cx="20" cy="55" r="4" fill="#2C1810"/>
        <circle cx="40" cy="55" r="4" fill="#2C1810"/>
        <circle cx="21" cy="54" r="1.5" fill="#FFFFFF"/>
        <circle cx="41" cy="54" r="1.5" fill="#FFFFFF"/>
        <path d="M28 64 L32 64 L30 67 Z" fill="#FF69B4"/>
        <path d="M30 67 Q26 71 23 69" stroke="#2C1810" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
        <path d="M30 67 Q34 71 37 69" stroke="#2C1810" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
        <line x1="10" y1="63" x2="20" y2="64" stroke="#2C1810" strokeWidth="1"/>
        <line x1="10" y1="67" x2="20" y2="66" stroke="#2C1810" strokeWidth="1"/>
        <line x1="50" y1="63" x2="40" y2="64" stroke="#2C1810" strokeWidth="1"/>
        <line x1="50" y1="67" x2="40" y2="66" stroke="#2C1810" strokeWidth="1"/>
      </g>

      {/* Котик 2 (белый) */}
      <g transform="translate(105, 30)">
        <path d="M65 60 Q80 50 75 30 Q72 22 65 30" stroke="#E8E0D8" strokeWidth="7" fill="none" strokeLinecap="round"/>
        <ellipse cx="30" cy="60" rx="30" ry="28" fill="#FFFFFF" stroke="#E8E0D8" strokeWidth="1.5"/>
        <path d="M8 40 L3 12 L25 32 Z" fill="#FFFFFF" stroke="#E8E0D8" strokeWidth="1.5"/>
        <path d="M52 40 L57 12 L35 32 Z" fill="#FFFFFF" stroke="#E8E0D8" strokeWidth="1.5"/>
        <path d="M10 37 L7 18 L22 34 Z" fill="#FFE0EC"/>
        <path d="M50 37 L53 18 L38 34 Z" fill="#FFE0EC"/>
        <ellipse cx="30" cy="58" rx="20" ry="18" fill="#FFF5F8"/>
        <circle cx="20" cy="52" r="4" fill="#2C1810"/>
        <circle cx="40" cy="52" r="4" fill="#2C1810"/>
        <circle cx="21" cy="51" r="1.5" fill="#FFFFFF"/>
        <circle cx="41" cy="51" r="1.5" fill="#FFFFFF"/>
        <path d="M28 61 L32 61 L30 64 Z" fill="#FF69B4"/>
        <path d="M30 64 Q26 68 23 66" stroke="#2C1810" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
        <path d="M30 64 Q34 68 37 66" stroke="#2C1810" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
        <line x1="10" y1="60" x2="20" y2="61" stroke="#2C1810" strokeWidth="1"/>
        <line x1="10" y1="64" x2="20" y2="63" stroke="#2C1810" strokeWidth="1"/>
        <line x1="50" y1="60" x2="40" y2="61" stroke="#2C1810" strokeWidth="1"/>
        <line x1="50" y1="64" x2="40" y2="63" stroke="#2C1810" strokeWidth="1"/>
      </g>

      {/* Сердечко между ними */}
      <path d="M100 75 C100 68, 108 62, 114 68 C120 62, 128 68, 128 75 C128 85, 114 95, 114 95 C114 95, 100 85, 100 75 Z" fill="#FF1493"/>
      <path d="M104 74 C104 71, 108 69, 110 71" stroke="#FFB6C1" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
    </svg>
  );
}

function HeartsImage() {
  return (
    <svg viewBox="0 0 200 120" className="w-full h-full">
      <g transform="translate(40, 30)">
        <path d="M25 60 C25 45, 5 38, 5 25 C5 12, 20 8, 25 18 C30 8, 45 12, 45 25 C45 38, 25 45, 25 60 Z" fill="#FF1493"/>
        <path d="M15 22 C15 18, 20 16, 22 20" stroke="#FFB6C1" strokeWidth="2" fill="none" strokeLinecap="round"/>
      </g>
      <g transform="translate(75, 20)">
        <path d="M30 75 C30 55, 0 45, 0 28 C0 12, 18 6, 30 20 C42 6, 60 12, 60 28 C60 45, 30 55, 30 75 Z" fill="#FF69B4"/>
        <path d="M15 25 C15 20, 22 17, 25 22" stroke="#FFD1E8" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      </g>
      <g transform="translate(130, 30)">
        <path d="M25 60 C25 45, 5 38, 5 25 C5 12, 20 8, 25 18 C30 8, 45 12, 45 25 C45 38, 25 45, 25 60 Z" fill="#FF1493"/>
        <path d="M15 22 C15 18, 20 16, 22 20" stroke="#FFB6C1" strokeWidth="2" fill="none" strokeLinecap="round"/>
      </g>
    </svg>
  );
}

function FlowersImage() {
  return (
    <svg viewBox="0 0 200 120" className="w-full h-full">
      <g transform="translate(30, 20)">
        <line x1="20" y1="45" x2="20" y2="85" stroke="#4CAF50" strokeWidth="3" strokeLinecap="round"/>
        <path d="M20 65 Q10 60 8 68 Q14 70 20 68" fill="#4CAF50"/>
        <circle cx="20" cy="30" r="9" fill="#FFD700"/>
        <circle cx="10" cy="25" r="9" fill="#FF8FC0"/>
        <circle cx="30" cy="25" r="9" fill="#FF8FC0"/>
        <circle cx="10" cy="38" r="9" fill="#FF8FC0"/>
        <circle cx="30" cy="38" r="9" fill="#FF8FC0"/>
        <circle cx="20" cy="18" r="9" fill="#FF8FC0"/>
        <circle cx="20" cy="30" r="4" fill="#FFD700"/>
      </g>
      <g transform="translate(85, 25)">
        <line x1="20" y1="45" x2="20" y2="80" stroke="#4CAF50" strokeWidth="3" strokeLinecap="round"/>
        <path d="M20 60 Q30 55 32 63 Q26 65 20 63" fill="#4CAF50"/>
        <circle cx="10" cy="25" r="9" fill="#FF5C8A"/>
        <circle cx="30" cy="25" r="9" fill="#FF5C8A"/>
        <circle cx="10" cy="38" r="9" fill="#FF5C8A"/>
        <circle cx="30" cy="38" r="9" fill="#FF5C8A"/>
        <circle cx="20" cy="18" r="9" fill="#FF5C8A"/>
        <circle cx="20" cy="30" r="4" fill="#FFD700"/>
      </g>
      <g transform="translate(140, 20)">
        <line x1="20" y1="45" x2="20" y2="85" stroke="#4CAF50" strokeWidth="3" strokeLinecap="round"/>
        <path d="M20 65 Q10 60 8 68 Q14 70 20 68" fill="#4CAF50"/>
        <circle cx="10" cy="25" r="9" fill="#B57EDC"/>
        <circle cx="30" cy="25" r="9" fill="#B57EDC"/>
        <circle cx="10" cy="38" r="9" fill="#B57EDC"/>
        <circle cx="30" cy="38" r="9" fill="#B57EDC"/>
        <circle cx="20" cy="18" r="9" fill="#B57EDC"/>
        <circle cx="20" cy="30" r="4" fill="#FFD700"/>
      </g>
    </svg>
  );
}

function BunniesImage() {
  return (
    <svg viewBox="0 0 200 120" className="w-full h-full">
      <g transform="translate(45, 30)">
        <ellipse cx="20" cy="15" rx="6" ry="20" fill="#FFFFFF" stroke="#E8E0D8" strokeWidth="1.5"/>
        <ellipse cx="40" cy="15" rx="6" ry="20" fill="#FFFFFF" stroke="#E8E0D8" strokeWidth="1.5"/>
        <ellipse cx="20" cy="15" rx="3" ry="15" fill="#FFE0EC"/>
        <ellipse cx="40" cy="15" rx="3" ry="15" fill="#FFE0EC"/>
        <ellipse cx="30" cy="60" rx="28" ry="25" fill="#FFFFFF" stroke="#E8E0D8" strokeWidth="1.5"/>
        <circle cx="20" cy="55" r="4" fill="#2C1810"/>
        <circle cx="40" cy="55" r="4" fill="#2C1810"/>
        <circle cx="21" cy="54" r="1.5" fill="#FFFFFF"/>
        <circle cx="41" cy="54" r="1.5" fill="#FFFFFF"/>
        <ellipse cx="30" cy="63" rx="3" ry="2" fill="#FF69B4"/>
        <circle cx="15" cy="62" r="4" fill="#FFD1E8" opacity="0.7"/>
        <circle cx="45" cy="62" r="4" fill="#FFD1E8" opacity="0.7"/>
        <path d="M28 66 Q30 68 32 66" stroke="#2C1810" strokeWidth="1" fill="none" strokeLinecap="round"/>
      </g>
      <g transform="translate(115, 35)">
        <ellipse cx="20" cy="15" rx="6" ry="20" fill="#FFE4E1" stroke="#E8C8C0" strokeWidth="1.5"/>
        <ellipse cx="40" cy="15" rx="6" ry="20" fill="#FFE4E1" stroke="#E8C8C0" strokeWidth="1.5"/>
        <ellipse cx="20" cy="15" rx="3" ry="15" fill="#FFB6C1"/>
        <ellipse cx="40" cy="15" rx="3" ry="15" fill="#FFB6C1"/>
        <ellipse cx="30" cy="55" rx="26" ry="23" fill="#FFE4E1" stroke="#E8C8C0" strokeWidth="1.5"/>
        <circle cx="20" cy="50" r="4" fill="#2C1810"/>
        <circle cx="40" cy="50" r="4" fill="#2C1810"/>
        <circle cx="21" cy="49" r="1.5" fill="#FFFFFF"/>
        <circle cx="41" cy="49" r="1.5" fill="#FFFFFF"/>
        <ellipse cx="30" cy="58" rx="3" ry="2" fill="#FF69B4"/>
        <circle cx="15" cy="57" r="4" fill="#FFB6C1" opacity="0.7"/>
        <circle cx="45" cy="57" r="4" fill="#FFB6C1" opacity="0.7"/>
        <path d="M28 61 Q30 63 32 61" stroke="#2C1810" strokeWidth="1" fill="none" strokeLinecap="round"/>
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
  const [customImageUrl, setCustomImageUrl] = useState<string | null>(null);
  const [selectedBackground, setSelectedBackground] = useState("pink");
  const [customBackgroundUrl, setCustomBackgroundUrl] = useState<string | null>(null);
  const [customText, setCustomText] = useState("Ты пойдешь со мной на свидание?");
  const [buttonYesText, setButtonYesText] = useState("Да");
  const [buttonNoText, setButtonNoText] = useState("Нет");
  const [selectedCategories, setSelectedCategories] = useState<string[]>(["food"]);
  const [noAnimation, setNoAnimation] = useState("run");
  const [finalTitle, setFinalTitle] = useState("Рад, что ты согласилась!");
  const [finalDescription, setFinalDescription] = useState("Буду ждать тебя {date} в {time}, я приеду за тобой");
  const [generatedLink, setGeneratedLink] = useState("");
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const totalSteps = 8;
  const progress = (step / totalSteps) * 100;

  const toggleCategory = (id: string) => {
    if (selectedCategories.includes(id)) {
      if (selectedCategories.length > 1) setSelectedCategories(selectedCategories.filter((c) => c !== id));
      else alert("Выберите хотя бы одну категорию!");
    } else {
      setSelectedCategories([...selectedCategories, id]);
    }
  };

  const uploadFile = async (file: File, type: "image" | "background") => {
    setIsUploading(true);
    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `${type}/${fileName}`;

      const { error: uploadError } = await supabase.storage.from("invites").upload(filePath, file);
      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage.from("invites").getPublicUrl(filePath);

      if (type === "image") setCustomImageUrl(urlData.publicUrl);
      else setCustomBackgroundUrl(urlData.publicUrl);
    } catch (err: any) {
      alert("Ошибка загрузки: " + err.message);
    } finally {
      setIsUploading(false);
    }
  };

  const handleCreate = async () => {
    setIsLoading(true);
    const session = await ensureAnonymousSession();
    if (!session) { alert("Ошибка авторизации."); setIsLoading(false); return; }
    const inviteId = Math.random().toString(36).substring(2, 10);
    const { error } = await supabase.from("invites").insert({
      id: inviteId, for_whom: forWhom, recipient_name: recipientName,
      image: selectedImage, custom_image_url: customImageUrl,
      background_color: selectedBackground, custom_background_url: customBackgroundUrl,
      custom_text: customText,
      button_yes_text: buttonYesText, button_no_text: buttonNoText,
      categories: selectedCategories, no_animation: noAnimation,
      final_title: finalTitle, final_description: finalDescription,
      creator_id: session.user.id,
    });
    setIsLoading(false);
    if (error) { alert("Ошибка сохранения: " + error.message); return; }
    setGeneratedLink(`${window.location.origin}/i/${inviteId}`);
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
          <div className="bg-gray-100 p-4 rounded-xl mb-4 break-all text-sm text-gray-700 border-2 border-dashed border-gray-300">{generatedLink}</div>
          <button onClick={copyToClipboard} className={`w-full font-bold py-4 px-6 rounded-full transition-all duration-300 shadow-lg text-lg mb-4 ${copied ? "bg-green-500 text-white" : "bg-pink-500 hover:bg-pink-600 text-white"}`}>{copied ? "✅ Скопировано!" : "📋 Скопировать ссылку"}</button>
          <Link href="/" className="text-gray-500 hover:text-pink-500 font-medium">← Вернуться на главную</Link>
        </div>
      </main>
    );
  }

  const SelectedImage = IMAGES.find((i) => i.id === selectedImage)?.component || CatsImage;
  const bgClass = BACKGROUNDS.find((b) => b.id === selectedBackground)?.class || "from-pink-100 to-white";

  const PresetChips = ({ presets, onSelect }: { presets: string[]; onSelect: (text: string) => void }) => (
    <div className="flex flex-wrap gap-2 mt-3 justify-center">
      {presets.map((preset, i) => (
        <button
          key={i}
          onClick={() => onSelect(preset)}
          className="text-xs bg-pink-50 hover:bg-pink-100 text-pink-600 border border-pink-200 px-3 py-1.5 rounded-full transition-all hover:scale-105"
        >
          {preset.length > 35 ? preset.substring(0, 35) + "..." : preset}
        </button>
      ))}
    </div>
  );

  return (
    <main className="relative min-h-screen bg-gradient-to-br from-pink-100 via-rose-50 to-blue-50 overflow-hidden flex items-center justify-center p-4 py-10">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-1/3 -right-20 w-96 h-96 bg-rose-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      </div>
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[10%] left-[5%] text-4xl opacity-30 animate-float-slow">❤️</div>
        <div className="absolute top-[20%] right-[10%] text-3xl opacity-30 animate-float-medium">💖</div>
        <div className="absolute bottom-[15%] left-[15%] text-3xl opacity-30 animate-float-fast">💕</div>
      </div>

      <div className="relative z-10 max-w-2xl w-full">
        <Link href="/" className="text-gray-500 hover:text-pink-500 mb-6 inline-block">← На главную</Link>
        <div className="w-full bg-white/50 rounded-full h-2 mb-8">
          <div className="bg-gradient-to-r from-pink-500 to-rose-500 h-2 rounded-full transition-all duration-500 shadow-lg" style={{ width: `${progress}%` }}></div>
        </div>

        <div className="bg-white/70 backdrop-blur-xl rounded-[2rem] shadow-2xl p-8 min-h-[400px] flex flex-col border border-white/80">
          {step === 1 && (<div className="flex-1 flex flex-col items-center justify-center"><h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Кому адресовано?</h2><div className="flex gap-4 w-full max-w-md"><button onClick={() => setForWhom("her")} className={`flex-1 py-5 px-6 rounded-2xl border-2 font-bold text-lg transition-all duration-300 transform hover:scale-105 ${forWhom === "her" ? "border-pink-500 bg-gradient-to-br from-pink-50 to-rose-50 text-pink-600 shadow-lg" : "border-gray-200 text-gray-600 hover:border-pink-300"}`}><span className="block text-3xl mb-1">👩</span>Для неё</button><button onClick={() => setForWhom("him")} className={`flex-1 py-5 px-6 rounded-2xl border-2 font-bold text-lg transition-all duration-300 transform hover:scale-105 ${forWhom === "him" ? "border-blue-500 bg-gradient-to-br from-blue-50 to-cyan-50 text-blue-600 shadow-lg" : "border-gray-200 text-gray-600 hover:border-blue-300"}`}><span className="block text-3xl mb-1">👨</span>Для него</button></div></div>)}

          {step === 2 && (<div className="flex-1 flex flex-col items-center justify-center"><h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Как зовут получателя?</h2><input type="text" value={recipientName} onChange={(e) => setRecipientName(e.target.value)} placeholder="Например: Аня" autoFocus className="w-full max-w-md p-5 border-2 border-gray-200 rounded-2xl focus:border-pink-500 focus:ring-4 focus:ring-pink-100 outline-none text-lg text-center transition-all text-gray-900 placeholder:text-gray-400" /></div>)}

          {step === 3 && (
            <div className="flex-1 flex flex-col items-center justify-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Выбери картинку</h2>
              <div className="grid grid-cols-2 gap-3 w-full max-w-md mb-6">
                {IMAGES.map((img) => {
                  const Img = img.component;
                  return (
                    <button key={img.id} onClick={() => { setSelectedImage(img.id); setCustomImageUrl(null); }} className={`flex flex-col items-center p-3 rounded-2xl border-2 transition-all duration-300 transform hover:-translate-y-1 ${selectedImage === img.id && !customImageUrl ? "border-pink-500 bg-pink-50 scale-105 shadow-md" : "border-gray-200 hover:border-pink-300"}`}>
                      <div className="w-full h-16 mb-1"><Img /></div>
                      <span className="text-xs text-gray-600 font-medium">{img.label}</span>
                    </button>
                  );
                })}
              </div>

              <div className="w-full max-w-md">
                <label className="block text-gray-700 font-medium mb-2 text-center text-sm">Или загрузи свою картинку</label>
                <label className={`flex flex-col items-center justify-center w-full h-28 border-2 border-dashed rounded-2xl cursor-pointer transition-all hover:border-pink-400 hover:bg-pink-50 ${customImageUrl ? "border-pink-500 bg-pink-50" : "border-gray-300"}`}>
                  {customImageUrl ? (
                    <img src={customImageUrl} alt="Своя картинка" className="max-h-24 object-contain" />
                  ) : (
                    <>
                      <span className="text-2xl mb-1">📤</span>
                      <span className="text-xs text-gray-500">{isUploading ? "Загрузка..." : "Нажми, чтобы загрузить"}</span>
                    </>
                  )}
                  <input type="file" accept="image/*" className="hidden" onChange={(e) => { const file = e.target.files?.[0]; if (file) uploadFile(file, "image"); }} disabled={isUploading} />
                </label>
                {customImageUrl && <button onClick={() => setCustomImageUrl(null)} className="text-xs text-red-500 mt-1 block mx-auto">Удалить свою картинку</button>}
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="flex-1 flex flex-col items-center justify-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Выбери цвет фона</h2>
              <div className="grid grid-cols-2 gap-3 w-full max-w-md mb-6">
                {BACKGROUNDS.map((bg) => (
                  <button key={bg.id} onClick={() => { setSelectedBackground(bg.id); setCustomBackgroundUrl(null); }} className={`flex flex-col items-center p-3 rounded-2xl border-2 transition-all duration-300 transform hover:-translate-y-1 ${selectedBackground === bg.id && !customBackgroundUrl ? "border-pink-500 scale-105 shadow-md" : "border-gray-200 hover:border-pink-300"}`}>
                    <div className={`w-12 h-12 rounded-full ${bg.preview} border-2 border-gray-300 mb-1`}></div>
                    <span className="text-xs text-gray-600 font-medium">{bg.label}</span>
                  </button>
                ))}
              </div>

              <div className="w-full max-w-md">
                <label className="block text-gray-700 font-medium mb-2 text-center text-sm">Или загрузи свой фон</label>
                <label className={`flex flex-col items-center justify-center w-full h-28 border-2 border-dashed rounded-2xl cursor-pointer transition-all hover:border-pink-400 hover:bg-pink-50 ${customBackgroundUrl ? "border-pink-500 bg-pink-50" : "border-gray-300"}`}>
                  {customBackgroundUrl ? (
                    <img src={customBackgroundUrl} alt="Свой фон" className="max-h-24 object-cover rounded-lg" />
                  ) : (
                    <>
                      <span className="text-2xl mb-1">🖼️</span>
                      <span className="text-xs text-gray-500">{isUploading ? "Загрузка..." : "Нажми, чтобы загрузить фон"}</span>
                    </>
                  )}
                  <input type="file" accept="image/*" className="hidden" onChange={(e) => { const file = e.target.files?.[0]; if (file) uploadFile(file, "background"); }} disabled={isUploading} />
                </label>
                {customBackgroundUrl && <button onClick={() => setCustomBackgroundUrl(null)} className="text-xs text-red-500 mt-1 block mx-auto">Удалить свой фон</button>}
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="flex-1 flex flex-col items-center justify-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Текст приглашения</h2>
              <div className="w-full max-w-md">
                <textarea value={customText} onChange={(e) => setCustomText(e.target.value)} rows={3} autoFocus className="w-full p-5 border-2 border-gray-200 rounded-2xl focus:border-pink-500 focus:ring-4 focus:ring-pink-100 outline-none text-lg resize-none text-gray-900 placeholder:text-gray-400" />
                <p className="text-xs text-gray-500 mt-2 text-center">Готовые заготовки — нажми, чтобы подставить</p>
                <PresetChips presets={TEXT_PRESETS} onSelect={setCustomText} />
              </div>
            </div>
          )}

          {step === 6 && (
            <div className="flex-1 flex flex-col items-center justify-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Текст на кнопках</h2>
              <div className="w-full max-w-md space-y-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Кнопка «Да»</label>
                  <input type="text" value={buttonYesText} onChange={(e) => setButtonYesText(e.target.value)} className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-pink-500 focus:ring-4 focus:ring-pink-100 outline-none text-lg text-gray-900" />
                  <PresetChips presets={BUTTON_YES_PRESETS} onSelect={setButton