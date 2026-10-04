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

  // Загружаем приглашение из Supabase
  useEffect(() => {
    const fetchInvite = async () => {
      if (!inviteId) return;

      console.log("Запрашиваем приглашение с ID:", inviteId);

      const { data, error } = await supabase
        .from("invites")
        .select("*")
        .eq("id", inviteId)
        .single();

      if (error) {
        console.error("Ошибка Supabase:", error);
        setDbError(`Ошибка: ${error.message} (Код: ${error.code})`);
      } else if (!data) {
        console.error("Приглашение не найдено для ID:", inviteId);
        setDbError("Приглашение не найдено в базе данных. Проверьте ID.");
      } else {
        console.log("Приглашение успешно загружено:", data);
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

    // Сохраняем ответ в Supabase
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

  const imageEmoji =
    inviteData?.image === "hearts"
      ? "❤️💕💖"
      : inviteData?.image === "flowers"
      ? "🌻🌷🌹"
      : "🐱🌹🐰";

  // --- ЭКРАН ЗАГРУЗКИ ---
  if (isLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-pink-50">
        <p className="text-xl text-gray-500">Загрузка приглашения...</p>
      </main>
    );
  }

  // --- ЭКРАН ОШИБКИ ---
  if (dbError || !inviteData) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-pink-50 p-4 text-center">
        <h1 className="text-5xl font-bold text-gray-800 mb-4">😕</h1>
        <p className="text-xl text-gray-600 mb-4">Приглашение не найдено.</p>
        <div className="bg-red-100 text-red-700 p-4 rounded-xl max-w-md text-sm mb-6">
          <p className="font-bold mb-1">Техническая информация:</p>
          <p>{dbError || "Данные отсутствуют"}</p>
          <p className="mt-2 text-xs">ID из ссылки: {inviteId}</p>
        </div>
        <Link href="/" className="text-pink-500 font-medium">← Вернуться на главную</Link>
      </main>
    );
  }

  // --- ЭКРАН 4: УСПЕХ ---
  if (step === 4) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-pink-50 p-4 text-center">
        <h1 className="text-5xl font-bold text-pink-600 mb-6">Ура! 🎉</h1>
        <p className="text-2xl text-gray-700 mb-4">Ты выбрала:</p>
        <div className="flex gap-2 flex-wrap justify-center mb-6">
          {selectedFoods.map((id) => {
            const food = FOOD_OPTIONS.find((f) => f.id === id);
            return (
              <span key={id} className="bg-white px-4 py-2 rounded-full shadow text-xl">
                {food?.emoji} {food?.name}
              </span>
            );
          })}
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-lg mb-8">
          <p className="text-gray-500 mb-2">Мы встретимся:</p>
          <p className="text-2xl font-bold text-pink-600">
            {selectedDate} в {selectedTime}
          </p>
        </div>
        <p className="text-xl text-gray-500">Жду нашей встречи ❤️</p>
      </main>
    );
  }

  // --- ЭКРАН 3: ВЫБОР ДАТЫ И ВРЕМЕНИ ---
  if (step === 3) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-pink-100 to-white p-4">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 flex flex-col items-center">
          <h1 className="text-3xl font-bold text-gray-800 text-center mb-2">
            Когда ты свободна?
          </h1>
          <p className="text-gray-500 text-center mb-8">Выбери удобный день и время</p>

          <div className="w-full space-y-6 mb-8">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Дата</label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-pink-500 outline-none text-lg"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Время</label>
              <input
                type="time"
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-pink-500 outline-none text-lg"
              />
            </div>
          </div>

          <button
            onClick={handleDateConfirm}
            className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-4 px-6 rounded-full transition-all duration-300 shadow-lg text-lg"
          >
            Подтвердить
          </button>
        </div>
      </main>
    );
  }

  // --- ЭКРАН 2: ВЫБОР ЕДЫ ---
  if (step === 2) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-pink-100 to-white p-4">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 flex flex-col items-center">
          <h1 className="text-3xl font-bold text-gray-800 text-center mb-2">
            Что ты хочешь?
          </h1>
          <p className="text-gray-500 text-center mb-8">Выбери что тебе в кайф</p>

          <div className="grid grid-cols-2 gap-4 w-full mb-8">
            {FOOD_OPTIONS.map((food) => (
              <button
                key={food.id}
                onClick={() => toggleFood(food.id)}
                className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all ${
                  selectedFoods.includes(food.id)
                    ? "border-pink-500 bg-pink-50 scale-105"
                    : "border-gray-200 hover:border-pink-300"
                }`}
              >
                <span className="text-4xl mb-2">{food.emoji}</span>
                <span className="font-medium text-gray-700">{food.name}</span>
              </button>
            ))}
          </div>

          <button
            onClick={() =>
              selectedFoods.length > 0
                ? setStep(3)
                : alert("Выбери хотя бы одно блюдо! 😋")
            }
            className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-4 px-6 rounded-full transition-all duration-300 shadow-lg text-lg"
          >
            Продолжить
          </button>
        </div>
      </main>
    );
  }

  // --- ЭКРАН 1: ГЛАВНЫЙ ВОПРОС ---
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-pink-100 to-white p-4 overflow-hidden">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 flex flex-col items-center relative">

        <Link href="/" className="absolute top-4 left-4 text-gray-400 hover:text-pink-500 text-sm font-medium">
          ← Назад
        </Link>

        <div className="text-7xl mb-6 flex gap-4">{imageEmoji}</div>

        <h1 className="text-2xl font-bold text-gray-800 text-center mb-8">
          {inviteData?.recipient_name ? `${inviteData.recipient_name}, ` : ""}
          {inviteData?.custom_text || "Ты пойдешь со мной на свидание?"}
        </h1>

        <div className="flex flex-col gap-4 w-full relative">
          <button
            onClick={() => setStep(2)}
            className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-4 px-6 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg text-lg"
          >
            Да
          </button>

          <button
            onMouseEnter={moveNoButton}
            onTouchStart={moveNoButton}
            onClick={moveNoButton}
            style={{
              transform: `translate(${noButtonPosition.x}px, ${noButtonPosition.y}px)`,
              transition: "transform 0.2s ease-out",
            }}
            className="w-full bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-4 px-6 rounded-full shadow-md text-lg"
          >
            Нет
          </button>
        </div>
      </div>
    </main>
  );
}