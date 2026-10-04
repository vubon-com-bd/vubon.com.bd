import { jest } from '@jest/globals';

import { GetAbandonedStatsHandler } from '../../../../../src/module/application/queries/abandoned/get-abandoned-stats.handler.js';
import { GetAbandonedStatsQuery } from '../../../../../src/module/application/queries/abandoned/get-abandoned-stats.query.js';
import type { IAbandonedCartService } from '../../../../../src/module/application/services/interfaces/abandoned-cart.service.interface.js';
import type { AbandonedCartStatsDTO } from '../../../../../src/module/application/dtos/responses/abandoned-cart-response.dto.js';

function makeService(): jest.Mocked<IAbandonedCartService> {
  return {
    detect: jest.fn(), sendReminder: jest.fn(), recover: jest.fn(),
    markLost: jest.fn(), listPending: jest.fn(), getStats: jest.fn(),
  };
}

describe('GetAbandonedStatsHandler', () => {
  it('returns stats', async () => {
    const service = makeService();
    const handler = new GetAbandonedStatsHandler(service);
    service.getStats.mockResolvedValue({
      total: 10, pending: 3, reminded: 2, recovered: 4, lost: 1,
      recoveryRate: 0.4, averageCartValue: 500,
    } as AbandonedCartStatsDTO);
    const r = await handler.execute(new GetAbandonedStatsQuery());
    expect(r.total).toBe(10);
    expect(r.recoveryRate).toBe(0.4);
  });

  it('passes from/to dates', async () => {
    const service = makeService();
    const handler = new GetAbandonedStatsHandler(service);
    service.getStats.mockResolvedValue({} as AbandonedCartStatsDTO);
    await handler.execute(new GetAbandonedStatsQuery('2026-01-01', '2026-12-31'));
    expect(service.getStats).toHaveBeenCalledWith('2026-01-01', '2026-12-31');
  });
});
