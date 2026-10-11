import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { BroadcastProcessorWorker } from '../../../../src/module/infrastructure/workers/broadcast-processor.worker.js';
import { BroadcastEntity } from '../../../../src/module/domain/entities/broadcast.entity.js';
import { BroadcastTypeVO } from '../../../../src/module/domain/value-objects/primitives/broadcast-type.vo.js';
import { BroadcastTargetVO } from '../../../../src/module/domain/value-objects/primitives/broadcast-target.vo.js';
import { FIXED_USER_ID, FIXED_TEMPLATE_ID, makeUuid } from '../../../../helpers/test-factories.js';

function makeQueueService() {
  return { registerWorker: jest.fn(), enqueue: jest.fn() } as never;
}
function makeRepo() {
  return {
    findByIdVO: jest.fn().mockResolvedValue(null),
    save: jest.fn().mockImplementation(async (e: unknown) => e),
  } as never;
}
function makeBroadcastQueue() {
  return { enqueueStart: jest.fn(), enqueueBatch: jest.fn(), enqueueFinalize: jest.fn(), enqueueCancel: jest.fn() } as never;
}

function build(): BroadcastEntity {
  return BroadcastEntity.create({
    id: makeUuid(),
    now: new Date().toISOString(),
    props: {
      type: BroadcastTypeVO.allUsers(),
      target: BroadcastTargetVO.all(),
      templateId: FIXED_TEMPLATE_ID,
      createdBy: FIXED_USER_ID,
    },
  });
}

describe('BroadcastProcessorWorker deeper', () => {
  let repo: ReturnType<typeof makeRepo>;
  let w: BroadcastProcessorWorker;
  beforeEach(() => {
    repo = makeRepo();
    w = new BroadcastProcessorWorker(makeQueueService(), repo, makeBroadcastQueue());
  });

  it('start-broadcast path', async () => {
    (repo as { findByIdVO: jest.Mock }).findByIdVO.mockResolvedValueOnce(build());
    const r = await (w as unknown as { handle: (p: unknown) => Promise<unknown> }).handle({
      broadcastId: '11111111-1111-1111-1111-111111111111', totalRecipients: 100,
    });
    expect((r as { started: boolean }).started).toBe(true);
  });

  it('process-broadcast-batch path', async () => {
    const e = build();
    e.start(100);
    (repo as { findByIdVO: jest.Mock }).findByIdVO.mockResolvedValueOnce(e);
    const r = await (w as unknown as { handle: (p: unknown) => Promise<unknown> }).handle({
      broadcastId: '11111111-1111-1111-1111-111111111111', batchNumber: 1, recipientIds: ['u1', 'u2'],
    });
    expect((r as { processed: number }).processed).toBe(2);
  });

  it('cancel-broadcast path', async () => {
    (repo as { findByIdVO: jest.Mock }).findByIdVO.mockResolvedValueOnce(build());
    const r = await (w as unknown as { handle: (p: unknown) => Promise<unknown> }).handle({
      broadcastId: '11111111-1111-1111-1111-111111111111', reason: 'changed mind',
    });
    expect((r as { cancelled: boolean }).cancelled).toBe(true);
  });

  it('finalize path', async () => {
    const e = build();
    e.start(100);
    (repo as { findByIdVO: jest.Mock }).findByIdVO.mockResolvedValueOnce(e);
    const r = await (w as unknown as { handle: (p: unknown) => Promise<unknown> }).handle({
      broadcastId: '11111111-1111-1111-1111-111111111111',
    });
    expect((r as { finalized: boolean }).finalized).toBe(true);
  });

  it('finalize skip when not sending', async () => {
    (repo as { findByIdVO: jest.Mock }).findByIdVO.mockResolvedValueOnce(build());
    const r = await (w as unknown as { handle: (p: unknown) => Promise<unknown> }).handle({
      broadcastId: '11111111-1111-1111-1111-111111111111',
    });
    expect((r as { skipped: boolean }).skipped).toBe(true);
  });

  it('concurrency returns 3', () => {
    expect((w as unknown as { concurrency: () => number }).concurrency()).toBe(3);
  });

  it('registerWorker on init', () => {
    const qs = makeQueueService();
    const w2 = new BroadcastProcessorWorker(qs, makeRepo(), makeBroadcastQueue());
    w2.onModuleInit();
    expect((qs as { registerWorker: jest.Mock }).registerWorker).toHaveBeenCalled();
  });
});
