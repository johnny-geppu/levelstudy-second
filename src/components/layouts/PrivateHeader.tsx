import Link from "next/link"

import Brand from "./Brand"
import { redirect } from "next/navigation"
import Setting from "./Setting"
import { auth } from "@/auth"

export default async function PrivateHeader() {
    const session = await auth()
    

    if (!session?.user?.email || !session.user.id) {
        redirect("/login")
    }

    return (
        <header className="site-header">
            <div className="header-inner">
                <Brand />
                <nav className="header-nav" aria-label="メインナビゲーション">
                    <Link href="/">Home</Link>
                    <Link href="/dashboard">マイスキル</Link>
                    <Link href="/explore">みんなのスキル</Link>
                    <Setting session={session} />
                </nav>
            </div>
        </header>
    )
}
