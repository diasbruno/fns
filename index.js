const maybeNull = (d, f) => x => x !== null ? f(x) : d();

const maybeAnyNullable = (d, f) => x => x != null ? f(x) : d();

const typeCase = (dict, d) => x => {
  const cname = x.constructor.name;
  const f = dict[cname];
  return f ? f(x) : d();
};

module.exports = {
  maybeAnyNullable,
  maybeNull,
  typeCase
};
