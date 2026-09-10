import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import type { SkillCardProps } from "@/types/skills";

export default function SkillCard({ skill }: SkillCardProps) {
    // 全記録の学習時間を合計する
    const totalMinutes = skill.record.reduce(
        (total, record) => total + record.minutes,
        0
    );

    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    const studyTimeLabel =
        hours > 0 ? `${hours}時間${minutes}分` : `${minutes}分`;

    // 学習日が設定されている記録から、最新の日付を探す
    const latestStudyDate = skill.record.reduce<Date | null>(
        (latest, record) => {
            const studiedAt = record.studiedAt;

            if (!studiedAt) return latest;
            if (!latest || studiedAt > latest) return studiedAt;

            return latest;
        },
        null
    );
// 学習日が設定されていない場合は「学習日未設定」と表示する
    const latestStudyLabel = latestStudyDate
        ? latestStudyDate.toLocaleDateString("ja-JP", {
            timeZone: "Asia/Tokyo",
        })
        : "学習日未設定";

    return (
        <Card className="h-full">
            <CardHeader>
                <CardTitle className="truncate" title={skill.title}>
                    {skill.title}
                </CardTitle>

                <p className="truncate text-sm text-muted-foreground">
                    {skill.user.name}
                </p>
            </CardHeader>

            <CardContent>
                {skill.record.length === 0 ? (
                    <p className="text-sm text-muted-foreground">
                        まだ学習記録がありません
                    </p>
                ) : (
                    <dl className="space-y-4">
                        <div>
                            <dt className="text-sm text-muted-foreground">
                                累計学習時間
                            </dt>
                            <dd className="mt-1 text-2xl font-bold">
                                {studyTimeLabel}
                            </dd>
                        </div>

                        <div className="flex justify-between gap-4 border-t pt-4">
                            <dt className="text-sm text-muted-foreground">
                                学習記録
                            </dt>
                            <dd className="text-sm font-medium">
                                {skill.record.length}件
                            </dd>
                        </div>

                        <div className="flex justify-between gap-4">
                            <dt className="text-sm text-muted-foreground">
                                最終学習日
                            </dt>
                            <dd className="text-sm font-medium">
                                {latestStudyLabel}
                            </dd>
                        </div>
                    </dl>
                )}
            </CardContent>
        </Card>
    );
}