// Builds the cat homepage into dist/

import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import { cats, type Cat } from "./cats.ts";

const out = "dist";
const colors = ["#f4a261", "#2a9d8f", "#e76f51", "#457b9d", "#e9c46a", "#8d99ae"];

function card(cat: Cat): string {
  const c = cat.id % colors.length;
  return `<div class="c${c}">${cat.name} · ${cat.quirk} (${cat.naps}h)</div>`;
}

rmSync(out, { recursive: true, force: true });
mkdirSync(out, { recursive: true });

const rules = colors.map((h, i) => `.c${i}{border-color:${h}}`).join("");

const html = `<!doctype html><html><head><meta charset="utf-8"><title>Cats</title><style>body{font-family:sans-serif;margin:12px}div{border:2px solid;border-radius:6px;padding:6px;margin:4px;width:240px;display:inline-block;vertical-align:top}${rules}</style></head><body><h1>Cats</h1>${cats.map(card).join("")}</body></html>`;

writeFileSync(`${out}/index.html`, html);
console.log(`${cats.length} cats in ${out}/`);