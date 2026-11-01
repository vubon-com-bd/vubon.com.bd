/**
 * Controller registration — E2E (all routes declared)
 * @module test/e2e/modules
 */
import 'reflect-metadata';
import * as Controllers from '@interfaces/controllers/rest/index';
import * as Webhooks from '@interfaces/controllers/webhooks/index';

describe('Controller Registration (E2E)', () => {
  it('12 REST controllers exported', () => {
    const names = Object.keys(Controllers).filter((k) => k.endsWith('Controller'));
    expect(names.length).toBeGreaterThanOrEqual(12);
  });

  it('8 webhook controllers exported', () => {
    const names = Object.keys(Webhooks).filter((k) => k.endsWith('Controller') || k.endsWith('WebhookController'));
    expect(names.length).toBeGreaterThanOrEqual(8);
  });

  it('PaymentController has @Controller decorator', () => {
    const path = Reflect.getMetadata('path', Controllers.PaymentController);
    expect(path).toBe('payments');
  });

  it('HealthController has @Controller decorator', () => {
    const path = Reflect.getMetadata('path', Controllers.HealthController);
    expect(path).toBe('health');
  });

  it('BkashWebhookController has @Controller decorator', () => {
    const path = Reflect.getMetadata('path', Webhooks.BkashWebhookController);
    expect(path).toBe('webhooks/bkash');
  });
});
