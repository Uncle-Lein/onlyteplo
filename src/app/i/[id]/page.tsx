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
  const [now, setNow] = useState(new Date());

  // Таймер обратного отсчёта
  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchInvite = async () => {
      if (!inviteId) return;
      const { data, error } = await supabase.from("invites").select("*").eq("id", inviteId).single();
      if (error) setDbError(`Ошибка: ${error.message}`);
      else if (!data) setDbError("Приглашение не найдено.");
      else {
        setInviteData(data);
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

  const ImageComponent = IMAGES.find((i) => i.id === inviteData?.image)?.component || CatsImage;
  const bgClass = BG_CLASSES[inviteData?.background_color] || "from-pink-100 to-white";
  const useCustomImage = !!inviteData?.custom_image_url;
  const useCustomBackground = !!inviteData?.custom_background_url;
  const categories = inviteData?.categories || ["food"];
  const currentCategory = categories[activeCategoryIndex];

  const hiddenDefaults = inviteData?.hidden_defaults?.[currentCategory] || [];
  const defaultOpts = (ALL_OPTIONS[currentCategory] || []).filter((o) => !hiddenDefaults.includes(o.id));
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

  // Компонент обратного отсчёта
  const CountdownTimer = ({ date, time }: { date: string; time: string }) => {
    const targetDate = new Date(`${date}T${time}`);
    const diff = targetDate.getTime() - now.getTime();

    if (isNaN(targetDate.getTime())) return null;

    if (diff <= 0) {
      return <p className="text-2xl font-bold text-pink-600">🎉 Время встречи наступило!</p>;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    return (
      <div className="flex justify-center gap-3">
        {days > 0 && (
          <div className="text-center bg-white/70 rounded-xl px-3 py-2 min-w-[60px]">
            <div className="text-2xl font-bold text-pink-600">{days}</div>
            <div className="text-xs text-gray-500">дней</div>
          </div>
        )}
        <div className="text-center bg-white/70 rounded-xl px-3 py-2 min-w-[60px]">
          <div className="text-2xl font-bold text-pink-600">{hours}</div>
          <div className="text-xs text-gray-500">часов</div>
        </div>
        <div className="text-center bg-white/70 rounded-xl px-3 py-2 min-w-[60px]">
          <div className="text-2xl font-bold text-pink-600">{minutes}</div>
          <div className="text-xs text-gray-500">минут</div>
        </div>
        <div className="text-center bg-white/70 rounded-xl px-3 py-2 min-w-[60px]">
          <div className="text-2xl font-bold text-pink-600">{seconds}</div>
          <div className="text-xs text-gray-500">секунд</div>
        </div>
      </div>
    );
  };

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
            {selectedFoods.length > 0 && (
              <div className="bg-white/60 rounded-xl p-3 border border-pink-100">
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">🍽 Твой выбор</p>
                <p className="text-sm font-semibold text-gray-800">
                  {selectedFoods.map((id: string) => {
                    const allOptions = [
                      ...Object.values(ALL_OPTIONS).flat(),
                      ...Object.values(inviteData?.custom_options || {}).flat(),
                    ] as { id: string; name: string; emoji: string }[];
                    const opt = allOptions.find((o) => o.id === id);
                    return opt ? `${opt.emoji} ${opt.name}` : id;
                  }).join(", ")}
                </p>
              </div>
            )}
            {selectedDate && (<div className="bg-white/60 rounded-xl p-3 border border-pink-100"><p className="text-xs text-gray-500 uppercase tracking-wide mb-1">📅 Дата встречи</p><p className="text-sm font-semibold text-gray-800">{selectedDate} в {selectedTime}</p></div>)}
          </div>

          {/* Обратный отсчёт */}
          {selectedDate && selectedTime && (
            <div className="mt-4 bg-gradient-to-br from-pink-100 to-rose-100 rounded-2xl p-4 border border-pink-200 mb-6">
              <p className="text-xs text-gray-500 uppercase tracking-wide mb-3 text-center">⏰ До нашей встречи</p>
              <CountdownTimer date={selectedDate} time={selectedTime} />
            </div>
          )}

          <p className="text-lg text-gray-500 font-medium">Жду нашей встречи ❤️</p>
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
        <div className="w-full mb-6 flex items-center justify-center">
          {useCustomImage ? (
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-200 to-rose-200 rounded-3xl blur-md opacity-50"></div>
              <img
                src={inviteData.custom_image_url}
                alt="Приглашение"
                className="relative max-h-40 object-contain rounded-3xl shadow-2xl border-4 border-white"
              />
            </div>
          ) : (
            <div className="w-full h-32 flex items-center justify-center">
              <ImageComponent />
            </div>
          )}
        </div>

        {/* Аудиоплеер */}
        {inviteData?.voice_url && (
          <div className="w-full mb-4 bg-pink-50 rounded-2xl p-3 border border-pink-100">
            <p className="text-xs text-gray-500 mb-2 text-center">🎤 Голосовое послание от создателя:</p>
            <audio controls src={inviteData.voice_url} className="w-full" />
          </div>
        )}

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