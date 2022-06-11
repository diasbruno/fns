const maybeNull = (d, f) => x => x !== null ? f(x) : d();

module.exports = {
  maybeNull
};
