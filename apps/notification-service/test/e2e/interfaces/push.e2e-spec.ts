/**
 * Push API E2E Tests (lightweight)
 * @module notification-service/test/e2e/interfaces
 */
import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import type { CommandBus } from '@nestjs/cqrs';
import { PushController } from '@interfaces/controllers/rest/push.controller.js';

const USER = { userId: '00000000-0000-4000-8000-000000000001' };

describe('Push API (e2e)', () => {
  let controller: PushController;
  let commandBus: { execute: jest.Mock };

  beforeEach(() => {
    commandBus = { execute: jest.fn() };
    controller = new PushController(commandBus as unknown as CommandBus);
  });

  it('POST /push → 201 payload', async () => {
    commandBus.execute.mockResolvedValueOnce({
      success: true,
      successCount: 1,
      failureCount: 0,
    });

    const res = await controller.send(
      { tokens: ['tok-1'], title: 'Hi', body: 'Hello' } as never,
      USER,
    );
    expect(res.success).toBe(true);
  });
});
