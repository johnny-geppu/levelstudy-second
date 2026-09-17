import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { default: "LevelStudy | 毎日の学びを、スキルの成長に", template: "%s | LevelStudy" },
  description: "学習した時間と内容を記録して、スキルの成長を振り返る学習管理アプリ。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>
        {children}
      </body>
    </html>
  );
}
