/**
 * UserKycPrismaRepository — Unit Tests
 */
import { UserKycPrismaRepository } from './user-kyc.prisma.repository';

const mockPrisma = () => ({
  userKyc: {
    findUnique: jest.fn(),
    findFirst: jest.fn(),
    findMany: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
});

const now = new Date('2024-01-01T00:00:00.000Z');

const prismaKyc = (overrides: Record<string, unknown> = {}) => ({
  id: 'kyc-1',
  userId: 'user-1',
  status: 'pending',
  documentType: 'nid',
  documentNumber: '1234567890',
  documentUrl: 'https://example.com/front.jpg',
  submittedAt: now,
  reviewedAt: null,
  rejectionReason: null,
  createdAt: now,
  updatedAt: now,
  deletedAt: null,
  ...overrides,
});

describe('UserKycPrismaRepository', () => {
  let repo: UserKycPrismaRepository;
  let prisma: ReturnType<typeof mockPrisma>;

  beforeEach(() => {
    prisma = mockPrisma();
    repo = new UserKycPrismaRepository(prisma as never);
  });

  it('findByUserId returns null when missing', async () => {
    prisma.userKyc.findUnique.mockResolvedValue(null);
    expect(await repo.findByUserId('user-1' as never)).toBeNull();
  });

  it('findByUserId maps entity with status', async () => {
    prisma.userKyc.findUnique.mockResolvedValue(prismaKyc());
    const result = await repo.findByUserId('user-1' as never);
    expect(result?.status).toBe('pending');
    expect(result?.documentType).toBe('nid');
    expect(result?.documentNumber).toBe('1234567890');
  });

  it('findPending returns only pending KYC', async () => {
    prisma.userKyc.findMany.mockResolvedValue([prismaKyc()]);
    const result = await repo.findPending();
    expect(result).toHaveLength(1);
    const call = prisma.userKyc.findMany.mock.calls[0]![0] as {
      where: { status: string };
    };
    expect(call.where.status).toBe('pending');
  });

  it('findByDocumentNumber returns null when missing', async () => {
    prisma.userKyc.findFirst.mockResolvedValue(null);
    expect(await repo.findByDocumentNumber('999999')).toBeNull();
  });

  it('findByDocumentNumber maps entity', async () => {
    prisma.userKyc.findFirst.mockResolvedValue(prismaKyc());
    const result = await repo.findByDocumentNumber('1234567890');
    expect(result?.documentNumber).toBe('1234567890');
  });
});
