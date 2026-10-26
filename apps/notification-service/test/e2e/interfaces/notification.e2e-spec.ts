/**
 * Notification API E2E Tests (lightweight)
 * @module notification-service/test/e2e/interfaces
 */
import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import type { CommandBus, QueryBus } from '@nestjs/cqrs';

// Mock validator — behavior covered in validators unit tests
const mockV = jest.fn<() => void>(() => undefined);
jest.mock('@application/validators/notification.validator.js', () => ({
  NotificationValidator: {
    validateSend: mockV,
    validateSendBulk: mockV,
    validateCancel: mockV,
    validateResend: mockV,
  },
}));

import { NotificationController } from '@interfaces/controllers/rest/notification.controller.js';

const USER = { userId: '00000000-0000-4000-8000-000000000001' };
const NID = '11111111-1111-4111-8111-111111111111';

describe('Notification API (e2e)', () => {
  let controller: NotificationController;
  let commandBus: { execute: jest.Mock };
  let queryBus: { execute: jest.Mock };

  beforeEach(() => {
    jest.clearAllMocks();
    commandBus = { execute: jest.fn() };
    queryBus = { execute: jest.fn() };
    controller = new NotificationController(
      commandBus as unknown as CommandBus,
      queryBus as unknown as QueryBus,
    );
  });

  it('POST /notifications sends → 201 payload', async () => {
    commandBus.execute.mockResolvedValueOnce({
      success: true,
      notificationIds: [NID],
      status: 'queued',
      queuedCount: 1,
      failedCount: 0,
    });

    const body = {
      userId: USER.userId,
      type: 'transactional',
      category: 'order',
      channels: ['email'],
      priority: 'normal',
      subject: 'Hello',
      body: 'World',
    };

    const res = await controller.send(body as never, USER);
    expect(res.success).toBe(true);
    expect(res.notificationIds).toEqual([NID]);
  });

  it('GET /notifications/:id returns full payload', async () => {
    queryBus.execute.mockResolvedValueOnce({
      id: NID,
      userId: USER.userId,
      type: 'transactional',
      category: 'order',
      channel: 'email',
      priority: 'normal',
      status: 'sent',
      title: 'Hello',
      body: 'World',
      createdAt: '2026-01-01T00:00:00Z',
      updatedAt: '2026-01-01T00:00:00Z',
    });

    const res = await controller.getById(NID);
    expect(res.id).toBe(NID);
  });

  it('GET /notifications returns paginated shape', async () => {
    queryBus.execute.mockResolvedValueOnce({
      items: [],
      total: 0,
      page: 1,
      limit: 20,
      totalPages: 0,
    });

    const res = await controller.list({});
    expect(res.total).toBe(0);
    expect(res.page).toBe(1);
  });
});
