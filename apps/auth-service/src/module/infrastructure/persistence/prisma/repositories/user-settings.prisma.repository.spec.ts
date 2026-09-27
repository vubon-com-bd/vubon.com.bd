/**
 * UserSettingsPrismaRepository — Unit Tests
 */
import { jest } from '@jest/globals';

import { UserSettingsPrismaRepository } from './user-settings.prisma.repository.js';

const mockPrisma = () => ({
  userSettings: {
    findUnique: jest.fn<() => Promise<unknown>>(),
    findMany: jest.fn<() => Promise<unknown>>(),
    create: jest.fn<() => Promise<unknown>>(),
    update: jest.fn<() => Promise<unknown>>(),
    delete: jest.fn<() => Promise<unknown>>(),
  },
});

const now = new Date('2024-01-01T00:00:00.000Z');

const prismaSettings = (overrides: Record<string, unknown> = {}) => ({
  id: 's-1',
  userId: 'user-1',
  language: 'bn',
  timezone: 'Asia/Dhaka',
  currency: 'BDT',
  theme: 'system',
  emailNotifications: true,
  smsNotifications: false,
  pushNotifications: true,
  createdAt: now,
  updatedAt: now,
  deletedAt: null,
  ...overrides,
});

describe('UserSettingsPrismaRepository', () => {
  let repo: UserSettingsPrismaRepository;
  let prisma: ReturnType<typeof mockPrisma>;

  beforeEach(() => {
    prisma = mockPrisma();
    repo = new UserSettingsPrismaRepository(prisma as never);
  });

  it('should return null when not found', async () => {
    prisma.userSettings.findUnique.mockResolvedValue(null);
    expect(await repo.findByUserId('user-1' as never)).toBeNull();
  });

  it('should map notification flags', async () => {
    prisma.userSettings.findUnique.mockResolvedValue(prismaSettings());
    const result = await repo.findByUserId('user-1' as never);
    expect(result?.emailNotifications).toBe(true);
    expect(result?.smsNotifications).toBe(false);
    expect(result?.pushNotifications).toBe(true);
    expect(result?.language).toBe('bn');
  });
});
