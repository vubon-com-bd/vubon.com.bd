/**
 * ScheduleControllerMapper Tests
 * @module notification-service/test/unit/interfaces/mappers
 */
import { describe, expect, it } from '@jest/globals';
import { ScheduleControllerMapper } from '@interfaces/mappers/schedule.controller.mapper.js';

describe('ScheduleControllerMapper', () => {
  describe('toCreateRequestDTO', () => {
    it('converts schedule create', () => {
      const http = {
        name: 'Daily digest',
        type: 'scheduled',
        recurrence: 'daily',
        timezone: 'Asia/Dhaka',
        scheduledAt: '2026-01-01T09:00:00Z',
        templateId: 't-1',
        recipientIds: ['u-1', 'u-2'],
      };
      const app = ScheduleControllerMapper.toCreateRequestDTO(http as never);
      expect(app.name).toBe('Daily digest');
      expect(app.recipientIds).toHaveLength(2);
    });
  });

  describe('toUpdateRequestDTO', () => {
    it('includes scheduleId', () => {
      const app = ScheduleControllerMapper.toUpdateRequestDTO('s-1', {
        name: 'Updated',
        scheduledAt: '2026-02-01',
      } as never);
      expect(app.scheduleId).toBe('s-1');
    });

    it('handles undefined recipientIds safely', () => {
      const app = ScheduleControllerMapper.toUpdateRequestDTO('s-1', {} as never);
      expect(app.recipientIds).toBeUndefined();
    });
  });

  describe('toCancelRequestDTO', () => {
    it('includes scheduleId + reason', () => {
      const app = ScheduleControllerMapper.toCancelRequestDTO('s-1', 'no longer needed');
      expect(app.scheduleId).toBe('s-1');
      expect(app.reason).toBe('no longer needed');
    });
  });

  describe('toListOptions', () => {
    it('defaults', () => {
      const opts = ScheduleControllerMapper.toListOptions({} as never);
      expect(opts.page).toBe(1);
      expect(opts.limit).toBe(20);
    });
  });

  describe('toHttpResponse', () => {
    it('passes through', () => {
      const app = {
        id: 's-1', name: 'D', type: 'scheduled', recurrence: 'daily',
        status: 'active', timezone: 'Asia/Dhaka', recipientCount: 2,
        runCount: 0, createdAt: 'c', updatedAt: 'u',
      };
      const http = ScheduleControllerMapper.toHttpResponse(app as never);
      expect(http.id).toBe('s-1');
    });
  });

  describe('toListHttp', () => {
    it('maps items', () => {
      const app = {
        items: [{ id: 's-1', name: 'D', status: 'active', runCount: 0, createdAt: 'c' }],
        total: 1, page: 1, limit: 20, totalPages: 1,
      };
      const http = ScheduleControllerMapper.toListHttp(app as never);
      expect(http.items).toHaveLength(1);
    });
  });
});
