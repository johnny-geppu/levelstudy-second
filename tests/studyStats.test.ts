import assert from "node:assert/strict";
import test from "node:test";
import { calculateLevel } from "../src/lib/studyStats";

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
