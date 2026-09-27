/**
 * UserPreferencesPrismaRepository — Unit Tests
 */
import { jest } from '@jest/globals';

import { UserPreferencesPrismaRepository } from './user-preferences.prisma.repository.js';

const mockPrisma = () => ({
  userPreferences: {
    findUnique: jest.fn() as jest.Mock,
    findMany: jest.fn() as jest.Mock,
    create: jest.fn() as jest.Mock,
    update: jest.fn() as jest.Mock,
    delete: jest.fn() as jest.Mock,
  },
});

const now = new Date('2024-01-01T00:00:00.000Z');

const prismaPrefs = (overrides: Record<string, unknown> = {}) => ({
  id: 'pref-1',
  userId: 'user-1',
  marketingEmails: false,
  productUpdates: true,
  orderUpdates: true,
  securityAlerts: true,
  newsletter: false,
  createdAt: now,
  updatedAt: now,
  deletedAt: null,
  ...overrides,
});

describe('UserPreferencesPrismaRepository', () => {
  let repo: UserPreferencesPrismaRepository;
  let prisma: ReturnType<typeof mockPrisma>;

  beforeEach(() => {
    prisma = mockPrisma();
    repo = new UserPreferencesPrismaRepository(prisma as never);
  });

  it('should return null when not found', async () => {
    prisma.userPreferences.findUnique.mockResolvedValue(null);
    expect(await repo.findByUserId('user-1' as never)).toBeNull();
  });

  it('should map to domain entity', async () => {
    prisma.userPreferences.findUnique.mockResolvedValue(prismaPrefs());
    const result = await repo.findByUserId('user-1' as never);
    expect(result?.userId).toBe('user-1');
    expect(result?.theme).toBe('system');
  });
});
