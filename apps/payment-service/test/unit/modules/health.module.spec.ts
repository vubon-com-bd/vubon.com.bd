/**
 * HealthModule — unit test
 * @module test/unit/modules
 */
import 'reflect-metadata';
import { HealthModule } from '@modules/health/health.module';
import { PaymentHealthIndicator } from '@modules/health/payment.health';
import { HealthController } from '@interfaces/controllers/rest/health.controller';

describe('HealthModule', () => {
  it('is defined', () => {
    expect(HealthModule).toBeDefined();
  });

  it('registers HealthController', () => {
    const controllers = Reflect.getMetadata('controllers', HealthModule);
    expect(controllers).toContain(HealthController);
  });

  it('registers PaymentHealthIndicator', () => {
    const providers = Reflect.getMetadata('providers', HealthModule);
    expect(providers).toContain(PaymentHealthIndicator);
  });
});
