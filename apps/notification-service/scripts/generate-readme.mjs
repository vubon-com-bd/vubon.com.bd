#!/usr/bin/env node
/**
 * README Generator — Notification Service
 * @module notification-service/scripts
 *
 * Reads docs/readme-content.ts → writes README.md
 * Supports both `String.raw` and plain template literals.
 *
 * Usage:
 *   node scripts/generate-readme.mjs
 *   pnpm generate:readme
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT = join(__dirname, '..');
const TS_PATH = join(ROOT, 'docs', 'readme-content.ts');
const MD_PATH = join(ROOT, 'README.md');

function extractReadmeContent() {
  if (!existsSync(TS_PATH)) {
    console.error(`❌ Not found: ${TS_PATH}`);
    process.exit(1);
  }

  const src = readFileSync(TS_PATH, 'utf8');

  // Match either:
  //   export const README_CONTENT = `...`;
  //   export const README_CONTENT = String.raw`...`;
  const rawMatch = src.match(
    /export const README_CONTENT = String\.raw`([\s\S]*?)`;/,
  );
  const plainMatch = src.match(
    /export const README_CONTENT = `([\s\S]*?)`;/,
  );

  const match = rawMatch ?? plainMatch;
  if (!match || match[1] === undefined) {
    console.error('❌ Could not parse README_CONTENT from TS file');
    console.error('   Expected: export const README_CONTENT = String.raw`...`;');
    process.exit(1);
  }

  let content = match[1];

  if (rawMatch) {
    // String.raw: only \` and \\ need unescaping
    content = content
      .replace(/\\`/g, '`')
      .replace(/\\\\/g, '\\');
  } else {
    // Plain template literal — full unescape
    content = content
      .replace(/\\`/g, '`')
      .replace(/\\\\/g, '\\')
      .replace(/\\\$/g, '$');
  }

  return content;
}

function main() {
  const content = extractReadmeContent();

  writeFileSync(MD_PATH, content, 'utf8');
  console.log(`✅ README.md written: ${MD_PATH}`);
  console.log(`   ${content.split('\n').length} lines · ${content.length} chars`);

  // Sanity checks
  if (content.includes('\\`')) {
    console.warn('⚠️  README still contains escaped backticks (\\`)');
  }
  if (!content.startsWith('# ')) {
    console.warn('⚠️  README does not start with H1');
  }
}

main();
