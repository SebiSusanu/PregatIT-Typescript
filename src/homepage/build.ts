// Builds the cat homepage into dist/
// It works. Nobody said it was good.

import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import { cats, type Cat } from "./cats.ts";

const out = "dist";
const colors = ["#f4a261", "#2a9d8f", "#e76f51", "#457b9d", "#e9c46a", "#8d99ae"];

function card(cat: Cat): string {
  const c = cat.id % colors.length;
  return `<article class="c${c}"><span class="n">🐱 ${cat.name}</span>${cat.quirk} — naps: ${cat.naps} hours a day</article>`;
}

rmSync(out, { recursive: true, force: true });
mkdirSync(out, { recursive: true });

const colorRules = colors
  .map((hex, idx) => `.c${idx}{border-color:${hex}}.c${idx} .n{color:${hex}}`)
  .join("");

const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>The cats</title><style>body{font-family:sans-serif;margin:24px}article{border:2px solid;border-radius:8px;padding:8px;margin:8px;width:260px;display:inline-block;vertical-align:top;min-height:90px}.n{display:block;font-weight:bold;margin-bottom:4px}${colorRules}</style></head><body><h1>The cats</h1>${cats.map(card).join("")}</body></html>`;

writeFileSync(`${out}/index.html`, html);
console.log(`${cats.length} cats in ${out}/`);