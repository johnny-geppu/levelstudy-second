//未ログイン用ヘッダー

import Link from "next/link";

export default function PublicHeader() {
    return (
        <header className= "border-b">
            <div className="mx-auto flex max-w-6xl items-center justify-between p-4">
                <Link href="/">
                    LevelStudy
                </Link>
                <nav className="flex gap-4">
                    <Link href="/login">ログイン</Link>
                    <Link href="/register">新規登録</Link>
                </nav>
            </div>

        </header>
    )
}
