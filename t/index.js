const assert = require('assert');
const {
  Unit, unit,
  maybeNull,
  maybeAnyNullable,
  typeCase
} = require('../index.js');

[
  [
    'Unit type must have only one instance using new.', () => {
      const u = new Unit;
      assert.ok(u === new Unit);
    }
  ],
  [
    'Unit type must have only one instance.', () => {
      const u = Unit();
      assert.ok(u === Unit());
    }
  ],
  [
    'Unit type must have only one instance with lazy unit.', () => {
      const u = new Unit();
      assert.ok(u === unit());
    }
  ],
  [
    'maybeNull with a value must execute the function.', () => {
      const f = maybeNull(() => -1, (x) => x + 1);
      assert.ok(f(1) === 2);
    }
  ],
  [
    'maybeNull without a value must execute the default function', () => {
      const f = maybeNull(() => -1, (x) => x + 1);
      assert.ok(f(null) === -1);
    }
  ],
  [
    'maybeNull must use default function on undefined', () => {
      const f = maybeNull(() => -1, (x) => x + 1);
      assert.ok(f(undefined).toString() === 'NaN');
    }
  ],
  [
    'maybeAnyNullable with a value must execute the function.', () => {
      const f = maybeAnyNullable(() => -1, (x) => x + 1);
      assert.ok(f(1) === 2);
    }
  ],
  [
    'maybeAnyNullable must use default function on null', () => {
      const f = maybeAnyNullable(() => -1, (x) => x + 1);
      assert.ok(f(null) === -1);
    }
  ],
  [
    'maybeAnyNullable must use default function on undefined', () => {
      const f = maybeAnyNullable(() => -1, (x) => x + 1);
      assert.ok(f(undefined) === -1);
    }
  ],
  [
    'typeCase must call default function if not handled', () => {
      const f = typeCase({}, () => -1);
      assert.ok(f("a") === -1);
    }
  ],
  [
    'typeCase should work with String', () => {
      const f = typeCase({
	[String.name]: (x) => x + "b"
      }, () => -1);
      assert.ok(f("a") === "ab");
    }
  ],
  [
    'typeCase should work with Number', () => {
      const f = typeCase({
	[Number.name]: (x) => x + 2
      }, () => -1);
      assert.ok(f(1) === 3);
    }
  ],
  [
    'typeCase should work with Boolean', () => {
      const f = typeCase({
	[Boolean.name]: (x) => !x
      }, () => -1);
      assert.ok(f(false) === true);
    }
  ],
  [
    'typeCase should work with a user-defined type', () => {
      class A { x = 1; }
      const f = typeCase({
	[A.name]: (a) => (a.x + 1)
      }, () => -1);
      assert.ok(f(new A) === 2);
    }
  ],
].forEach(([title, test]) => {
  try {
    console.log(title);
    test();
  } catch(e) {
    console.log("[failed]", title);
    console.log(e);
    process.exit(1);
  }
});
