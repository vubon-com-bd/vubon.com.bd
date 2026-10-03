/**
 * Extract .doc.ts JSDoc blocks → .md files
 *
 * Usage:
 *   cd docs && node extract-docs.cjs
 */
const fs = require('fs');
const path = require('path');

const DOCS_DIR = __dirname;

const MAPPINGS = {
  'architecture.doc.ts': '../ARCHITECTURE.md',
  'api.doc.ts': '../API.md',
  'deployment.doc.ts': '../DEPLOYMENT.md',
  'development.doc.ts': '../DEVELOPMENT.md',
  'testing.doc.ts': '../TESTING.md',
};

function extractJSDoc(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const blocks = [];
  const regex = /\/\*\*([\s\S]*?)\*\//g;
  let match;

  while ((match = regex.exec(content)) !== null) {
    const raw = match[1];
    const cleaned = raw
      .split('\n')
      .map((line) => line.replace(/^\s*\*\s?/, ''))
      .join('\n')
      .trim();

    if (cleaned.length > 0) {
      blocks.push(cleaned);
    }
  }

  return blocks.join('\n\n---\n\n');
}

console.log('═══════════════════════════════════════════════════════════════');
console.log('📝 Extracting documentation from .doc.ts → .md');
console.log('═══════════════════════════════════════════════════════════════');

let converted = 0;

for (const [src, dest] of Object.entries(MAPPINGS)) {
  const srcPath = path.join(DOCS_DIR, src);
  const destPath = path.resolve(DOCS_DIR, dest);

  if (!fs.existsSync(srcPath)) {
    console.log(`  ⚠️  ${src} — not found, skipping`);
    continue;
  }

  const markdown = extractJSDoc(srcPath);
  const header = `<!-- AUTO-GENERATED from docs/${src}. Do not edit directly. -->\n\n`;
  fs.writeFileSync(destPath, header + markdown + '\n');
  console.log(`  ✅ ${src} → ${path.basename(destPath)} (${markdown.split('\n').length} lines)`);
  converted++;
}

console.log('');
console.log(`🎯 Converted: ${converted} files`);
