/**
 * UserContactPrismaRepository unit tests
 */
import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { UserContactPrismaRepository } from '@infrastructure/persistence/prisma/repositories/user-contact.prisma.repository.js';
import { makeMockPrismaService, TEST_IDS } from '@fixtures/index.js';

const contactRow = (overrides: Record<string, unknown> = {}) => ({
  id: TEST_IDS.USER_ID,
  userId: TEST_IDS.USER_ID,
  type: 'email',
  value: 'test@example.com',
  label: 'Personal',
  isPrimary: true,
  isVerified: true,
  verifiedAt: new Date(),
  createdAt: new Date(),
  updatedAt: new Date(),
  deletedAt: null,
  ...overrides,
});

describe('UserContactPrismaRepository', () => {
  let repo: UserContactPrismaRepository;
  let model: ReturnType<typeof makeMockPrismaService>['userContact'];

  beforeEach(() => {
    jest.clearAllMocks();
    const prisma = makeMockPrismaService(['userContact']);
    model = prisma.userContact as never;
    repo = new UserContactPrismaRepository(prisma as never);
  });

  it('findById null on miss', async () => {
    (model.findUnique as jest.Mock).mockResolvedValue(null);
    expect(await repo.findById(TEST_IDS.USER_ID)).toBeNull();
  });

  it('findById maps email contact', async () => {
    (model.findUnique as jest.Mock).mockResolvedValue(contactRow());
    expect(await repo.findById(TEST_IDS.USER_ID)).not.toBeNull();
  });

  it('findByUserId list', async () => {
    (model.findMany as jest.Mock).mockResolvedValue([contactRow()]);
    expect((await repo.findByUserId({ value: TEST_IDS.USER_ID } as never)).length).toBe(1);
  });

  it('findByUserIdRaw delegates', async () => {
    (model.findMany as jest.Mock).mockResolvedValue([contactRow()]);
    expect((await repo.findByUserIdRaw(TEST_IDS.USER_ID)).length).toBe(1);
  });

  it('findPrimaryByUserId queries', async () => {
    (model.findFirst as jest.Mock).mockResolvedValue(contactRow());
    expect(await repo.findPrimaryByUserId({ value: TEST_IDS.USER_ID } as never)).not.toBeNull();
  });

  it('findByValue queries', async () => {
    (model.findFirst as jest.Mock).mockResolvedValue(contactRow());
    expect(await repo.findByValue('test@example.com')).not.toBeNull();
  });

  it('findAll maps', async () => {
    (model.findMany as jest.Mock).mockResolvedValue([contactRow()]);
    expect((await repo.findAll()).length).toBe(1);
  });

  it('save update path', async () => {
    (model.findUnique as jest.Mock).mockResolvedValue(contactRow());
    (model.update as jest.Mock).mockResolvedValue(contactRow());
    const e = await repo.findById(TEST_IDS.USER_ID);
    await repo.save(e!);
    expect(model.update).toHaveBeenCalled();
  });

  it('save create path', async () => {
    (model.findUnique as jest.Mock)
      .mockResolvedValueOnce(contactRow())
      .mockResolvedValueOnce(null);
    (model.create as jest.Mock).mockResolvedValue(contactRow());
    const e = await repo.findById(TEST_IDS.USER_ID);
    await repo.save(e!);
    expect(model.create).toHaveBeenCalled();
  });

  it('unsetAllPrimary count', async () => {
    (model.updateMany as jest.Mock).mockResolvedValue({ count: 2 });
    expect(await repo.unsetAllPrimary({ value: TEST_IDS.USER_ID } as never)).toBe(2);
  });

  it('delete uses update', async () => {
    (model.update as jest.Mock).mockResolvedValue(contactRow());
    await repo.delete(TEST_IDS.USER_ID);
    expect(model.update).toHaveBeenCalled();
  });

  it('softDelete delegates', async () => {
    (model.update as jest.Mock).mockResolvedValue(contactRow());
    await repo.softDelete(TEST_IDS.USER_ID);
    expect(model.update).toHaveBeenCalled();
  });

  it('exists count>0', async () => {
    (model.count as jest.Mock).mockResolvedValue(1);
    expect(await repo.exists(TEST_IDS.USER_ID)).toBe(true);
  });
});
