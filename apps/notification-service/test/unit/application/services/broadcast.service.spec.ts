import { BroadcastService } from '@application/services/impl/broadcast.service.js';
import { createMockBroadcastRepo, createMockEventBridge } from '@application-fixtures/mock-repos.fixture.js';
import { BROADCAST_DTO } from '@application-fixtures/dtos.fixture.js';
import {
  BroadcastNotFoundApplicationError,
  BroadcastCreationError,
  BroadcastStartError,
  BroadcastCancelError,
  BroadcastValidationError,
} from '@application/errors/broadcast.errors.js';
import { IDS } from '@domain-fixtures/ids.fixture.js';
import { DATES } from '@domain-fixtures/dates.fixture.js';
import { jest } from '@jest/globals';

const MOCK = {
  id: IDS.broadcastId,
  vo: {
    name: 'C', type: { value: 'all_users' }, audience: { target: 'all' },
    status: { value: 'draft' }, channels: [], templateId: null, recipientCount: 10,
    sentCount: 0, failedCount: 0, scheduledAt: null, startedAt: null, completedAt: null,
    createdBy: { value: IDS.userId }, approvedBy: null, isApproved: () => true,
    usesTemplate: () => true, usesInlineContent: () => false, channelsCount: 1,
  },
  createdAt: DATES.now,
  start: jest.fn(),
  cancel: jest.fn(),
};

function makeService() {
  const repo = createMockBroadcastRepo();
  return { svc: new BroadcastService(repo as never, createMockEventBridge() as never), repo };
}

describe('BroadcastService', () => {
  it('create requires template or content', async () => {
    const { svc } = makeService();
    await expect(svc.create({ ...BROADCAST_DTO.create, content: undefined, templateId: undefined } as never, 'a'))
      .rejects.toBeInstanceOf(BroadcastValidationError);
  });

  it('create reaches stub', async () => {
    const { svc } = makeService();
    await expect(svc.create(BROADCAST_DTO.create, 'a')).rejects.toBeInstanceOf(BroadcastCreationError);
  });

  it('getById NotFound', async () => {
    const { svc, repo } = makeService();
    repo.findByIdVO.mockResolvedValue(null);
    await expect(svc.getById(IDS.broadcastId)).rejects.toBeInstanceOf(BroadcastNotFoundApplicationError);
  });

  it('start throws StartError on invalid', async () => {
    const { svc, repo } = makeService();
    MOCK.start.mockImplementation(() => { throw new Error('x'); });
    repo.findByIdVO.mockResolvedValue(MOCK);
    await expect(svc.start(BROADCAST_DTO.start, 'a')).rejects.toBeInstanceOf(BroadcastStartError);
  });

  it('start succeeds', async () => {
    const { svc, repo } = makeService();
    MOCK.start.mockImplementation(() => {});
    repo.findByIdVO.mockResolvedValue(MOCK);
    repo.save.mockResolvedValue(MOCK);
    const r = await svc.start(BROADCAST_DTO.start, 'a');
    expect(r.id).toBe(IDS.broadcastId);
  });

  it('cancel throws CancelError', async () => {
    const { svc, repo } = makeService();
    MOCK.cancel.mockImplementation(() => { throw new Error('x'); });
    repo.findByIdVO.mockResolvedValue(MOCK);
    await expect(svc.cancel(BROADCAST_DTO.cancel, 'a')).rejects.toBeInstanceOf(BroadcastCancelError);
  });

  it('cancel succeeds', async () => {
    const { svc, repo } = makeService();
    MOCK.cancel.mockImplementation(() => {});
    repo.findByIdVO.mockResolvedValue(MOCK);
    repo.save.mockResolvedValue(MOCK);
    const r = await svc.cancel(BROADCAST_DTO.cancel, 'a');
    expect(r.id).toBe(IDS.broadcastId);
  });

  it('list delegates', async () => {
    const { svc, repo } = makeService();
    repo.findPaginated.mockResolvedValue({ items: [], total: 0, page: 1, limit: 10 });
    expect((await svc.list({ page: 1, limit: 10 })).total).toBe(0);
  });

  it('getResult returns result', async () => {
    const { svc, repo } = makeService();
    repo.findByIdVO.mockResolvedValue(MOCK);
    const r = await svc.getResult(IDS.broadcastId);
    expect(r.broadcastId).toBe(IDS.broadcastId);
  });
});
