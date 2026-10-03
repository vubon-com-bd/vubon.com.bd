import { AnalyticsService } from '../../../../../src/module/infrastructure/services/external/analytics.service.js';

describe('AnalyticsService', () => {
  let service: AnalyticsService;

  beforeEach(() => {
    service = new AnalyticsService();
  });

  it('track() resolves', async () => {
    await expect(
      service.track('order.created', { orderId: 'o1' }),
    ).resolves.toBeUndefined();
  });

  it('identify() resolves', async () => {
    await expect(
      service.identify('user-1', { tier: 'gold' }),
    ).resolves.toBeUndefined();
  });

  it('track() without properties', async () => {
    await expect(service.track('order.created')).resolves.toBeUndefined();
  });
});
