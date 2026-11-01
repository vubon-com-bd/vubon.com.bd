/**
 * E2E Test Helpers — reusable builders
 * @module cart-service/scripts/e2e
 */

export function formatPath(path, params) {
  if (!params) return path;
  let formatted = path;
  for (const [key, value] of Object.entries(params)) {
    formatted = formatted.replace(`:${key}`, `\${${value}}`);
  }
  return formatted;
}

export function generateTestBlock(endpoint) {
  const {
    method,
    path,
    name,
    auth,
    request,
    query,
    params,
    headers,
    expect,
  } = endpoint;

  const formattedPath = formatPath(path, params);

  const callLines = [
    `const response = await request(app.getHttpServer())`,
    `      .${method.toLowerCase()}(\`${formattedPath}\`)`,
  ];

  if (auth) {
    callLines.push(`      .set('Authorization', \`Bearer \${accessToken}\`)`);
  }

  // Custom headers (e.g., X-Guest-Token)
  if (headers) {
    for (const [key, value] of Object.entries(headers)) {
      callLines.push(`      .set('${key}', \`${value}\`)`);
    }
  }

  if (query) {
    callLines.push(`      .query(${JSON.stringify(query)})`);
  }

  if (request) {
    callLines.push(
      `      .send(${JSON.stringify(request, null, 6).replace(/\n/g, '\n      ')})`,
    );
  }

  const statuses = Array.isArray(expect.status)
    ? expect.status
    : [expect.status];

  const assertLines = [
    statuses.length > 1
      ? `expect(${JSON.stringify(statuses)}).toContain(response.status);`
      : `expect(response.status).toBe(${statuses[0]});`,
  ];

  if (expect.hasFields) {
    for (const field of expect.hasFields) {
      assertLines.push(
        `if (response.status < 400) { expect(response.body).toHaveProperty('${field}'); }`,
      );
    }
  }

  if (expect.noFields) {
    for (const field of expect.noFields) {
      assertLines.push(`expect(response.body.${field}).toBeUndefined();`);
    }
  }

  if (expect.isArray === true) {
    assertLines.push(`expect(Array.isArray(response.body)).toBe(true);`);
  } else if (typeof expect.isArray === 'string') {
    assertLines.push(
      `expect(Array.isArray(response.body.${expect.isArray})).toBe(true);`,
    );
  }

  return [
    `it('${name}', async () => {`,
    `    ${callLines.join('\n    ')}`,
    ``,
    `    ${assertLines.join('\n    ')}`,
    `  });`,
  ].join('\n');
}

export function generateImports() {
  return `/**
 * AUTO-GENERATED E2E Test — do not edit manually.
 * Regenerate: node scripts/generate-e2e-tests.mjs
 */

import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from '../../src/module/modules/app.module.js';
`;
}

export function generateAppSetup() {
  return `
let app: INestApplication;

beforeAll(async () => {
  const moduleRef = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  app = moduleRef.createNestApplication();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );
  await app.init();
}, 60000);

afterAll(async () => {
  if (app) {
    try {
      await app.close();
    } catch {
      // ignore close errors
    }
  }
}, 30000);
`;
}

export function generateFixtures() {
  return `
// ═══ Shared test fixtures (always defined) ═══
const accessToken = 'test-token-placeholder';
const seededUserId = '00000000-0000-4000-8000-000000000001';
const SEEDED_CART_ID = '00000000-0000-4000-8000-000000000010';
const SEEDED_ITEM_ID = '00000000-0000-4000-8000-000000000020';
const SEEDED_SAVED_ID = '00000000-0000-4000-8000-000000000030';
const SEEDED_GUEST_ID = '00000000-0000-4000-8000-000000000040';
const PLACEHOLDER_GUEST_TOKEN = 'placeholder-guest-token-32chars-min';

void seededUserId;
void PLACEHOLDER_GUEST_TOKEN;
`;
}
