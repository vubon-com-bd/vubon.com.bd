/**
 * Unit Test Helpers — reusable builders
 * @module cart-service/scripts/unit
 */

export function generateTestBlock(unit) {
  const { scenarios } = unit;

  if (!scenarios || scenarios.length === 0) return '';

  return scenarios
    .map((s) => {
      const isThrow = s.expectThrow === true;
      const isAsync = s.async === true;
      const varName = s.varName ?? (isThrow ? 'fn' : 'result');

      const itPrefix = isAsync ? 'async () =>' : '() =>';
      
      // For async scenarios: DON'T prefix await to the call expression itself
      // Call expression might already be async (returns Promise) 
      // or might be a function to be awaited later
      const callExpr = `const ${varName} = ${s.call};`;

      return [
        `  it('${s.name}', ${itPrefix} {`,
        `    ${callExpr}`,
        ``,
        `    ${s.expect}`,
        `  });`,
      ].join('\n');
    })
    .join('\n\n');
}

export function generateImports(unit) {
  const { className, path } = unit;
  return `/**
 * AUTO-GENERATED Unit Test — do not edit manually.
 * Regenerate: node scripts/generate-unit-tests.mjs
 */

import { describe, it, expect, beforeEach } from '@jest/globals';
import { ${className} } from '../../src/module/${path}.js';
`;
}

export function generateSpec(unit) {
  const { className, group } = unit;
  const imports = generateImports(unit);
  const tests = generateTestBlock(unit);
  const describeName = `${className} (${group})`;

  return `${imports}

describe('${describeName}', () => {
${tests}
});
`;
}
