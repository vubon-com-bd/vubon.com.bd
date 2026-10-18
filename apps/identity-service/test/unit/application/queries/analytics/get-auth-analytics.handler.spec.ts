import { describe, it, expect, beforeEach } from '@jest/globals';
import { GetAuthAnalyticsHandler } from '@application/queries/analytics/get-auth-analytics.handler.js';
import { GetAuthAnalyticsQuery } from '@application/queries/analytics/get-auth-analytics.query.js';
import { makeAuthRepositoryMock } from '@fixtures/index.js';

describe('GetAuthAnalyticsHandler', () => {
  let handler: GetAuthAnalyticsHandler;
  let repo: ReturnType<typeof makeAuthRepositoryMock>;

  beforeEach(() => {
    repo = makeAuthRepositoryMock();
    handler = new GetAuthAnalyticsHandler(repo as never);
  });

  it('queryType = analytics.get-auth', () => {
    expect(handler.queryType).toBe('analytics.get-auth');
  });

  it('should return stats', async () => {
    repo.getStats.mockResolvedValue({
      total: 100, byStatus: {}, byType: {}, byProvider: {},
      activeCount: 80, lockedCount: 5, mfaEnabledCount: 40,
    } as never);
    const result = await handler.execute(new GetAuthAnalyticsQuery());
    expect(result.total).toBe(100);
    expect(result.activeCount).toBe(80);
  });

  it('should pass date range', async () => {
    repo.getStats.mockResolvedValue({ total: 0 } as never);
    await handler.execute(new GetAuthAnalyticsQuery('2026-01-01', '2026-12-31'));
    expect(repo.getStats).toHaveBeenCalledWith(undefined, '2026-01-01', '2026-12-31');
  });
});
