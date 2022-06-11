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

class Pair {
  a = null;
  b = null;

  constructor(a, b) { this.a = a || null; this.b = b || null; }

  map(f) { return new Pair(this.a, f(this.b)); }

  bimap(f, g) { return new Pair(f(this.a), g(this.b)); }

  toString() {
    return "(${this.a.toString()}, ${this.b.toString()})";
  }
}

const pair = (a, b) => new Pair(a, b);

const maybeNull = (d, f) => x => x !== null ? f(x) : d();

const maybeAnyNullable = (d, f) => x => x != null ? f(x) : d();

const typeCase = (dict, d) => x => {
  const cname = x.constructor.name;
  const f = dict[cname];
  return f ? f(x) : d();
};

module.exports = {
  Unit, unit,
  Pair, pair,
  maybeAnyNullable,
  maybeNull,
  typeCase
};
