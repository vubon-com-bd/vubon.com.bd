import { describe, it, expect, beforeEach, afterEach, jest } from '@jest/globals';
import { OrderAnalyticsService } from '@infrastructure/services/external/order-analytics.service';

describe('OrderAnalyticsService', () => {
  let service: OrderAnalyticsService;
  let originalFetch: typeof global.fetch;

  beforeEach(() => {
    originalFetch = global.fetch;
    service = new OrderAnalyticsService();
  });

  afterEach(() => {
    global.fetch = originalFetch;
  });

  it('track sends POST to analytics', async () => {
    global.fetch = jest.fn().mockResolvedValue({ ok: true } as Response);
    const result = await service.track({
      orderId: 'order-1',
      event: 'order.created',
      data: { amount: 100 },
    });
    expect(result).toBe(true);
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('/analytics/track'),
      expect.objectContaining({ method: 'POST' }),
    );
  });

  it('track returns false on HTTP error', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      status: 500,
    } as Response);
    const result = await service.track({
      orderId: 'order-1',
      event: 'order.created',
      data: {},
    });
    expect(result).toBe(false);
  });

  it('track returns false on network error', async () => {
    global.fetch = jest.fn().mockRejectedValue(new Error('timeout'));
    const result = await service.track({
      orderId: 'order-1',
      event: 'order.created',
      data: {},
    });
    expect(result).toBe(false);
  });
});
