#!/usr/bin/env node
/**
 * Docs Generator — Notification Service
 * @module notification-service/scripts
 *
 * Reads docs/*-content.ts → writes *.md at project root
 *
 * Reads  →  Writes
 * ─────────────────
 * docs/readme-content.ts        →  README.md
 * docs/architecture-content.ts  →  ARCHITECTURE.md
 * docs/api-content.ts           →  API.md
 * docs/testing-content.ts       →  TESTING.md
 * docs/changelog-content.ts     →  CHANGELOG.md
 * docs/development-content.ts   →  DEVELOPMENT.md
 * docs/deployment-content.ts    →  DEPLOYMENT.md
 *
 * Usage:
 *   node scripts/generate-docs.mjs
 *   pnpm generate:docs
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT = join(__dirname, '..');
const DOCS_DIR = join(ROOT, 'docs');

// ═══════════════════════════════════════════════
// Map: source TS file → output MD file
// ═══════════════════════════════════════════════
const DOC_MAP = [
  { ts: 'readme-content.ts',        md: 'README.md',        export: 'README_CONTENT' },
  { ts: 'architecture-content.ts',  md: 'ARCHITECTURE.md',  export: 'ARCHITECTURE_CONTENT' },
  { ts: 'api-content.ts',           md: 'API.md',           export: 'API_CONTENT' },
  { ts: 'testing-content.ts',       md: 'TESTING.md',       export: 'TESTING_CONTENT' },
  { ts: 'changelog-content.ts',     md: 'CHANGELOG.md',     export: 'CHANGELOG_CONTENT' },
  { ts: 'development-content.ts',   md: 'DEVELOPMENT.md',   export: 'DEVELOPMENT_CONTENT' },
  { ts: 'deployment-content.ts',    md: 'DEPLOYMENT.md',    export: 'DEPLOYMENT_CONTENT' },
];

// ═══════════════════════════════════════════════
// Extract a `String.raw` or plain template-literal export
// ═══════════════════════════════════════════════
function extractContent(src, exportName) {
  // Try String.raw first
  const rawPattern = new RegExp(
    `export const ${exportName} = String\\.raw\`([\\s\\S]*?)\`;`,
  );
  const rawMatch = src.match(rawPattern);

  if (rawMatch && rawMatch[1] !== undefined) {
    return rawMatch[1]
      .replace(/\\`/g, '`')
      .replace(/\\\\/g, '\\');
  }

  // Fallback: plain template literal
  const plainPattern = new RegExp(
    `export const ${exportName} = \`([\\s\\S]*?)\`;`,
  );
  const plainMatch = src.match(plainPattern);

  if (plainMatch && plainMatch[1] !== undefined) {
    return plainMatch[1]
      .replace(/\\`/g, '`')
      .replace(/\\\\/g, '\\')
      .replace(/\\\$/g, '$');
  }

  return null;
}

// ═══════════════════════════════════════════════
// Main
// ═══════════════════════════════════════════════
function main() {
  console.log('═══════════ GENERATE DOCS ═══════════\n');

  let success = 0;
  let skipped = 0;
  let failed = 0;

  for (const { ts, md, export: exportName } of DOC_MAP) {
    const tsPath = join(DOCS_DIR, ts);
    const mdPath = join(ROOT, md);

    if (!existsSync(tsPath)) {
      console.warn(`⚠️  Skipped: ${ts} (source not found)`);
      skipped++;
      continue;
    }

    try {
      const src = readFileSync(tsPath, 'utf8');
      const content = extractContent(src, exportName);

      if (content === null) {
        console.error(`❌ Failed to parse: ${ts} (export "${exportName}")`);
        failed++;
        continue;
      }

      writeFileSync(mdPath, content, 'utf8');
      const lines = content.split('\n').length;
      const bytes = content.length;
      console.log(`✅ ${md.padEnd(20)} ← ${ts} (${lines} lines · ${bytes}B)`);
      success++;
    } catch (err) {
      console.error(`❌ Error writing ${md}:`, err.message);
      failed++;
    }
  }

  console.log('\n═══════════ SUMMARY ═══════════');
  console.log(`✅ Success: ${success}`);
  console.log(`⚠️  Skipped: ${skipped}`);
  console.log(`❌ Failed:  ${failed}`);
  console.log(`📊 Total:   ${DOC_MAP.length}`);

  if (failed > 0) {
    process.exit(1);
  }
}

main();
