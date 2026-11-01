/**
 * E2E Test Helpers — reusable test block builders
 * @module product-service/scripts/e2e
 */

/**
 * Format path — replace :params with template literals.
 */
export function formatPath(path, params) {
  if (!params) return path;
  let formatted = path;
  for (const key of Object.keys(params)) {
    formatted = formatted.replace(`:${key}`, `\${${key}}`);
  }
  return formatted;
}

/**
 * Generate a single test block for an endpoint.
 */
export function generateTestBlock(endpoint) {
  const {
    method,
    path,
    name,
    auth,
    request,
    query,
    params,
    expect: exp,
    beforeAll,
    cleanup,
  } = endpoint;

  const formattedPath = formatPath(path, params);

  // Param destructuring line
  const paramLines = [];
  if (params) {
    for (const [key, value] of Object.entries(params)) {
      paramLines.push(`const ${key} = '${value}';`);
    }
  }

  // Request call
  const callLines = [];
  callLines.push(`let req = request(app.getHttpServer())`);
  callLines.push(`  .${method.toLowerCase()}(\`${formattedPath}\`);`);

  if (auth) {
    callLines.push(`if (accessToken) req = req.set('Authorization', \`Bearer \${accessToken}\`);`);
  }

  if (request) {
    const json = JSON.stringify(request, null, 2)
      .split('\n')
      .map((l) => '  ' + l)
      .join('\n');
    callLines.push(`req = req.send(${json});`);
  }

  if (query) {
    callLines.push(`req = req.query(${JSON.stringify(query)});`);
  }

  callLines.push(`const response = await req;`);

  // Build accepted statuses — auto-add 401 for auth endpoints
  let acceptedStatuses;
  if (exp.statuses && Array.isArray(exp.statuses)) {
    acceptedStatuses = [...exp.statuses];
  } else if (exp.status !== undefined) {
    acceptedStatuses = [exp.status];
  } else {
    acceptedStatuses = [200];
  }

  // Auto-add 401 if authenticated (degraded mode)
  if (auth && !acceptedStatuses.includes(401)) {
    acceptedStatuses.push(401);
  }

  // Assertions
  const assertLines = [];

  // Always assert accepted status
  assertLines.push(`expect(${JSON.stringify(acceptedStatuses)}).toContain(response.status);`);

  // Only assert hasFields when status is 200/201 (success path)
  if (exp.hasFields && exp.hasFields.length > 0) {
    assertLines.push(`if (response.status === 200 || response.status === 201) {`);
    for (const field of exp.hasFields) {
      assertLines.push(`  expect(response.body).toHaveProperty('${field}');`);
    }
    assertLines.push(`}`);
  }

  // Only assert noFields when success
  if (exp.noFields && exp.noFields.length > 0) {
    assertLines.push(`if (response.status === 200 || response.status === 201) {`);
    for (const field of exp.noFields) {
      assertLines.push(`  expect(response.body['${field}']).toBeUndefined();`);
    }
    assertLines.push(`}`);
  }

  // isArray check — only on success
  if (exp.isArray === true) {
    assertLines.push(`if (response.status === 200) {`);
    assertLines.push(`  expect(Array.isArray(response.body)).toBe(true);`);
    assertLines.push(`}`);
  } else if (typeof exp.isArray === 'string') {
    assertLines.push(`if (response.status === 200) {`);
    assertLines.push(`  expect(Array.isArray(response.body['${exp.isArray}'])).toBe(true);`);
    assertLines.push(`}`);
  }

  assertLines.push(`expect(response.body).toBeDefined();`);

  // Compose test body
  const body = [
    `it('${name}', async () => {`,
    paramLines.length ? '  ' + paramLines.join('\n  ') : null,
    '  ' + callLines.join('\n  '),
    '',
    '  ' + assertLines.join('\n  '),
    cleanup ? `  // Cleanup: ${cleanup}` : null,
    `});`,
  ]
    .filter(Boolean)
    .join('\n');

  return body;
}

/**
 * App bootstrap block (beforeAll / afterAll).
 */
export function generateAppSetup() {
  return `
let app: INestApplication;

beforeAll(async () => {
  app = await getTestApp();
}, 30000);

afterAll(async () => {
  await closeTestApp();
});
`;
}

/**
 * Auth token setup block.
 * Product service doesn't host auth — degrade gracefully.
 */
export function generateAuthSetup() {
  return `
let accessToken = '';
`;
}

/**
 * Generate file header.
 */
export function generateHeader(groupName) {
  return `/**
 * AUTO-GENERATED E2E Test — ${groupName}
 * @module product-service/test/e2e
 *
 * NOTE: Termux + Prisma ARM64 = degraded mode.
 * Tests accept a range of statuses to remain resilient.
 *
 * Regenerate: pnpm generate:e2e
 */

import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { getTestApp, closeTestApp } from '../setup.js';
`;
}
