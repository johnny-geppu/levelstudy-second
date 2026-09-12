import { auth } from "@/auth";
import PrivateHeader from "@/components/layouts/PrivateHeader";
import PublicHeader from "@/components/layouts/PublicHeader";

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
        </>
    );
}