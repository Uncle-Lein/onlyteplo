"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { IMAGES, CatsImage } from "@/components/Images";

const ALL_OPTIONS: Record<string, { id: string; name: string; emoji: string }[]> = {
  food: [
    { id: "pizza", name: "Пицца", emoji: "🍕" }, { id: "sushi", name: "Суши", emoji: "🍣" },
    { id: "burger", name: "Бургер", emoji: "🍔" }, { id: "pasta", name: "Паста", emoji: "🍝" },
    { id: "ramen", name: "Рамен", emoji: "🍜" }, { id: "rollton", name: "Ролтон", emoji: "🍲" },
  ],
  movie: [
    { id: "comedy", name: "Комедия", emoji: "🎭" }, { id: "drama", name: "Мелодрама", emoji: "💔" },
    { id: "action", name: "Боевик", emoji: "💥" }, { id: "cartoon", name: "Мультик", emoji: "🎨" },
    { id: "sci-fi", name: "Фантастика", emoji: "🚀" }, { id: "horror", name: "Ужасы", emoji: "👻" },
  ],
  activity: [
    { id: "walk", name: "Прогулка", emoji: "🚶" }, { id: "cinema", name: "Кино", emoji: "🎬" },
    { id: "bowling", name: "Боулинг", emoji: "🎳" }, { id: "museum", name: "Музей", emoji: "🏛️" },
    { id: "picnic", name: "Пикник", emoji: "🧺" }, { id: "quest", name: "Квест", emoji: "🔍" },
  ],
  drink: [
    { id: "coffee", name: "Кофе", emoji: "☕" }, { id: "tea", name: "Чай", emoji: "🍵" },
    { id: "juice", name: "Сок", emoji: "🧃" }, { id: "smoothie", name: "Смузи", emoji: "🥤" },
    { id: "milkshake", name: "Милкшейк", emoji: "🍦" }, { id: "lemonade", name: "Лимонад", emoji: "🍋" },
  ],
  place: [
    { id: "restaurant", name: "Ресторан", emoji: "🍽️" }, { id: "park", name: "Парк", emoji: "🌳" },
    { id: "embankment", name: "Набережная", emoji: "🌊" }, { id: "rooftop", name: "Крыша", emoji: "🌃" },
    { id: "cafe", name: "Кафе", emoji: "☕" }, { id: "home", name: "Дома", emoji: "🏠" },
  ],
};

const CATEGORY_TITLES: Record<string, { title: string; subtitle: string }> = {
  food: { title: "Что ты хочешь?", subtitle: "Выбери что тебе в кайф" },
  movie: { title: "Что посмотрим?", subtitle: "Выбери фильм на вечер" },
  activity: { title: "Чем займемся?", subtitle: "Выбери активность" },
  drink: { title: "Что будем пить?", subtitle: "Выбери напиток" },
  place: { title: "Куда пойдем?", subtitle: "Выбери место" },
};

const TEXTS = {
  her: {
    dateQuestion: "Когда ты свободна?",
    dateSubtitle: "Выбери удобный день и время",
    finalFallback: "Рад, что ты согласилась!",
  },
  him: {
    dateQuestion: "Когда ты свободен?",
    dateSubtitle: "Выбери удобный день и время",
    finalFallback: "Рада, что ты согласился!",
  },
};

const BG_CLASSES: Record<string, string> = { pink: "from-pink-100 to-white", blue: "from-blue-100 to-white", beige: "from-amber-50 to-white", mint: "from-green-100 to-white" };

export default function InvitePage() {
  const params = useParams();
  const inviteId = params.id as string;

  const [step, setStep] = useState(1);
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const [noButtonScale, setNoButtonScale] = useState(1);
  const [showKiss, setShowKiss] = useState(false);
  const [isNoButtonHidden, setIsNoButtonHidden] = useState(false);
  const [selectedFoods, setSelectedFoods] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [inviteData, setInviteData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [dbError, setDbError] = useState<string | null>(null);
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);

  useEffect(() => {
    const fetchInvite = async () => {
      if (!inviteId) return;
      const { data, error } = await supabase.from("invites").select("*").eq("id", inviteId).single();
      if (error) setDbError(`Ошибка: ${error.message}`);
      else if (!data) setDbError("Приглашение не найдено.");
      else {
        setInviteData(data);
        // Записываем, что приглашение просмотрено
        if (!data.viewed_at) {
          await supabase.from("invites").update({ viewed_at: new Date().toISOString() }).eq("id", inviteId);
        }
      }
      setIsLoading(false);
    };
    fetchInvite();
  }, [inviteId]);

  const handleNoClick = () => {
    const anim = inviteData?.no_animation || "run";
    if (anim === "kiss") {
      setShowKiss(true);
      setIsNoButtonHidden(true);
      setTimeout(() => { setShowKiss(false); setIsNoButtonHidden(false); }, 2000);
    } else if (anim === "shrink") {
      setNoButtonScale((prev) => Math.max(prev - 0.2, 0.1));
    } else if (anim === "run") {
      setNoButtonPosition({ x: Math.random() * 200 - 100, y: Math.random() * 200 - 100 });
    }
  };

  const toggleFood = (foodId: string) => {
    if (selectedFoods.includes(foodId)) setSelectedFoods(selectedFoods.filter((id) => id !== foodId));
    else setSelectedFoods([...selectedFoods, foodId]);
  };

  const handleNextCategory = () => {
    const categories = inviteData?.categories || ["food"];
    if (activeCategoryIndex < categories.length - 1) setActiveCategoryIndex(activeCategoryIndex + 1);
    else setStep(3);
  };

  const handlePrevCategory = () => {
    if (activeCategoryIndex > 0) setActiveCategoryIndex(activeCategoryIndex - 1);
    else setStep(1);
  };

  const handleDateConfirm = async () => {
    if (!selectedDate || !selectedTime) { alert("Выбери дату и время!"); return; }
    const { error } = await supabase.from("answers").insert({ invite_id: inviteId, recipient_name: inviteData?.recipient_name, foods: selectedFoods, meeting_date: selectedDate, meeting_time: selectedTime });
    if (error) { alert("Ошибка: " + error.message); return; }
    setStep(4);
  };

  // Функция шаринга
  const handleShare = async (platform: string) => {
    const url = window.location.href;
    const text = `Приглашение на свидание: ${url}`;

    if (platform === "telegram") {
      window.open(`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent("Приглашение на свидание 💌")}`, "_blank");
    } else if (platform === "whatsapp") {
      window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
    } else if (platform === "vk") {
      window.open(`https://vk.com/share.php?url=${encodeURIComponent(url)}`, "_blank");
    } else if (platform === "copy") {
      navigator.clipboard.writeText(url);
      alert("✅ Ссылка скопирована!");
    }
  };

  const ImageComponent = IMAGES.find((i) => i.id === inviteData?.image)?.component || CatsImage;
  const bgClass = BG_CLASSES[inviteData?.background_color] || "from-pink-100 to-white";
  const useCustomImage = !!inviteData?.custom_image_url;
  const useCustomBackground = !!inviteData?.custom_background_url;
  const categories = inviteData?.categories || ["food"];
  const currentCategory = categories[activeCategoryIndex];

  // Стандартные + кастомные варианты
  const defaultOpts = ALL_OPTIONS[currentCategory] || [];
  const customOpts = inviteData?.custom_options?.[currentCategory] || [];
  const currentOptions = [...defaultOpts, ...customOpts];

  const categoryInfo = CATEGORY_TITLES[currentCategory] || { title: "Выбери", subtitle: "" };
  const t = TEXTS[inviteData?.for_whom === "him" ? "him" : "her"];

  const finalDescriptionText = (inviteData?.final_description || "")
    .replace("{date}", selectedDate).replace("{time}", selectedTime).replace("{food}", selectedFoods.join(", "));

  const bgStyle = useCustomBackground
    ? { backgroundImage: `url(${inviteData.custom_background_url})`, backgroundSize: "cover", backgroundPosition: "center" }
    : {};
  const bgClassName = useCustomBackground ? "" : `bg-gradient-to-b ${bgClass}`;

  if (isLoading) return <main className="flex min-h-screen items-center justify-center bg-pink-50"><p className="text-xl text-gray-500 animate-pulse">Загрузка...</p></main>;
  if (dbError || !inviteData) return <main className="flex min-h-screen flex-col items-center justify-center bg-pink-50 p-4 text-center"><h1 className="text-5xl font-bold text-gray-800 mb-4">😕</h1><p className="text-xl text-gray-600 mb-4">Приглашение не найдено.</p><Link href="/" className="text-pink-500 font-medium">← На главную</Link></main>;

  if (step === 4) {
    return (
      <main className={`relative min-h-screen overflow-hidden flex items-center justify-center p-4 ${bgClassName}`} style={bgStyle}>
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {['🎉', '💖', '✨', '🎊', '❤️', '💕', '🌸', '💫'].map((emoji, i) => (
            <div key={i} className="absolute text-2xl" style={{ left: `${Math.random() * 100}%`, top: `-10%`, animation: `confetti-fall ${3 + Math.random() * 3}s linear ${Math.random() * 3}s infinite` }}>{emoji}</div>
          ))}
        </div>
        <div className="relative z-10 max-w-md w-full bg-white/70 backdrop-blur-xl rounded-[2.5rem] shadow-2xl p-8 text-center border border-white/80">
          <div className="text-7xl mb-4 animate-bounce">💖</div>
          <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-rose-500 mb-6">{inviteData?.final_title || t.finalFallback}</h1>
          <div className="bg-gradient-to-br from-pink-50/80 to-rose-50/80 rounded-2xl p-6 mb-6 border border-pink-100"><p className="text-lg text-gray-700 leading-relaxed">{finalDescriptionText}</p></div>
          <div className="space-y-3 mb-6">
            {selectedFoods.length > 0 && (<div className="bg-white/60 rounded-xl p-3 border border-pink-100"><p className="text-xs text-gray-500 uppercase tracking-wide mb-1">🍽 Твой выбор</p><p className="text-sm font-semibold text-gray-800">{selectedFoods.map((id: string) => { const allOptions = [...Object.values(ALL_OPTIONS).flat(), ...Object.values(inviteData?.custom_options || {}).flat()]; const opt = allOptions.find((o: any) => o.id === id); return opt ? `${opt.emoji} ${opt.name}` : id; }).join(", ")}</p></div>)}
            {selectedDate && (<div className="bg-white/60 rounded-xl p-3 border border-pink-100"><p className="text-xs text-gray-500 uppercase tracking-wide mb-1">📅 Дата встречи</p><p className="text-sm font-semibold text-gray-800">{selectedDate} в {selectedTime}</p></div>)}
          </div>
          <p className="text-lg text-gray-500 font-medium mb-6">Жду нашей встречи ❤️</p>

          {/* Кнопки шаринга */}
          <div className="flex justify-center gap-3">
            <button onClick={() => handleShare("telegram")} className="w-12 h-12 rounded-full bg-blue-500 hover:bg-blue-600 text-white flex items-center justify-center transition-all hover:scale-110" title="Поделиться в Telegram">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.26-1.91.178-.184 3.266-2.992 3.326-3.25.007-.03.014-.14-.052-.198-.066-.058-.162-.038-.232-.022-.1.022-1.69 1.07-4.77 3.15-.45.31-.86.46-1.22.45-.4-.01-1.17-.23-1.74-.41-.7-.23-1.26-.35-1.21-.74.02-.2.3-.4.84-.61 3.28-1.43 5.47-2.37 6.56-2.83 3.12-1.3 3.77-1.53 4.19-1.53z"/></svg>
            </button>
            <button onClick={() => handleShare("whatsapp")} className="w-12 h-12 rounded-full bg-green-500 hover:bg-green-600 text-white flex items-center justify-center transition-all hover:scale-110" title="Поделиться в WhatsApp">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
            </button>
            <button onClick={() => handleShare("vk")} className="w-12 h-12 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center transition-all hover:scale-110 font-bold" title="Поделиться в VK">VK</button>
            <button onClick={() => handleShare("copy")} className="w-12 h-12 rounded-full bg-gray-600 hover:bg-gray-700 text-white flex items-center justify-center transition-all hover:scale-110" title="Скопировать ссылку">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
            </button>
          </div>
        </div>
      </main>
    );
  }

  if (step === 3) {
    return (
      <main className={`flex min-h-screen flex-col items-center justify-center p-4 ${bgClassName}`} style={bgStyle}>
        <div className="max-w-md w-full bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl p-8 flex flex-col items-center border border-white/80 relative">
          <button onClick={() => setStep(2)} className="absolute top-4 left-4 text-gray-400 hover:text-pink-500 text-sm font-medium">← Назад</button>
          <h1 className="text-3xl font-bold text-gray-800 text-center mb-2 mt-4">{t.dateQuestion}</h1>
          <p className="text-gray-500 text-center mb-8">{t.dateSubtitle}</p>
          <div className="w-full space-y-6 mb-8">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Дата</label>
              <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-pink-500 outline-none text-lg transition-all text-gray-900 box-border" />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Время</label>
              <input type="time" value={selectedTime} onChange={(e) => setSelectedTime(e.target.value)} className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-pink-500 outline-none text-lg transition-all text-gray-900 box-border" />
            </div>
          </div>
          <button onClick={handleDateConfirm} className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-4 px-6 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 text-lg">Подтвердить</button>
        </div>
      </main>
    );
  }

  if (step === 2) {
    return (
      <main className={`flex min-h-screen flex-col items-center justify-center p-4 ${bgClassName}`} style={bgStyle}>
        <div className="max-w-md w-full bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl p-8 flex flex-col items-center border border-white/80 relative">
          <button onClick={handlePrevCategory} className="absolute top-4 left-4 text-gray-400 hover:text-pink-500 text-sm font-medium">← Назад</button>
          <div className="w-full bg-gray-100 rounded-full h-1.5 mb-6 mt-4"><div className="bg-pink-500 h-1.5 rounded-full transition-all duration-500" style={{ width: `${((activeCategoryIndex + 1) / categories.length) * 100}%` }}></div></div>
          <h1 className="text-3xl font-bold text-gray-800 text-center mb-2">{categoryInfo.title}</h1>
          <p className="text-gray-500 text-center mb-8">{categoryInfo.subtitle}</p>
          <div className="grid grid-cols-2 gap-4 w-full mb-8">
            {currentOptions.map((opt) => (
              <button key={opt.id} onClick={() => toggleFood(opt.id)} className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all duration-300 ${selectedFoods.includes(opt.id) ? "border-pink-500 bg-pink-50 scale-105 shadow-md" : "border-gray-200 hover:border-pink-300 hover:scale-105"}`}>
                <span className="text-4xl mb-2">{opt.emoji}</span><span className="font-medium text-gray-700">{opt.name}</span>
              </button>
            ))}
          </div>
          <button onClick={handleNextCategory} className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-4 px-6 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 text-lg">
            {activeCategoryIndex < categories.length - 1 ? "Далее →" : "Продолжить"}
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className={`flex min-h-screen flex-col items-center justify-center p-4 overflow-hidden ${bgClassName}`} style={bgStyle}>
      <div className="max-w-md w-full bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl p-8 flex flex-col items-center relative border border-white/80">
        <Link href="/" className="absolute top-4 left-4 text-gray-400 hover:text-pink-500 text-sm font-medium">← Назад</Link>
        <div className="w-full h-32 mb-6 flex items-center justify-center">
          {useCustomImage
            ? <img src={inviteData.custom_image_url} alt="Приглашение" className="max-h-32 object-contain" />
            : <ImageComponent />
          }
        </div>
        <h1 className="text-center mb-8">
          {inviteData?.recipient_name && <span className="block text-4xl font-extrabold text-pink-600 mb-2">{inviteData.recipient_name}!</span>}
          <span className="block text-xl font-semibold text-gray-700 leading-relaxed">{inviteData?.custom_text || "Ты пойдешь со мной на свидание?"}</span>
        </h1>
        <div className="flex flex-col gap-4 w-full relative">
          <button onClick={() => setStep(2)} className="w-full bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white font-bold py-4 px-6 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-lg">
            {inviteData?.button_yes_text || "Да"}
          </button>
          {showKiss && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
              <span className="text-7xl animate-ping">💋</span>
            </div>
          )}
          <button
            onMouseEnter={handleNoClick}
            onTouchStart={handleNoClick}
            onClick={handleNoClick}
            style={{
              transform: inviteData?.no_animation === "run" ? `translate(${noButtonPosition.x}px, ${noButtonPosition.y}px)` : `scale(${noButtonScale})`,
              transition: "transform 0.3s ease-out, opacity 0.5s",
              opacity: isNoButtonHidden ? 0 : (noButtonScale < 0.3 ? 0.3 : 1),
              pointerEvents: isNoButtonHidden ? "none" : "auto",
            }}
            className="w-full bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-4 px-6 rounded-full shadow-md text-lg"
          >
            {inviteData?.button_no_text || "Нет"}
          </button>
        </div>
      </div>
    </main>
  );
}