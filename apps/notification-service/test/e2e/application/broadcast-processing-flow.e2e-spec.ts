/**
 * Broadcast lifecycle E2E — create → approve → start → complete।
 */
import { jest } from '@jest/globals';

import { BroadcastService } from '@application/services/impl/broadcast.service.js';
import { BroadcastResultService } from '@application/services/impl/broadcast-result.service.js';
import {
  createMockBroadcastRepo,
  createMockEventBridge,
} from '@application-fixtures/mock-repos.fixture.js';
import { BROADCAST_DTO } from '@application-fixtures/dtos.fixture.js';
import {
  BroadcastValidationError,
  BroadcastNotFoundApplicationError,
} from '@application/errors/broadcast.errors.js';
import { IDS } from '@domain-fixtures/ids.fixture.js';
import { DATES } from '@domain-fixtures/dates.fixture.js';

function buildService() {
  const repo = createMockBroadcastRepo();
  return { svc: new BroadcastService(repo as never, createMockEventBridge() as never), repo };
}

function makeMock(overrides = {}) {
  return {
    id: IDS.broadcastId,
    vo: {
      name: 'Campaign',
      type: { value: 'all_users' },
      audience: { target: 'all' },
      status: { value: 'draft' },
      channels: [],
      recipientCount: 100,
      sentCount: 0,
      failedCount: 0,
      scheduledAt: null,
      startedAt: DATES.now,
      completedAt: DATES.future24h,
      createdBy: { value: IDS.userId },
      approvedBy: null,
    },
    createdAt: DATES.now,
    start: jest.fn(),
    cancel: jest.fn(),
    ...overrides,
  };
}

describe('Application E2E — Broadcast processing', () => {
  it('create requires template OR content', async () => {
    const { svc } = buildService();
    await expect(
      svc.create(
        {
          name: 'C',
          type: 'all_users',
          target: 'all',
          channels: ['email'],
        } as never,
        'actor-1',
      ),
    ).rejects.toBeInstanceOf(BroadcastValidationError);
  });

  it('start marks broadcast as started', async () => {
    const { svc, repo } = buildService();
    const m = makeMock();
    repo.findByIdVO.mockResolvedValue(m);
    repo.save.mockResolvedValue(m);

    await svc.start(
      { broadcastId: IDS.broadcastId, approvedBy: IDS.userId } as never,
      'actor-1',
    );

    expect(m.start).toHaveBeenCalled();
  });

  it('getResult computes rates', async () => {
    const { svc, repo } = buildService();
    const m = makeMock({
      vo: {
        ...makeMock().vo,
        sentCount: 90,
        failedCount: 10,
      },
    });
    repo.findByIdVO.mockResolvedValue(m);

    const r = await svc.getResult(IDS.broadcastId);
    expect(r.deliveryRate).toBeGreaterThan(0);
    expect(r.durationMs).toBeGreaterThanOrEqual(0);
  });

  it('cancel marks broadcast as cancelled', async () => {
    const { svc, repo } = buildService();
    const m = makeMock();
    repo.findByIdVO.mockResolvedValue(m);
    repo.save.mockResolvedValue(m);

    await svc.cancel(
      { broadcastId: IDS.broadcastId, reason: 'Not needed' } as never,
      'actor-1',
    );

    expect(m.cancel).toHaveBeenCalled();
  });

  it('getById not found', async () => {
    const { svc, repo } = buildService();
    repo.findByIdVO.mockResolvedValue(null);
    await expect(svc.getById(IDS.broadcastId)).rejects.toBeInstanceOf(
      BroadcastNotFoundApplicationError,
    );
  });

  it('list paginated', async () => {
    const { svc, repo } = buildService();
    repo.findPaginated.mockResolvedValue({
      items: [makeMock()],
      total: 1,
      page: 1,
      limit: 10,
    });
    const r = await svc.list({ page: 1, limit: 10 });
    expect(r.total).toBe(1);
  });

  it('BroadcastResultService.getByBroadcast returns null when missing', async () => {
    const resultRepo = {
      findByBroadcast: jest.fn().mockResolvedValue(null),
      findWithHighFailureRate: jest.fn(),
      findRecent: jest.fn(),
      averageDeliveryRate: jest.fn(),
      averageOpenRate: jest.fn(),
    };
    const resultSvc = new BroadcastResultService(resultRepo as never);
    const r = await resultSvc.getByBroadcast(IDS.broadcastId);
    expect(r).toBeNull();
  });
});
