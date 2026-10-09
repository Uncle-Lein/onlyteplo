// Общие SVG-компоненты для картинок
// Используются и в create/page.tsx, и в i/[id]/page.tsx

export function CatsImage() {
  return (
    <svg viewBox="0 0 200 100" className="w-full h-full">
      {/* Котик 1 (рыжий) с ушками */}
      <g transform="translate(35, 20)">
        <polygon points="10,35 0,5 25,25" fill="#E8A87C" />
        <polygon points="60,35 70,5 45,25" fill="#E8A87C" />
        <ellipse cx="35" cy="55" rx="32" ry="35" fill="#E8A87C" />
        <circle cx="22" cy="48" r="4" fill="#000" />
        <circle cx="48" cy="48" r="4" fill="#000" />
        <ellipse cx="35" cy="58" rx="4" ry="3" fill="#FFB6C1" />
        <path d="M28 65 Q35 70 42 65" stroke="#000" strokeWidth="1.5" fill="none" />
      </g>
      {/* Котик 2 (белый) с ушками */}
      <g transform="translate(115, 20)">
        <polygon points="10,35 0,5 25,25" fill="#F5F5F5" stroke="#E0E0E0" strokeWidth="1" />
        <polygon points="60,35 70,5 45,25" fill="#F5F5F5" stroke="#E0E0E0" strokeWidth="1" />
        <ellipse cx="35" cy="55" rx="32" ry="35" fill="#F5F5F5" stroke="#E0E0E0" strokeWidth="1" />
        <circle cx="22" cy="48" r="4" fill="#000" />
        <circle cx="48" cy="48" r="4" fill="#000" />
        <ellipse cx="35" cy="58" rx="4" ry="3" fill="#FFB6C1" />
        <path d="M28 65 Q35 70 42 65" stroke="#000" strokeWidth="1.5" fill="none" />
      </g>
      {/* Сердечко между ними */}
      <path d="M95 65 C95 60, 100 55, 105 60 C110 55, 115 60, 115 65 C115 73, 105 80, 105 80 C105 80, 95 73, 95 65 Z" fill="#FF1493" />
    </svg>
  );
}

export function HeartsImage() {
  return (
    <svg viewBox="0 0 200 100" className="w-full h-full">
      {/* Сердечко 1 */}
      <g>
        <path d="M50 80 C50 55, 25 45, 25 30 C25 15, 45 10, 50 25 C55 10, 75 15, 75 30 C75 45, 50 55, 50 80 Z" fill="#FF1493" />
        <path d="M35 22 C38 18, 42 18, 45 22" stroke="#FF69B4" strokeWidth="2" fill="none" />
      </g>
      {/* Сердечко 2 (по центру, больше) */}
      <g>
        <path d="M100 85 C100 55, 70 45, 70 28 C70 10, 95 5, 100 22 C105 5, 130 10, 130 28 C130 45, 100 55, 100 85 Z" fill="#FF1493" />
        <path d="M80 20 C84 15, 90 15, 94 20" stroke="#FF69B4" strokeWidth="2" fill="none" />
      </g>
      {/* Сердечко 3 */}
      <g>
        <path d="M150 80 C150 55, 125 45, 125 30 C125 15, 145 10, 150 25 C155 10, 175 15, 175 30 C175 45, 150 55, 150 80 Z" fill="#FF1493" />
        <path d="M135 22 C138 18, 142 18, 145 22" stroke="#FF69B4" strokeWidth="2" fill="none" />
      </g>
    </svg>
  );
}

export function FlowersImage() {
  return (
    <svg viewBox="0 0 200 100" className="w-full h-full">
      {/* Цветок 1 (розовый) */}
      <g transform="translate(35,25)">
        <line x1="15" y1="40" x2="15" y2="70" stroke="#4CAF50" strokeWidth="3" />
        <ellipse cx="15" cy="30" rx="14" ry="12" fill="#FF69B4" />
        <circle cx="15" cy="30" r="5" fill="#FF1493" />
      </g>
      {/* Цветок 2 (красный) */}
      <g transform="translate(85,25)">
        <line x1="15" y1="40" x2="15" y2="70" stroke="#4CAF50" strokeWidth="3" />
        <ellipse cx="15" cy="30" rx="14" ry="12" fill="#FF3B6B" />
        <circle cx="15" cy="30" r="5" fill="#FF1493" />
      </g>
      {/* Цветок 3 (фиолетовый) */}
      <g transform="translate(135,25)">
        <line x1="15" y1="40" x2="15" y2="70" stroke="#4CAF50" strokeWidth="3" />
        <ellipse cx="15" cy="30" rx="14" ry="12" fill="#9B59B6" />
        <circle cx="15" cy="30" r="5" fill="#8E44AD" />
      </g>
    </svg>
  );
}

export function BunniesImage() {
  return (
    <svg viewBox="0 0 200 100" className="w-full h-full">
      {/* Зайчик 1 (серый) */}
      <g transform="translate(40, 20)">
        <ellipse cx="20" cy="15" rx="5" ry="18" fill="#D3D3D3" />
        <ellipse cx="40" cy="15" rx="5" ry="18" fill="#D3D3D3" />
        <ellipse cx="30" cy="50" rx="22" ry="25" fill="#D3D3D3" />
        <circle cx="23" cy="45" r="3" fill="#000" />
        <circle cx="37" cy="45" r="3" fill="#000" />
        <ellipse cx="30" cy="55" rx="4" ry="3" fill="#FFB6C1" />
      </g>
      {/* Зайчик 2 (розовый) */}
      <g transform="translate(110, 25)">
        <ellipse cx="20" cy="12" rx="4" ry="15" fill="#FFE4E1" stroke="#E0E0E0" strokeWidth="1" />
        <ellipse cx="40" cy="12" rx="4" ry="15" fill="#FFE4E1" stroke="#E0E0E0" strokeWidth="1" />
        <ellipse cx="30" cy="42" rx="20" ry="22" fill="#FFE4E1" stroke="#E0E0E0" strokeWidth="1" />
        <circle cx="23" cy="38" r="3" fill="#000" />
        <circle cx="37" cy="38" r="3" fill="#000" />
        <ellipse cx="30" cy="48" rx="4" ry="3" fill="#FF69B4" />
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