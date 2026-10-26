/**
 * PushController Tests
 * @module notification-service/test/unit/interfaces/controllers/rest
 */
import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import type { CommandBus } from '@nestjs/cqrs';
import { PushController } from '@interfaces/controllers/rest/push.controller.js';

const USER = { userId: '00000000-0000-4000-8000-000000000001' };

describe('PushController', () => {
  let controller: PushController;
  let commandBus: { execute: jest.Mock };

  beforeEach(() => {
    commandBus = { execute: jest.fn() };
    controller = new PushController(commandBus as unknown as CommandBus);
  });

  describe('send', () => {
    it('dispatches SendPushCommand', async () => {
      commandBus.execute.mockResolvedValueOnce({
        success: true,
        messageId: 'm-1',
        successCount: 1,
        failureCount: 0,
      });

      const dto = {
        tokens: ['tok-1'],
        title: 'Hi',
        body: 'Message',
      };
      const result = await controller.send(dto as never, USER);
      expect(result.successCount).toBe(1);
    });

    it('throws on empty tokens', async () => {
      await expect(
        controller.send({ tokens: [], title: 'x', body: 'y' } as never, USER),
      ).rejects.toThrow();
    });
  });

  describe('sendBulk', () => {
    it('dispatches SendBulkPushCommand', async () => {
      commandBus.execute.mockResolvedValueOnce({
        success: true,
        totalTokens: 100,
        successCount: 100,
        failureCount: 0,
        invalidTokens: [],
      });

      const dto = {
        tokens: ['tok-1', 'tok-2'],
        title: 'Bulk',
        body: 'Bulk body',
      };
      const result = await controller.sendBulk(dto as never, USER);
      expect(result.totalTokens).toBe(100);
    });
  });
});
