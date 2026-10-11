import { describe, it, expect } from '@jest/globals';
import { ScheduleControllerMapper } from '../../../../src/module/interfaces/mappers/schedule.controller.mapper.js';

describe('ScheduleControllerMapper', () => {
  it('toCreateAppDto', () => {
    const dto = ScheduleControllerMapper.toCreateAppDto({
      type: 'scheduled', recurrence: 'none', scheduledAt: '2026-10-10T00:00:00.000Z',
      timezone: 'Asia/Dhaka', notificationTemplateId: 't-1', userId: 'u',
      maxOccurrences: 5,
    } as never);
    expect(dto.timezone).toBe('Asia/Dhaka');
    expect(dto.maxOccurrences).toBe(5);
  });

  it('toUpdateAppDto', () => {
    const dto = ScheduleControllerMapper.toUpdateAppDto('s-1', {
      scheduledAt: '2026-10-11T00:00:00.000Z', recurrence: 'daily', timezone: 'UTC',
      maxOccurrences: 10,
    } as never);
    expect(dto.scheduleId).toBe('s-1');
  });

  it('toPauseAppDto', () => {
    const dto = ScheduleControllerMapper.toPauseAppDto('s-1', { reason: 'x' } as never);
    expect(dto.scheduleId).toBe('s-1');
  });

  it('toCancelAppDto', () => {
    const dto = ScheduleControllerMapper.toCancelAppDto('s-1', { reason: 'x' } as never);
    expect(dto.reason).toBe('x');
  });

  it('toTriggerAppDto', () => {
    const dto = ScheduleControllerMapper.toTriggerAppDto('s-1', {
      triggeredNotificationId: 'n-1',
    } as never);
    expect(dto.triggeredNotificationId).toBe('n-1');
  });

  it('toListAppDto defaults + filters', () => {
    const o = ScheduleControllerMapper.toListAppDto({
      userId: 'u', type: 'recurring', status: 'active', templateId: 't-1',
      fromDate: '2026-01-01', toDate: '2026-12-31',
    } as never);
    expect(o.page).toBe(1);
    expect(o.filter?.userId).toBe('u');
  });
});
