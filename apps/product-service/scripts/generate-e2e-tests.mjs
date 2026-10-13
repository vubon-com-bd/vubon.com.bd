#!/usr/bin/env node
/**
 * E2E Test Generator — main entry
 * @module product-service/scripts
 *
 * Usage: pnpm generate:e2e
 * Output: test/e2e/<group>.e2e-spec.ts
 */
import { writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

import { ENDPOINTS } from './e2e/endpoints.mjs';
import { generateSpec } from './e2e/spec-generator.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT = join(__dirname, '..');
const TEST_DIR = join(ROOT, 'test', 'e2e');

function main() {
  if (!existsSync(TEST_DIR)) {
    mkdirSync(TEST_DIR, { recursive: true });
  }

  const groups = [...new Set(ENDPOINTS.map((e) => e.group))];
  console.log(`📦 Generating E2E tests for ${groups.length} group(s)...`);
  console.log('');

  let generated = 0;
  let totalTests = 0;

  for (const group of groups) {
    const content = generateSpec(group, ENDPOINTS);
    if (!content) continue;

    const filename = `${group}.e2e-spec.ts`;
    const target = join(TEST_DIR, filename);
    const count = ENDPOINTS.filter((e) => e.group === group).length;

    try {
      writeFileSync(target, content, 'utf8');
      console.log(`  ✅ ${filename.padEnd(35)} (${count} test${count === 1 ? '' : 's'})`);
      generated++;
      totalTests += count;
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error(`  ❌ ${filename} — ${msg}`);
    }
  }

  console.log('');
  console.log(`📊 Generated ${generated} spec file(s) with ${totalTests} test(s)`);
  console.log(`📁 Output: ${TEST_DIR}`);
}

main();
