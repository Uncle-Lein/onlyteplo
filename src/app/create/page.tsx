"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { supabase, ensureAnonymousSession } from "@/lib/supabase";
import { IMAGES, CatsImage } from "@/components/Images";
import AudioPlayer from "@/components/AudioPlayer";

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

const DEFAULT_OPTIONS: Record<string, { id: string; name: string; emoji: string }[]> = {
  food: [
    { id: "pizza", name: "Пицца", emoji: "🍕" },
    { id: "sushi", name: "Суши", emoji: "🍣" },
    { id: "burger", name: "Бургер", emoji: "🍔" },
    { id: "pasta", name: "Паста", emoji: "🍝" },
    { id: "ramen", name: "Рамен", emoji: "🍜" },
    { id: "rollton", name: "Ролтон", emoji: "🍲" },
  ],
  movie: [
    { id: "comedy", name: "Комедия", emoji: "🎭" },
    { id: "drama", name: "Мелодрама", emoji: "💔" },
    { id: "action", name: "Боевик", emoji: "💥" },
    { id: "cartoon", name: "Мультик", emoji: "🎨" },
    { id: "sci-fi", name: "Фантастика", emoji: "🚀" },
    { id: "horror", name: "Ужасы", emoji: "👻" },
  ],
  activity: [
    { id: "walk", name: "Прогулка", emoji: "🚶" },
    { id: "cinema", name: "Кино", emoji: "🎬" },
    { id: "bowling", name: "Боулинг", emoji: "🎳" },
    { id: "museum", name: "Музей", emoji: "🏛️" },
    { id: "picnic", name: "Пикник", emoji: "🧺" },
    { id: "quest", name: "Квест", emoji: "🔍" },
  ],
  drink: [
    { id: "coffee", name: "Кофе", emoji: "☕" },
    { id: "tea", name: "Чай", emoji: "🍵" },
    { id: "juice", name: "Сок", emoji: "🧃" },
    { id: "smoothie", name: "Смузи", emoji: "🥤" },
    { id: "milkshake", name: "Милкшейк", emoji: "🍦" },
    { id: "lemonade", name: "Лимонад", emoji: "🍋" },
  ],
  place: [
    { id: "restaurant", name: "Ресторан", emoji: "🍽️" },
    { id: "park", name: "Парк", emoji: "🌳" },
    { id: "embankment", name: "Набережная", emoji: "🌊" },
    { id: "rooftop", name: "Крыша", emoji: "🌃" },
    { id: "cafe", name: "Кафе", emoji: "☕" },
    { id: "home", name: "Дома", emoji: "🏠" },
  ],
};

const NO_ANIMATIONS = [
  { id: "run", label: "Убегание", emoji: "💨", hint: "Кнопка отпрыгивает" },
  { id: "kiss", label: "Поцелуй", emoji: "💋", hint: "Появляется поцелуй" },
  { id: "shrink", label: "Уменьшение", emoji: "📉", hint: "Кнопка сжимается" },
];

const TEXT_PRESETS_FOR_HER = [
  "Ты пойдешь со мной на свидание? ❤️",
  "У меня есть к тебе один вопрос... 💌",
  "Хочешь провести вечер вместе? 🌙",
  "Ты свободна в пятницу? 😏",
  "Давай устроим свидание мечты ✨",
];
const BUTTON_YES_PRESETS_FOR_HER = ["Да", "Конечно 💖", "С радостью!", "Я не против 😊", "Почему бы и нет?"];
const BUTTON_NO_PRESETS_FOR_HER = ["Нет", "Не сейчас 😅", "Может, в другой раз", "Не сегодня 🙈"];
const FINAL_TITLE_PRESETS_FOR_HER = ["Рад, что ты согласилась!", "Ура! Я знал, что ты согласишься 💖", "Отлично! Жду нашей встречи ✨"];
const FINAL_DESC_PRESETS_FOR_HER = ["Буду ждать тебя {date} в {time}, я приеду за тобой", "Встречаемся {date} в {time}. Не опаздывай! 😉", "{date} в {time} — я уже считаю минуты ⏰"];

const TEXT_PRESETS_FOR_HIM = [
  "Ты пойдешь со мной на свидание? ❤️",
  "У меня есть к тебе один вопрос... 💌",
  "Хочешь провести вечер вместе? 🌙",
  "Ты свободен в пятницу? 😏",
  "Давай устроим свидание мечты ✨",
];
const BUTTON_YES_PRESETS_FOR_HIM = ["Да", "Конечно 💖", "С радостью!", "Я не против 😊", "Почему бы и нет?"];
const BUTTON_NO_PRESETS_FOR_HIM = ["Нет", "Не сейчас 😅", "Может, в другой раз", "Не сегодня 🙈"];
const FINAL_TITLE_PRESETS_FOR_HIM = ["Рада, что ты согласился!", "Ура! Я знала, что ты согласишься 💖", "Отлично! Жду нашей встречи ✨"];
const FINAL_DESC_PRESETS_FOR_HIM = ["Буду ждать тебя {date} в {time}, я приеду за тобой", "Встречаемся {date} в {time}. Не опаздывай! 😉", "{date} в {time} — я уже считаю минуты ⏰"];

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
  const [voiceUrl, setVoiceUrl] = useState<string | null>(null);
  const [voiceLabel, setVoiceLabel] = useState("🎤 Голосовое послание от создателя");
  const [isRecording, setIsRecording] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(["food"]);
  const [noAnimation, setNoAnimation] = useState("run");
  const [finalTitle, setFinalTitle] = useState("");
  const [finalDescription, setFinalDescription] = useState("");
  const [generatedLink, setGeneratedLink] = useState("");
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const [customOptions, setCustomOptions] = useState<Record<string, { id: string; name: string; emoji: string }[]>>({});
  const [hiddenDefaults, setHiddenDefaults] = useState<Record<string, string[]>>({});
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [newOptionName, setNewOptionName] = useState("");
  const [newOptionEmoji, setNewOptionEmoji] = useState("✨");

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const TEXT_PRESETS = forWhom === "her" ? TEXT_PRESETS_FOR_HER : TEXT_PRESETS_FOR_HIM;
  const BUTTON_YES_PRESETS = forWhom === "her" ? BUTTON_YES_PRESETS_FOR_HER : BUTTON_YES_PRESETS_FOR_HIM;
  const BUTTON_NO_PRESETS = forWhom === "her" ? BUTTON_NO_PRESETS_FOR_HER : BUTTON_NO_PRESETS_FOR_HIM;
  const FINAL_TITLE_PRESETS = forWhom === "her" ? FINAL_TITLE_PRESETS_FOR_HER : FINAL_TITLE_PRESETS_FOR_HIM;
  const FINAL_DESC_PRESETS = forWhom === "her" ? FINAL_DESC_PRESETS_FOR_HER : FINAL_DESC_PRESETS_FOR_HIM;

  const totalSteps = 9;
  const progress = (step / totalSteps) * 100;

  const toggleCategory = (id: string) => {
    if (selectedCategories.includes(id)) {
      if (selectedCategories.length > 1) setSelectedCategories(selectedCategories.filter((c) => c !== id));
      else alert("Выберите хотя бы одну категорию!");
    } else {
      setSelectedCategories([...selectedCategories, id]);
    }
  };

  const getVisibleDefaults = (catId: string) => {
    const hidden = hiddenDefaults[catId] || [];
    return (DEFAULT_OPTIONS[catId] || []).filter((opt) => !hidden.includes(opt.id));
  };

  const hideDefaultOption = (catId: string, optionId: string) => {
    setHiddenDefaults({ ...hiddenDefaults, [catId]: [...(hiddenDefaults[catId] || []), optionId] });
  };

  const restoreDefaultOption = (catId: string, optionId: string) => {
    setHiddenDefaults({ ...hiddenDefaults, [catId]: (hiddenDefaults[catId] || []).filter((id) => id !== optionId) });
  };

  const addCustomOption = (catId: string) => {
    if (!newOptionName.trim()) { alert("Введите название варианта!"); return; }
    const newOption = { id: `custom-${Date.now()}`, name: newOptionName, emoji: newOptionEmoji || "✨" };
    setCustomOptions({ ...customOptions, [catId]: [...(customOptions[catId] || []), newOption] });
    setNewOptionName("");
    setNewOptionEmoji("✨");
  };

  const removeCustomOption = (catId: string, optionId: string) => {
    setCustomOptions({ ...customOptions, [catId]: (customOptions[catId] || []).filter((o) => o.id !== optionId) });
  };

  const uploadFile = async (file: File, type: "image" | "background" | "voice") => {
    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("type", type);
      const response = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Ошибка загрузки");
      if (type === "image") setCustomImageUrl(data.url);
      else if (type === "background") setCustomBackgroundUrl(data.url);
      else if (type === "voice") setVoiceUrl(data.url);
    } catch (err: any) {
      alert("Ошибка загрузки: " + err.message);
    } finally {
      setIsUploading(false);
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      let mimeType = "audio/webm";
      if (typeof MediaRecorder !== "undefined" && MediaRecorder.isTypeSupported) {
        if (MediaRecorder.isTypeSupported("audio/mp4")) {
          mimeType = "audio/mp4";
        } else if (MediaRecorder.isTypeSupported("audio/webm;codecs=opus")) {
          mimeType = "audio/webm;codecs=opus";
        }
      }

      const mediaRecorder = new MediaRecorder(stream, { mimeType });
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      mediaRecorder.onstop = async () => {
        const blob = new Blob(chunksRef.current, { type: mimeType });
        const ext = mimeType.includes("mp4") ? "mp4" : "webm";
        const file = new File([blob], `voice-${Date.now()}.${ext}`, { type: mimeType });
        await uploadFile(file, "voice");
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (err: any) {
      alert("Ошибка доступа к микрофону: " + err.message);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const handleCreate = async () => {
    setIsLoading(true);
    const session = await ensureAnonymousSession();
    if (!session) { alert("Ошибка авторизации."); setIsLoading(false); return; }
    const inviteId = `${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 8)}`;
    const { error } = await supabase.from("invites").insert({
      id: inviteId, for_whom: forWhom, recipient_name: recipientName,
      image: selectedImage, custom_image_url: customImageUrl,
      background_color: selectedBackground, custom_background_url: customBackgroundUrl,
      custom_text: customText,
      button_yes_text: buttonYesText, button_no_text: buttonNoText,
      voice_url: voiceUrl,
      voice_label: voiceLabel,
      categories: selectedCategories, no_animation: noAnimation,
      custom_options: customOptions,
      hidden_defaults: hiddenDefaults,
      final_title: finalTitle || (forWhom === "her" ? "Рад, что ты согласилась!" : "Рада, что ты согласился!"),
      final_description: finalDescription || "Буду ждать тебя {date} в {time}, я приеду за тобой",
      creator_id: session.user.id,
    });
    setIsLoading(false);
    if (error) {
      if (error.message.includes("duplicate key")) alert("Ошибка при создании ссылки. Попробуйте ещё раз.");
      else alert("Ошибка сохранения: " + error.message);
      return;
    }
    setGeneratedLink(`${window.location.origin}/i/${inviteId}`);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async (platform: string) => {
    const url = generatedLink;
    const text = `Приглашение на свидание: ${url}`;
    if (platform === "telegram") {
      window.open(`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent("Приглашение на свидание 💌")}`, "_blank");
    } else if (platform === "whatsapp") {
      window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
    } else if (platform === "vk") {
      window.open(`https://vk.com/share.php?url=${encodeURIComponent(url)}`, "_blank");
    }
  };

  if (generatedLink) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-pink-100 via-rose-50 to-blue-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white/90 backdrop-blur-xl rounded-[2rem] shadow-2xl p-8 text-center border border-white/80">
          <div className="text-6xl mb-6">🎉</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Приглашение создано!</h1>
          <p className="text-gray-500 mb-6">Отправьте эту ссылку получателю:</p>
          <div className="bg-gray-100 p-4 rounded-xl mb-4 break-all text-sm text-gray-700 border-2 border-dashed border-gray-300">{generatedLink}</div>

          <button onClick={copyToClipboard} className={`w-full font-bold py-4 px-6 rounded-full transition-all duration-300 shadow-lg text-lg mb-4 ${copied ? "bg-green-500 text-white" : "bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white"}`}>
            {copied ? "✅ Скопировано!" : "📋 Скопировать ссылку"}
          </button>

          <p className="text-xs text-gray-500 mb-3">Или поделитесь:</p>
          <div className="flex justify-center gap-3 mb-6">
            <button onClick={() => handleShare("telegram")} className="w-12 h-12 rounded-full bg-blue-500 hover:bg-blue-600 text-white flex items-center justify-center transition-all hover:scale-110" title="Telegram">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.26-1.91.178-.184 3.266-2.992 3.326-3.25.007-.03.014-.14-.052-.198-.066-.058-.162-.038-.232-.022-.1.022-1.69 1.07-4.77 3.15-.45.31-.86.46-1.22.45-.4-.01-1.17-.23-1.74-.41-.7-.23-1.26-.35-1.21-.74.02-.2.3-.4.84-.61 3.28-1.43 5.47-2.37 6.56-2.83 3.12-1.3 3.77-1.53 4.19-1.53z"/></svg>
            </button>
            <button onClick={() => handleShare("whatsapp")} className="w-12 h-12 rounded-full bg-green-500 hover:bg-green-600 text-white flex items-center justify-center transition-all hover:scale-110" title="WhatsApp">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
            </button>
            <button onClick={() => handleShare("vk")} className="w-12 h-12 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center transition-all hover:scale-110 font-bold" title="VK">VK</button>
          </div>

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
        <button key={i} onClick={() => onSelect(preset)} className="text-xs bg-pink-50 hover:bg-pink-100 text-pink-600 border border-pink-200 px-3 py-1.5 rounded-full transition-all hover:scale-105">
          {preset.length > 35 ? preset.substring(0, 35) + "..." : preset}
        </button>
      ))}
    </div>
  );

  const PreviewAnimation = ({ type }: { type: string }) => {
    const [pos, setPos] = useState({ x: 0, y: 0 });
    const [scale, setScale] = useState(1);
    const [showKiss, setShowKiss] = useState(false);
    const trigger = () => {
      if (type === "run") { setPos({ x: Math.random() * 30 - 15, y: Math.random() * 30 - 15 }); setTimeout(() => setPos({ x: 0, y: 0 }), 300); }
      else if (type === "kiss") { setShowKiss(true); setTimeout(() => setShowKiss(false), 800); }
      else if (type === "shrink") { setScale(0.5); setTimeout(() => setScale(1), 800); }
    };
    return (
      <div onMouseEnter={trigger} onTouchStart={trigger} className="relative w-full h-6 flex items-center justify-center">
        {showKiss && <span className="absolute text-xl animate-ping">💋</span>}
        <div style={{ transform: `translate(${pos.x}px, ${pos.y}px) scale(${scale})`, transition: "transform 0.3s ease-out" }} className="w-8 h-3 bg-gray-400 rounded-full" />
      </div>
    );
  };

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

        <div className="w-full mb-8">
          <div className="flex justify-between items-center mb-2 text-xs text-gray-500 font-medium">
            <span>Шаг {step} из {totalSteps}</span>
            <span className="text-pink-600 font-bold">{Math.round(progress)}%</span>
          </div>
          <div className="relative w-full bg-gray-100 rounded-full h-3 overflow-hidden shadow-inner">
            <div
              className="relative bg-gradient-to-r from-pink-400 via-pink-500 to-rose-500 h-3 rounded-full transition-all duration-700 ease-out shadow-md"
              style={{ width: `${progress}%` }}
            >
              {progress > 5 && (
                <div className="absolute inset-0 overflow-hidden rounded-full">
                  <div className="progress-shine"></div>
                </div>
              )}
            </div>
            {progress > 5 && (
              <div
                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 progress-dot bg-pink-500 rounded-full w-4 h-4 border-2 border-white shadow-lg flex items-center justify-center transition-all duration-700 ease-out"
                style={{ left: `${progress}%` }}
              >
                <span className="text-[8px] text-white font-bold">{step}</span>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white/70 backdrop-blur-xl rounded-[2rem] shadow-2xl p-8 min-h-[400px] flex flex-col border border-white/80">
          {step === 1 && (
            <div className="flex-1 flex flex-col items-center justify-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Кому адресовано?</h2>
              <div className="flex gap-4 w-full max-w-md">
                <button onClick={() => { setForWhom("her"); setCustomText("Ты пойдешь со мной на свидание?"); }} className={`flex-1 py-5 px-6 rounded-2xl border-2 font-bold text-lg transition-all duration-300 transform hover:scale-105 ${forWhom === "her" ? "border-pink-500 bg-gradient-to-br from-pink-50 to-rose-50 text-pink-600 shadow-lg" : "border-gray-200 text-gray-600 hover:border-pink-300"}`}><span className="block text-3xl mb-1">👩</span>Для неё</button>
                <button onClick={() => { setForWhom("him"); setCustomText("Ты пойдешь со мной на свидание?"); }} className={`flex-1 py-5 px-6 rounded-2xl border-2 font-bold text-lg transition-all duration-300 transform hover:scale-105 ${forWhom === "him" ? "border-blue-500 bg-gradient-to-br from-blue-50 to-cyan-50 text-blue-600 shadow-lg" : "border-gray-200 text-gray-600 hover:border-blue-300"}`}><span className="block text-3xl mb-1">👨</span>Для него</button>
              </div>
            </div>
          )}

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
                  {customImageUrl ? (<img src={customImageUrl} alt="Своя картинка" className="max-h-24 object-contain rounded-lg" />) : (<><span className="text-2xl mb-1">📤</span><span className="text-xs text-gray-500">{isUploading ? "Загрузка..." : "Нажми, чтобы загрузить"}</span></>)}
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
                  {customBackgroundUrl ? (<img src={customBackgroundUrl} alt="Свой фон" className="max-h-24 object-cover rounded-lg" />) : (<><span className="text-2xl mb-1">🖼️</span><span className="text-xs text-gray-500">{isUploading ? "Загрузка..." : "Нажми, чтобы загрузить фон"}</span></>)}
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
                  <input type="text" value={buttonYesText} onChange={(e) => setButtonYesText(e.target.value)} maxLength={30} className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-pink-500 focus:ring-4 focus:ring-pink-100 outline-none text-lg text-gray-900" />
                  <PresetChips presets={BUTTON_YES_PRESETS} onSelect={setButtonYesText} />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Кнопка «Нет»</label>
                  <input type="text" value={buttonNoText} onChange={(e) => setButtonNoText(e.target.value)} maxLength={30} className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-pink-500 focus:ring-4 focus:ring-pink-100 outline-none text-lg text-gray-900" />
                  <PresetChips presets={BUTTON_NO_PRESETS} onSelect={setButtonNoText} />
                </div>
              </div>
            </div>
          )}

          {step === 7 && (
            <div className="flex-1 flex flex-col items-center justify-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-2 text-center">🎤 Голосовое сообщение</h2>
              <p className="text-gray-500 text-center mb-6 text-sm max-w-md">
                Запишите своё голосовое послание — получатель услышит его, когда откроет приглашение. Это сделает его по-настоящему личным ❤️
              </p>

              <div className="w-full max-w-md space-y-4">
                {!voiceUrl && (
                  <button
                    onClick={isRecording ? stopRecording : startRecording}
                    className={`w-full font-bold py-6 px-6 rounded-2xl transition-all duration-300 shadow-lg text-lg flex items-center justify-center gap-3 ${
                      isRecording
                        ? "bg-red-500 hover:bg-red-600 text-white animate-pulse"
                        : "bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white"
                    }`}
                  >
                    {isRecording ? (
                      <><span className="text-2xl">⏹️</span> Остановить запись</>
                    ) : (
                      <><span className="text-2xl">🎤</span> Начать запись</>
                    )}
                  </button>
                )}

                {isRecording && (
                  <div className="text-center text-sm text-red-500 animate-pulse">
                    ● Идёт запись... Говорите!
                  </div>
                )}

                {voiceUrl && (
                  <div className="space-y-3">
                    <AudioPlayer src={voiceUrl} label="✅ Голосовое сохранено" />

                    <div>
                      <label className="block text-gray-700 font-medium mb-2 text-sm">
                        Подпись над голосовым сообщением
                      </label>
                      <input
                        type="text"
                        value={voiceLabel}
                        onChange={(e) => setVoiceLabel(e.target.value)}
                        placeholder="Например: Слушай меня внимательно 🎤"
                        className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-pink-500 outline-none text-sm text-gray-900"
                        maxLength={60}
                      />
                      <p className="text-xs text-gray-400 mt-1 text-center">
                        {voiceLabel.length}/60
                      </p>
                    </div>

                    <button
                      onClick={() => setVoiceUrl(null)}
                      className="text-xs text-red-500 hover:text-red-700 block mx-auto font-medium"
                    >
                      🗑 Удалить и записать заново
                    </button>
                  </div>
                )}

                {!voiceUrl && (
                  <div>
                    <p className="text-xs text-gray-500 text-center mb-2">Или загрузите аудиофайл:</p>
                    <label className="flex flex-col items-center justify-center w-full h-20 border-2 border-dashed border-gray-300 rounded-2xl cursor-pointer transition-all hover:border-pink-400 hover:bg-pink-50">
                      <span className="text-2xl mb-1">📁</span>
                      <span className="text-xs text-gray-500">{isUploading ? "Загрузка..." : "Нажми, чтобы загрузить MP3"}</span>
                      <input type="file" accept="audio/*" className="hidden" onChange={(e) => { const file = e.target.files?.[0]; if (file) uploadFile(file, "voice"); }} disabled={isUploading} />
                    </label>
                  </div>
                )}
              </div>
            </div>
          )}

          {step === 8 && (
            <div className="flex-1 flex flex-col items-center justify-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-2 text-center">Что будем выбирать?</h2>
              <p className="text-gray-500 text-center mb-6 text-sm">
                Выбрано: <span className="font-bold text-pink-600">{selectedCategories.length}</span> из {CATEGORIES.length}
              </p>

              <div className="grid grid-cols-2 gap-3 w-full max-w-md mb-6">
                {CATEGORIES.map((cat) => {
                  const isSelected = selectedCategories.includes(cat.id);
                  return (
                    <button
                      key={cat.id}
                      onClick={() => toggleCategory(cat.id)}
                      className={`relative flex items-center gap-2 p-4 rounded-2xl border-2 transition-all duration-300 transform hover:-translate-y-1 min-w-0 ${
                        isSelected ? "border-pink-500 bg-pink-50 scale-105 shadow-md" : "border-gray-200 hover:border-pink-300 bg-white"
                      }`}
                    >
                      {isSelected && (
                        <div className="absolute top-2 right-2 w-5 h-5 bg-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                        </div>
                      )}
                      <span className="text-2xl flex-shrink-0">{cat.icon}</span>
                      <span className={`font-semibold text-sm leading-tight break-words min-w-0 ${isSelected ? "text-pink-700" : "text-gray-700"}`}>{cat.label}</span>
                    </button>
                  );
                })}
              </div>

              <button
                onClick={() => setExpandedCategory(expandedCategory ? null : selectedCategories[0])}
                className="mb-6 text-sm bg-white hover:bg-pink-50 text-pink-600 border border-pink-300 px-4 py-2 rounded-full transition-all"
              >
                ⚙️ Настроить варианты для категорий
              </button>

              {expandedCategory && (
                <div className="w-full max-w-md space-y-3 mb-6">
                  {selectedCategories.map((catId) => {
                    const cat = CATEGORIES.find((c) => c.id === catId);
                    if (!cat) return null;
                    const isOpen = expandedCategory === catId;
                    const visibleDefaults = getVisibleDefaults(catId);
                    const hidden = hiddenDefaults[catId] || [];
                    const custom = customOptions[catId] || [];
                    return (
                      <div key={catId} className="bg-white/80 rounded-2xl border-2 border-gray-200 overflow-hidden">
                        <button
                          onClick={() => setExpandedCategory(isOpen ? null : catId)}
                          className="w-full flex items-center justify-between p-4 hover:bg-pink-50 transition-all"
                        >
                          <span className="flex items-center gap-2 font-semibold text-gray-700">
                            <span className="text-xl">{cat.icon}</span> {cat.label}
                            <span className="text-xs text-gray-400">({visibleDefaults.length + custom.length})</span>
                          </span>
                          <span className="text-gray-400">{isOpen ? "▼" : "▶"}</span>
                        </button>

                        {isOpen && (
                          <div className="p-4 border-t-2 border-gray-100">
                            <p className="text-xs text-gray-500 mb-2">Стандартные варианты:</p>
                            <div className="grid grid-cols-2 gap-2 mb-4">
                              {visibleDefaults.map((opt) => (
                                <div key={opt.id} className="flex items-center justify-between gap-2 bg-pink-50 rounded-lg px-3 py-2 text-sm">
                                  <span className="flex items-center gap-1"><span>{opt.emoji}</span><span className="text-gray-700">{opt.name}</span></span>
                                  <button onClick={() => hideDefaultOption(catId, opt.id)} className="text-red-400 hover:text-red-600 text-xs">✕</button>
                                </div>
                              ))}
                            </div>

                            {hidden.length > 0 && (
                              <div className="mb-4">
                                <p className="text-xs text-gray-500 mb-2">Скрытые (нажмите, чтобы вернуть):</p>
                                <div className="flex flex-wrap gap-2">
                                  {hidden.map((id) => {
                                    const opt = DEFAULT_OPTIONS[catId]?.find((o) => o.id === id);
                                    if (!opt) return null;
                                    return (
                                      <button key={id} onClick={() => restoreDefaultOption(catId, id)} className="text-xs bg-gray-100 text-gray-500 border border-gray-200 px-3 py-1 rounded-full hover:bg-green-50 hover:text-green-600">
                                        + {opt.emoji} {opt.name}
                                      </button>
                                    );
                                  })}
                                </div>
                              </div>
                            )}

                            {custom.length > 0 && (
                              <div className="mb-4">
                                <p className="text-xs text-gray-500 mb-2">Ваши варианты:</p>
                                <div className="grid grid-cols-2 gap-2">
                                  {custom.map((opt) => (
                                    <div key={opt.id} className="flex items-center justify-between gap-2 bg-green-50 border border-green-200 rounded-lg px-3 py-2 text-sm">
                                      <span className="flex items-center gap-1"><span>{opt.emoji}</span><span className="text-gray-700">{opt.name}</span></span>
                                      <button onClick={() => removeCustomOption(catId, opt.id)} className="text-red-400 hover:text-red-600 text-xs">✕</button>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            <div className="bg-gray-50 rounded-xl p-3">
                              <p className="text-xs text-gray-500 mb-2">Добавить свой вариант:</p>
                              <div className="flex gap-2">
                                <input type="text" value={newOptionEmoji} onChange={(e) => setNewOptionEmoji(e.target.value)} className="w-14 p-2 text-center border-2 border-gray-200 rounded-lg focus:border-pink-500 outline-none text-sm" maxLength={2} />
                                <input type="text" value={newOptionName} onChange={(e) => setNewOptionName(e.target.value)} placeholder="Название..." className="flex-1 min-w-0 p-2 border-2 border-gray-200 rounded-lg focus:border-pink-500 outline-none text-sm text-gray-900" onKeyDown={(e) => { if (e.key === "Enter") addCustomOption(catId); }} />
                                <button
                                  onClick={() => addCustomOption(catId)}
                                  className="bg-pink-500 hover:bg-pink-600 text-white px-3 py-2 rounded-lg text-sm font-medium transition-all flex-shrink-0 flex items-center justify-center"
                                  title="Добавить вариант"
                                >
                                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                  </svg>
                                </button>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

              <h3 className="text-lg font-bold text-gray-800 mb-4 text-center">Анимация кнопки «Нет»</h3>

              <div className="grid grid-cols-3 gap-3 w-full max-w-md">
                {NO_ANIMATIONS.map((anim) => {
                  const isSelected = noAnimation === anim.id;
                  return (
                    <div key={anim.id} className={`rounded-2xl border-2 transition-all duration-300 flex flex-col items-center overflow-hidden ${isSelected ? "border-pink-500 bg-pink-50 shadow-md" : "border-gray-200 bg-white hover:border-pink-300"}`}>
                      <button onClick={() => setNoAnimation(anim.id)} className="flex flex-col items-center gap-1 w-full p-3 pb-1 cursor-pointer">
                        <span className="text-2xl">{anim.emoji}</span>
                        <span className={`text-sm font-semibold ${isSelected ? "text-pink-700" : "text-gray-700"}`}>{anim.label}</span>
                      </button>
                      <div className="w-full px-3 pb-3 flex flex-col items-center gap-1">
                        <PreviewAnimation type={anim.id} />
                        <span className="text-[9px] text-gray-400 leading-tight text-center px-1">{anim.hint}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {step === 9 && (
            <div className="flex-1 flex flex-col items-center justify-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Финальный экран</h2>
              <p className="text-gray-500 text-center mb-6 text-sm">Используйте {"{date}"}, {"{time}"} и {"{food}"} для подстановки</p>
              <div className="w-full max-w-md space-y-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Заголовок</label>
                  <input type="text" value={finalTitle} onChange={(e) => setFinalTitle(e.target.value)} placeholder={forWhom === "her" ? "Рад, что ты согласилась!" : "Рада, что ты согласился!"} className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-pink-500 outline-none text-lg text-gray-900 placeholder:text-gray-400" />
                  <PresetChips presets={FINAL_TITLE_PRESETS} onSelect={setFinalTitle} />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Описание</label>
                  <textarea value={finalDescription} onChange={(e) => setFinalDescription(e.target.value)} placeholder="Буду ждать тебя {date} в {time}, я приеду за тобой" rows={3} className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-pink-500 outline-none text-lg resize-none text-gray-900 placeholder:text-gray-400" />
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
            <div className={`p-6 rounded-2xl border-2 border-gray-200 transition-all duration-500 ${!customBackgroundUrl ? `bg-gradient-to-b ${bgClass}` : ""}`} style={customBackgroundUrl ? { backgroundImage: `url(${customBackgroundUrl})`, backgroundSize: "cover", backgroundPosition: "center" } : {}}>
              <div className="bg-white/80 rounded-2xl p-4 shadow-md">
                <div className="w-full mb-3 flex items-center justify-center">
                  {customImageUrl ? (<img src={customImageUrl} alt="Превью" className="max-h-20 object-contain rounded-xl shadow-md border-2 border-white" />) : (<div className="w-full h-20 flex items-center justify-center"><SelectedImage /></div>)}
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