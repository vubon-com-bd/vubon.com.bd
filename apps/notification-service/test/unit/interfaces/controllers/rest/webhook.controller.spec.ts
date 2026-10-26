/**
 * WebhookController Tests
 * @module notification-service/test/unit/interfaces/controllers/rest
 */
import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import type { CommandBus, QueryBus } from '@nestjs/cqrs';

// ─── Mock app validator ───
const mockCreate = jest.fn<() => void>();
const mockUpdate = jest.fn<() => void>();
const mockTest = jest.fn<() => void>();

jest.mock('@application/validators/webhook.validator.js', () => ({
  WebhookValidator: {
    validateCreate: mockCreate,
    validateUpdate: mockUpdate,
    validateTest: mockTest,
  },
}));

import { WebhookController } from '@interfaces/controllers/rest/webhook.controller.js';

const USER = { userId: '00000000-0000-4000-8000-000000000001' };
const WH_ID = '88888888-8888-4888-8888-888888888888';

function buildWebhookResponse() {
  return {
    id: WH_ID,
    name: 'My hook',
    type: 'outgoing',
    status: 'active',
    url: 'https://x.com/hook',
    events: ['order.created'],
    hasSecret: true,
    createdAt: 'c',
    updatedAt: 'u',
  };
}

describe('WebhookController', () => {
  let controller: WebhookController;
  let commandBus: { execute: jest.Mock };
  let queryBus: { execute: jest.Mock };

  beforeEach(() => {
    jest.clearAllMocks();
    commandBus = { execute: jest.fn() };
    queryBus = { execute: jest.fn() };
    controller = new WebhookController(
      commandBus as unknown as CommandBus,
      queryBus as unknown as QueryBus,
    );
  });

  describe('create', () => {
    it('validates + dispatches CreateWebhookCommand', async () => {
      mockCreate.mockImplementationOnce(() => undefined);
      commandBus.execute.mockResolvedValueOnce(buildWebhookResponse());

      const dto = {
        name: 'My hook',
        url: 'https://x.com/hook',
        events: ['order.created'],
        secret: 'test-secret-16chars',
      };
      const result = await controller.create(dto as never, USER);
      expect(mockCreate).toHaveBeenCalled();
      expect(result.id).toBe(WH_ID);
    });
  });

  describe('update', () => {
    it('validates + dispatches UpdateWebhookCommand', async () => {
      mockUpdate.mockImplementationOnce(() => undefined);
      commandBus.execute.mockResolvedValueOnce({
        ...buildWebhookResponse(),
        name: 'Updated',
      });
      const result = await controller.update(WH_ID, { name: 'Updated' }, USER);
      expect(mockUpdate).toHaveBeenCalled();
      expect(result.name).toBe('Updated');
    });
  });

  describe('test', () => {
    it('validates + dispatches TestWebhookCommand', async () => {
      mockTest.mockImplementationOnce(() => undefined);
      commandBus.execute.mockResolvedValueOnce({
        id: 'd-1',
        webhookId: WH_ID,
        event: 'order.created',
        status: 'delivered',
        attemptCount: 1,
        createdAt: 'c',
      });
      const result = await controller.test(
        WH_ID,
        { event: 'order.created' },
        USER,
      );
      expect(mockTest).toHaveBeenCalled();
      expect(result.id).toBe('d-1');
    });
  });

  describe('list', () => {
    it('dispatches ListWebhooksQuery', async () => {
      queryBus.execute.mockResolvedValueOnce({
        items: [], total: 0, page: 1, limit: 20, totalPages: 0,
      });
      const result = await controller.list({});
      expect(result.total).toBe(0);
    });
  });

  describe('getById', () => {
    it('dispatches GetWebhookQuery', async () => {
      queryBus.execute.mockResolvedValueOnce(buildWebhookResponse());
      const result = await controller.getById(WH_ID);
      expect(result.id).toBe(WH_ID);
    });
  });
});
