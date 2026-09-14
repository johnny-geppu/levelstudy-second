import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    calculateTotalStudyTime,
    findLatestStudyDate,
    calculateLevel,
} from "@/lib/studyStats";
import type { SkillCardProps } from "@/types/skills";

export default function OwnSkillCard({ skill }: SkillCardProps) {
    const totalMinutes = skill.record.reduce(
        (total, record) => total + record.minutes,
        0
    );

    const totalStudyTime = calculateTotalStudyTime(skill.record);
    const latestStudyDate = findLatestStudyDate(skill.record);
    const level = calculateLevel(totalMinutes);

    return (
        <Card className="h-full min-w-0 gap-3 py-4">
            <CardHeader className="px-4">
                <CardTitle
                    className="truncate text-base"
                    title={skill.title}
                >
                    {skill.title}
                </CardTitle>
            </CardHeader>

            <CardContent className="space-y-3 px-4">
                <div>
                    <p className="text-2xl font-bold">Lv.{level}</p>
                    <p className="text-xs text-muted-foreground">
                        100分の学習ごとにレベルアップ
                    </p>
                </div>

                <dl className="space-y-2 border-t pt-3 text-sm">
                    <div className="flex justify-between gap-2">
                        <dt className="text-muted-foreground">累計時間</dt>
                        <dd className="text-right font-medium">
                            {totalStudyTime}
                        </dd>
                    </div>

                    <div className="flex justify-between gap-2">
                        <dt className="text-muted-foreground">記録数</dt>
                        <dd>{skill.record.length}件</dd>
                    </div>

                    <div className="flex justify-between gap-2">
                        <dt className="text-muted-foreground">最終学習</dt>
                        <dd>
                            {latestStudyDate?.toLocaleDateString("ja-JP", {
                                timeZone: "Asia/Tokyo",
                            }) ?? "未記録"}
                        </dd>
                    </div>
                </dl>
            </CardContent>
        </Card>
    );
}