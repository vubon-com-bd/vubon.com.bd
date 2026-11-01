import { NotificationRecipientService } from '@application/services/impl/notification-recipient.service.js';
import { IDS } from '@domain-fixtures/ids.fixture.js';
import { jest } from '@jest/globals';

const MOCK = {
  id: 'r-1',
  notificationId: { value: IDS.notificationId },
  recipient: {
    userId: { value: IDS.userId },
    channel: { value: 'email' },
    maskedDestination: 'a***@b.com',
  },
  deliveryStatus: { value: 'delivered' },
  deliveredAt: '2025-01-01T00:00:00Z',
  readAt: '2025-01-01T01:00:00Z',
  failureReason: undefined,
};

function makeService() {
  const repo = {
    findByNotification: jest.fn(),
    findByUser: jest.fn(),
    findUndelivered: jest.fn(),
    countByDeliveryStatus: jest.fn(),
  };
  const svc = new NotificationRecipientService(repo as never);
  return { svc, repo };
}

describe('NotificationRecipientService', () => {
  it('listByNotification maps', async () => {
    const { svc, repo } = makeService();
    repo.findByNotification.mockResolvedValue([MOCK]);
    const r = await svc.listByNotification(IDS.notificationId);
    expect(r.length).toBe(1);
    expect(r[0]!.deliveryStatus).toBe('delivered');
  });

  it('listByUser', async () => {
    const { svc, repo } = makeService();
    repo.findByUser.mockResolvedValue([MOCK]);
    expect((await svc.listByUser(IDS.userId)).length).toBe(1);
  });

  it('listUndelivered', async () => {
    const { svc, repo } = makeService();
    repo.findUndelivered.mockResolvedValue([]);
    expect((await svc.listUndelivered(IDS.notificationId)).length).toBe(0);
  });

  it('countByStatus delegates', async () => {
    const { svc, repo } = makeService();
    repo.countByDeliveryStatus.mockResolvedValue(7);
    expect(await svc.countByStatus(IDS.notificationId, 'delivered')).toBe(7);
  });
});
