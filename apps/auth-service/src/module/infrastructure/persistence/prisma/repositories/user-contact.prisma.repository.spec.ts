/**
 * UserContactPrismaRepository — Unit Tests
 */
import { UserContactPrismaRepository } from './user-contact.prisma.repository';

const mockPrisma = () => ({
  userContact: {
    findUnique: jest.fn(),
    findMany: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
});

const now = new Date('2024-01-01T00:00:00.000Z');

const prismaContact = (overrides: Record<string, unknown> = {}) => ({
  id: 'c-1',
  userId: 'user-1',
  email: 'john@example.com',
  phone: '01712345678',
  alternateEmail: null,
  alternatePhone: null,
  createdAt: now,
  updatedAt: now,
  deletedAt: null,
  ...overrides,
});

describe('UserContactPrismaRepository', () => {
  let repo: UserContactPrismaRepository;
  let prisma: ReturnType<typeof mockPrisma>;

  beforeEach(() => {
    prisma = mockPrisma();
    repo = new UserContactPrismaRepository(prisma as never);
  });

  it('findByUserId returns list', async () => {
    prisma.userContact.findMany.mockResolvedValue([prismaContact()]);
    const result = await repo.findByUserId('user-1' as never);
    expect(result).toHaveLength(1);
    expect(result[0]?.email?.value).toBe('john@example.com');
  });

  it('findVerifiedByUserId delegates', async () => {
    prisma.userContact.findMany.mockResolvedValue([prismaContact()]);
    const result = await repo.findVerifiedByUserId('user-1' as never);
    expect(result).toHaveLength(1);
  });

  it('returns empty array when none', async () => {
    prisma.userContact.findMany.mockResolvedValue([]);
    const result = await repo.findByUserId('user-1' as never);
    expect(result).toEqual([]);
  });
});
