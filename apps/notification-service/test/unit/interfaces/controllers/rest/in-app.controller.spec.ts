/**
 * InAppController Tests
 * @module notification-service/test/unit/interfaces/controllers/rest
 */
import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import type { CommandBus } from '@nestjs/cqrs';
import { InAppController } from '@interfaces/controllers/rest/in-app.controller.js';

const USER = { userId: '00000000-0000-4000-8000-000000000001' };

describe('InAppController', () => {
  let controller: InAppController;
  let commandBus: { execute: jest.Mock };

  beforeEach(() => {
    commandBus = { execute: jest.fn() };
    controller = new InAppController(commandBus as unknown as CommandBus);
  });

  describe('create', () => {
    it('dispatches CreateInAppCommand', async () => {
      commandBus.execute.mockResolvedValueOnce({
        success: true,
        notificationIds: ['n-1'],
        status: 'queued',
        queuedCount: 1,
        failedCount: 0,
      });

      const dto = {
        userId: '00000000-0000-4000-8000-000000000002',
        title: 'Hi',
        body: 'Welcome',
      };
      const result = await controller.create(dto as never, USER);
      expect(result.success).toBe(true);
    });
  });

  describe('dismiss', () => {
    it('dispatches DismissInAppCommand', async () => {
      commandBus.execute.mockResolvedValueOnce({ dismissed: true });

      const result = await controller.dismiss(
        '00000000-0000-4000-8000-000000000005',
        {},
        USER,
      );
      expect(result.dismissed).toBe(true);
    });
  });
});
