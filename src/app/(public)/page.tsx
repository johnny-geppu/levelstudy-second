import Link from "next/link";
import { auth } from "@/auth";

export default async function Home() {
  const session = await auth();
  const isLoggedIn = !!session?.user?.id;
  return (
    <main className="mx-auto max-w-6xl space-y-12 px-4 py-10 sm:py-16">
      <section className="hero">
        <div className="space-y-6">
        <p className="eyebrow">A LITTLE LEARNING, EVERY DAY</p>
        <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">毎日の学びを、<br />スキルの成長に。</h1>
        <p className="max-w-2xl leading-7 text-muted-foreground">
          学んだ内容と時間を記録して、自分の積み重ねを見える形に。
          1分の学習が1XPになり、100XPごとにレベルが上がります。
        </p>
        <div className="flex flex-wrap gap-3">
          <Link href={isLoggedIn ? "/dashboard" : "/register"} className="action-link">
            {isLoggedIn ? "マイスキルで学習を記録する" : "新規登録して始める"}
          </Link>
          <Link href="/explore" className="action-link secondary">みんなのスキルを見る</Link>
        </div>
        {!isLoggedIn && <p className="text-sm">登録済みの方は <Link href="/login" className="underline">ログイン</Link></p>}
        </div>
        <div className="hero-preview">
          <div className="preview-card space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-2"><p className="eyebrow">YOUR LEARNING JOURNEY</p><span className="shrink-0 rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground">表示サンプル</span></div>
            <p className="text-xl font-bold">TypeScript</p>
            <div><p className="preview-level"><span className="mr-1 text-lg">Lv.</span>4</p><p className="text-sm text-muted-foreground">小さな積み重ねが、確かな力に。</p></div>
            <div className="level-track" aria-hidden="true"><span style={{ width: "60%" }} /></div>
            <div className="flex justify-between gap-3 text-sm"><span className="text-muted-foreground">累計学習時間</span><strong>6時間 / 360XP</strong></div>
            <p className="border-t pt-4 text-xs text-muted-foreground">あと40分の学習で、次のレベルへ。</p>
          </div>
          <p className="mt-5 text-center text-xs font-medium text-primary">記録する。振り返る。少しずつ、前へ。</p>
        </div>
      </section>
      <section aria-labelledby="how-to-start" className="space-y-5">
        <h2 id="how-to-start" className="text-2xl font-bold">3つのステップで学習を記録</h2>
        <ol className="grid gap-4 md:grid-cols-3">
          {[
            { title: "1. スキルを登録", description: "TypeScript、英語など、学びたいことを登録します。最初は非公開なので、自分のペースで始められます。" },
            { title: "2. 学んだことを残す", description: "学習日・時間・内容を入力。記録は後から編集・削除でき、履歴を振り返れます。" },
            { title: "3. 成長を確かめる", description: "今日の学習時間や累計時間、レベルを確認。続けてきた学習の積み重ねが分かります。" },
          ].map((step) => (
            <li key={step.title} className="home-step space-y-3">
              <h3 className="font-semibold">{step.title}</h3>
              <p className="text-sm leading-6 text-muted-foreground">{step.description}</p>
            </li>
          ))}
        </ol>
      </section>
      <section aria-labelledby="sharing" className="sharing-panel space-y-4">
        <h2 id="sharing" className="text-xl font-bold">学習の成果を、みんなと共有</h2>
        <p className="leading-7">公開するスキルは自分で選べます。公開一覧に表示するのは投稿者名やスキル名、レベル、学習時間などの学習状況です。学習メモの内容は公開されません。</p>
        <p className="text-sm">公開一覧はログインなしでも閲覧できます。お休みするスキルは、履歴を残してアーカイブし、後から復元できます。</p>
        <Link href="/explore" className="inline-block font-medium underline">みんなのスキルを見てみる</Link>
      </section>
    </main>
  );
}
