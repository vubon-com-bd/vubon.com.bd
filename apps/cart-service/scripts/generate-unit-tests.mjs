#!/usr/bin/env node
/**
 * Unit Test Generator — Cart Service
 * @module cart-service/scripts
 *
 * Usage: node scripts/generate-unit-tests.mjs
 */

import { writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

import {
  UNIT_TESTS,
  UNIT_GROUPS,
  TOTAL_UNITS,
} from './unit/registry.mjs';
import { generateSpec } from './unit/helpers.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT = join(__dirname, '..');
const TEST_DIR = join(ROOT, 'test/unit');

function main() {
  if (!existsSync(TEST_DIR)) {
    mkdirSync(TEST_DIR, { recursive: true });
  }

  console.log('');
  console.log('═══════════════════════════════════════════════════════════');
  console.log('🎯 Cart Service — Unit Test Generator');
  console.log('═══════════════════════════════════════════════════════════');
  console.log('');
  console.log(`📊 Total units: ${TOTAL_UNITS}`);
  console.log(`📦 Groups: ${UNIT_GROUPS.length}`);
  console.log('');

  // Group units by their group name
  const grouped = {};
  for (const unit of UNIT_TESTS) {
    if (!grouped[unit.group]) grouped[unit.group] = [];
    grouped[unit.group].push(unit);
  }

  let totalTests = 0;

  // Generate ONE spec file per unit
  for (const unit of UNIT_TESTS) {
    const filename = `${unit.className}.unit-spec.ts`;
    const targetPath = join(TEST_DIR, filename);

    try {
      const content = generateSpec(unit);
      writeFileSync(targetPath, content, 'utf8');
      const testCount = (unit.scenarios ?? []).length;
      console.log(`  ✅ ${filename.padEnd(45)} (${testCount} tests)`);
      totalTests += testCount;
    } catch (err) {
      console.error(`  ❌ ${filename} — ${err.message}`);
    }
  }

  // Generate index.ts
  const barrelContent = UNIT_TESTS.map(
    (u) => `export * from './${u.className}.unit-spec.js';`,
  ).join('\n');
  writeFileSync(join(TEST_DIR, 'index.ts'), barrelContent, 'utf8');

  console.log('');
  console.log('═══════════════════════════════════════════════════════════');
  console.log(`✅ Generated ${UNIT_TESTS.length} files, ${totalTests} tests`);
  console.log(`📁 Location: ${TEST_DIR}`);
  console.log('═══════════════════════════════════════════════════════════');
  console.log('');
  console.log('🚀 Run tests: pnpm test:unit');
  console.log('');
}

main();
