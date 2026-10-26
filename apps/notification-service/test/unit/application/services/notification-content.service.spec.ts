import { NotificationContentService } from '@application/services/impl/notification-content.service.js';
import { NotificationIdVO } from '@domain/primitives/notification-id.vo.js';
import { IDS } from '@domain-fixtures/ids.fixture.js';
import { DATES } from '@domain-fixtures/dates.fixture.js';
import { jest } from '@jest/globals';

function makeService() {
  const repo = {
    findByNotification: jest.fn(),
    findUnrendered: jest.fn(),
    markRendered: jest.fn(),
  };
  const svc = new NotificationContentService(repo as never);
  return { svc, repo };
}

const MOCK_CONTENT = {
  id: 'c-1',
  notificationId: { value: IDS.notificationId },
  content: {
    subject: { value: 'Hi' },
    body: { value: 'Body' },
    imageUrl: { value: 'https://x.com/i.png' },
    iconUrl: undefined,
    actionUrl: undefined,
    data: { value: { k: 'v' } },
  },
  renderedAt: DATES.now,
};

describe('NotificationContentService', () => {
  it('getByNotification returns mapped', async () => {
    const { svc, repo } = makeService();
    repo.findByNotification.mockResolvedValue(MOCK_CONTENT);
    const r = await svc.getByNotification(IDS.notificationId);
    expect(r!.subject).toBe('Hi');
    expect(r!.imageUrl).toBe('https://x.com/i.png');
  });

  it('getByNotification returns null when not found', async () => {
    const { svc, repo } = makeService();
    repo.findByNotification.mockResolvedValue(null);
    expect(await svc.getByNotification(IDS.notificationId)).toBeNull();
  });

  it('getUnrendered returns list', async () => {
    const { svc, repo } = makeService();
    repo.findUnrendered.mockResolvedValue([MOCK_CONTENT]);
    const r = await svc.getUnrendered();
    expect(r.length).toBe(1);
  });

  it('markRendered calls repo', async () => {
    const { svc, repo } = makeService();
    repo.markRendered.mockResolvedValue(undefined);
    await svc.markRendered('c-1');
    expect(repo.markRendered).toHaveBeenCalled();
  });
});
