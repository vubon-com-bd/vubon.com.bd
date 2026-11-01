/**
 * E2E Spec Generator
 * @module cart-service/scripts/e2e
 */

import { ENDPOINTS } from './endpoints.mjs';
import {
  generateTestBlock,
  generateImports,
  generateAppSetup,
  generateFixtures,
} from './helpers.mjs';

export function generateSpec(groupName, endpoints) {
  const groupEndpoints = endpoints.filter((e) => e.group === groupName);
  if (groupEndpoints.length === 0) return null;

  const header = generateImports();
  const appSetup = generateAppSetup();
  // Always include fixtures — prevents "is not defined" errors
  const fixtures = generateFixtures();

  const tests = groupEndpoints
    .map((e) => '  ' + generateTestBlock(e))
    .join('\n\n');

  return `${header}
${appSetup}
${fixtures}

describe('${groupName} (E2E)', () => {
${tests}
});
`;
}
