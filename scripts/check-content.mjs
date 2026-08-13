/**
 * Content cross-reference check.
 *
 * The content files reference each other by id — products point at dictionary
 * terms, dictionary terms point at each other, industry pages name product
 * lines. A broken reference does not crash anything: it silently renders one
 * fewer link, which is exactly the kind of rot nobody notices for months.
 *
 * Run with: npm run check:content
 */
import { readFileSync } from "node:fs";

const read = (p) => readFileSync(new URL(`../${p}`, import.meta.url), "utf8");

const dictionary = read("src/content/dictionary.ts");
const insurance = read("src/content/insurance.ts");
const industries = read("src/content/industries.ts");
const articles = read("src/content/articles.ts");

const failures = [];
const note = (msg) => failures.push(msg);

/* --- ids ---------------------------------------------------------------- */
const termIds = [...dictionary.matchAll(/^    id: "([a-z0-9-]+)",/gm)].map(
  (m) => m[1],
);
const productSlugs = [...insurance.matchAll(/^    slug: "([a-z0-9-]+)",/gm)].map(
  (m) => m[1],
);
const productNames = [...insurance.matchAll(/^    name: "([^"]+)",/gm)].map(
  (m) => m[1],
);
const articleSlugs = [...articles.matchAll(/^    slug: "([a-z0-9-]+)",/gm)].map(
  (m) => m[1],
);

const dupes = (arr) => arr.filter((v, i) => arr.indexOf(v) !== i);

for (const [label, ids] of [
  ["dictionary term", termIds],
  ["product", productSlugs],
  ["article", articleSlugs],
]) {
  const d = dupes(ids);
  if (d.length) note(`Duplicate ${label} ids: ${[...new Set(d)].join(", ")}`);
}

/* --- dictionary → dictionary -------------------------------------------- */
const termSet = new Set(termIds);
const relatedRefs = [...dictionary.matchAll(/related: \[([^\]]+)\]/g)].flatMap(
  (m) => [...m[1].matchAll(/"([a-z0-9-]+)"/g)].map((x) => x[1]),
);
const brokenRelated = [...new Set(relatedRefs.filter((r) => !termSet.has(r)))];
if (brokenRelated.length) {
  note(`Dictionary "related" points at missing terms: ${brokenRelated.join(", ")}`);
}

/* --- products → dictionary ---------------------------------------------- */
const productTermRefs = [...insurance.matchAll(/terms: \[([^\]]+)\]/g)].flatMap(
  (m) => [...m[1].matchAll(/"([a-z0-9-]+)"/g)].map((x) => x[1]),
);
const brokenTerms = [...new Set(productTermRefs.filter((r) => !termSet.has(r)))];
if (brokenTerms.length) {
  note(`Product "terms" point at missing dictionary terms: ${brokenTerms.join(", ")}`);
}

/* --- articles → articles ------------------------------------------------- */
const articleSet = new Set(articleSlugs);
const articleRefs = [...articles.matchAll(/related: \[([^\]]+)\]/g)].flatMap(
  (m) => [...m[1].matchAll(/"([a-z0-9-]+)"/g)].map((x) => x[1]),
);
const brokenArticles = [...new Set(articleRefs.filter((r) => !articleSet.has(r)))];
if (brokenArticles.length) {
  note(`Article "related" points at missing articles: ${brokenArticles.join(", ")}`);
}

/* --- industries → products ----------------------------------------------- */
// Industry pages name cover lines in prose. If a name drifts from the product
// catalogue the reader is told about a policy that has no page behind it.
const nameSet = new Set(productNames);
const coverLines = [...industries.matchAll(/line: "([^"]+)"/g)].map((m) => m[1]);
const brokenLines = [...new Set(coverLines.filter((l) => !nameSet.has(l)))];
if (brokenLines.length) {
  note(
    `Industry cover lines do not match any product name:\n    ${brokenLines.join("\n    ")}`,
  );
}

/* --- report -------------------------------------------------------------- */
if (failures.length) {
  console.error("\n✗ Content check failed:\n");
  for (const f of failures) console.error(`  • ${f}`);
  console.error("");
  process.exit(1);
}

console.log(
  `✓ Content check passed — ${termIds.length} terms, ${productSlugs.length} products, ` +
    `${articleSlugs.length} articles, ${relatedRefs.length + productTermRefs.length + articleRefs.length} cross-references.`,
);
