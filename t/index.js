const assert = require('assert');
const {
  maybeNull,
  maybeAnyNullable
} = require('../index.js');

[
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
