let _unit;

// TODO(dias): need to check if
// this will leak memory.
const Unit = function Unit() {
  if (!(this instanceof Unit)) {
    return new Unit();
  }
  return (_unit = _unit || this);
};

const unit = () => _unit;

const maybeNull = (d, f) => x => x !== null ? f(x) : d();

const maybeAnyNullable = (d, f) => x => x != null ? f(x) : d();

const typeCase = (dict, d) => x => {
  const cname = x.constructor.name;
  const f = dict[cname];
  return f ? f(x) : d();
};

module.exports = {
  Unit, unit,
  maybeAnyNullable,
  maybeNull,
  typeCase
};
