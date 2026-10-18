/**
 * AuthBiometricPrismaRepository unit tests
 */
import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { AuthBiometricPrismaRepository } from '@infrastructure/persistence/prisma/repositories/auth-biometric.prisma.repository.js';
import { makeMockPrismaService, TEST_IDS } from '@fixtures/index.js';

const biometricRow = (overrides: Record<string, unknown> = {}) => ({
  id: TEST_IDS.DEVICE_ID,
  userId: TEST_IDS.USER_ID,
  type: 'fingerprint',
  deviceId: TEST_IDS.DEVICE_ID,
  enabled: true,
  publicKeyHash: 'x'.repeat(64),
  failedAttempts: 0,
  lastUsedAt: new Date(),
  lastFailedAt: null,
  enabledAt: new Date(),
  disabledAt: null,
  createdAt: new Date(),
  updatedAt: new Date(),
  deletedAt: null,
  ...overrides,
});

describe('AuthBiometricPrismaRepository', () => {
  let repo: AuthBiometricPrismaRepository;
  let model: ReturnType<typeof makeMockPrismaService>['authBiometric'];

  beforeEach(() => {
    jest.clearAllMocks();
    const prisma = makeMockPrismaService(['authBiometric']);
    model = prisma.authBiometric as never;
    repo = new AuthBiometricPrismaRepository(prisma as never);
  });

  it('findById null on miss', async () => {
    (model.findUnique as jest.Mock).mockResolvedValue(null);
    expect(await repo.findById(TEST_IDS.DEVICE_ID)).toBeNull();
  });

  it('findById maps row', async () => {
    (model.findUnique as jest.Mock).mockResolvedValue(biometricRow());
    expect(await repo.findById(TEST_IDS.DEVICE_ID)).not.toBeNull();
  });

  it('findByAuthId list', async () => {
    (model.findMany as jest.Mock).mockResolvedValue([biometricRow()]);
    expect((await repo.findByAuthId({ value: TEST_IDS.USER_ID } as never)).length).toBe(1);
  });

  it('findByAuthIdRaw delegates', async () => {
    (model.findMany as jest.Mock).mockResolvedValue([biometricRow()]);
    expect((await repo.findByAuthIdRaw(TEST_IDS.USER_ID)).length).toBe(1);
  });

  it('findByAuthIdAndDevice queries', async () => {
    (model.findFirst as jest.Mock).mockResolvedValue(biometricRow());
    await repo.findByAuthIdAndDevice({ value: TEST_IDS.USER_ID } as never, TEST_IDS.DEVICE_ID);
    expect(model.findFirst).toHaveBeenCalled();
  });

  it('findAll maps', async () => {
    (model.findMany as jest.Mock).mockResolvedValue([biometricRow()]);
    expect((await repo.findAll()).length).toBe(1);
  });

  it('save update path', async () => {
    (model.findUnique as jest.Mock).mockResolvedValue(biometricRow());
    (model.update as jest.Mock).mockResolvedValue(biometricRow());
    const e = await repo.findById(TEST_IDS.DEVICE_ID);
    await repo.save(e!);
    expect(model.update).toHaveBeenCalled();
  });

  it('save create path', async () => {
    (model.findUnique as jest.Mock)
      .mockResolvedValueOnce(biometricRow())
      .mockResolvedValueOnce(null);
    (model.create as jest.Mock).mockResolvedValue(biometricRow());
    const e = await repo.findById(TEST_IDS.DEVICE_ID);
    await repo.save(e!);
    expect(model.create).toHaveBeenCalled();
  });

  it('delete uses update', async () => {
    (model.update as jest.Mock).mockResolvedValue(biometricRow());
    await repo.delete(TEST_IDS.DEVICE_ID);
    expect(model.update).toHaveBeenCalled();
  });

  it('softDelete delegates', async () => {
    (model.update as jest.Mock).mockResolvedValue(biometricRow());
    await repo.softDelete(TEST_IDS.DEVICE_ID);
    expect(model.update).toHaveBeenCalled();
  });

  it('exists count>0', async () => {
    (model.count as jest.Mock).mockResolvedValue(1);
    expect(await repo.exists(TEST_IDS.DEVICE_ID)).toBe(true);
  });

  it('findStale queries', async () => {
    (model.findMany as jest.Mock).mockResolvedValue([]);
    await repo.findStale(90);
    expect(model.findMany).toHaveBeenCalled();
  });
});
