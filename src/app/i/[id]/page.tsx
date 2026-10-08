"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";

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

function CatsImage() { return <svg viewBox="0 0 200 100" className="w-full h-full"><g transform="translate(30,20)"><ellipse cx="40" cy="60" rx="30" ry="35" fill="#F4A460"/><polygon points="15,30 5,0 30,20" fill="#F4A460"/><polygon points="65,30 75,0 50,20" fill="#F4A460"/><circle cx="30" cy="55" r="4" fill="#000"/><circle cx="50" cy="55" r="4" fill="#000"/><ellipse cx="40" cy="65" rx="5" ry="3" fill="#FF69B4"/></g><g transform="translate(100,25)"><ellipse cx="40" cy="55" rx="28" ry="32" fill="#FFFFFF" stroke="#E0E0E0" strokeWidth="2"/><polygon points="17,28 8,2 32,20" fill="#FFFFFF" stroke="#E0E0E0" strokeWidth="2"/><polygon points="63,28 72,2 48,20" fill="#FFFFFF" stroke="#E0E0E0" strokeWidth="2"/><circle cx="30" cy="50" r="4" fill="#000"/><circle cx="50" cy="50" r="4" fill="#000"/><ellipse cx="40" cy="60" rx="5" ry="3" fill="#FFB6C1"/></g><path d="M95 70 C95 65, 100 60, 105 65 C110 60, 115 65, 115 70 C115 78, 105 85, 105 85 C105 85, 95 78, 95 70 Z" fill="#FF1493"/></svg>; }
function HeartsImage() { return <svg viewBox="0 0 200 100" className="w-full h-full"><path d="M50 80 C50 60, 30 50, 30 35 C30 20, 45 15, 50 25 C55 15, 70 20, 70 35 C70 50, 50 60, 50 80 Z" fill="#FF1493"/><path d="M100 85 C100 65, 80 55, 80 40 C80 25, 95 20, 100 30 C105 20, 120 25, 120 40 C120 55, 100 65, 100 85 Z" fill="#FF69B4"/><path d="M150 80 C150 60, 130 50, 130 35 C130 20, 145 15, 150 25 C155 15, 170 20, 170 35 C170 50, 150 60, 150 80 Z" fill="#FF1493"/></svg>; }
function FlowersImage() { return <svg viewBox="0 0 200 100" className="w-full h-full"><g transform="translate(40,20)"><line x1="15" y1="40" x2="15" y2="70" stroke="#228B22" strokeWidth="3"/><circle cx="15" cy="30" r="10" fill="#FFD700"/><circle cx="5" cy="25" r="8" fill="#FF69B4"/><circle cx="25" cy="25" r="8" fill="#FF69B4"/><circle cx="5" cy="35" r="8" fill="#FF69B4"/><circle cx="25" cy="35" r="8" fill="#FF69B4"/></g><g transform="translate(100,25)"><line x1="15" y1="40" x2="15" y2="65" stroke="#228B22" strokeWidth="3"/><circle cx="15" cy="30" r="10" fill="#FFD700"/><circle cx="5" cy="25" r="8" fill="#FF1493"/><circle cx="25" cy="25" r="8" fill="#FF1493"/><circle cx="5" cy="35" r="8" fill="#FF1493"/><circle cx="25" cy="35" r="8" fill="#FF1493"/></g><g transform="translate(160,20)"><line x1="15" y1="40" x2="15" y2="70" stroke="#228B22" strokeWidth="3"/><circle cx="15" cy="30" r="10" fill="#FFD700"/><circle cx="5" cy="25" r="8" fill="#9B59B6"/><circle cx="25" cy="25" r="8" fill="#9B59B6"/><circle cx="5" cy="35" r="8" fill="#9B59B6"/><circle cx="25" cy="35" r="8" fill="#9B59B6"/></g></svg>; }
function BunniesImage() { return <svg viewBox="0 0 200 100" className="w-full h-full"><g transform="translate(40,25)"><ellipse cx="30" cy="50" rx="22" ry="25" fill="#FFFFFF" stroke="#E0E0E0" strokeWidth="2"/><ellipse cx="20" cy="15" rx="6" ry="18" fill="#FFFFFF" stroke="#E0E0E0" strokeWidth="2"/><ellipse cx="40" cy="15" rx="6" ry="18" fill="#FFFFFF" stroke="#E0E0E0" strokeWidth="2"/><circle cx="23" cy="45" r="3" fill="#000"/><circle cx="37" cy="45" r="3" fill="#000"/><ellipse cx="30" cy="55" rx="4" ry="3" fill="#FFB6C1"/></g><g transform="translate(110,30)"><ellipse cx="30" cy="45" rx="20" ry="22" fill="#FFE4E1" stroke="#E0E0E0" strokeWidth="2"/><ellipse cx="22" cy="15" rx="5" ry="15" fill="#FFE4E1" stroke="#E0E0E0" strokeWidth="2"/><ellipse cx="38" cy="15" rx="5" ry="15" fill="#FFE4E1" stroke="#E0E0E0" strokeWidth="2"/><circle cx="23" cy="40" r="3" fill="#000"/><circle cx="37" cy="40" r="3" fill="#000"/><ellipse cx="30" cy="50" rx="4" ry="3" fill="#FF69B4"/></g></svg>; }

const IMAGE_COMPONENTS: Record<string, React.FC> = { cats: CatsImage, hearts: HeartsImage, flowers: FlowersImage, bunnies: BunniesImage };
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
      else setInviteData(data);
      setIsLoading(false);
    };
    fetchInvite();
  }, [inviteId]);

  const handleNoClick = () => {
    const anim = inviteData?.no_animation || "run";
    if (anim === "kiss") {
      setShowKiss(true);
      setIsNoButtonHidden(true);
      setTimeout(() => {
        setShowKiss(false);
        setIsNoButtonHidden(false);
      }, 2000);
    } else if (anim === "shrink") {
      setNoButtonScale((prev) => Math.max(prev - 0.2, 0.1));
    } else if (anim === "run") {
      const randomX = Math.random() * 200 - 100;
      const randomY = Math.random() * 200 - 100;
      setNoButtonPosition({ x: randomX, y: randomY });
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

  const handleDateConfirm = async () => {
    if (!selectedDate || !selectedTime) { alert("Выбери дату и время!"); return; }
    const { error } = await supabase.from("answers").insert({ invite_id: inviteId, recipient_name: inviteData?.recipient_name, foods: selectedFoods, meeting_date: selectedDate, meeting_time: selectedTime });
    if (error) { alert("Ошибка: " + error.message); return; }
    setStep(4);
  };

  const ImageComponent = IMAGE_COMPONENTS[inviteData?.image] || CatsImage;
  const bgClass = BG_CLASSES[inviteData?.background_color] || "from-pink-100 to-white";
  const useCustomImage = !!inviteData?.custom_image_url;
  const useCustomBackground = !!inviteData?.custom_background_url;
  const categories = inviteData?.categories || ["food"];
  const currentCategory = categories[activeCategoryIndex];
  const currentOptions = ALL_OPTIONS[currentCategory] || [];
  const categoryInfo = CATEGORY_TITLES[currentCategory] || { title: "Выбери", subtitle: "" };

  const finalDescriptionText = (inviteData?.final_description || "")
    .replace("{date}", selectedDate).replace("{time}", selectedTime).replace("{food}", selectedFoods.join(", "));

  // Универсальный стиль фона
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
        <div className="relative z-10 max-w-md w-full bg-white/90 backdrop-blur-xl rounded-[2.5rem] shadow-2xl p-8 text-center border border-white/80">
          <div className="text-7xl mb-4 animate-bounce">💖</div>
          <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-rose-500 mb-6">{inviteData?.final_title || "Ура! 🎉"}</h1>
          <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl p-6 mb-6 border border-pink-100"><p className="text-lg text-gray-700 leading-relaxed">{finalDescriptionText}</p></div>
          <div className="space-y-3 mb-6">
            {selectedFoods.length > 0 && (<div className="bg-white/70 rounded-xl p-3 border border-pink-100"><p className="text-xs text-gray-500 uppercase tracking-wide mb-1">🍽 Твой выбор</p><p className="text-sm font-semibold text-gray-800">{selectedFoods.map((id: string) => { const allOptions = Object.values(ALL_OPTIONS).flat(); const opt = allOptions.find((o: any) => o.id === id); return opt ? `${opt.emoji} ${opt.name}` : id; }).join(", ")}</p></div>)}
            {selectedDate && (<div className="bg-white/70 rounded-xl p-3 border border-pink-100"><p className="text-xs text-gray-500 uppercase tracking-wide mb-1">📅 Дата встречи</p><p className="text-sm font-semibold text-gray-800">{selectedDate} в {selectedTime}</p></div>)}
          </div>
          <p className="text-lg text-gray-500 font-medium">Жду нашей встречи ❤️</p>
        </div>
      </main>
    );
  }

  if (step === 3) {
    return (
      <main className={`flex min-h-screen flex-col items-center justify-center p-4 ${bgClassName}`} style={bgStyle}>
        <div className="max-w-md w-full bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 flex flex-col items-center border border-white/80">
          <h1 className="text-3xl font-bold text-gray-800 text-center mb-2">Когда ты свободна?</h1>
          <p className="text-gray-500 text-center mb-8">Выбери удобный день и время</p>
          <div className="w-full space-y-6 mb-8">
            <div><label className="block text-gray-700 font-medium mb-2">Дата</label><input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-pink-500 outline-none text-lg transition-all text-gray-900" /></div>
            <div><label className="block text-gray-700 font-medium mb-2">Время</label><input type="time" value={selectedTime} onChange={(e) => setSelectedTime(e.target.value)} className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-pink-500 outline-none text-lg transition-all text-gray-900" /></div>
          </div>
          <button onClick={handleDateConfirm} className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-4 px-6 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 text-lg">Подтвердить</button>
        </div>
      </main>
    );
  }

  if (step === 2) {
    return (
      <main className={`flex min-h-screen flex-col items-center justify-center p-4 ${bgClassName}`} style={bgStyle}>
        <div className="max-w-md w-full bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 flex flex-col items-center border border-white/80">
          <div className="w-full bg-gray-100 rounded-full h-1.5 mb-6"><div className="bg-pink-500 h-1.5 rounded-full transition-all duration-500" style={{ width: `${((activeCategoryIndex + 1) / categories.length) * 100}%` }}></div></div>
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
      <div className="max-w-md w-full bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 flex flex-col items-center relative border border-white/80">
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