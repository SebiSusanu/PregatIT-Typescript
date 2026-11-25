// Builds the cat homepage into dist/
// It works. Nobody said it was good.

import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import { cats, type Cat } from "./cats.ts";

const out = "dist";
const colors = ["#f4a261", "#2a9d8f", "#e76f51", "#457b9d", "#e9c46a", "#8d99ae"];

function picture(hex: string): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64"><polygon points="10,26 16,4 30,18" fill="${hex}"/><polygon points="54,26 48,4 34,18" fill="${hex}"/><circle cx="32" cy="36" r="24" fill="${hex}"/><circle cx="23" cy="32" r="4" fill="#222"/><circle cx="41" cy="32" r="4" fill="#222"/></svg>`;
}

function card(cat: Cat): string {
  const c = cat.id % colors.length;
  return `<article class="c${c}"><img src="img/cat-${c}.svg" alt="${cat.name}" width="64" height="64"><span class="n">${cat.name}</span><br>${cat.quirk}<br>naps: ${cat.naps} hours a day</article>`;
}

rmSync(out, { recursive: true, force: true });
mkdirSync(`${out}/img`, { recursive: true });

for (const [idx, hex] of colors.entries()) {
  writeFileSync(`${out}/img/cat-${idx}.svg`, picture(hex));
}

const colorRules = colors
  .map((hex, idx) => `.c${idx}{border-color:${hex}}.c${idx} .n{color:${hex}}`)
  .join("");

const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>The cats</title><style>body{font-family:sans-serif;margin:24px}article{border:2px solid;border-radius:8px;padding:8px;margin:8px;width:260px;display:inline-block;vertical-align:top;min-height:150px}.n{display:inline-block;font-size:1.17em;font-weight:bold;margin:6px 0}${colorRules}</style></head><body><h1>The cats</h1>${cats.map(card).join("")}</body></html>`;

writeFileSync(`${out}/index.html`, html);
console.log(`${cats.length} cats in ${out}/`);