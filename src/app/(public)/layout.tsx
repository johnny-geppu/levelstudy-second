import { auth } from "@/auth";
import PrivateHeader from "@/components/layouts/PrivateHeader";
import PublicHeader from "@/components/layouts/PublicHeader";
import Footer from "@/components/layouts/Footer";

export default async function PublicLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await auth();

    return (
        <>
            {session?.user ? <PrivateHeader /> : <PublicHeader />}
            {children}
            <Footer />
        </>
    );
}
