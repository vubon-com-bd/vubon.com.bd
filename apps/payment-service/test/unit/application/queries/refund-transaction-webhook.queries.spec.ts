import { jest } from '@jest/globals';
import { GetRefundHandler } from '../../../../src/module/application/queries/refund/get-refund.handler.js';
import { ListRefundsHandler } from '../../../../src/module/application/queries/refund/list-refunds.handler.js';
import { GetRefundQuery } from '../../../../src/module/application/queries/refund/get-refund.query.js';
import { ListRefundsQuery } from '../../../../src/module/application/queries/refund/list-refunds.query.js';

import { GetTransactionHandler } from '../../../../src/module/application/queries/transaction/get-transaction.handler.js';
import { ListTransactionsHandler } from '../../../../src/module/application/queries/transaction/list-transactions.handler.js';
import { GetTransactionQuery } from '../../../../src/module/application/queries/transaction/get-transaction.query.js';
import { ListTransactionsQuery } from '../../../../src/module/application/queries/transaction/list-transactions.query.js';

import { GetWebhookHandler } from '../../../../src/module/application/queries/webhook/get-webhook.handler.js';
import { ListWebhookEventsHandler } from '../../../../src/module/application/queries/webhook/list-webhook-events.handler.js';
import { GetWebhookQuery } from '../../../../src/module/application/queries/webhook/get-webhook.query.js';
import { ListWebhookEventsQuery } from '../../../../src/module/application/queries/webhook/list-webhook-events.query.js';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';

describe('Refund query handlers', () => {
  const svc = {
    getById: jest.fn(async () => ({ id: UUID, status: 'pending' })),
    list: jest.fn(async () => ({
      items: [],
      total: 0,
      page: 1,
      limit: 20,
      totalPages: 0,
    })),
  };

  it('GetRefundHandler', async () => {
    const h = new GetRefundHandler(svc as never);
    const out = await h.execute(new GetRefundQuery(UUID));
    expect(out.id).toBe(UUID);
  });

  it('ListRefundsHandler', async () => {
    const h = new ListRefundsHandler(svc as never);
    const out = await h.execute(new ListRefundsQuery({ page: 1, limit: 20 }));
    expect(out.total).toBe(0);
  });
});

describe('Transaction query handlers', () => {
  const svc = {
    getById: jest.fn(async () => ({ id: UUID, status: 'pending' })),
    list: jest.fn(async () => ({
      items: [],
      total: 0,
      page: 1,
      limit: 20,
      totalPages: 0,
    })),
  };

  it('GetTransactionHandler', async () => {
    const h = new GetTransactionHandler(svc as never);
    const out = await h.execute(new GetTransactionQuery(UUID));
    expect(out.id).toBe(UUID);
  });

  it('ListTransactionsHandler', async () => {
    const h = new ListTransactionsHandler(svc as never);
    const out = await h.execute(new ListTransactionsQuery({ page: 1, limit: 20 }));
    expect(out.total).toBe(0);
  });
});

describe('Webhook query handlers', () => {
  const svc = {
    getById: jest.fn(async () => ({ id: UUID, gateway: 'bkash' })),
    list: jest.fn(async () => ({
      items: [],
      total: 0,
      page: 1,
      limit: 20,
      totalPages: 0,
    })),
  };

  it('GetWebhookHandler', async () => {
    const h = new GetWebhookHandler(svc as never);
    const out = await h.execute(new GetWebhookQuery(UUID));
    expect(out.id).toBe(UUID);
  });

  it('ListWebhookEventsHandler', async () => {
    const h = new ListWebhookEventsHandler(svc as never);
    const out = await h.execute(new ListWebhookEventsQuery({ page: 1, limit: 20 }));
    expect(out.total).toBe(0);
  });
});
