/**
 * E2E Spec Generator — composes Jest suites from endpoint metadata
 * @module product-service/scripts/e2e
 */
import {
  generateTestBlock,
  generateHeader,
  generateAppSetup,
  generateAuthSetup,
} from './helpers.mjs';

/**
 * Generate a complete E2E spec file for a group of endpoints.
 */
export function generateSpec(groupName, allEndpoints) {
  const endpoints = allEndpoints.filter((e) => e.group === groupName);
  if (endpoints.length === 0) return null;

  const header = generateHeader(groupName);
  const appSetup = generateAppSetup();
  const needsAuth = endpoints.some((e) => e.auth);
  const authSetup = needsAuth ? generateAuthSetup() : '';

  const tests = endpoints
    .map((e) => generateTestBlock(e))
    .map((block) => '  ' + block.split('\n').join('\n  '))
    .join('\n\n  ');

  return `${header}
${appSetup}
${authSetup}

describe('${groupName} (E2E)', () => {
  ${tests}
});
`;
}
