/**
 * Email API E2E Tests (lightweight)
 * @module notification-service/test/e2e/interfaces
 */
import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import type { CommandBus } from '@nestjs/cqrs';
import { EmailController } from '@interfaces/controllers/rest/email.controller.js';

const USER = { userId: '00000000-0000-4000-8000-000000000001' };

describe('Email API (e2e)', () => {
  let controller: EmailController;
  let commandBus: { execute: jest.Mock };

  beforeEach(() => {
    commandBus = { execute: jest.fn() };
    controller = new EmailController(commandBus as unknown as CommandBus);
  });

  it('POST /emails → 201 payload', async () => {
    commandBus.execute.mockResolvedValueOnce({
      success: true,
      status: 'sent',
      messageId: 'msg-1',
    });

    const res = await controller.send(
      { to: ['x@y.z'], subject: 'Hi', text: 'Hello' } as never,
      USER,
    );
    expect(res.success).toBe(true);
  });

  it('POST /emails with invalid body → BadRequest', async () => {
    await expect(
      controller.send({ to: [], subject: '' } as never, USER),
    ).rejects.toThrow();
  });
});
