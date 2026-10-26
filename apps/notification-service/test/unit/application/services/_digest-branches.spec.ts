/**
 * Branch coverage booster — digest.service.ts
 */
import { DigestService } from '@application/services/impl/digest.service.js';
import { createMockDigestRepo, createMockEventBridge } from '@application-fixtures/mock-repos.fixture.js';
import { DIGEST_DTO } from '@application-fixtures/dtos.fixture.js';
import { IDS } from '@domain-fixtures/ids.fixture.js';
import { DATES } from '@domain-fixtures/dates.fixture.js';
import { jest } from '@jest/globals';

function makeService() {
  const repo = createMockDigestRepo();
  return { svc: new DigestService(repo as never, createMockEventBridge() as never), repo };
}

function makeMock(overrides = {}) {
  return {
    id: IDS.digestId,
    vo: {
      userId: { value: IDS.userId }, period: { frequency: 'daily' }, type: { value: 'summary' },
      status: { value: 'sent' }, categories: [], sendHour: 9, timezone: 'UTC',
      generatedAt: DATES.now, sentAt: DATES.now,
    },
    itemCount: 3, items: [],
    createdAt: DATES.now,
    isEmpty: () => false, markSent: jest.fn(),
    ...overrides,
  };
}

describe('DigestService — branch coverage', () => {
  it('send when markSent throws', async () => {
    const { svc, repo } = makeService();
    const mock = makeMock({ markSent: jest.fn(() => { throw new Error('bad'); }) });
    repo.findByIdVO.mockResolvedValue(mock);
    await expect(svc.send(DIGEST_DTO.send, 'a')).rejects.toBeInstanceOf(Error);
  });

  it('send without actor', async () => {
    const { svc, repo } = makeService();
    const mock = makeMock();
    repo.findByIdVO.mockResolvedValue(mock);
    repo.save.mockResolvedValue(mock);
    const r = await svc.send(DIGEST_DTO.send);
    expect(r.id).toBe(IDS.digestId);
  });

  it('getLatestForUser returns null when none', async () => {
    const { svc, repo } = makeService();
    repo.findLatestForUser.mockResolvedValue(null);
    expect(await svc.getLatestForUser(IDS.userId)).toBeNull();
  });

  it('list with filter', async () => {
    const { svc, repo } = makeService();
    repo.findPaginated.mockResolvedValue({ items: [], total: 0, page: 1, limit: 10 });
    const r = await svc.list({
      page: 1, limit: 10, filter: { userId: IDS.userId, status: 'pending' },
    });
    expect(r.total).toBe(0);
  });
});
