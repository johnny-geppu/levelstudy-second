export function getJapanDate(date = new Date()) {
    return new Intl.DateTimeFormat("sv-SE", {
        timeZone: "Asia/Tokyo", year: "numeric", month: "2-digit", day: "2-digit",
    }).format(date);
}

export function formatStudyDate(date: Date | null) {
    return date?.toLocaleDateString("ja-JP", { timeZone: "Asia/Tokyo" }) ?? "学習日未設定";
}
