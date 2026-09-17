// 全記録の学習時間を合計する

export function calculateTotalStudyTime(records: { minutes: number; studiedAt: Date | null }[]) {
    const totalMinutes = records.reduce(
        (total, record) => total + record.minutes,
        0
    );

    return formatStudyMinutes(totalMinutes);
}

export function formatStudyMinutes(totalMinutes: number) {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    const studyTimeLabel =
        hours > 0 ? `${hours}時間${minutes}分` : `${minutes}分`;

    return studyTimeLabel;
}

// 学習日が設定されている記録から、最新の日付を探す
export function findLatestStudyDate(records: { minutes: number; studiedAt: Date | null }[]) {
    const latestStudyDate = records.reduce<Date | null>(
        (latest, record) => {
            const studiedAt = record.studiedAt;

            if (!studiedAt) return latest;
            if (!latest || studiedAt > latest) return studiedAt;

            return latest;
        },
        null
    );
    return latestStudyDate;
};

// 1分 = 1XP。0分ではLv.1、100分ごとに1レベル上がる。
export function calculateLevel(totalMinutes: number) {
    return Math.floor(totalMinutes / 100) + 1;
}
