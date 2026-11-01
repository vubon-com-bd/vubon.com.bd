import { DigestService } from '@application/services/impl/digest.service.js';
import { createMockDigestRepo, createMockEventBridge } from '@application-fixtures/mock-repos.fixture.js';
import { DIGEST_DTO } from '@application-fixtures/dtos.fixture.js';
import {
  DigestNotFoundApplicationError, DigestCreationError, DigestSendError, DigestValidationError,
} from '@application/errors/digest.errors.js';
import { IDS } from '@domain-fixtures/ids.fixture.js';
import { DATES } from '@domain-fixtures/dates.fixture.js';
import { jest } from '@jest/globals';

const MOCK = {
  id: IDS.digestId,
  vo: {
    userId: { value: IDS.userId }, period: { frequency: 'daily' }, type: { value: 'summary' },
    status: { value: 'pending' }, categories: [], sendHour: 9, timezone: 'UTC',
    generatedAt: null, sentAt: null,
  },
  itemCount: 0, items: [],
  createdAt: DATES.now,
  isEmpty: () => false,
  markSent: jest.fn(),
};

function makeService() {
  const repo = createMockDigestRepo();
  return { svc: new DigestService(repo as never, createMockEventBridge() as never), repo };
}

describe('DigestService', () => {
  it('create requires categories', async () => {
    const { svc } = makeService();
    await expect(svc.create({ ...DIGEST_DTO.create, categories: [] }, 'a'))
      .rejects.toBeInstanceOf(DigestValidationError);
  });

  it('create succeeds on valid digest', async () => {
    const { svc, repo } = makeService();
    repo.save.mockImplementation(async (entity: unknown) => entity);

    const result = await svc.create(DIGEST_DTO.create, 'a');
    expect(result).toBeDefined();
    expect(repo.save).toHaveBeenCalled();
  });

  it('getById NotFound', async () => {
    const { svc, repo } = makeService();
    repo.findByIdVO.mockResolvedValue(null);
    await expect(svc.getById(IDS.digestId)).rejects.toBeInstanceOf(DigestNotFoundApplicationError);
  });

  it('send throws on empty digest', async () => {
    const { svc, repo } = makeService();
    const emptyMock = { ...MOCK, isEmpty: () => true };
    repo.findByIdVO.mockResolvedValue(emptyMock);
    await expect(svc.send(DIGEST_DTO.send, 'a')).rejects.toBeInstanceOf(DigestSendError);
  });

  it('send succeeds', async () => {
    const { svc, repo } = makeService();
    MOCK.markSent.mockImplementation(() => {});
    repo.findByIdVO.mockResolvedValue(MOCK);
    repo.save.mockResolvedValue(MOCK);
    const r = await svc.send(DIGEST_DTO.send, 'a');
    expect(r.id).toBe(IDS.digestId);
  });

  it('getLatestForUser returns null', async () => {
    const { svc, repo } = makeService();
    repo.findLatestForUser.mockResolvedValue(null);
    expect(await svc.getLatestForUser(IDS.userId)).toBeNull();
  });

  it('getLatestForUser returns mapped', async () => {
    const { svc, repo } = makeService();
    repo.findLatestForUser.mockResolvedValue(MOCK);
    expect((await svc.getLatestForUser(IDS.userId))!.id).toBe(IDS.digestId);
  });

  it('list delegates', async () => {
    const { svc, repo } = makeService();
    repo.findPaginated.mockResolvedValue({ items: [], total: 0, page: 1, limit: 10 });
    expect((await svc.list({ page: 1, limit: 10 })).total).toBe(0);
  });
});
