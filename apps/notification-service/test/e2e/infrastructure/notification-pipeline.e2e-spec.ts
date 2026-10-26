/**
 * Notification Pipeline E2E
 * @module notification-service/test/e2e/infrastructure
 *
 * Covers: full send flow (builder → entity → mapper → repository → worker)
 */
import { NotificationPrismaMapper } from '@infrastructure/persistence/prisma/mappers/notification.prisma.mapper.js';
import { NotificationPrismaRepository } from '@infrastructure/persistence/prisma/repositories/notification.prisma.repository.js';
import { NotificationSenderWorker } from '@infrastructure/workers/notification-sender.worker.js';
import { EmailSenderWorker } from '@infrastructure/workers/email-sender.worker.js';

import {
  TEST_IDS,
  makePrismaNotification,
  makePrismaDelegateMock,
  makePrismaServiceMock,
  makeQueueMock,
} from '@test-infra/index.js';

describe('Notification Pipeline E2E', () => {
  let repo: NotificationPrismaRepository;
  let delegate: ReturnType<typeof makePrismaDelegateMock>;
  let queue: ReturnType<typeof makeQueueMock>;

  beforeEach(() => {
    delegate = makePrismaDelegateMock();
    const prisma = makePrismaServiceMock();
    const modelNames = ['notification', 'notificationContent', 'notificationRecipient'];
    for (const name of modelNames) {
      (prisma as Record<string, unknown>)[name] = delegate;
    }
    prisma.getModel = () => delegate;
    prisma.isEngineAvailable = () => true;
    repo = new NotificationPrismaRepository(prisma as never);
    queue = makeQueueMock();
  });

  it('full flow: mapper → repository → worker pipeline', async () => {
    // 1. Build entity from Prisma row
    const raw = makePrismaNotification();
    const entity = NotificationPrismaMapper.toDomain(raw);
    expect(entity.id).toBe(TEST_IDS.NOTIFICATION);

    // 2. Repository returns it
    delegate.findFirst.mockResolvedValue(raw);
    const loaded = await repo.findById(TEST_IDS.NOTIFICATION);
    expect(loaded?.id).toBe(TEST_IDS.NOTIFICATION);

    // 3. Worker processes it (markSent spied for state machine)
    jest.spyOn(entity, 'queue').mockImplementation(() => undefined);
    jest.spyOn(entity, 'markSending').mockImplementation(() => undefined);
    // Repository save path: findUnique → update (not create)
    delegate.findUnique.mockResolvedValue({ id: TEST_IDS.NOTIFICATION });
    delegate.findFirst.mockResolvedValue(raw);
    delegate.update.mockResolvedValue(raw);

    const worker = new NotificationSenderWorker(queue as never, repo as never);
    const handler = worker as unknown as {
      handle: (p: Record<string, unknown>) => Promise<unknown>;
    };
    const result = await handler.handle({
      notificationId: TEST_IDS.NOTIFICATION,
      channel: 'email',
      userId: TEST_IDS.USER,
    });
    expect(result).toMatchObject({ processed: true });
  });

  it('email sender worker handles delivered notification', async () => {
    const raw = makePrismaNotification();
    const entity = NotificationPrismaMapper.toDomain(raw);
    // Spy markSent on entity — needed because worker calls markSent()
    jest.spyOn(entity, 'markSent').mockImplementation(() => undefined);
    delegate.findFirst.mockResolvedValue(raw);
    // Save path: findUnique → update (not create)
    delegate.findUnique.mockResolvedValue({ id: TEST_IDS.NOTIFICATION });
    delegate.update.mockResolvedValue(raw);

    // Directly patch repo.findByIdVO to return our spied entity
    jest.spyOn(repo, 'findByIdVO').mockResolvedValue(entity);

    const emailWorker = new EmailSenderWorker(queue as never, repo as never);
    const handler = emailWorker as unknown as {
      handle: (p: Record<string, unknown>) => Promise<unknown>;
    };
    const result = await handler.handle({
      notificationId: TEST_IDS.NOTIFICATION,
      to: 'test@example.com',
      subject: 'Test',
      text: 'Body',
    });
    expect(result).toMatchObject({ processed: true, channel: 'email' });
  });

  it('worker skips not-found notification', async () => {
    delegate.findFirst.mockResolvedValue(null);
    const worker = new NotificationSenderWorker(queue as never, repo as never);
    const handler = worker as unknown as {
      handle: (p: Record<string, unknown>) => Promise<unknown>;
    };
    const result = await handler.handle({
      notificationId: 'nonexistent',
      channel: 'email',
      userId: TEST_IDS.USER,
    });
    expect(result).toMatchObject({ skipped: true, reason: 'not-found' });
  });
});
