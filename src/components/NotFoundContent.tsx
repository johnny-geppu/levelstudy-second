import Link from "next/link";
import { ArrowLeft, Compass } from "lucide-react";

export default function NotFoundContent({ skill = false }: { skill?: boolean }) {
    return (
        <main className="not-found">
            <div className="surface space-y-6 sm:p-12">
                <p className="eyebrow">PAGE NOT FOUND</p>
                <p className="not-found-number" aria-hidden="true">404</p>
                <h1 className="text-2xl font-bold sm:text-3xl">{skill ? "スキルが見つかりませんでした" : "ページが見つかりませんでした"}</h1>
                <p className="text-sm leading-7 text-muted-foreground">
                    {skill ? "指定されたスキルは存在しないか、このアカウントでは表示できません。" : "URLが間違っているか、ページが移動・削除された可能性があります。"}
                    <br />{skill ? "マイスキルから、学習の続きを始めましょう。" : "ホームに戻るか、みんなのスキルを見てみましょう。"}
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                    <Link href={skill ? "/dashboard" : "/"} className="action-link"><ArrowLeft size={16} aria-hidden="true" />{skill ? "マイスキルへ戻る" : "ホームへ戻る"}</Link>
                    <Link href="/explore" className="action-link secondary"><Compass size={16} aria-hidden="true" />みんなのスキル</Link>
                </div>
            </div>
        </main>
    );
}
