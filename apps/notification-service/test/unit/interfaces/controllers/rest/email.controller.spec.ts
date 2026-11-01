/**
 * EmailController Tests
 * @module notification-service/test/unit/interfaces/controllers/rest
 */
import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import type { CommandBus } from '@nestjs/cqrs';
import { EmailController } from '@interfaces/controllers/rest/email.controller.js';

const USER = { userId: '00000000-0000-4000-8000-000000000001' };

describe('EmailController', () => {
  let controller: EmailController;
  let commandBus: { execute: jest.Mock };

  beforeEach(() => {
    commandBus = { execute: jest.fn() };
    controller = new EmailController(commandBus as unknown as CommandBus);
  });

  describe('send', () => {
    it('dispatches SendEmailCommand', async () => {
      commandBus.execute.mockResolvedValueOnce({
        success: true,
        messageId: 'msg-1',
        status: 'sent',
      });

      const dto = {
        to: ['x@y.z'],
        subject: 'Hi',
        text: 'Hello',
      };
      const result = await controller.send(dto as never, USER);
      expect(result.success).toBe(true);
    });

    it('throws on invalid email', async () => {
      await expect(
        controller.send({ to: [], subject: '' } as never, USER),
      ).rejects.toThrow();
    });
  });

  describe('sendTemplate', () => {
    it('dispatches SendTemplateEmailCommand', async () => {
      commandBus.execute.mockResolvedValueOnce({
        success: true,
        status: 'sent',
      });

      const dto = {
        to: ['x@y.z'],
        templateId: 'tpl-1',
        templateData: { name: 'John' },
      };
      const result = await controller.sendTemplate(dto as never, USER);
      expect(result.success).toBe(true);
    });

    it('throws on missing templateData', async () => {
      await expect(
        controller.sendTemplate({ to: ['x@y.z'], templateId: 'tpl-1' } as never, USER),
      ).rejects.toThrow();
    });
  });

  describe('sendBulk', () => {
    it('dispatches SendBulkEmailCommand', async () => {
      commandBus.execute.mockResolvedValueOnce({
        success: true,
        totalRequested: 2,
        successCount: 2,
        failureCount: 0,
        failures: [],
      });

      const dto = {
        recipients: [
          { email: 'a@b.c' },
          { email: 'd@e.f' },
        ],
        templateId: 'tpl-1',
      };
      const result = await controller.sendBulk(dto as never, USER);
      expect(result.successCount).toBe(2);
    });
  });
});
