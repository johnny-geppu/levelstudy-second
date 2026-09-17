export function getJapanDate(date = new Date()) {
    return new Intl.DateTimeFormat("sv-SE", {
        timeZone: "Asia/Tokyo", year: "numeric", month: "2-digit", day: "2-digit",
    }).format(date);
}

export function formatStudyDate(date: Date | null) {
    return date?.toLocaleDateString("ja-JP", { timeZone: "Asia/Tokyo" }) ?? "学習日未設定";
}

export function getJapanDayRange(date = new Date()) {
    const start = new Date(`${getJapanDate(date)}T00:00:00+09:00`);
    const end = new Date(start.getTime() + 24 * 60 * 60 * 1000);
    return { start, end };
}
