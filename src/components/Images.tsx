// Общие SVG-компоненты для картинок
// Используются и в create/page.tsx, и в i/[id]/page.tsx

export function CatsImage() {
  return (
    <svg viewBox="0 0 200 100" className="w-full h-full">
      <g transform="translate(30,20)">
        <ellipse cx="40" cy="60" rx="30" ry="35" fill="#F4A460" />
        <polygon points="15,30 5,0 30,20" fill="#F4A460" />
        <polygon points="65,30 75,0 50,20" fill="#F4A460" />
        <circle cx="30" cy="55" r="4" fill="#000" />
        <circle cx="50" cy="55" r="4" fill="#000" />
        <ellipse cx="40" cy="65" rx="5" ry="3" fill="#FF69B4" />
      </g>
      <g transform="translate(100,25)">
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

export function HeartsImage() {
  return (
    <svg viewBox="0 0 200 100" className="w-full h-full">
      <path d="M50 80 C50 60, 30 50, 30 35 C30 20, 45 15, 50 25 C55 15, 70 20, 70 35 C70 50, 50 60, 50 80 Z" fill="#FF1493" />
      <path d="M100 85 C100 65, 80 55, 80 40 C80 25, 95 20, 100 30 C105 20, 120 25, 120 40 C120 55, 100 65, 100 85 Z" fill="#FF69B4" />
      <path d="M150 80 C150 60, 130 50, 130 35 C130 20, 145 15, 150 25 C155 15, 170 20, 170 35 C170 50, 150 60, 150 80 Z" fill="#FF1493" />
    </svg>
  );
}

export function FlowersImage() {
  return (
    <svg viewBox="0 0 200 100" className="w-full h-full">
      <g transform="translate(40,20)">
        <line x1="15" y1="40" x2="15" y2="70" stroke="#228B22" strokeWidth="3" />
        <circle cx="15" cy="30" r="10" fill="#FFD700" />
        <circle cx="5" cy="25" r="8" fill="#FF69B4" />
        <circle cx="25" cy="25" r="8" fill="#FF69B4" />
        <circle cx="5" cy="35" r="8" fill="#FF69B4" />
        <circle cx="25" cy="35" r="8" fill="#FF69B4" />
      </g>
      <g transform="translate(100,25)">
        <line x1="15" y1="40" x2="15" y2="65" stroke="#228B22" strokeWidth="3" />
        <circle cx="15" cy="30" r="10" fill="#FFD700" />
        <circle cx="5" cy="25" r="8" fill="#FF1493" />
        <circle cx="25" cy="25" r="8" fill="#FF1493" />
        <circle cx="5" cy="35" r="8" fill="#FF1493" />
        <circle cx="25" cy="35" r="8" fill="#FF1493" />
      </g>
      <g transform="translate(160,20)">
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

export function BunniesImage() {
  return (
    <svg viewBox="0 0 200 100" className="w-full h-full">
      <g transform="translate(40,25)">
        <ellipse cx="30" cy="50" rx="22" ry="25" fill="#FFFFFF" stroke="#E0E0E0" strokeWidth="2" />
        <ellipse cx="20" cy="15" rx="6" ry="18" fill="#FFFFFF" stroke="#E0E0E0" strokeWidth="2" />
        <ellipse cx="40" cy="15" rx="6" ry="18" fill="#FFFFFF" stroke="#E0E0E0" strokeWidth="2" />
        <circle cx="23" cy="45" r="3" fill="#000" />
        <circle cx="37" cy="45" r="3" fill="#000" />
        <ellipse cx="30" cy="55" rx="4" ry="3" fill="#FFB6C1" />
      </g>
      <g transform="translate(110,30)">
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

// Словарь для удобного доступа
export const IMAGE_COMPONENTS: Record<string, React.FC> = {
  cats: CatsImage,
  hearts: HeartsImage,
  flowers: FlowersImage,
  bunnies: BunniesImage,
};