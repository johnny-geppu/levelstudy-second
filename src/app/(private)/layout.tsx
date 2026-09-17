import PrivateHeader from "@/components/layouts/PrivateHeader";
import Footer from "@/components/layouts/Footer";

export default function PrivateLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <PrivateHeader />
            {children}
            <Footer />
        </>
    );
}
