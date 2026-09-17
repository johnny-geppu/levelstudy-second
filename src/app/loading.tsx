export default function Loading() {
    return (
        <main className="page-shell mx-auto max-w-6xl px-4" aria-busy="true">
            <p role="status" className="text-sm">学習の記録を読み込んでいます…</p>
            <div className="mt-8 grid gap-4 sm:grid-cols-3" aria-hidden="true">
                {[0, 1, 2].map(n => <div key={n} className="h-40 animate-pulse rounded-2xl border bg-muted" />)}
            </div>
        </main>
    );
}
