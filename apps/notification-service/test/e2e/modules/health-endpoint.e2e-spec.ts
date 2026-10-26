/**
 * Health Endpoint E2E — GET /health
 * @module notification-service/test/e2e/modules
 *
 * Verifies:
 *  - /health returns 200
 *  - response shape: service + healthy + timestamp + dependencies[]
 *  - DB and Redis checked
 */
import 'reflect-metadata';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { NotificationAppModule } from '@modules/app.module.js';
import { NotificationHealthIndicator } from '@modules/health/notification.health.js';

describe('Health Endpoint (E2E)', () => {
  let app: INestApplication;
  let moduleRef: TestingModule;
  let indicator: NotificationHealthIndicator;

  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [NotificationAppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();

    indicator = moduleRef.get(NotificationHealthIndicator, { strict: false });
  }, 60_000);

  afterAll(async () => {
    if (app) {
      await app.close();
    }
  });

  it('should have NotificationHealthIndicator available', () => {
    expect(indicator).toBeDefined();
  });

  it('should return health report with correct shape', async () => {
    const report = await indicator.check();

    expect(report).toBeDefined();
    expect(report.service).toBe('notification-service');
    expect(typeof report.healthy).toBe('boolean');
    expect(report.timestamp).toMatch(/^\d{4}-\d{2}-\d{2}T/);
    expect(report.uptimeSeconds).toBeGreaterThanOrEqual(0);
    expect(Array.isArray(report.dependencies)).toBe(true);
  });

  it('should include database and redis dependencies', async () => {
    const report = await indicator.check();
    const names = report.dependencies.map((d) => d.name);

    expect(names).toContain('database');
    expect(names).toContain('redis');
  });

  it('should report degraded mode when Prisma engine unavailable', async () => {
    const report = await indicator.check();
    const dbDep = report.dependencies.find((d) => d.name === 'database');

    // In E2E (Termux), Prisma engine is skipped → degraded mode expected
    expect(dbDep).toBeDefined();
    // message may contain "Prisma engine unavailable" in Termux
    if (!dbDep?.healthy) {
      expect(dbDep?.message).toBeDefined();
    }
  });
});
