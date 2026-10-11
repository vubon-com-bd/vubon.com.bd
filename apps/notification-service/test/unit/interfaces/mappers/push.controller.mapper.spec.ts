import { describe, it, expect } from '@jest/globals';
import { PushControllerMapper } from '../../../../src/module/interfaces/mappers/push.controller.mapper.js';

describe('PushControllerMapper', () => {
  it('toSendAppDto', () => {
    const dto = PushControllerMapper.toSendAppDto({
      userIds: ['u'], tokens: ['tk'], title: 'T', body: 'B',
      imageUrl: 'https://x.com/i.png', iconUrl: 'https://x.com/ic.png',
      data: { k: 'v' }, actions: [{ id: 'a', title: 'A' }],
      priority: 'high', silent: false, ttl: 3600, provider: 'fcm',
      platform: 'android', idempotencyKey: 'idem-12345678',
    } as never);
    expect(dto.title).toBe('T');
    expect(dto.actions?.length).toBe(1);
  });

  it('toTopicAppDto', () => {
    const dto = PushControllerMapper.toTopicAppDto({
      topic: 'orders', title: 'T', body: 'B', priority: 'normal',
    } as never);
    expect(dto.topic).toBe('orders');
  });

  it('toSubscribeAppDto', () => {
    const dto = PushControllerMapper.toSubscribeAppDto({
      userId: 'u', token: 'tk', platform: 'ios',
      deviceId: 'd', appVersion: '1.0', osVersion: '17',
    } as never);
    expect(dto.platform).toBe('ios');
  });

  it('toListAppDto defaults', () => {
    const o = PushControllerMapper.toListAppDto({} as never);
    expect(o.page).toBe(1);
  });

  it('toListAppDto with filter', () => {
    const o = PushControllerMapper.toListAppDto({
      userId: 'u', platform: 'ios', status: 'sent',
    } as never);
    expect(o.filter?.platform).toBe('ios');
  });
});
