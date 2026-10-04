import { jest } from '@jest/globals';

import { GetAbandonmentRateHandler } from '../../../../../src/module/application/queries/analytics/get-abandonment-rate.handler.js';
import { GetAbandonmentRateQuery } from '../../../../../src/module/application/queries/analytics/get-abandonment-rate.query.js';
import type { IAbandonedCartService } from '../../../../../src/module/application/services/interfaces/abandoned-cart.service.interface.js';
import type { AbandonedCartStatsDTO } from '../../../../../src/module/application/dtos/responses/abandoned-cart-response.dto.js';

function makeService(): jest.Mocked<IAbandonedCartService> {
  return {
    detect: jest.fn(), sendReminder: jest.fn(), recover: jest.fn(),
    markLost: jest.fn(), listPending: jest.fn(), getStats: jest.fn(),
  };
}

describe('GetAbandonmentRateHandler', () => {
  it('computes abandonment rate from stats', async () => {
    const service = makeService();
    const handler = new GetAbandonmentRateHandler(service);
    service.getStats.mockResolvedValue({
      total: 10, pending: 3, reminded: 2, recovered: 4, lost: 1,
      recoveryRate: 0.4, averageCartValue: 500,
    } as AbandonedCartStatsDTO);
    const r = await handler.execute(new GetAbandonmentRateQuery());
    // rate = (1 - 0.4) * 100 = 60
    expect(r.rate).toBe(60);
    expect(r.recovered).toBe(4);
    expect(r.lost).toBe(1);
    expect(r.pending).toBe(3);
  });

  it('passes date filters', async () => {
    const service = makeService();
    const handler = new GetAbandonmentRateHandler(service);
    service.getStats.mockResolvedValue({} as AbandonedCartStatsDTO);
    const r = await handler.execute(new GetAbandonmentRateQuery('2026-01-01', '2026-12-31'));
    expect(r.from).toBe('2026-01-01');
    expect(r.to).toBe('2026-12-31');
  });
});
