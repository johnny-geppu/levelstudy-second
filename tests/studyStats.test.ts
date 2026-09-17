import assert from "node:assert/strict";
import test from "node:test";
import { calculateLevel, calculateTotalStudyTime, findLatestStudyDate } from "../src/lib/studyStats";

const cases = [
    { totalMinutes: 0, expectedLevel: 1 },
    { totalMinutes: 1, expectedLevel: 1 },
    { totalMinutes: 99, expectedLevel: 1 },
    { totalMinutes: 100, expectedLevel: 2 },
    { totalMinutes: 101, expectedLevel: 2 },
    { totalMinutes: 199, expectedLevel: 2 },
    { totalMinutes: 200, expectedLevel: 3 },
    { totalMinutes: 1000, expectedLevel: 11 },
];

for (const { totalMinutes, expectedLevel } of cases) {
    test(`${totalMinutes}分の学習でLv.${expectedLevel}になる`, () => {
        assert.equal(calculateLevel(totalMinutes), expectedLevel);
    });
}

test("記録の時間や日付を変更・削除すると集計も変わる", () => {
    const earlier = new Date("2026-01-01T00:00:00+09:00");
    const later = new Date("2026-01-02T00:00:00+09:00");
    const records = [{ minutes: 60, studiedAt: earlier }, { minutes: 50, studiedAt: later }];
    assert.equal(calculateTotalStudyTime(records), "1時間50分");
    assert.equal(findLatestStudyDate(records), later);
    records[1] = { minutes: 20, studiedAt: earlier };
    assert.equal(calculateTotalStudyTime(records), "1時間20分");
    assert.equal(findLatestStudyDate(records), earlier);
    assert.equal(calculateLevel(records.reduce((total, record) => total + record.minutes, 0)), 1);
    records.pop();
    assert.equal(calculateTotalStudyTime(records), "1時間0分");
});

test("日付なしの記録は時間に含め、最終学習日の候補からは除く", () => {
    const date = new Date("2026-01-01T00:00:00+09:00");
    const records = [{ minutes: 30, studiedAt: date }, { minutes: 70, studiedAt: null }];
    assert.equal(calculateTotalStudyTime(records), "1時間40分");
    assert.equal(findLatestStudyDate(records), date);
    assert.equal(findLatestStudyDate([]), null);
    assert.equal(calculateTotalStudyTime([]), "0分");
});
