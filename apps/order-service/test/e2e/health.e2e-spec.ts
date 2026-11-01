/**
 * E2E — Health / Test Bootstrap
 * @module order-service/test/e2e
 *
 * Verifies test infrastructure (test app factory + validation pipe).
 */
import { describe, it, expect, beforeAll, afterAll } from '@jest/globals';
import { createTestApp, TestAppContext } from '@fixtures/e2e/test-app.factory.js';

describe('E2E — Health Check (Test Bootstrap)', () => {
  let ctx: TestAppContext;

  beforeAll(async () => {
    ctx = await createTestApp();
  });

  afterAll(async () => {
    await ctx.close();
  });

  it('bootstraps a NestJS test app', () => {
    expect(ctx.app).toBeDefined();
  });

  it('exposes close() function', () => {
    expect(typeof ctx.close).toBe('function');
  });

  it('NestJS app is initialized', () => {
    expect(ctx.app.getHttpAdapter()).toBeDefined();
  });
});
