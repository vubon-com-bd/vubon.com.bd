import { describe, it, expect, beforeEach } from '@jest/globals';
import { NotificationService } from '../../../../src/module/application/services/impl/notification.service.js';
import { FIXED_USER_ID } from '../../../helpers/test-factories.js';
import { makeNotificationRepo, makePreferenceRepo, makeEventBridge } from '../../../helpers/mock-services.js';

describe('NotificationService — send paths', () => {
  let repo: ReturnType<typeof makeNotificationRepo>;
  let pref: ReturnType<typeof makePreferenceRepo>;
  let svc: NotificationService;
  beforeEach(() => {
    repo = makeNotificationRepo();
    pref = makePreferenceRepo();
    svc = new NotificationService(repo as never, pref as never, makeEventBridge() as never);
  });

  it('schedule delegates to send', async () => {
    const r = await svc.schedule({
      userId: FIXED_USER_ID, type: 'transactional', category: 'order',
      channels: ['email'], title: 'T', body: 'B',
      scheduledAt: new Date(Date.now() + 3600_000).toISOString(),
    } as never, 'actor');
    expect(r.success).toBe(true);
  });

  it('sendToMany partial failure', async () => {
    pref.findByUserId
      .mockResolvedValueOnce(null)
      .mockRejectedValueOnce(new Error('x'));
    const r = await svc.sendToMany({
      userIds: [FIXED_USER_ID, '00000000-0000-0000-0000-000000000099'],
      type: 'announcement', category: 'system',
      channels: ['email'], title: 'T', body: 'B',
    } as never, 'actor');
    expect(Array.isArray(r)).toBe(true);
  });
});
