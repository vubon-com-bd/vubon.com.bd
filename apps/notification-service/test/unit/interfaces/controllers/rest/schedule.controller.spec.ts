/**
 * ScheduleController Tests
 * @module notification-service/test/unit/interfaces/controllers/rest
 */
import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import type { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ScheduleController } from '@interfaces/controllers/rest/schedule.controller.js';

const USER = { userId: '00000000-0000-4000-8000-000000000001' };
const SCHEDULE_ID = '33333333-3333-4333-8333-333333333333';

describe('ScheduleController', () => {
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

  describe('create', () => {
    it('dispatches CreateScheduleCommand', async () => {
      commandBus.execute.mockResolvedValueOnce({
        id: SCHEDULE_ID, name: 'Daily digest',
        type: 'scheduled', recurrence: 'daily',
        status: 'pending', timezone: 'Asia/Dhaka',
        recipientCount: 2, runCount: 0,
        createdAt: 'c', updatedAt: 'u',
      });

      const dto = {
        name: 'Daily digest',
        type: 'scheduled',
        recurrence: 'daily',
        timezone: 'Asia/Dhaka',
        templateId: '44444444-4444-4444-8444-444444444444',
      };
      const result = await controller.create(dto as never, USER);
      expect(result.id).toBe(SCHEDULE_ID);
    });
  });

  describe('update', () => {
    it('dispatches UpdateScheduleCommand', async () => {
      commandBus.execute.mockResolvedValueOnce({
        id: SCHEDULE_ID, name: 'Updated',
        type: 'scheduled', recurrence: 'daily',
        status: 'pending', timezone: 'Asia/Dhaka',
        recipientCount: 2, runCount: 0,
        createdAt: 'c', updatedAt: 'u',
      });

      const result = await controller.update(
        SCHEDULE_ID,
        { name: 'Updated' },
        USER,
      );
      expect(result.name).toBe('Updated');
    });
  });

  describe('cancel', () => {
    it('dispatches CancelScheduleCommand', async () => {
      commandBus.execute.mockResolvedValueOnce({
        id: SCHEDULE_ID, name: 'N',
        type: 'scheduled', recurrence: 'daily',
        status: 'cancelled', timezone: 'Asia/Dhaka',
        recipientCount: 0, runCount: 0,
        createdAt: 'c', updatedAt: 'u',
      });

      const result = await controller.cancel(SCHEDULE_ID, USER);
      expect(result.status).toBe('cancelled');
    });
  });

  describe('list', () => {
    it('dispatches ListSchedulesQuery', async () => {
      queryBus.execute.mockResolvedValueOnce({
        items: [], total: 0, page: 1, limit: 20, totalPages: 0,
      });

      const result = await controller.list({});
      expect(result.total).toBe(0);
    });
  });

  describe('getById', () => {
    it('dispatches GetScheduleQuery', async () => {
      queryBus.execute.mockResolvedValueOnce({
        id: SCHEDULE_ID, name: 'N',
        type: 'scheduled', recurrence: 'daily',
        status: 'active', timezone: 'Asia/Dhaka',
        recipientCount: 2, runCount: 3,
        createdAt: 'c', updatedAt: 'u',
      });

      const result = await controller.getById(SCHEDULE_ID);
      expect(result.id).toBe(SCHEDULE_ID);
    });
  });
});
