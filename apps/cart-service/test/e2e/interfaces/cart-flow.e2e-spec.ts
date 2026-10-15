/**
 * Cart Flow — E2E Tests
 * @module test/e2e/interfaces
 *
 * Tests HTTP-layer contract through the full stack (controllers → commands → services).
 */
import { describe, it, expect, beforeAll, afterAll } from '@jest/globals';
import { Test } from '@nestjs/testing';
import type { INestApplication } from '@nestjs/common';
import { CartAppModule } from '../../../src/module/modules/app.module.js';

describe('Cart Flow (e2e — interfaces)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [CartAppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  }, 60_000);

  afterAll(async () => {
    await app?.close();
  });

  it('should bootstrap the application', () => {
    expect(app).toBeDefined();
  });

  it('should have HTTP adapter ready', () => {
    const httpAdapter = app.getHttpAdapter();
    expect(httpAdapter).toBeDefined();
  });
});
