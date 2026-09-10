import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <section>
        <h1>Welcome to the Home Page</h1>
        <p>
          無料で使える学習管理アプリです。学習の進捗を簡単に管理し、目標達成をサポートします。
        </p>
        <Link href="/dashboard">
          学習記録を見る
        </Link>
        <br />
        <Link href="/explore">
          みんなの学習記録を見る
        </Link>
      </section>
    </main>
  );
}
