/**
 * HealthModule tests
 */
import { describe, it, expect } from '@jest/globals';
import { HealthModule } from '@modules/health/health.module.js';
import { AuthHealthIndicator } from '@modules/health/auth.health.js';
import { HealthController } from '@interfaces/controllers/rest/health.controller.js';

describe('HealthModule', () => {
  it('should be defined', () => {
    expect(HealthModule).toBeDefined();
  });

  it('should register HealthController', () => {
    const controllers = Reflect.getMetadata('controllers', HealthModule) ?? [];
    expect(controllers).toContain(HealthController);
  });

  it('should register AuthHealthIndicator provider', () => {
    const providers = Reflect.getMetadata('providers', HealthModule) ?? [];
    expect(providers).toContain(AuthHealthIndicator);
  });

  it('should export AuthHealthIndicator', () => {
    const exports_ = Reflect.getMetadata('exports', HealthModule) ?? [];
    expect(exports_).toContain(AuthHealthIndicator);
  });
});
