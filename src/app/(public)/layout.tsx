import PublicHeader from "@/components//layouts/PublicHeader";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ja">
            <body>
                <PublicHeader />
                {children}
            </body>
        </html>
    );
}