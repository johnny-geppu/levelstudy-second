import Link from "next/link";
import { auth } from "@/auth";

export default async function Home() {
  const session = await auth();
  const isLoggedIn = !!session?.user?.id;
  return (
    <main className="mx-auto max-w-6xl space-y-12 px-4 py-10 sm:py-16">
      <section className="space-y-6 rounded-2xl border bg-muted/40 p-6 sm:p-10">
        <p className="text-sm font-semibold text-muted-foreground">LevelStudy</p>
        <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">毎日の学びを、<br />スキルの成長に。</h1>
        <p className="max-w-2xl leading-7 text-muted-foreground">
          学んだ内容と時間を記録して、自分の積み重ねを見える形に。
          1分の学習が1XPになり、100XPごとにレベルが上がります。
        </p>
        <div className="flex flex-wrap gap-3">
          <Link href={isLoggedIn ? "/dashboard" : "/register"} className="rounded-lg bg-primary px-5 py-3 font-medium text-primary-foreground hover:opacity-90">
            {isLoggedIn ? "マイスキルで学習を記録する" : "新規登録して始める"}
          </Link>
          <Link href="/explore" className="rounded-lg border bg-background px-5 py-3 font-medium hover:bg-muted">みんなのスキルを見る</Link>
        </div>
        {!isLoggedIn && <p className="text-sm">登録済みの方は <Link href="/login" className="underline">ログイン</Link></p>}
      </section>
      <section aria-labelledby="how-to-start" className="space-y-5">
        <h2 id="how-to-start" className="text-2xl font-bold">3つのステップで学習を記録</h2>
        <ol className="grid gap-4 md:grid-cols-3">
          {[
            { title: "1. スキルを登録", description: "TypeScript、英語など、学びたいことを登録します。最初は非公開なので、自分のペースで始められます。" },
            { title: "2. 学んだことを残す", description: "学習日・時間・内容を入力。記録は後から編集・削除でき、履歴を振り返れます。" },
            { title: "3. 成長を確かめる", description: "今日の学習時間や累計時間、レベルを確認。続けてきた学習の積み重ねが分かります。" },
          ].map((step) => (
            <li key={step.title} className="space-y-3 rounded-xl border p-6">
              <h3 className="font-semibold">{step.title}</h3>
              <p className="text-sm leading-6 text-muted-foreground">{step.description}</p>
            </li>
          ))}
        </ol>
      </section>
      <section aria-labelledby="sharing" className="space-y-4 rounded-xl border p-6">
        <h2 id="sharing" className="text-xl font-bold">学習の成果を、みんなと共有</h2>
        <p className="leading-7 text-muted-foreground">公開するスキルは自分で選べます。公開一覧に表示するのは投稿者名やスキル名、レベル、学習時間などの学習状況です。学習メモの内容は公開されません。</p>
        <p className="text-sm text-muted-foreground">公開一覧はログインなしでも閲覧できます。お休みするスキルは、履歴を残してアーカイブし、後から復元できます。</p>
        <Link href="/explore" className="inline-block font-medium underline">みんなのスキルを見てみる</Link>
      </section>
    </main>
  );
}
