/**
 * BroadcastController Tests
 * @module notification-service/test/unit/interfaces/controllers/rest
 */
import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import type { CommandBus, QueryBus } from '@nestjs/cqrs';
import { BroadcastController } from '@interfaces/controllers/rest/broadcast.controller.js';

const USER = { userId: '00000000-0000-4000-8000-000000000001' };
const BC_ID = '55555555-5555-4555-8555-555555555555';

function buildBroadcastResponse() {
  return {
    id: BC_ID,
    name: 'BF Sale',
    type: 'segment',
    target: 'all',
    status: 'draft',
    channels: ['email'],
    recipientCount: 100,
    sentCount: 0,
    failedCount: 0,
    createdBy: USER.userId,
    createdAt: 'c',
  };
}

describe('BroadcastController', () => {
  let controller: BroadcastController;
  let commandBus: { execute: jest.Mock };
  let queryBus: { execute: jest.Mock };

  beforeEach(() => {
    commandBus = { execute: jest.fn() };
    queryBus = { execute: jest.fn() };
    controller = new BroadcastController(
      commandBus as unknown as CommandBus,
      queryBus as unknown as QueryBus,
    );
  });

  describe('create', () => {
    it('dispatches CreateBroadcastCommand', async () => {
      commandBus.execute.mockResolvedValueOnce(buildBroadcastResponse());

      const dto = {
        name: 'BF Sale',
        type: 'segment',
        target: 'all',
        channels: ['email'],
      };
      const result = await controller.create(dto as never, USER);
      expect(result.id).toBe(BC_ID);
    });
  });

  describe('start', () => {
    it('dispatches StartBroadcastCommand', async () => {
      commandBus.execute.mockResolvedValueOnce({
        ...buildBroadcastResponse(),
        status: 'sending',
      });

      const result = await controller.start(BC_ID, { testMode: false }, USER);
      expect(result.status).toBe('sending');
    });
  });

  describe('cancel', () => {
    it('dispatches CancelBroadcastCommand', async () => {
      commandBus.execute.mockResolvedValueOnce({
        ...buildBroadcastResponse(),
        status: 'cancelled',
      });

      const result = await controller.cancel(BC_ID, USER);
      expect(result.status).toBe('cancelled');
    });
  });

  describe('list', () => {
    it('dispatches ListBroadcastsQuery', async () => {
      queryBus.execute.mockResolvedValueOnce({
        items: [],
        total: 0,
        page: 1,
        limit: 20,
        totalPages: 0,
      });

      const result = await controller.list({});
      expect(result.total).toBe(0);
    });
  });

  describe('getResult', () => {
    it('dispatches GetBroadcastResultQuery', async () => {
      queryBus.execute.mockResolvedValueOnce({
        broadcastId: BC_ID,
        recipientCount: 100,
        sentCount: 95,
        deliveredCount: 90,
        failedCount: 5,
        openCount: 50,
        clickCount: 10,
        unsubscribedCount: 2,
        deliveryRate: 0.95,
        openRate: 0.55,
        clickRate: 0.2,
        unsubscribeRate: 0.02,
        durationMs: 1000,
        throughputPerSecond: 100,
      });

      const result = await controller.getResult(BC_ID);
      expect(result.deliveryRate).toBe(0.95);
    });
  });

  describe('getById', () => {
    it('dispatches GetBroadcastQuery', async () => {
      queryBus.execute.mockResolvedValueOnce(buildBroadcastResponse());
      const result = await controller.getById(BC_ID);
      expect(result.id).toBe(BC_ID);
    });
  });
});
