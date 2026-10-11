import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { GetWebhookHandler } from '../../../../src/module/application/queries/webhook/get-webhook.handler.js';
import { GetWebhookQuery } from '../../../../src/module/application/queries/webhook/get-webhook.query.js';
import { ListWebhooksHandler } from '../../../../src/module/application/queries/webhook/list-webhooks.handler.js';
import { ListWebhooksQuery } from '../../../../src/module/application/queries/webhook/list-webhooks.query.js';
import { ListWebhookDeliveriesHandler } from '../../../../src/module/application/queries/webhook/list-webhook-deliveries.handler.js';
import { ListWebhookDeliveriesQuery } from '../../../../src/module/application/queries/webhook/list-webhook-deliveries.query.js';

function mockSvc() {
  return {
    getById: jest.fn().mockResolvedValue({ id: 'w-1' }),
    list: jest.fn().mockResolvedValue({ items: [], total: 0 }),
    listDeliveries: jest.fn().mockResolvedValue({ items: [], total: 0 }),
  } as never;
}

describe('Webhook query handlers', () => {
  let svc: ReturnType<typeof mockSvc>;
  beforeEach(() => { svc = mockSvc(); });
  it('GetWebhookHandler', async () => {
    await new GetWebhookHandler(svc).execute(new GetWebhookQuery('w-1'));
    expect(svc.getById).toHaveBeenCalled();
  });
  it('ListWebhooksHandler', async () => {
    await new ListWebhooksHandler(svc).execute(new ListWebhooksQuery({ page: 1, limit: 20 } as never));
    expect(svc.list).toHaveBeenCalled();
  });
  it('ListWebhookDeliveriesHandler', async () => {
    await new ListWebhookDeliveriesHandler(svc).execute(new ListWebhookDeliveriesQuery({ webhookId: 'w-1', page: 1, limit: 20 } as never));
    expect(svc.listDeliveries).toHaveBeenCalled();
  });
});
