// Tool: String Utilities
// Expected: benign (pure utility functions)

function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function truncate(str, len = 100) {
  return str.length > len ? str.slice(0, len) + "..." : str;
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function wordCount(str) {
  return str.trim().split(/\s+/).filter(Boolean).length;
}

module.exports = { slugify, truncate, capitalize, wordCount };
