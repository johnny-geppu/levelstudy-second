import assert from "node:assert/strict";
import test from "node:test";
import { getStudyRecordPagination } from "../src/lib/studyRecordPagination";

test("10件ごとにページ数と取得開始位置を計算する", () => {
    assert.deepEqual(getStudyRecordPagination("2", 21), {
        page: 2, totalPages: 3, skip: 10, requestedPage: 2,
    });
    assert.equal(getStudyRecordPagination("1", 10).totalPages, 1);
    assert.equal(getStudyRecordPagination("1", 11).totalPages, 2);
});

test("不正なページ指定は1ページ目として扱う", () => {
    for (const value of [undefined, "", "0", "-1", "1.5", "abc", "1e2", "9007199254740992", ["1", "2"]]) {
        assert.equal(getStudyRecordPagination(value, 30).page, 1);
        assert.equal(getStudyRecordPagination(value, 30).skip, 0);
    }
});

test("削除などで指定ページがなくなったら最終ページに戻す", () => {
    assert.deepEqual(getStudyRecordPagination("3", 20), {
        page: 2, totalPages: 2, skip: 10, requestedPage: 3,
    });
});

test("記録が0件でも1ページ目として扱う", () => {
    assert.deepEqual(getStudyRecordPagination("2", 0), {
        page: 1, totalPages: 1, skip: 0, requestedPage: 2,
    });
});
