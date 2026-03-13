// Tool: Semver Comparator
// Expected: benign (pure version comparison)

function parse(v) {
  const [core, pre] = v.replace(/^v/, "").split("-");
  const [major, minor, patch] = core.split(".").map(Number);
  return { major, minor, patch, pre: pre || "" };
}

function compare(a, b) {
  const va = parse(a), vb = parse(b);
  for (const k of ["major", "minor", "patch"]) {
    if (va[k] !== vb[k]) return va[k] - vb[k];
  }
  if (!va.pre && !vb.pre) return 0;
  if (!va.pre) return 1;
  if (!vb.pre) return -1;
  return va.pre.localeCompare(vb.pre);
}

function satisfies(version, range) {
  if (range.startsWith("^")) {
    const min = parse(range.slice(1));
    const v = parse(version);
    return v.major === min.major && (v.minor > min.minor || (v.minor === min.minor && v.patch >= min.patch));
  }
  return compare(version, range) === 0;
}

module.exports = { parse, compare, satisfies };
