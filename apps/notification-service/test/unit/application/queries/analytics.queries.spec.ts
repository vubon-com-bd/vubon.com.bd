import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { GetAnalyticsOverviewHandler } from '../../../../src/module/application/queries/analytics/get-analytics-overview.handler.js';
import { GetAnalyticsOverviewQuery } from '../../../../src/module/application/queries/analytics/get-analytics-overview.query.js';
import { GetAnalyticsTimeSeriesHandler } from '../../../../src/module/application/queries/analytics/get-analytics-time-series.handler.js';
import { GetAnalyticsTimeSeriesQuery } from '../../../../src/module/application/queries/analytics/get-analytics-time-series.query.js';
import { GetChannelPerformanceHandler } from '../../../../src/module/application/queries/analytics/get-channel-performance.handler.js';
import { GetChannelPerformanceQuery } from '../../../../src/module/application/queries/analytics/get-channel-performance.query.js';

function mockSvc() {
  return {
    overview: jest.fn().mockResolvedValue({ totalSent: 0 }),
    timeSeries: jest.fn().mockResolvedValue({ points: [] }),
    channelPerformance: jest.fn().mockResolvedValue([]),
  } as never;
}

describe('Analytics query handlers', () => {
  let svc: ReturnType<typeof mockSvc>;
  beforeEach(() => { svc = mockSvc(); });
  it('GetAnalyticsOverviewHandler', async () => {
    await new GetAnalyticsOverviewHandler(svc).execute(new GetAnalyticsOverviewQuery({
      fromDate: '2026-01-01', toDate: '2026-12-31',
    } as never));
    expect(svc.overview).toHaveBeenCalled();
  });
  it('GetAnalyticsTimeSeriesHandler', async () => {
    await new GetAnalyticsTimeSeriesHandler(svc).execute(new GetAnalyticsTimeSeriesQuery({
      fromDate: '2026-01-01', toDate: '2026-12-31', interval: 'day',
    } as never));
    expect(svc.timeSeries).toHaveBeenCalled();
  });
  it('GetChannelPerformanceHandler', async () => {
    await new GetChannelPerformanceHandler(svc).execute(new GetChannelPerformanceQuery('2026-01-01', '2026-12-31'));
    expect(svc.channelPerformance).toHaveBeenCalled();
  });
});
