"use client";

import { useState } from "react";
import Link from "next/link";
import { supabase, ensureAnonymousSession } from "@/lib/supabase";
import { IMAGE_COMPONENTS } from "@/components/Images";

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

const TEXT_PRESETS = [
  "Ты пойдешь со мной на свидание? ❤️",
  "У меня есть к тебе один вопрос... 💌",
  "Хочешь провести вечер вместе? 🌙",
  "Ты свободна в пятницу? 😏",
  "Давай устроим свидание мечты ✨",
];

const BUTTON_YES_PRESETS = ["Да", "Конечно 💖", "С радостью!", "Я не против 😊", "Почему бы и нет?"];
const BUTTON_NO_PRESETS = ["Нет", "Не сейчас 😅", "Может, в другой раз", "Не сегодня 🙈"];

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

const IMAGES = [
  { id: "cats", label: "Котики", component: IMAGE_COMPONENTS.cats },
  { id: "hearts", label: "Сердечки", component: IMAGE_COMPONENTS.hearts },
  { id: "flowers", label: "Цветы", component: IMAGE_COMPONENTS.flowers },
  { id: "bunnies", label: "Зайчики", component: IMAGE_COMPONENTS.bunnies },
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
      console.log("📤 Начинаем загрузку:", file.name, "Тип:", file.type, "Размер:", file.size);

      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `${type}/${fileName}`;

      const { data, error: uploadError } = await supabase.storage
        .from("invites")
        .upload(filePath, file, { cacheControl: "3600", upsert: false });

      if (uploadError) {
        console.error("❌ Ошибка Supabase Storage:", uploadError);
        throw new Error(uploadError.message);
      }

      console.log("✅ Файл загружен:", data);

      const { data: urlData } = supabase.storage.from("invites").getPublicUrl(filePath);
      console.log("🔗 Публичный URL:", urlData.publicUrl);

      if (type === "image") setCustomImageUrl(urlData.publicUrl);
      else setCustomBackgroundUrl(urlData.publicUrl);
    } catch (err: any) {
      console.error("💥 Ошибка:", err);
      alert("Ошибка загрузки: " + (err.message || "Неизвестная ошибка"));
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

  const SelectedImage = IMAGES.find((i) => i.id === selectedImage)?.component || IMAGE_COMPONENTS.cats;
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
                      <div className="w-full h-14 mb-1"><Img /></div>
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
                  <PresetChips presets={BUTTON_YES_PRESETS} onSelect={setButtonYesText} />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Кнопка «Нет»</label>
                  <input type="text" value={buttonNoText} onChange={(e) => setButtonNoText(e.target.value)} className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-pink-500 focus:ring-4 focus:ring-pink-100 outline-none text-lg text-gray-900" />
                  <PresetChips presets={BUTTON_NO_PRESETS} onSelect={setButtonNoText} />
                </div>
              </div>
            </div>
          )}

          {step === 7 && (<div className="flex-1 flex flex-col items-center justify-center"><h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Что будем выбирать?</h2><p className="text-gray-500 text-center mb-4 text-sm">Можно выбрать несколько категорий</p><div className="grid grid-cols-2 gap-3 w-full max-w-md mb-8">{CATEGORIES.map((cat) => (<button key={cat.id} onClick={() => toggleCategory(cat.id)} className={`flex items-center gap-3 p-4 rounded-2xl border-2 transition-all duration-300 transform hover:-translate-y-1 ${selectedCategories.includes(cat.id) ? "border-pink-500 bg-pink-50 scale-105 shadow-md" : "border-gray-200 hover:border-pink-300"}`}><span className="text-2xl">{cat.icon}</span><span className="font-medium text-gray-700">{cat.label}</span></button>))}</div><h3 className="text-lg font-bold text-gray-800 mb-4">Анимация кнопки «Нет»</h3><div className="grid grid-cols-3 gap-3 w-full max-w-md">{NO_ANIMATIONS.map((anim) => (<button key={anim.id} onClick={() => setNoAnimation(anim.id)} className={`p-3 rounded-2xl border-2 text-sm font-medium transition-all duration-300 flex flex-col items-center transform hover:-translate-y-1 ${noAnimation === anim.id ? "border-pink-500 bg-pink-50 shadow-md" : "border-gray-200 hover:border-pink-300"}`}><span className="text-2xl mb-1">{anim.emoji}</span>{anim.label}</button>))}</div></div>)}

          {step === 8 && (
            <div className="flex-1 flex flex-col items-center justify-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Финальный экран</h2>
              <p className="text-gray-500 text-center mb-6 text-sm">Используйте {"{date}"}, {"{time}"} и {"{food}"} для подстановки</p>
              <div className="w-full max-w-md space-y-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Заголовок</label>
                  <input type="text" value={finalTitle} onChange={(e) => setFinalTitle(e.target.value)} className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-pink-500 outline-none text-lg text-gray-900" />
                  <PresetChips presets={FINAL_TITLE_PRESETS} onSelect={setFinalTitle} />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Описание</label>
                  <textarea value={finalDescription} onChange={(e) => setFinalDescription(e.target.value)} rows={3} className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-pink-500 outline-none text-lg resize-none text-gray-900" />
                  <PresetChips presets={FINAL_DESC_PRESETS} onSelect={setFinalDescription} />
                </div>
              </div>
            </div>
          )}

          <div className="flex gap-4 mt-8">
            {step > 1 && <button onClick={() => setStep(step - 1)} className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-4 px-6 rounded-full transition-all duration-300 text-lg transform hover:-translate-y-0.5">← Назад</button>}
            {step < totalSteps ? (
              <button onClick={() => { if (step === 2 && !recipientName.trim()) { alert("Введите имя!"); return; } setStep(step + 1); }} className="flex-1 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold py-4 px-6 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-lg">Далее →</button>
            ) : (
              <button onClick={handleCreate} disabled={isLoading} className="flex-1 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold py-4 px-6 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-lg disabled:opacity-50 disabled:transform-none">{isLoading ? "Создаем..." : "Создать приглашение 💖"}</button>
            )}
          </div>
        </div>

        {step >= 3 && (
          <div className="mt-8">
            <p className="text-gray-500 text-sm mb-2 text-center">Предпросмотр</p>
            <div
              className={`p-6 rounded-2xl border-2 border-gray-200 transition-all duration-500 ${!customBackgroundUrl ? `bg-gradient-to-b ${bgClass}` : ""}`}
              style={customBackgroundUrl ? { backgroundImage: `url(${customBackgroundUrl})`, backgroundSize: "cover", backgroundPosition: "center" } : {}}
            >
              <div className="bg-white/80 rounded-2xl p-4 shadow-md">
                <div className="w-full h-20 mb-3 flex items-center justify-center">
                  {customImageUrl ? <img src={customImageUrl} alt="Превью" className="max-h-20 object-contain" /> : <SelectedImage />}
                </div>
                <p className="text-center text-sm font-semibold text-gray-700 mb-3">{recipientName ? `${recipientName}, ` : ""}{customText}</p>
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