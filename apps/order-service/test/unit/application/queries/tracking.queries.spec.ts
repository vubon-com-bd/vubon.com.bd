import { jest } from '@jest/globals';
import { GetTrackingHandler } from '../../../../src/module/application/queries/tracking/get-tracking.handler.js';
import { ListTrackingEventsHandler } from '../../../../src/module/application/queries/tracking/list-tracking-events.handler.js';
import { GetTrackingSummaryHandler } from '../../../../src/module/application/queries/tracking/get-tracking-summary.handler.js';
import { GetTrackingQuery } from '../../../../src/module/application/queries/tracking/get-tracking.query.js';
import { TRACKING_QUERY_HANDLERS } from '../../../../src/module/application/queries/tracking/index.js';

function mockService() {
  return {
    getById: jest.fn().mockResolvedValue({ id: 't1' }),
    listByOrder: jest.fn().mockResolvedValue([]),
    getSummary: jest.fn().mockResolvedValue({ orderId: 'o1', events: [] }),
  };
}

describe('Tracking query handlers', () => {
  it('GetTrackingHandler', async () => {
    const svc = mockService();
    const h = new GetTrackingHandler(svc as never);
    await h.execute(new GetTrackingQuery('t1'));
    expect(svc.getById).toHaveBeenCalled();
  });

  it('ListTrackingEventsHandler', async () => {
    const svc = mockService();
    const h = new ListTrackingEventsHandler(svc as never);
    await h.execute({ orderId: 'o1' } as never);
    expect(svc.listByOrder).toHaveBeenCalled();
  });

  it('GetTrackingSummaryHandler', async () => {
    const svc = mockService();
    const h = new GetTrackingSummaryHandler(svc as never);
    await h.execute({ orderId: 'o1' } as never);
    expect(svc.getSummary).toHaveBeenCalled();
  });

  it('TRACKING_QUERY_HANDLERS exports 3', () => {
    expect(TRACKING_QUERY_HANDLERS).toHaveLength(3);
  });
});
