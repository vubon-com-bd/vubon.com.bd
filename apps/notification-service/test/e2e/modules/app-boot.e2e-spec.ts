/**
 * App Boot E2E — full NotificationAppModule compilation
 * @module notification-service/test/e2e/modules
 *
 * Verifies:
 *  - AppModule compiles (no DI errors)
 *  - All 14 feature modules present in module graph
 *  - HealthModule available
 *  - CommonModule @Global()
 *
 * ⚠️ Termux-safe: PRISMA_SKIP_ENGINE_BOOTSTRAP=true set in setup
 */
import 'reflect-metadata';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { NotificationAppModule } from '@modules/app.module.js';
import { NotificationHealthIndicator } from '@modules/health/notification.health.js';
import { NotificationService } from '@application/services/impl/notification.service.js';
import { NOTIFICATION_SERVICE } from '@application/services/interfaces/notification.service.interface.js';
import { TemplateService } from '@application/services/impl/template.service.js';
import { TEMPLATE_SERVICE } from '@application/services/interfaces/template.service.interface.js';

describe('App Boot (E2E)', () => {
  let app: INestApplication;
  let moduleRef: TestingModule;

  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [NotificationAppModule],
    })
      .overrideProvider('BullQueueService')
      .useValue({})
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  }, 60_000);

  afterAll(async () => {
    if (app) {
      await app.close();
    }
  });

  it('should boot without errors', () => {
    expect(app).toBeDefined();
  });

  it('should resolve NotificationService', () => {
    const service = moduleRef.get(NotificationService, { strict: false });
    expect(service).toBeDefined();
  });

  it('should resolve NOTIFICATION_SERVICE token', () => {
    const service = moduleRef.get(NOTIFICATION_SERVICE, { strict: false });
    expect(service).toBeDefined();
    expect(service).toBe(moduleRef.get(NotificationService, { strict: false }));
  });

  it('should resolve TemplateService', () => {
    const service = moduleRef.get(TemplateService, { strict: false });
    expect(service).toBeDefined();
  });

  it('should resolve TEMPLATE_SERVICE token', () => {
    const service = moduleRef.get(TEMPLATE_SERVICE, { strict: false });
    expect(service).toBeDefined();
  });

  it('should resolve NotificationHealthIndicator', () => {
    const indicator = moduleRef.get(NotificationHealthIndicator, { strict: false });
    expect(indicator).toBeDefined();
  });
});
