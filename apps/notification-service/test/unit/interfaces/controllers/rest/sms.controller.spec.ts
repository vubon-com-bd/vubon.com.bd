/**
 * SmsController Tests
 * @module notification-service/test/unit/interfaces/controllers/rest
 */
import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import type { CommandBus } from '@nestjs/cqrs';
import { SmsController } from '@interfaces/controllers/rest/sms.controller.js';

const USER = { userId: '00000000-0000-4000-8000-000000000001' };

describe('SmsController', () => {
  let controller: SmsController;
  let commandBus: { execute: jest.Mock };

  beforeEach(() => {
    commandBus = { execute: jest.fn() };
    controller = new SmsController(commandBus as unknown as CommandBus);
  });

  describe('send', () => {
    it('dispatches SendSmsCommand', async () => {
      commandBus.execute.mockResolvedValueOnce({
        success: true,
        messageId: 'msg-1',
        status: 'sent',
        segments: 1,
      });

      const dto = {
        to: '+8801712345678',
        message: 'Hello',
        type: 'transactional',
      };
      const result = await controller.send(dto as never, USER);
      expect(result.segments).toBe(1);
    });

    it('throws on empty message', async () => {
      await expect(
        controller.send({ to: '+8801712345678', message: '', type: 'transactional' } as never, USER),
      ).rejects.toThrow();
    });
  });

  describe('sendBulk', () => {
    it('dispatches SendBulkSmsCommand', async () => {
      commandBus.execute.mockResolvedValueOnce({
        success: true,
        totalRequested: 2,
        successCount: 2,
        failureCount: 0,
        totalSegments: 2,
        failures: [],
      });

      const dto = {
        recipients: [
          { phone: '+8801712345678' },
          { phone: '+8801812345678' },
        ],
        message: 'Bulk hello',
        type: 'promotional',
      };
      const result = await controller.sendBulk(dto as never, USER);
      expect(result.successCount).toBe(2);
    });
  });
});
