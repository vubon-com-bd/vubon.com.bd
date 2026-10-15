#!/usr/bin/env node
/**
 * E2E Test Generator — Cart Service
 * @module cart-service/scripts
 *
 * Usage: node scripts/generate-e2e-tests.mjs
 */

import { writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

import { ENDPOINTS, GROUPS, TOTAL_ENDPOINTS } from './e2e/endpoints.mjs';
import { generateSpec } from './e2e/spec-generator.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT = join(__dirname, '..');
const TEST_DIR = join(ROOT, 'test/e2e');

function main() {
  if (!existsSync(TEST_DIR)) {
    mkdirSync(TEST_DIR, { recursive: true });
  }

  console.log('');
  console.log('═══════════════════════════════════════════════════════════');
  console.log('🎯 Cart Service — E2E Test Generator');
  console.log('═══════════════════════════════════════════════════════════');
  console.log('');
  console.log(`📊 Total endpoints: ${TOTAL_ENDPOINTS}`);
  console.log(`📦 Groups: ${GROUPS.length}`);
  console.log('');

  let generatedCount = 0;

  for (const group of GROUPS) {
    const content = generateSpec(group, ENDPOINTS);
    if (!content) continue;

    const filename = `${group}.e2e-spec.ts`;
    const targetPath = join(TEST_DIR, filename);

    try {
      writeFileSync(targetPath, content, 'utf8');
      const testCount = ENDPOINTS.filter((e) => e.group === group).length;
      console.log(`  ✅ ${filename.padEnd(30)} (${testCount} tests)`);
      generatedCount += testCount;
    } catch (err) {
      console.error(`  ❌ ${filename} — ${err.message}`);
    }
  }

  // Barrel
  const barrelContent = GROUPS.map(
    (g) => `export * from './${g}.e2e-spec.js';`,
  ).join('\n');
  writeFileSync(join(TEST_DIR, 'index.ts'), barrelContent, 'utf8');

  console.log('');
  console.log('═══════════════════════════════════════════════════════════');
  console.log(`✅ Generated ${GROUPS.length} files, ${generatedCount} tests`);
  console.log(`📁 Location: ${TEST_DIR}`);
  console.log('═══════════════════════════════════════════════════════════');
  console.log('');
  console.log('🚀 Run tests: pnpm test:e2e');
  console.log('');
}

main();
