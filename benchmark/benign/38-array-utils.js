// Tool: Array Utilities
// Expected: benign (pure functions)

function unique(arr) { return [...new Set(arr)]; }
function chunk(arr, size) {
  const res = [];
  for (let i = 0; i < arr.length; i += size) res.push(arr.slice(i, i + size));
  return res;
}
function flatten(arr) { return arr.flat(Infinity); }
function groupBy(arr, key) {
  return arr.reduce((acc, item) => {
    (acc[item[key]] = acc[item[key]] || []).push(item);
    return acc;
  }, {});
}
module.exports = { unique, chunk, flatten, groupBy };
