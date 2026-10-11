import { describe, it, expect } from '@jest/globals';
import { BroadcastControllerMapper } from '../../../../src/module/interfaces/mappers/broadcast.controller.mapper.js';

describe('BroadcastControllerMapper', () => {
  it('toCreateAppDto', () => {
    const dto = BroadcastControllerMapper.toCreateAppDto({
      type: 'all_users', target: 'all', templateId: 't-1', channels: ['email', 'push'],
      estimatedRecipients: 10000, scheduledAt: '2026-10-11T00:00:00.000Z',
      segmentFilter: { k: 'v' }, customRecipientIds: ['u1', 'u2'],
    } as never);
    expect(dto.channels.length).toBe(2);
  });

  it('toUpdateAppDto', () => {
    const dto = BroadcastControllerMapper.toUpdateAppDto('b-1', {
      templateId: 't-2', channels: ['sms'],
    } as never);
    expect(dto.broadcastId).toBe('b-1');
  });

  it('toScheduleAppDto', () => {
    const dto = BroadcastControllerMapper.toScheduleAppDto('b-1', {
      scheduledAt: '2026-10-11T00:00:00.000Z',
    } as never);
    expect(dto.scheduledAt).toBeDefined();
  });

  it('toStartAppDto', () => {
    const dto = BroadcastControllerMapper.toStartAppDto('b-1', {
      totalRecipients: 100, approvedBy: 'u',
    } as never);
    expect(dto.totalRecipients).toBe(100);
  });

  it('toCancelAppDto', () => {
    const dto = BroadcastControllerMapper.toCancelAppDto('b-1', { reason: 'x' } as never);
    expect(dto.reason).toBe('x');
  });

  it('toTestAppDto', () => {
    const dto = BroadcastControllerMapper.toTestAppDto('b-1', {
      recipientIds: ['u1', 'u2'],
    } as never);
    expect(dto.recipientIds.length).toBe(2);
  });

  it('toListAppDto defaults + filters', () => {
    const o = BroadcastControllerMapper.toListAppDto({
      type: 'all_users', status: 'sent', templateId: 't-1', createdBy: 'u',
    } as never);
    expect(o.page).toBe(1);
    expect(o.filter?.status).toBe('sent');
  });
});
