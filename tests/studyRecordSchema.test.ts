import assert from "node:assert/strict";
import test from "node:test";
import { studyRecordSchema } from "../src/validations/studyRecordSchema";
import { getJapanDate } from "../src/lib/studyDate";

const input = { studiedAt: "2024-02-29", minutes: "60", content: " TypeScriptの復習 " };

test("学習日を日本時間で保存し、時間を数値に変換する", () => {
    const result = studyRecordSchema.parse(input);
    assert.equal(result.studiedAt.toISOString(), "2024-02-28T15:00:00.000Z");
    assert.equal(result.minutes, 60);
    assert.equal(result.content, "TypeScriptの復習");
});

test("存在しない日付や未来日を拒否する", () => {
    for (const studiedAt of ["", "2023-02-29", "2024-04-31", "2024-13-01", "2099-01-01"]) {
        assert.equal(studyRecordSchema.safeParse({ ...input, studiedAt }).success, false);
    }
});

test("学習時間は1〜1440分の整数に限定する", () => {
    for (const minutes of ["", "0", "-1", "1.5", "1441", "abc", null]) {
        assert.equal(studyRecordSchema.safeParse({ ...input, minutes }).success, false);
    }
    for (const minutes of ["1", "1440"]) {
        assert.equal(studyRecordSchema.safeParse({ ...input, minutes }).success, true);
    }
});

test("学習内容は空白除去後に1〜2000文字とする", () => {
    for (const content of ["", "  ", "あ".repeat(2001)]) {
        assert.equal(studyRecordSchema.safeParse({ ...input, content }).success, false);
    }
    assert.equal(studyRecordSchema.safeParse({ ...input, content: "あ".repeat(2000) }).success, true);
});

test("日本時間の午前0時で日付が変わる", () => {
    assert.equal(getJapanDate(new Date("2024-01-01T14:59:59Z")), "2024-01-01");
    assert.equal(getJapanDate(new Date("2024-01-01T15:00:00Z")), "2024-01-02");
});
