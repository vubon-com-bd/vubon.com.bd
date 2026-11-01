/**
 * Schedule API E2E Tests (lightweight)
 * @module notification-service/test/e2e/interfaces
 */
import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import type { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ScheduleController } from '@interfaces/controllers/rest/schedule.controller.js';

const USER = { userId: '00000000-0000-4000-8000-000000000001' };
const SID = '33333333-3333-4333-8333-333333333333';

describe('Schedule API (e2e)', () => {
  let controller: ScheduleController;
  let commandBus: { execute: jest.Mock };
  let queryBus: { execute: jest.Mock };

  beforeEach(() => {
    commandBus = { execute: jest.fn() };
    queryBus = { execute: jest.fn() };
    controller = new ScheduleController(
      commandBus as unknown as CommandBus,
      queryBus as unknown as QueryBus,
    );
  });

  it('GET /schedules returns paginated', async () => {
    queryBus.execute.mockResolvedValueOnce({
      items: [],
      total: 0,
      page: 1,
      limit: 20,
      totalPages: 0,
    });
    const res = await controller.list({});
    expect(res.total).toBe(0);
  });

  it('POST /schedules → 201 payload', async () => {
    commandBus.execute.mockResolvedValueOnce({
      id: SID,
      name: 'Daily',
      type: 'scheduled',
      recurrence: 'daily',
      status: 'pending',
      timezone: 'Asia/Dhaka',
      recipientCount: 2,
      runCount: 0,
      createdAt: 'c',
      updatedAt: 'u',
    });

    const res = await controller.create(
      {
        name: 'Daily',
        type: 'scheduled',
        recurrence: 'daily',
        timezone: 'Asia/Dhaka',
      } as never,
      USER,
    );
    expect(res.id).toBe(SID);
  });
});
