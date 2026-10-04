/**
 * AuthDevicePrismaRepository — Unit Tests
 */
import { jest } from '@jest/globals';

import { AuthDevicePrismaRepository } from './auth-device.prisma.repository.js';
import { DeviceFingerprintVO } from '../../../../domain/value-objects/primitives/device-fingerprint.vo.js';

const mockPrisma = () => ({
  authDevice: {
    findUnique: jest.fn<() => Promise<unknown>>(),
    findFirst: jest.fn<() => Promise<unknown>>(),
    findMany: jest.fn<() => Promise<unknown>>(),
    create: jest.fn<() => Promise<unknown>>(),
    update: jest.fn<() => Promise<unknown>>(),
    delete: jest.fn<() => Promise<unknown>>(),
    count: jest.fn<() => Promise<unknown>>(),
  },
});

const now = new Date('2024-01-01T00:00:00.000Z');

const prismaDevice = (overrides: Record<string, unknown> = {}) => ({
  id: 'd-1',
  userId: 'user-1',
  fingerprint: 'a'.repeat(64),
  type: 'mobile',
  status: 'trusted',
  name: 'iPhone',
  lastSeenAt: now,
  trustedAt: now,
  createdAt: now,
  updatedAt: now,
  deletedAt: null,
  ...overrides,
});

describe('AuthDevicePrismaRepository', () => {
  let repo: AuthDevicePrismaRepository;
  let prisma: ReturnType<typeof mockPrisma>;

  beforeEach(() => {
    prisma = mockPrisma();
    repo = new AuthDevicePrismaRepository(prisma as never);
  });

  it('findByUser returns list', async () => {
    prisma.authDevice.findMany.mockResolvedValue([prismaDevice()]);
    const result = await repo.findByUser('user-1' as never);
    expect(result).toHaveLength(1);
    expect(result[0]?.name).toBe('iPhone');
  });

  it('findByFingerprint returns null when missing', async () => {
    prisma.authDevice.findFirst.mockResolvedValue(null);
    expect(
      await repo.findByFingerprint('user-1' as never, DeviceFingerprintVO.of('a'.repeat(64))),
    ).toBeNull();
  });

  it('findByFingerprint maps entity', async () => {
    prisma.authDevice.findFirst.mockResolvedValue(prismaDevice());
    const result = await repo.findByFingerprint(
      'user-1' as never,
      DeviceFingerprintVO.of('a'.repeat(64)),
    );
    expect(result?.id).toBe('d-1');
  });

  it('countTrustedByUser returns count', async () => {
    prisma.authDevice.count.mockResolvedValue(5);
    const count = await repo.countTrustedByUser('user-1' as never);
    expect(count).toBe(5);
  });
});
