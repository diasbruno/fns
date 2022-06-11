const assert = require('assert');
const {
  Unit, unit,
  Pair, pair,
  maybeNull,
  maybeAnyNullable,
  typeCase,
  show
} = require('../index.js');

[
  [
    'must thrown an exception is show() is called with nullable value.', () => {
      try {
	show(null);
      } catch(e) {
	assert.ok(/nullable/.exec(e.message));
      }
    }
  ],
  [
    'must delegate to toString() method if the value is present.', () => {
      assert.ok(show(1) === "1");
    }
  ],

  [
    'Pair(Tuple) type.', () => {
      const p = new Pair(null, null);
      assert.ok(p.a === null && p.b === null);
    }
  ],
  [
    'Pair(Tuple) type must implement map(f).', () => {
      const p = new Pair(null, 1).map((x) => x + 1);
      assert.ok(p.a === null && p.b === 2);
    }
  ],
  [
    'Pair(Tuple) type must implement bimap(f).', () => {
      const p = new Pair("a", 1).bimap(
	(x) => x + "b",
	(y) => y + 1
      );
      assert.ok(p.a === "ab" && p.b === 2);
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
