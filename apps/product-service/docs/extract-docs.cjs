#!/usr/bin/env node
/**
 * Extract JSDoc-style documentation from *.doc.ts files
 * and write them as markdown (*.md) at the app root.
 */
const fs = require('node:fs');
const path = require('node:path');

const SRC_DIR = __dirname;
const OUT_DIR = path.resolve(__dirname, '..');

const FILES = {
  'api.doc.ts': 'API.md',
  'architecture.doc.ts': 'ARCHITECTURE.md',
  'deployment.doc.ts': 'DEPLOYMENT.md',
  'development.doc.ts': 'DEVELOPMENT.md',
  'testing.doc.ts': 'TESTING.md',
};

function extractAll(src) {
  const blocks = [];
  const regex = /\/\*\*([\s\S]*?)\*\//g;
  let m;
  while ((m = regex.exec(src)) !== null) {
    const content = m[1]
      .split('\n')
      .map(function (line) { return line.replace(/^\s*\*\s?/, ''); })
      .join('\n')
      .trim();
    if (content) blocks.push(content);
  }
  return blocks.join('\n\n---\n\n');
}

let totalFiles = 0;
for (const [srcFile, outFile] of Object.entries(FILES)) {
  const srcPath = path.join(SRC_DIR, srcFile);
  if (!fs.existsSync(srcPath)) {
    console.warn('WARN missing: ' + srcFile);
    continue;
  }

  const src = fs.readFileSync(srcPath, 'utf8');
  const blocks = extractAll(src);
  const title = outFile.replace('.md', '').replace(/_/g, ' ');
  const md = '# ' + title + '\n\n' + blocks + '\n';

  const outPath = path.join(OUT_DIR, outFile);
  fs.writeFileSync(outPath, md, 'utf8');
  console.log('OK ' + srcFile + ' -> ' + outFile + ' (' + md.length + ' bytes)');
  totalFiles += 1;
}

console.log('');
console.log('Generated ' + totalFiles + ' markdown files.');
