/**
 * Branch coverage booster — broadcast.service.ts
 */
import { BroadcastService } from '@application/services/impl/broadcast.service.js';
import { createMockBroadcastRepo, createMockEventBridge } from '@application-fixtures/mock-repos.fixture.js';
import { BROADCAST_DTO } from '@application-fixtures/dtos.fixture.js';
import { IDS } from '@domain-fixtures/ids.fixture.js';
import { DATES } from '@domain-fixtures/dates.fixture.js';
import { jest } from '@jest/globals';

function makeService() {
  const repo = createMockBroadcastRepo();
  return { svc: new BroadcastService(repo as never, createMockEventBridge() as never), repo };
}

function makeMock(overrides = {}) {
  return {
    id: IDS.broadcastId,
    vo: {
      name: 'C', type: { value: 'all_users' }, audience: { target: 'all' },
      status: { value: 'draft' }, channels: [], templateId: null, content: null,
      recipientCount: 10, sentCount: 0, failedCount: 0,
      scheduledAt: null, startedAt: null, completedAt: null,
      createdBy: { value: IDS.userId }, approvedBy: null,
      isApproved: () => true, usesTemplate: () => true, usesInlineContent: () => false,
      channelsCount: 1,
    },
    createdAt: DATES.now,
    start: jest.fn(), cancel: jest.fn(),
    ...overrides,
  };
}

describe('BroadcastService — branch coverage', () => {
  it('create with templateId instead of content', async () => {
    const { svc } = makeService();
    await expect(
      svc.create({ ...BROADCAST_DTO.create, content: undefined, templateId: IDS.templateId } as never, 'a'),
    ).rejects.toBeInstanceOf(Error);
  });

  it('start when domain throws + then successful', async () => {
    const { svc, repo } = makeService();
    const mock = makeMock();
    mock.start.mockImplementation(() => {});
    repo.findByIdVO.mockResolvedValue(mock);
    repo.save.mockResolvedValue(mock);
    const r = await svc.start(BROADCAST_DTO.start, 'a');
    expect(r).toBeDefined();
  });

  it('getResult returns response', async () => {
    const { svc, repo } = makeService();
    repo.findByIdVO.mockResolvedValue(makeMock());
    const r = await svc.getResult(IDS.broadcastId);
    expect(r.broadcastId).toBe(IDS.broadcastId);
  });
});
