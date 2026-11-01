import { NotificationAttemptService } from '@application/services/impl/notification-attempt.service.js';
import { IDS } from '@domain-fixtures/ids.fixture.js';
import { jest } from '@jest/globals';

const MOCK = {
  id: 'at-1',
  notificationId: { value: IDS.notificationId },
  attempt: {
    attempt: { attemptNumber: 1, attemptedAt: '2025-01-01T00:00:00Z', providerMessageId: 'p-1' },
    succeeded: true,
    error: null,
  },
};

function makeService() {
  const repo = { findByNotification: jest.fn(), findLatest: jest.fn(), countAttempts: jest.fn() };
  return { svc: new NotificationAttemptService(repo as never), repo };
}

describe('NotificationAttemptService', () => {
  it('listByNotification maps', async () => {
    const { svc, repo } = makeService();
    repo.findByNotification.mockResolvedValue([MOCK]);
    const r = await svc.listByNotification(IDS.notificationId);
    expect(r[0]!.attemptNumber).toBe(1);
    expect(r[0]!.succeeded).toBe(true);
  });

  it('getLatest returns null when missing', async () => {
    const { svc, repo } = makeService();
    repo.findLatest.mockResolvedValue(null);
    expect(await svc.getLatest(IDS.notificationId)).toBeNull();
  });

  it('getLatest returns mapped', async () => {
    const { svc, repo } = makeService();
    repo.findLatest.mockResolvedValue(MOCK);
    expect((await svc.getLatest(IDS.notificationId))!.attemptNumber).toBe(1);
  });

  it('countAttempts delegates', async () => {
    const { svc, repo } = makeService();
    repo.countAttempts.mockResolvedValue(3);
    expect(await svc.countAttempts(IDS.notificationId)).toBe(3);
  });
});
