import { describe, it, expect } from '@jest/globals';
import { NotificationControllerMapper } from '../../../../src/module/interfaces/mappers/notification.controller.mapper.js';

describe('NotificationControllerMapper', () => {
  it('toSendAppDto maps all fields', () => {
    const dto = NotificationControllerMapper.toSendAppDto({
      userId: '00000000-0000-0000-0000-000000000001',
      type: 'transactional',
      category: 'order',
      channels: ['email'],
      priority: 'normal',
      title: 'T',
      body: 'B',
      imageUrl: 'https://x.com/i.png',
      iconUrl: 'https://x.com/i.png',
      actions: [{ action: 'view', type: 'primary', label: 'V', url: 'https://x.com' }],
      data: { k: 'v' },
      scheduledAt: '2026-10-10T00:00:00.000Z',
      expiresAt: '2026-11-10T00:00:00.000Z',
      reference: { type: 'order', id: '1' },
    } as never);
    expect(dto.userId).toBeDefined();
    expect(dto.channels.length).toBe(1);
    expect(dto.actions?.[0]?.label).toBe('V');
    expect(dto.reference?.type).toBe('order');
  });

  it('toSendAppDto without actions', () => {
    const dto = NotificationControllerMapper.toSendAppDto({
      userId: 'u',
      type: 'transactional',
      category: 'order',
      channels: ['email'],
      title: 'T',
      body: 'B',
    } as never);
    expect(dto.actions).toBeUndefined();
  });

  it('toSendManyAppDto', () => {
    const dto = NotificationControllerMapper.toSendManyAppDto({
      userIds: ['u1', 'u2'],
      type: 'announcement',
      category: 'system',
      channels: ['email'],
      title: 'T',
      body: 'B',
    } as never);
    expect(dto.userIds.length).toBe(2);
  });

  it('toListOptions with defaults', () => {
    const o = NotificationControllerMapper.toListOptions({} as never);
    expect(o.page).toBe(1);
    expect(o.limit).toBe(20);
  });

  it('toListOptions with filters', () => {
    const o = NotificationControllerMapper.toListOptions({
      page: 2, limit: 50, type: 'transactional', isRead: 'true',
      fromDate: '2026-01-01', toDate: '2026-12-31', search: 'order',
    } as never);
    expect(o.page).toBe(2);
    expect(o.filter?.isRead).toBe(true);
    expect(o.filter?.search).toBe('order');
  });

  it('toListOptions isRead=false', () => {
    const o = NotificationControllerMapper.toListOptions({ isRead: 'false' } as never);
    expect(o.filter?.isRead).toBe(false);
  });

  it('toListOptions isRead undefined', () => {
    const o = NotificationControllerMapper.toListOptions({} as never);
    expect(o.filter?.isRead).toBeUndefined();
  });
});
