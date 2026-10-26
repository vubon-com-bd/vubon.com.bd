import { DigestItemService } from '@application/services/impl/digest-item.service.js';
import { IDS } from '@domain-fixtures/ids.fixture.js';
import { jest } from '@jest/globals';

const MOCK = {
  id: 'di-1',
  item: {
    notificationId: { value: IDS.notificationId },
    category: { value: 'order' }, priority: { value: 'normal' },
    title: 'T', summary: 'S', actionUrl: 'https://x.com', occurredAt: '2025-01-01T00:00:00Z',
  },
};

function makeService() {
  const repo = {
    findByDigest: jest.fn(), findByNotification: jest.fn(),
    findByCategory: jest.fn(), findUrgent: jest.fn(), countByDigest: jest.fn(),
  };
  return { svc: new DigestItemService(repo as never), repo };
}

describe('DigestItemService', () => {
  it('listByDigest maps', async () => {
    const { svc, repo } = makeService();
    repo.findByDigest.mockResolvedValue([MOCK]);
    const r = await svc.listByDigest(IDS.digestId);
    expect(r[0]!.title).toBe('T');
  });

  it('listByNotification', async () => {
    const { svc, repo } = makeService();
    repo.findByNotification.mockResolvedValue([MOCK]);
    expect((await svc.listByNotification(IDS.notificationId)).length).toBe(1);
  });

  it('listByCategory', async () => {
    const { svc, repo } = makeService();
    repo.findByCategory.mockResolvedValue([MOCK]);
    expect((await svc.listByCategory(IDS.digestId, 'order')).length).toBe(1);
  });

  it('listUrgent', async () => {
    const { svc, repo } = makeService();
    repo.findUrgent.mockResolvedValue([]);
    expect((await svc.listUrgent(IDS.digestId)).length).toBe(0);
  });

  it('countByDigest', async () => {
    const { svc, repo } = makeService();
    repo.countByDigest.mockResolvedValue(5);
    expect(await svc.countByDigest(IDS.digestId)).toBe(5);
  });
});
