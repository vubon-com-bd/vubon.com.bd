/**
 * UserProfilePrismaRepository — Unit Tests
 */
import { jest } from '@jest/globals';

import { UserProfilePrismaRepository } from './user-profile.prisma.repository.js';

const mockPrisma = () => ({
  userProfile: {
    findUnique: jest.fn<() => Promise<unknown>>(),
    findMany: jest.fn<() => Promise<unknown>>(),
    create: jest.fn<() => Promise<unknown>>(),
    update: jest.fn<() => Promise<unknown>>(),
    delete: jest.fn<() => Promise<unknown>>(),
  },
});

const now = new Date('2024-01-01T00:00:00.000Z');

const prismaProfile = (overrides: Record<string, unknown> = {}) => ({
  id: 'p-1',
  userId: 'user-1',
  firstName: 'John',
  lastName: 'Doe',
  bio: null,
  avatarUrl: null,
  dateOfBirth: null,
  gender: null,
  createdAt: now,
  updatedAt: now,
  deletedAt: null,
  ...overrides,
});

describe('UserProfilePrismaRepository', () => {
  let repo: UserProfilePrismaRepository;
  let prisma: ReturnType<typeof mockPrisma>;

  beforeEach(() => {
    prisma = mockPrisma();
    repo = new UserProfilePrismaRepository(prisma as never);
  });

  describe('findByUserId()', () => {
    it('should return null when not found', async () => {
      prisma.userProfile.findUnique.mockResolvedValue(null);
      expect(await repo.findByUserId('user-1' as never)).toBeNull();
    });

    it('should map firstName+lastName to displayName', async () => {
      prisma.userProfile.findUnique.mockResolvedValue(prismaProfile());
      const result = await repo.findByUserId('user-1' as never);
      expect(result?.displayName.value).toBe('John Doe');
    });

    it('should fallback to "User" when names empty', async () => {
      prisma.userProfile.findUnique.mockResolvedValue(prismaProfile({ firstName: '', lastName: '' }));
      const result = await repo.findByUserId('user-1' as never);
      expect(result?.displayName.value).toBe('User');
    });

    it('should pass userId as where clause', async () => {
      prisma.userProfile.findUnique.mockResolvedValue(null);
      await repo.findByUserId('user-1' as never);
      expect(prisma.userProfile.findUnique).toHaveBeenCalledWith({ where: { userId: 'user-1' } });
    });
  });
});
