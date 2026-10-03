import { jest } from '@jest/globals';
import { OrderHealthService } from '../../../../src/module/modules/order/health/order.health.js';

describe('OrderHealthService', () => {
  it('check() → ok when prisma works', async () => {
    const prisma = {
      $queryRaw: jest.fn().mockResolvedValue([{ '1': 1 }]),
    };
    const service = new OrderHealthService(prisma as never);
    const result = await service.check();
    expect(result.status).toBe('ok');
    expect(result.checks.prisma).toBe(true);
  });

  it('check() → degraded when prisma fails', async () => {
    const prisma = {
      $queryRaw: jest.fn().mockRejectedValue(new Error('DB down')),
    };
    const service = new OrderHealthService(prisma as never);
    const result = await service.check();
    expect(result.status).toBe('degraded');
    expect(result.checks.prisma).toBe(false);
  });
});
