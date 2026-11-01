/**
 * Full App Bootstrap — E2E Test
 * @module test/e2e/modules
 *
 * Verifies the entire CartAppModule (all 5 layers) wires correctly.
 * Tests:
 *  - Root module compiles
 *  - All feature modules instantiate
 *  - Common module (global) is accessible
 *  - Health module responds
 *  - Command/Query buses are wired
 */
import { describe, it, expect, beforeAll, afterAll } from '@jest/globals';
import { Test } from '@nestjs/testing';
import type { INestApplication } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { CartAppModule } from '../../../src/module/modules/app.module.js';
import { CartHealthIndicator } from '../../../src/module/modules/health/cart.health.js';
import { CartCommonModule } from '../../../src/module/modules/common/common.module.js';

describe('Full App Bootstrap (e2e — modules)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [CartAppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  }, 90_000);

  afterAll(async () => {
    await app?.close();
  });

  it('should bootstrap CartAppModule', () => {
    expect(app).toBeDefined();
  });

  it('should have CartCommonModule exported', () => {
    expect(CartCommonModule).toBeDefined();
  });

  it('should resolve CommandBus from global CqrsModule', () => {
    const cmdBus = app.get(CommandBus, { strict: false });
    expect(cmdBus).toBeDefined();
  });

  it('should resolve QueryBus from global CqrsModule', () => {
    const qryBus = app.get(QueryBus, { strict: false });
    expect(qryBus).toBeDefined();
  });

  it('should resolve CartHealthIndicator', () => {
    const indicator = app.get(CartHealthIndicator, { strict: false });
    expect(indicator).toBeDefined();
    expect(typeof indicator.check).toBe('function');
  });

  it('should produce a valid health report', async () => {
    const indicator = app.get(CartHealthIndicator, { strict: false });
    const report = await indicator.check();
    expect(report.service).toBe('cart-service');
    expect(typeof report.healthy).toBe('boolean');
    expect(report.dependencies.length).toBeGreaterThan(0);
    expect(report.timestamp).toBeDefined();
  });

  it('should have HTTP adapter ready', () => {
    const adapter = app.getHttpAdapter();
    expect(adapter).toBeDefined();
  });
});
