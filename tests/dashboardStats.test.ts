import assert from "node:assert/strict";
import test from "node:test";
import { getJapanDayRange } from "../src/lib/studyDate";
import { formatStudyMinutes } from "../src/lib/studyStats";

test("日本時間の月末・年末・うるう日に正しい日付範囲を作る", () => {
    for (const [now, start, end] of [
        ["2026-09-16T14:59:59Z", "2026-09-15T15:00:00.000Z", "2026-09-16T15:00:00.000Z"],
        ["2026-09-16T15:00:00Z", "2026-09-16T15:00:00.000Z", "2026-09-17T15:00:00.000Z"],
        ["2026-12-31T15:00:00Z", "2026-12-31T15:00:00.000Z", "2027-01-01T15:00:00.000Z"],
        ["2024-02-29T03:00:00Z", "2024-02-28T15:00:00.000Z", "2024-02-29T15:00:00.000Z"],
        ["2026-09-30T15:00:00Z", "2026-09-30T15:00:00.000Z", "2026-10-01T15:00:00.000Z"],
    ]) {
        const range = getJapanDayRange(new Date(now));
        assert.equal(range.start.toISOString(), start);
        assert.equal(range.end.toISOString(), end);
    }
});

test("学習時間を0分・時間の境界・24時間超でも表示できる", () => {
    assert.equal(formatStudyMinutes(0), "0分");
    assert.equal(formatStudyMinutes(59), "59分");
    assert.equal(formatStudyMinutes(60), "1時間0分");
    assert.equal(formatStudyMinutes(61), "1時間1分");
    assert.equal(formatStudyMinutes(1501), "25時間1分");
});
