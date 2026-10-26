import { NotificationDeliveryService } from '@application/services/impl/notification-delivery.service.js';
import { IDS } from '@domain-fixtures/ids.fixture.js';
import { jest } from '@jest/globals';

const MOCK = {
  id: 'd-1',
  notificationId: { value: IDS.notificationId },
  status: { value: 'sent' },
  delivery: { providerName: null, providerMessageId: null, attemptCount: 1, maxAttempts: 3, sentAt: null, deliveredAt: null, failedAt: null, deliveryDurationMs: undefined },
};

function makeService() {
  const repo = {
    findByNotification: jest.fn(),
    findByStatus: jest.fn(),
    findRetryable: jest.fn(),
    findStuck: jest.fn(),
  };
  return { svc: new NotificationDeliveryService(repo as never), repo };
}

describe('NotificationDeliveryService', () => {
  it('getByNotification returns mapped', async () => {
    const { svc, repo } = makeService();
    repo.findByNotification.mockResolvedValue(MOCK);
    const r = await svc.getByNotification(IDS.notificationId);
    expect(r!.id).toBe('d-1');
  });

  it('getByNotification returns null when missing', async () => {
    const { svc, repo } = makeService();
    repo.findByNotification.mockResolvedValue(null);
    expect(await svc.getByNotification(IDS.notificationId)).toBeNull();
  });

  it('listByStatus', async () => {
    const { svc, repo } = makeService();
    repo.findByStatus.mockResolvedValue([MOCK]);
    expect((await svc.listByStatus('sent')).length).toBe(1);
  });

  it('listRetryable', async () => {
    const { svc, repo } = makeService();
    repo.findRetryable.mockResolvedValue([]);
    expect((await svc.listRetryable()).length).toBe(0);
  });

  it('listStuck', async () => {
    const { svc, repo } = makeService();
    repo.findStuck.mockResolvedValue([MOCK]);
    expect((await svc.listStuck(30)).length).toBe(1);
  });
});
