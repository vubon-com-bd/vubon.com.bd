/**
 * Persistence Flow E2E
 * @module notification-service/test/e2e/infrastructure
 */
import { NotificationPrismaMapper } from '@infrastructure/persistence/prisma/mappers/notification.prisma.mapper.js';
import { NotificationPrismaRepository } from '@infrastructure/persistence/prisma/repositories/notification.prisma.repository.js';
import { TemplatePrismaMapper } from '@infrastructure/persistence/prisma/mappers/template.prisma.mapper.js';
import { TemplatePrismaRepository } from '@infrastructure/persistence/prisma/repositories/template.prisma.repository.js';

import {
  TEST_IDS,
  makePrismaNotification,
  makePrismaTemplate,
  makePrismaDelegateMock,
  makePrismaServiceMock,
} from '@test-infra/index.js';

describe('Persistence Flow E2E', () => {
  it('notification mapper → repository roundtrip', async () => {
    const delegate = makePrismaDelegateMock();
    const prisma = makePrismaServiceMock();
    (prisma as Record<string, unknown>)['notification'] = delegate;
    prisma.getModel = () => delegate;
    prisma.isEngineAvailable = () => true;

    const repo = new NotificationPrismaRepository(prisma as never);
    const raw = makePrismaNotification();

    // Load
    delegate.findFirst.mockResolvedValue(raw);
    const entity = await repo.findById(TEST_IDS.NOTIFICATION);
    expect(entity?.id).toBe(TEST_IDS.NOTIFICATION);

    // Save (update path)
    delegate.findUnique.mockResolvedValue({ id: TEST_IDS.NOTIFICATION });
    delegate.update.mockResolvedValue(raw);
    const saved = await repo.save(entity!);
    expect(saved.id).toBe(TEST_IDS.NOTIFICATION);
    expect(delegate.update).toHaveBeenCalled();
  });

  it('template mapper → repository roundtrip', async () => {
    const delegate = makePrismaDelegateMock();
    const prisma = makePrismaServiceMock();
    (prisma as Record<string, unknown>)['notificationTemplate'] = delegate;
    prisma.getModel = () => delegate;
    prisma.isEngineAvailable = () => true;

    const repo = new TemplatePrismaRepository(prisma as never);
    const raw = makePrismaTemplate();

    delegate.findFirst.mockResolvedValue(raw);
    const entity = await repo.findById(TEST_IDS.TEMPLATE);
    expect(entity?.id).toBe(TEST_IDS.TEMPLATE);

    // Verify mapper roundtrip
    const mapped = TemplatePrismaMapper.toPersistence(entity!);
    expect(mapped['id']).toBe(TEST_IDS.TEMPLATE);
  });
});
