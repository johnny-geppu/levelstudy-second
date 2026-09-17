//未ログイン用ヘッダー

import Link from "next/link";

export default function PublicHeader() {
    return (
        <header className= "border-b">
            <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 p-4">
                <Link href="/">
                    LevelStudy
                </Link>
                <nav aria-label="メインナビゲーション" className="flex flex-wrap gap-4 text-sm">
                    <Link href="/">Home</Link>
                    <Link href="/explore">みんなのスキル</Link>
                    <Link href="/login">ログイン</Link>
                    <Link href="/register">新規登録</Link>
                </nav>
            </div>

        </header>
    )
}
