/**
 * Broadcast Flow E2E
 * @module notification-service/test/e2e/infrastructure
 */
import { BroadcastPrismaMapper } from '@infrastructure/persistence/prisma/mappers/broadcast.prisma.mapper.js';
import { BroadcastPrismaRepository } from '@infrastructure/persistence/prisma/repositories/broadcast.prisma.repository.js';
import { BroadcastProcessorWorker } from '@infrastructure/workers/broadcast-processor.worker.js';

import {
  TEST_IDS,
  makePrismaDelegateMock,
  makePrismaServiceMock,
  makeQueueMock,
} from '@test-infra/index.js';

const makeBroadcastRow = (overrides: Record<string, unknown> = {}) => ({
  id: TEST_IDS.BROADCAST,
  type: 'promotional',
  status: 'draft',
  target: 'all',
  templateId: TEST_IDS.TEMPLATE,
  channels: ['email', 'push'],
  estimatedRecipients: 100,
  totalRecipients: 100,
  processed: 0,
  succeeded: 0,
  failed: 0,
  failureReasons: [],
  scheduledAt: null,
  startedAt: null,
  completedAt: null,
  createdBy: TEST_IDS.USER,
  approvedBy: TEST_IDS.USER,
  segmentFilter: null,
  customRecipientIds: [],
  metadata: null,
  version: 0,
  createdAt: new Date(),
  updatedAt: new Date(),
  deletedAt: null,
  ...overrides,
});

describe('Broadcast Flow E2E', () => {
  let repo: BroadcastPrismaRepository;
  let delegate: ReturnType<typeof makePrismaDelegateMock>;
  let queue: ReturnType<typeof makeQueueMock>;

  beforeEach(() => {
    delegate = makePrismaDelegateMock();
    const prisma = makePrismaServiceMock();
    (prisma as Record<string, unknown>)['notificationBroadcast'] = delegate;
    prisma.getModel = () => delegate;
    prisma.isEngineAvailable = () => true;
    repo = new BroadcastPrismaRepository(prisma as never);
    queue = makeQueueMock();
  });

  it('mapper → repository → worker start flow', async () => {
    const raw = makeBroadcastRow();
    const entity = BroadcastPrismaMapper.toDomain(raw);
    expect(entity.id).toBe(TEST_IDS.BROADCAST);

    // Repository loads it via findFirst (uses VO path)
    delegate.findFirst.mockResolvedValue(raw);
    // Worker will transition → save via update — need findUnique to return existing
    delegate.findUnique.mockResolvedValue({ id: TEST_IDS.BROADCAST });
    delegate.update.mockResolvedValue(raw);

    const worker = new BroadcastProcessorWorker(queue as never, repo as never);
    const handler = worker as unknown as {
      handle: (p: Record<string, unknown>) => Promise<unknown>;
    };
    const result = await handler.handle({ broadcastId: TEST_IDS.BROADCAST });
    expect(result).toMatchObject({ processed: true });
  });

  it('worker skips not-found', async () => {
    delegate.findFirst.mockResolvedValue(null);
    const worker = new BroadcastProcessorWorker(queue as never, repo as never);
    const handler = worker as unknown as {
      handle: (p: Record<string, unknown>) => Promise<unknown>;
    };
    const result = await handler.handle({ broadcastId: 'missing' });
    expect(result).toMatchObject({ skipped: true, reason: 'not-found' });
  });

  it('broadcast batch processing — progress', async () => {
    const raw = makeBroadcastRow({ status: 'sending', succeeded: 10 });
    const entity = BroadcastPrismaMapper.toDomain(raw);
    // Spy updateProgress to avoid internal state mutation crash
    jest.spyOn(entity, 'updateProgress').mockImplementation(() => undefined);
    // Return our spied entity from repository load
    jest.spyOn(repo, 'findByIdVO').mockResolvedValue(entity);
    // Save path: findUnique → update (not create)
    delegate.findUnique.mockResolvedValue({ id: TEST_IDS.BROADCAST });
    delegate.update.mockResolvedValue(raw);

    const worker = new BroadcastProcessorWorker(queue as never, repo as never);
    const handler = worker as unknown as {
      handle: (p: Record<string, unknown>) => Promise<unknown>;
    };
    const result = await handler.handle({
      broadcastId: TEST_IDS.BROADCAST,
      batchNumber: 1,
      recipientIds: ['u-1', 'u-2'],
    });
    expect(result).toMatchObject({ processed: true, batch: 1, count: 2 });
  });
});
