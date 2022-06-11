const maybeNull = (d, f) => x => x !== null ? f(x) : d();

const maybeAnyNullable = (d, f) => x => x != null ? f(x) : d();

module.exports = {
  maybeAnyNullable,
  maybeNull
};
