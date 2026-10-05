import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin", "cyrillic"] });

export const metadata: Metadata = {
  title: "date-with-me.online — Приглашение на свидание",
  description: "Создай милое приглашение на свидание и отправь ссылку человеку, который тебе дорог ❤️",
  keywords: ["свидание", "приглашение", "date", "любовь", "романтика"],
  openGraph: {
    title: "Приглашение на свидание",
    description: "Создай милое приглашение и отправь ссылку ❤️",
    url: "https://date-with-me.online",
    siteName: "date-with-me.online",
    locale: "ru_RU",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={inter.className}>{children}</body>
    </html>
  );
}