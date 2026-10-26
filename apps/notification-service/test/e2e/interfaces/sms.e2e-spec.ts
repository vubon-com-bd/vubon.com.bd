/**
 * SMS API E2E Tests (lightweight)
 * @module notification-service/test/e2e/interfaces
 */
import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import type { CommandBus } from '@nestjs/cqrs';
import { SmsController } from '@interfaces/controllers/rest/sms.controller.js';

const USER = { userId: '00000000-0000-4000-8000-000000000001' };

describe('SMS API (e2e)', () => {
  let controller: SmsController;
  let commandBus: { execute: jest.Mock };

  beforeEach(() => {
    commandBus = { execute: jest.fn() };
    controller = new SmsController(commandBus as unknown as CommandBus);
  });

  it('POST /sms → 201 payload', async () => {
    commandBus.execute.mockResolvedValueOnce({
      success: true,
      status: 'sent',
      segments: 1,
    });

    const res = await controller.send(
      { to: '+8801712345678', message: 'Hello', type: 'transactional' } as never,
      USER,
    );
    expect(res.success).toBe(true);
  });

  it('POST /sms with empty message → BadRequest', async () => {
    await expect(
      controller.send(
        { to: '+8801712345678', message: '', type: 'transactional' } as never,
        USER,
      ),
    ).rejects.toThrow();
  });
});
