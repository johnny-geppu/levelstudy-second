import Brand from "@/components/layouts/Brand";

export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="auth-shell">
            <div className="auth-content space-y-6">
                <div className="text-center"><Brand /><p className="mt-3 text-sm text-muted-foreground">今日の学びが、明日の自分をつくる。</p></div>
                {children}
            </div>
        </div>
    );
}
