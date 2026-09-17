//未ログイン用ヘッダー

import Link from "next/link";
import Brand from "./Brand";

export default function PublicHeader() {
    return (
        <header className="site-header">
            <div className="header-inner">
                <Brand />
                <nav aria-label="メインナビゲーション" className="header-nav">
                    <Link href="/">Home</Link>
                    <Link href="/explore">みんなのスキル</Link>
                    <Link href="/login">ログイン</Link>
                    <Link href="/register" className="action-link">新規登録</Link>
                </nav>
            </div>

        </header>
    )
}
