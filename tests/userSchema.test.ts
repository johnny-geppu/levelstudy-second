import assert from "node:assert/strict";
import test from "node:test";
import { registerSchema } from "../src/validations/user";

const validUser = {
    name: "学習者", email: "student@example.com",
    password: "test-password", confirmPassword: "test-password",
};

test("登録時の名前の前後の空白を除く", () => {
    assert.equal(registerSchema.parse({ ...validUser, name: " 学習者 " }).name, "学習者");
});

test("空白だけの名前を拒否する", () => {
    assert.equal(registerSchema.safeParse({ ...validUser, name: "   " }).success, false);
});

test("不正なメール・短いパスワード・欠けた入力を拒否する", () => {
    for (const invalid of [
        { ...validUser, email: "invalid" },
        { ...validUser, password: "1234567", confirmPassword: "1234567" },
        { ...validUser, name: null },
        {},
    ]) {
        assert.equal(registerSchema.safeParse(invalid).success, false);
    }
});

test("パスワード不一致のエラーを確認欄に返す", () => {
    const result = registerSchema.safeParse({ ...validUser, confirmPassword: "different-password" });
    assert.equal(result.success, false);
    if (!result.success) assert.ok(result.error.flatten().fieldErrors.confirmPassword?.length);
});
