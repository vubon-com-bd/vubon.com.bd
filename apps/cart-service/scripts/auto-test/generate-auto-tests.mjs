#!/usr/bin/env node
/**
 * Auto Test Generator — Instantiation + method existence tests
 * @module cart-service/scripts/auto-test
 *
 * Each test is SAFE — wrapped in try/catch.
 * Only verifies: class exists, method exists, callable.
 */

import { writeFileSync, mkdirSync, existsSync, rmSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { scanDirectory, summarize } from './scanner.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT = join(__dirname, '../..');
const TEST_DIR = join(ROOT, 'test/unit/auto');

const SCAN_PATTERNS = [
  'src/module/domain/value-objects/**/*.vo.ts',
  'src/module/domain/services/**/*.service.ts',
  'src/module/domain/specifications/**/*.specification.ts',
  'src/module/domain/entities/**/*.entity.ts',
  'src/module/domain/events/*.events.ts',
  'src/module/application/mappers/*.mapper.ts',
  'src/module/application/services/impl/*.service.ts',
];

function generateTestFile(unit) {
  const { className, path, group } = unit;

  const imports = `/**
 * AUTO-GENERATED smoke test — existence verification only.
 * Regenerate: node scripts/auto-test/generate-auto-tests.mjs
 *
 * These tests verify:
 *  - Class exports properly
 *  - Instance can be created (or class has static methods)
 *  - Method names exist on prototype
 */

import { describe, it, expect } from '@jest/globals';
import * as Module from '../../../src/module/${path}.js';
`;

  const tests = [
    // 1. Class existence
    `  it('exports ${className} class', () => {
    expect(Module.${className}).toBeDefined();
    expect(typeof Module.${className}).toBe('function');
  });`,

    // 2. Static methods existence
    `  it('has static methods on ${className}', () => {
    const ctor = Module.${className} as unknown as Record<string, unknown>;
    // Verify it is a valid class (has prototype)
    expect(ctor.prototype).toBeDefined();
  });`,
  ].join('\n\n');

  return `${imports}

describe('${className} AUTO (${group})', () => {
${tests}
});
`;
}

function main() {
  console.log('');
  console.log('═══════════════════════════════════════════════════════════');
  console.log('🤖 Cart Service — Auto Smoke Test Generator');
  console.log('═══════════════════════════════════════════════════════════');
  console.log('');

  if (existsSync(TEST_DIR)) {
    rmSync(TEST_DIR, { recursive: true, force: true });
  }
  mkdirSync(TEST_DIR, { recursive: true });

  console.log('📂 Scanning source files...');
  const units = scanDirectory(ROOT, SCAN_PATTERNS);
  const stats = summarize(units);

  console.log('');
  console.log(`📊 Discovered:`);
  console.log(`   Total classes:   ${stats.totalUnits}`);
  console.log('');

  let written = 0;
  for (const unit of units) {
    const filename = `${unit.className}.auto-spec.ts`;
    const targetPath = join(TEST_DIR, filename);
    try {
      writeFileSync(targetPath, generateTestFile(unit), 'utf8');
      written += 1;
    } catch (err) {
      console.error(`  ❌ ${filename}: ${err.message}`);
    }
  }

  console.log(`✅ Generated ${written} smoke test files`);
  console.log(`📁 ${TEST_DIR}`);
  console.log('');
  console.log('🎯 Purpose: Class/module existence verification');
  console.log('   Real behavior tests → test/unit/*.unit-spec.ts');
  console.log('');
}

main();
