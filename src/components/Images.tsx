// ============ SVG-КОМПОНЕНТЫ (УЛУЧШЕННЫЕ) ============

export function CatsImage() {
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

      <path d="M100 75 C100 68, 108 62, 114 68 C120 62, 128 68, 128 75 C128 85, 114 95, 114 95 C114 95, 100 85, 100 75 Z" fill="#FF1493"/>
      <path d="M104 74 C104 71, 108 69, 110 71" stroke="#FFB6C1" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
    </svg>
  );
}

export function HeartsImage() {
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

export function FlowersImage() {
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

export function BunniesImage() {
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

// Экспортируем массив картинок для удобства
import type { FC } from "react";

export const IMAGES: { id: string; label: string; component: FC }[] = [
  { id: "cats", label: "Котики", component: CatsImage },
  { id: "hearts", label: "Сердечки", component: HeartsImage },
  { id: "flowers", label: "Цветы", component: FlowersImage },
  { id: "bunnies", label: "Зайчики", component: BunniesImage },
];