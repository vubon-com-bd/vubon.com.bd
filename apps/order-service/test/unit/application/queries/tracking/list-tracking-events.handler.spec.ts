import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { ListTrackingEventsHandler } from '@application/queries/tracking/list-tracking-events.handler.js';
import { ListTrackingEventsQuery } from '@application/queries/tracking/list-tracking-events.query.js';
import type { IOrderTrackingService } from '@application/services/interfaces/order-tracking.service.interface.js';
import { FIXTURE_ID_2 } from '@fixtures/application/entity-factories.js';

describe('ListTrackingEventsHandler', () => {
  let handler: ListTrackingEventsHandler;
  let service: jest.Mocked<IOrderTrackingService>;
  beforeEach(() => {
    service = { listByOrder: jest.fn() } as unknown as jest.Mocked<IOrderTrackingService>;
    handler = new ListTrackingEventsHandler(service);
  });
  it('delegates to service.listByOrder', async () => {
    service.listByOrder.mockResolvedValue({ items: [], total: 0 });
    await handler.execute(new ListTrackingEventsQuery(FIXTURE_ID_2));
    expect(service.listByOrder).toHaveBeenCalledWith(FIXTURE_ID_2);
  });
});
