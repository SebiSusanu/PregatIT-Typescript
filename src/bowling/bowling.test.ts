import {test } from "node:test";
import assert from "node:assert/strict";
import {score} from "./bowling.ts";
test( "gutter game:20 rolls of 0 scores 0", () => {
    const rolls :number[] = new Array<number>(20).fill(0);
    assert.equal(score(rolls), 0);
});

test("gutter game: 20 rolls of 1 scores 20", () => {
  const rolls: number[] = new Array<number>(20).fill(1);
  assert.equal(score(rolls), 20);
});

test("one spare: 5, 5, 3 scores 16", () => {
    const rolls = new Array<number>(20).fill(0);
    rolls[0] =5;
    rolls[1] =5;
    rolls[2] =3;
    assert.equal(score(rolls), 16);
});

test("one strike: 10, 3, 4 scores 24", () => {
    const rolls = new Array<number>(20).fill(0);
    rolls[0] = 10;
    rolls[1] = 3;
    rolls[2] = 4;
    assert.equal(score(rolls), 24);
});

test("perfect game: 12 strikes score 300", () => {
    const rolls = new Array<number>(12).fill(10);
    assert.equal(score(rolls), 300);
});



// gutter game: 20 rolls of 0 scores 0
// all ones: 20 rolls of 1 scores 20
// one spare: 5, 5, 3 scores 16
// one strike: 10, 3, 4 scores 24
// perfect game: 12 strikes score 300