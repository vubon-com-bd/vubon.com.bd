/**
 * UserPrismaRepository — Unit Tests
 * @module auth-service/infrastructure/persistence/prisma/repositories
 */
import { UserPrismaRepository } from './user.prisma.repository';
import { UserEmailVO } from '../../../../domain/value-objects/primitives/user-email.vo';
import { UserNameVO } from '../../../../domain/value-objects/primitives/user-name.vo';
import { UserStatusVO } from '../../../../domain/value-objects/primitives/user-status.vo';
import { UserTypeVO } from '../../../../domain/value-objects/primitives/user-type.vo';
import { UserEntity } from '../../../../domain/entities/user.entity';

const mockPrisma = () => ({
  user: {
    findUnique: jest.fn(),
    findMany: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    count: jest.fn(),
  },
});

const now = new Date('2024-01-01T00:00:00.000Z');

type PrismaUserOverrides = Partial<{
  id: string;
  email: string;
  password: string;
  name: string;
  phone: string | null;
  status: string;
  type: string;
  role: string;
  emailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}>;

const prismaUser = (overrides: PrismaUserOverrides = {}) => ({
  id: 'user-1',
  email: 'john@example.com',
  password: '$2b$12$hash',
  name: 'John Doe',
  phone: null,
  status: 'active',
  type: 'customer',
  role: 'customer',
  emailVerified: true,
  createdAt: now,
  updatedAt: now,
  deletedAt: null,
  ...overrides,
});

describe('UserPrismaRepository', () => {
  let repo: UserPrismaRepository;
  let prisma: ReturnType<typeof mockPrisma>;

  beforeEach(() => {
    prisma = mockPrisma();
    repo = new UserPrismaRepository(prisma as never);
  });

  // ═══════════════════════════════════════════════════════════
  // findById
  // ═══════════════════════════════════════════════════════════

  describe('findById()', () => {
    it('should return null when not found', async () => {
      prisma.user.findUnique.mockResolvedValue(null);
      expect(await repo.findById('user-1' as never)).toBeNull();
    });

    it('should map prisma user to domain entity', async () => {
      prisma.user.findUnique.mockResolvedValue(prismaUser());
      const result = await repo.findById('user-1' as never);
      expect(result).not.toBeNull();
      expect(result?.id).toBe('user-1');
      expect(result?.email.value).toBe('john@example.com');
      expect(result?.name.value).toBe('John Doe');
      expect(result?.status.value).toBe('active');
      expect(result?.type.value).toBe('customer');
    });

    it('should pass correct where clause', async () => {
      prisma.user.findUnique.mockResolvedValue(null);
      await repo.findById('user-1' as never);
      expect(prisma.user.findUnique).toHaveBeenCalledWith({
        where: { id: 'user-1' },
      });
    });
  });

  // ═══════════════════════════════════════════════════════════
  // findByEmail
  // ═══════════════════════════════════════════════════════════

  describe('findByEmail()', () => {
    it('should return mapped user when found', async () => {
      prisma.user.findUnique.mockResolvedValue(prismaUser());
      const email = UserEmailVO.of('john@example.com');
      const result = await repo.findByEmail(email);
      expect(result?.email.value).toBe('john@example.com');
    });

    it('should return null when not found', async () => {
      prisma.user.findUnique.mockResolvedValue(null);
      const result = await repo.findByEmail(UserEmailVO.of('missing@example.com'));
      expect(result).toBeNull();
    });
  });

  // ═══════════════════════════════════════════════════════════
  // existsByEmail
  // ═══════════════════════════════════════════════════════════

  describe('existsByEmail()', () => {
    it('should return true when count > 0', async () => {
      prisma.user.count.mockResolvedValue(1);
      const result = await repo.existsByEmail(UserEmailVO.of('john@example.com'));
      expect(result).toBe(true);
    });

    it('should return false when count = 0', async () => {
      prisma.user.count.mockResolvedValue(0);
      const result = await repo.existsByEmail(UserEmailVO.of('missing@example.com'));
      expect(result).toBe(false);
    });
  });

  // ═══════════════════════════════════════════════════════════
  // save
  // ═══════════════════════════════════════════════════════════

  describe('save()', () => {
    it('should update existing user', async () => {
      const user = UserEntity.create({
        id: 'user-1' as never,
        email: UserEmailVO.of('john@example.com'),
        passwordHash: '$2b$12$hash',
        name: UserNameVO.of('John Doe'),
        status: UserStatusVO.active(),
        type: UserTypeVO.of('customer'),
        roles: [],
        emailVerified: true,
        phoneVerified: false,
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-01T00:00:00.000Z',
      });

      prisma.user.findUnique.mockResolvedValue(prismaUser());
      prisma.user.update.mockResolvedValue(prismaUser());

      const result = await repo.save(user);
      expect(prisma.user.update).toHaveBeenCalled();
      expect(result.id).toBe('user-1');
    });
  });

  // ═══════════════════════════════════════════════════════════
  // countByStatus
  // ═══════════════════════════════════════════════════════════

  describe('countByStatus()', () => {
    it('should delegate count to prisma', async () => {
      prisma.user.count.mockResolvedValue(5);
      const result = await repo.countByStatus('active');
      expect(result).toBe(5);
      expect(prisma.user.count).toHaveBeenCalledWith({
        where: { status: 'active' },
      });
    });
  });

  // ═══════════════════════════════════════════════════════════
  // findByIds
  // ═══════════════════════════════════════════════════════════

  describe('findByIds()', () => {
    it('should return empty for empty ids', async () => {
      const result = await repo.findByIds([]);
      expect(result).toEqual([]);
      expect(prisma.user.findMany).not.toHaveBeenCalled();
    });

    it('should delegate findMany', async () => {
      prisma.user.findMany.mockResolvedValue([prismaUser()]);
      const result = await repo.findByIds([
        'user-1' as never,
        'user-2' as never,
      ]);
      expect(result).toHaveLength(1);
    });
  });
});
