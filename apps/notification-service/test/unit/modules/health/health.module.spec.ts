/**
 * HealthModule — Unit tests
 * @module notification-service/test/unit/modules/health
 */
import 'reflect-metadata';
import { jest } from '@jest/globals';
import { HealthModule } from '@modules/health/health.module.js';
import { NotificationHealthIndicator } from '@modules/health/notification.health.js';
import { HealthController } from '@interfaces/controllers/rest/health.controller.js';

describe('HealthModule', () => {
  it('should be defined', () => {
    expect(HealthModule).toBeDefined();
  });

  it('should register HealthController', () => {
    const controllers = Reflect.getMetadata('controllers', HealthModule) as unknown[] | undefined;
    expect(controllers).toBeDefined();
    expect(controllers).toContain(HealthController);
  });

  it('should provide NotificationHealthIndicator', () => {
    const providers = Reflect.getMetadata('providers', HealthModule) as unknown[] | undefined;
    expect(providers).toBeDefined();
    expect(providers).toContain(NotificationHealthIndicator);
  });

  it('should export NotificationHealthIndicator', () => {
    const exports = Reflect.getMetadata('exports', HealthModule) as unknown[] | undefined;
    expect(exports).toBeDefined();
    expect(exports).toContain(NotificationHealthIndicator);
  });
});
