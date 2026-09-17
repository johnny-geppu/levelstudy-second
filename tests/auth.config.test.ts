import assert from "node:assert/strict";
import test from "node:test";
import { NextRequest } from "next/server";
import { authConfig } from "../src/auth.config";

const session = {
    user: { id: "test-user", name: "テストユーザー", email: "test@example.com" },
    expires: "2099-01-01T00:00:00.000Z",
};

function authorize(path: string, loggedIn: boolean) {
    return authConfig.callbacks.authorized({
        auth: loggedIn ? session : null,
        request: new NextRequest(new URL(path, "http://localhost:3000")),
    });
}

for (const path of ["/dashboard", "/dashboard/archived", "/dashboard/skills/new", "/dashboard/skills/test-skill"]) {
    test(`未ログインでは${path}からログインへ移動する`, () => {
        const result = authorize(path, false);
        assert.ok(result instanceof Response);
        assert.equal(result.headers.get("Location"), "http://localhost:3000/login");
    });

    test(`ログイン済みなら${path}へアクセスできる`, () => {
        assert.equal(authorize(path, true), true);
    });
}

for (const path of ["/login", "/register"]) {
    test(`ログイン済みでは${path}からダッシュボードへ移動する`, () => {
        const result = authorize(path, true);
        assert.ok(result instanceof Response);
        assert.equal(result.headers.get("Location"), "http://localhost:3000/dashboard");
    });

    test(`未ログインなら${path}へアクセスできる`, () => {
        assert.equal(authorize(path, false), true);
    });
}

for (const path of ["/", "/explore"]) {
    test(`${path}はログイン状態に関係なく閲覧できる`, () => {
        assert.equal(authorize(path, false), true);
        assert.equal(authorize(path, true), true);
    });
}
