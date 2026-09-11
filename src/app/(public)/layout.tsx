import PublicHeader from "@/components//layouts/PublicHeader";
import PrivateHeader from "@/components//layouts/PrivateHeader";
import {auth} from "@/auth"; 

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const session = await auth();
    return (
        <html lang="ja">
            <body>
                {session?.user ? <PrivateHeader /> : <PublicHeader />}
                {children}
            </body>
        </html>
    );
}