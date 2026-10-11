import { describe, it, expect } from '@jest/globals';
import { InAppControllerMapper } from '../../../../src/module/interfaces/mappers/in-app.controller.mapper.js';

describe('InAppControllerMapper', () => {
  it('toSendAppDto full', () => {
    const dto = InAppControllerMapper.toSendAppDto({
      userId: 'u', type: 'toast', position: 'top_center', title: 'T',
      body: 'B', imageUrl: 'https://x.com/i.png', iconUrl: 'https://x.com/ic.png',
      actions: [{ id: 'a', label: 'A' }], displayDurationSeconds: 5,
      autoDismiss: true, expiresAt: '2026-10-11T00:00:00.000Z',
      data: { k: 'v' },
    } as never);
    expect(dto.type).toBe('toast');
    expect(dto.actions?.length).toBe(1);
  });

  it('toSendAppDto minimal', () => {
    const dto = InAppControllerMapper.toSendAppDto({
      userId: 'u', type: 'banner', title: 'T', body: 'B',
    } as never);
    expect(dto.userId).toBe('u');
  });

  it('toInboxAppDto defaults', () => {
    const o = InAppControllerMapper.toInboxAppDto({} as never, 'u');
    expect(o.userId).toBe('u');
    expect(o.page).toBe(1);
    expect(o.limit).toBe(50);
  });

  it('toInboxAppDto overrides', () => {
    const o = InAppControllerMapper.toInboxAppDto(
      { page: 2, limit: 25, unreadOnly: true } as never,
      'u',
    );
    expect(o.page).toBe(2);
    expect(o.unreadOnly).toBe(true);
  });
});
