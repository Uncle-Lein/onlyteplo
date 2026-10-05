"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";

const FOOD_OPTIONS = [
  { id: "pizza", name: "Пицца", emoji: "🍕" },
  { id: "sushi", name: "Суши", emoji: "🍣" },
  { id: "burger", name: "Бургер", emoji: "🍔" },
  { id: "pasta", name: "Паста", emoji: "🍝" },
  { id: "ramen", name: "Рамен", emoji: "🍜" },
  { id: "rollton", name: "Ролтон", emoji: "🍲" },
];

// SVG-компоненты для картинок (те же, что и в create)
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

const IMAGE_COMPONENTS: Record<string, React.FC> = {
  cats: CatsImage,
  hearts: HeartsImage,
  flowers: FlowersImage,
  bunnies: BunniesImage,
};

const BG_CLASSES: Record<string, string> = {
  pink: "from-pink-100 to-white",
  blue: "from-blue-100 to-white",
  beige: "from-amber-50 to-white",
  mint: "from-green-100 to-white",
};

export default function InvitePage() {
  const params = useParams();
  const inviteId = params.id as string;

  const [step, setStep] = useState(1);
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const [selectedFoods, setSelectedFoods] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [inviteData, setInviteData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [dbError, setDbError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInvite = async () => {
      if (!inviteId) return;

      const { data, error } = await supabase
        .from("invites")
        .select("*")
        .eq("id", inviteId)
        .single();

      if (error) {
        console.error("Ошибка Supabase:", error);
        setDbError(`Ошибка: ${error.message} (Код: ${error.code})`);
      } else if (!data) {
        setDbError("Приглашение не найдено в базе данных.");
      } else {
        setInviteData(data);
      }
      setIsLoading(false);
    };

    fetchInvite();
  }, [inviteId]);

  const moveNoButton = () => {
    const randomX = Math.random() * 200 - 100;
    const randomY = Math.random() * 200 - 100;
    setNoButtonPosition({ x: randomX, y: randomY });
  };

  const toggleFood = (foodId: string) => {
    if (selectedFoods.includes(foodId)) {
      setSelectedFoods(selectedFoods.filter((id) => id !== foodId));
    } else {
      setSelectedFoods([...selectedFoods, foodId]);
    }
  };

  const handleDateConfirm = async () => {
    if (!selectedDate || !selectedTime) {
      alert("Пожалуйста, выбери дату и время!");
      return;
    }

    const foodNames = selectedFoods.map((id) => {
      const food = FOOD_OPTIONS.find((f) => f.id === id);
      return `${food?.emoji} ${food?.name}`;
    });

    const { error } = await supabase.from("answers").insert({
      invite_id: inviteId,
      recipient_name: inviteData?.recipient_name || "Неизвестно",
      foods: foodNames,
      meeting_date: selectedDate,
      meeting_time: selectedTime,
    });

    if (error) {
      alert("Ошибка сохранения ответа: " + error.message);
      console.error("Детали ошибки ответа:", error);
      return;
    }

    setStep(4);
  };

  const ImageComponent = IMAGE_COMPONENTS[inviteData?.image] || CatsImage;
  const bgClass = BG_CLASSES[inviteData?.background_color] || "from-pink-100 to-white";

  if (isLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-pink-50">
        <p className="text-xl text-gray-500">Загрузка приглашения...</p>
      </main>
    );
  }

  if (dbError || !inviteData) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-pink-50 p-4 text-center">
        <h1 className="text-5xl font-bold text-gray-800 mb-4">😕</h1>
        <p className="text-xl text-gray-600 mb-4">Приглашение не найдено.</p>
        <div className="bg-red-100 text-red-700 p-4 rounded-xl max-w-md text-sm mb-6">
          <p>{dbError || "Данные отсутствуют"}</p>
          <p className="mt-2 text-xs">ID из ссылки: {inviteId}</p>
        </div>
        <Link href="/" className="text-pink-500 font-medium">← Вернуться на главную</Link>
      </main>
    );
  }

  if (step === 4) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-pink-50 p-4 text-center">
        <h1 className="text-5xl font-bold text-pink-600 mb-6">Ура! 🎉</h1>
        <p className="text-2xl text-gray-700 mb-4">Ты выбрала:</p>
        <div className="flex gap-2 flex-wrap justify-center mb-6">
          {selectedFoods.map((id) => {
            const food = FOOD_OPTIONS.find((f) => f.id === id);
            return <span key={id} className="bg-white px-4 py-2 rounded-full shadow text-xl">{food?.emoji} {food?.name}</span>;
          })}
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-lg mb-8">
          <p className="text-gray-500 mb-2">Мы встретимся:</p>
          <p className="text-2xl font-bold text-pink-600">{selectedDate} в {selectedTime}</p>
        </div>
        <p className="text-xl text-gray-500">Жду нашей встречи ❤️</p>
      </main>
    );
  }

  if (step === 3) {
    return (
      <main className={`flex min-h-screen flex-col items-center justify-center bg-gradient-to-b ${bgClass} p-4`}>
        <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 flex flex-col items-center">
          <h1 className="text-3xl font-bold text-gray-800 text-center mb-2">Когда ты свободна?</h1>
          <p className="text-gray-500 text-center mb-8">Выбери удобный день и время</p>
          <div className="w-full space-y-6 mb-8">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Дата</label>
              <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-pink-500 outline-none text-lg" />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Время</label>
              <input type="time" value={selectedTime} onChange={(e) => setSelectedTime(e.target.value)} className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-pink-500 outline-none text-lg" />
            </div>
          </div>
          <button onClick={handleDateConfirm} className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-4 px-6 rounded-full transition-all duration-300 shadow-lg text-lg">Подтвердить</button>
        </div>
      </main>
    );
  }

  if (step === 2) {
    return (
      <main className={`flex min-h-screen flex-col items-center justify-center bg-gradient-to-b ${bgClass} p-4`}>
        <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 flex flex-col items-center">
          <h1 className="text-3xl font-bold text-gray-800 text-center mb-2">Что ты хочешь?</h1>
          <p className="text-gray-500 text-center mb-8">Выбери что тебе в кайф</p>
          <div className="grid grid-cols-2 gap-4 w-full mb-8">
            {FOOD_OPTIONS.map((food) => (
              <button key={food.id} onClick={() => toggleFood(food.id)} className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all ${selectedFoods.includes(food.id) ? "border-pink-500 bg-pink-50 scale-105" : "border-gray-200 hover:border-pink-300"}`}>
                <span className="text-4xl mb-2">{food.emoji}</span>
                <span className="font-medium text-gray-700">{food.name}</span>
              </button>
            ))}
          </div>
          <button onClick={() => selectedFoods.length > 0 ? setStep(3) : alert("Выбери хотя бы одно блюдо! 😋")} className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-4 px-6 rounded-full transition-all duration-300 shadow-lg text-lg">Продолжить</button>
        </div>
      </main>
    );
  }

  return (
    <main className={`flex min-h-screen flex-col items-center justify-center bg-gradient-to-b ${bgClass} p-4 overflow-hidden`}>
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 flex flex-col items-center relative">
        <Link href="/" className="absolute top-4 left-4 text-gray-400 hover:text-pink-500 text-sm font-medium">← Назад</Link>

        <div className="w-full h-32 mb-6">
          <ImageComponent />
        </div>

        <h1 className="text-center mb-8">
          {inviteData?.recipient_name && (
            <span className="block text-4xl font-extrabold text-pink-600 mb-2">
              {inviteData.recipient_name}!
            </span>
          )}
          <span className="block text-xl font-semibold text-gray-700 leading-relaxed">
            {inviteData?.custom_text || "Ты пойдешь со мной на свидание?"}
          </span>
        </h1>

        <div className="flex flex-col gap-4 w-full relative">
          <button onClick={() => setStep(2)} className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-4 px-6 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg text-lg">Да</button>
          <button onMouseEnter={moveNoButton} onTouchStart={moveNoButton} onClick={moveNoButton} style={{ transform: `translate(${noButtonPosition.x}px, ${noButtonPosition.y}px)`, transition: "transform 0.2s ease-out" }} className="w-full bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-4 px-6 rounded-full shadow-md text-lg">Нет</button>
        </div>
      </div>
    </main>
  );
}