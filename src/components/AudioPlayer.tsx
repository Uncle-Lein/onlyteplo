"use client";

import { useRef, useState, useEffect } from "react";

interface AudioPlayerProps {
  src: string;
  label?: string;
}

export default function AudioPlayer({ src, label }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [waveBars, setWaveBars] = useState<number[]>([]);

  // Генерируем случайные высоты для волновой дорожки
  useEffect(() => {
    const bars = Array.from({ length: 40 }, () => Math.random() * 0.8 + 0.2);
    setWaveBars(bars);
  }, [src]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) setCurrentTime(audioRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) setDuration(audioRef.current.duration);
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percent = x / rect.width;
    audioRef.current.currentTime = percent * duration;
    setCurrentTime(percent * duration);
  };

  const formatTime = (sec: number) => {
    if (!isFinite(sec)) return "0:00";
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="w-full bg-gradient-to-br from-pink-100 to-rose-100 rounded-2xl p-4 border border-pink-200 shadow-lg">
      {label && <p className="text-xs text-gray-600 mb-3 text-center font-medium">{label}</p>}

      <div className="flex items-center gap-4">
        {/* Кнопка Play/Pause */}
        <button
          onClick={togglePlay}
          className="w-14 h-14 rounded-full bg-gradient-to-br from-pink-400 to-rose-500 hover:from-pink-500 hover:to-rose-600 flex items-center justify-center shadow-lg transition-all hover:scale-105 flex-shrink-0"
        >
          {isPlaying ? (
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
            </svg>
          ) : (
            <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>

        {/* Волновая дорожка + таймер */}
        <div className="flex-1 min-w-0">
          <div
            className="flex items-center gap-[2px] h-12 cursor-pointer select-none"
            onClick={handleSeek}
          >
            {waveBars.map((height, i) => {
              const barProgress = (i / waveBars.length) * 100;
              const isPlayed = barProgress <= progress;
              return (
                <div
                  key={i}
                  className={`flex-1 rounded-full transition-all duration-200 ${
                    isPlayed ? "bg-pink-500" : "bg-pink-200"
                  }`}
                  style={{ height: `${height * 100}%`, minWidth: "2px" }}
                />
              );
            })}
          </div>
          <div className="flex justify-between mt-1 text-xs text-gray-500">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>
      </div>

      {/* Скрытый нативный audio */}
      <audio
        ref={audioRef}
        src={src}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
        preload="metadata"
      />
    </div>
  );
}