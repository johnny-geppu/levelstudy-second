import assert from "node:assert/strict";
import test from "node:test";
import { skillSchema } from "../src/validations/skillSchema";

test("スキル名の前後の空白を除去し、非公開をfalseに変換する", () => {
    const result = skillSchema.parse({ title: " TypeScript ", isPublic: "private" });
    assert.deepEqual(result, { title: "TypeScript", isPublic: false });
});

test("公開をtrueに変換する", () => {
    assert.equal(skillSchema.parse({ title: "英語", isPublic: "public" }).isPublic, true);
});

test("空欄・空白だけ・21文字以上のスキル名を拒否する", () => {
    for (const title of ["", "   ", "あ".repeat(21)]) {
        assert.equal(skillSchema.safeParse({ title, isPublic: "private" }).success, false);
    }
});

test("20文字のスキル名を受け付ける", () => {
    assert.equal(skillSchema.safeParse({ title: "あ".repeat(20), isPublic: "private" }).success, true);
});

test("未選択や想定外の公開設定を拒否する", () => {
    for (const isPublic of [null, undefined, "false", "true", ""]) {
        assert.equal(skillSchema.safeParse({ title: "英語", isPublic }).success, false);
    }
});
