import { VendorAnalyticsService } from '../../../../../src/module/infrastructure/services/external/vendor-analytics.service.js';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';

describe('VendorAnalyticsService', () => {
  let service: VendorAnalyticsService;

  beforeEach(() => {
    service = new VendorAnalyticsService();
  });

  it('trackRegistration works', async () => {
    await expect(service.trackRegistration(UUID, UUID, 'individual')).resolves.not.toThrow();
  });

  it('trackActivation works', async () => {
    await expect(service.trackActivation(UUID)).resolves.not.toThrow();
  });

  it('trackPayout works', async () => {
    await expect(service.trackPayout(UUID, 5000, 'BDT')).resolves.not.toThrow();
  });

  it('trackSuspension works', async () => {
    await expect(service.trackSuspension(UUID, 'policy', 30)).resolves.not.toThrow();
  });

  it('trackSubscriptionChange works', async () => {
    await expect(service.trackSubscriptionChange(UUID, 'basic', 'premium')).resolves.not.toThrow();
  });

  it('trackTierChange works', async () => {
    await expect(service.trackTierChange(UUID, 'bronze', 'silver')).resolves.not.toThrow();
  });

  it('trackFunnelStep works', async () => {
    await expect(service.trackFunnelStep('basic_info', UUID, UUID)).resolves.not.toThrow();
  });

  it('trackFunnelStep works without ids', async () => {
    await expect(service.trackFunnelStep('started')).resolves.not.toThrow();
  });
});
