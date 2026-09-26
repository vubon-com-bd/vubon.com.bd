#!/usr/bin/env node
/**
 * Recover .ts files from .d.ts + .js pair
 * Usage: node recover-constants.mjs <input-dir> <output-dir>
 */

import fs from 'node:fs';
import path from 'node:path';

const inputDir = process.argv[2];
const outputDir = process.argv[3];

if (!inputDir || !outputDir) {
  console.error('Usage: node recover-constants.mjs <input-dir> <output-dir>');
  process.exit(1);
}

if (!fs.existsSync(inputDir)) {
  console.error(`❌ Input dir not found: ${inputDir}`);
  process.exit(1);
}

fs.mkdirSync(outputDir, { recursive: true });

let converted = 0;
let skipped = 0;

function walk(dir, prefix = '') {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    const rel = path.join(prefix, entry.name);

    if (entry.isDirectory()) {
      fs.mkdirSync(path.join(outputDir, rel), { recursive: true });
      walk(full, rel);
    } else if (entry.isFile() && entry.name.endsWith('.d.ts')) {
      const baseName = entry.name.replace(/\.d\.ts$/, '');
      const dtsPath = full;
      const jsPath = path.join(dir, baseName + '.js');
      const outPath = path.join(outputDir, prefix, baseName + '.ts');

      if (!fs.existsSync(jsPath)) {
        console.log(`⚠️  No .js for ${rel}, skipping`);
        skipped++;
        continue;
      }

      const dtsContent = fs.readFileSync(dtsPath, 'utf8');
      const jsContent = fs.readFileSync(jsPath, 'utf8');

      // Merge: prefer .js values with .d.ts types
      // Simple approach: convert .js to .ts by adding 'as const'
      // then prepend .d.ts type exports

      let tsContent = jsContent;

      // Add `as const` to exported objects if not present
      // This is a heuristic - works for most constant files
      tsContent = tsContent.replace(
        /export const (\w+) = (\{[\s\S]*?\});/g,
        (match, name, body) => {
          if (body.includes('as const')) return match;
          return `export const ${name} = ${body} as const;`;
        }
      );

      // Extract type exports from .d.ts and append
      const typeExports = dtsContent.match(
        /export (?:declare )?type \w+[\s\S]*?;/g
      );
      if (typeExports) {
        tsContent += '\n\n' + typeExports.join('\n\n') + '\n';
      }

      fs.writeFileSync(outPath, tsContent);
      converted++;
    } else if (entry.isFile() && entry.name.endsWith('.js')) {
      // Skip .js (handled with .d.ts)
    } else if (entry.isFile() && entry.name.endsWith('.d.ts.map')) {
      // Skip maps
    } else if (entry.isFile() && entry.name.endsWith('.js.map')) {
      // Skip maps
    } else if (entry.isFile() && entry.name.endsWith('.ts')) {
      // Copy .ts directly if exists
      const outPath = path.join(outputDir, prefix, entry.name);
      fs.copyFileSync(full, outPath);
      converted++;
    }
  }
}

walk(inputDir);

console.log('');
console.log('═══════════════════════════════════════════');
console.log(`✅ Converted: ${converted} files`);
console.log(`⚠️  Skipped: ${skipped} files`);
console.log(`📁 Output: ${outputDir}`);
console.log('═══════════════════════════════════════════');
