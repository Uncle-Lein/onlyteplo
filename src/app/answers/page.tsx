"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function AnswersPage() {
  const [answers, setAnswers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAnswers = async () => {
      const { data, error } = await supabase
        .from("answers")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data) setAnswers(data);
      setIsLoading(false);
    };
    fetchAnswers();
  }, []);

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <Link href="/" className="text-gray-500 hover:text-pink-500">← На главную</Link>
        </div>

        <h1 className="text-3xl font-bold text-gray-800 mb-8">📋 Ответы на приглашения</h1>

        {isLoading ? (
          <div className="bg-white p-8 rounded-2xl shadow text-center text-gray-500">Загрузка...</div>
        ) : answers.length === 0 ? (
          <div className="bg-white p-8 rounded-2xl shadow text-center text-gray-500">
            Пока нет ответов. Создайте приглашение и отправьте ссылку.
          </div>
        ) : (
          <div className="space-y-4">
            {answers.map((answer) => (
              <div key={answer.id} className="bg-white p-6 rounded-2xl shadow border-l-4 border-pink-500">
                <div className="flex justify-between items-start mb-4">
                  <span className="text-sm text-gray-400">
                    {new Date(answer.created_at).toLocaleString("ru-RU")}
                  </span>
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">✅ Согласие</span>
                </div>
                <div className="space-y-2">
                  <p className="text-gray-600"><span className="font-semibold">👤 Кому:</span> {answer.recipient_name}</p>
                  <p className="text-gray-600"><span className="font-semibold">🍽 Еда:</span> {answer.foods?.join(", ")}</p>
                  <p className="text-gray-600"><span className="font-semibold">📅 Дата встречи:</span> {answer.meeting_date} в {answer.meeting_time}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}