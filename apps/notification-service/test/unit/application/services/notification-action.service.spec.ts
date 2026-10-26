import { NotificationActionService } from '@application/services/impl/notification-action.service.js';
import { IDS } from '@domain-fixtures/ids.fixture.js';
import { jest } from '@jest/globals';

const MOCK = {
  id: 'a-1',
  notificationId: { value: IDS.notificationId },
  action: { type: { value: 'view' }, label: 'View', url: { value: 'https://x.com' } },
  triggerCount: 3,
  triggeredAt: '2025-01-01T00:00:00Z',
};

function makeService() {
  const repo = { findByNotification: jest.fn(), findTriggered: jest.fn(), recordTrigger: jest.fn() };
  return { svc: new NotificationActionService(repo as never), repo };
}

describe('NotificationActionService', () => {
  it('listByNotification', async () => {
    const { svc, repo } = makeService();
    repo.findByNotification.mockResolvedValue([MOCK]);
    expect((await svc.listByNotification(IDS.notificationId)).length).toBe(1);
  });

  it('listTriggered', async () => {
    const { svc, repo } = makeService();
    repo.findTriggered.mockResolvedValue([MOCK]);
    expect((await svc.listTriggered(IDS.notificationId)).length).toBe(1);
  });

  it('recordTrigger calls repo', async () => {
    const { svc, repo } = makeService();
    repo.recordTrigger.mockResolvedValue(undefined);
    await svc.recordTrigger('a-1', 'user-1');
    expect(repo.recordTrigger).toHaveBeenCalled();
  });
});
