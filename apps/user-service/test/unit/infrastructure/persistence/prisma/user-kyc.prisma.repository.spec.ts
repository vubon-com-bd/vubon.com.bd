import { UserKycPrismaRepository } from '@infrastructure/persistence/prisma/repositories/user-kyc.prisma.repository';
import { createPrismaServiceMock } from '../../../../helpers/prisma-mock';
import { UserIdVO } from '@domain/value-objects/primitives/user-id.vo';
import { KycIdVO } from '@domain/value-objects/primitives/kyc-id.vo';
import { KycStatusVO } from '@domain/value-objects/primitives/kyc-status.vo';

describe('UserKycPrismaRepository (mocked)', () => {
  let repo: UserKycPrismaRepository;
  let prisma: ReturnType<typeof createPrismaServiceMock>;

  beforeEach(() => {
    prisma = createPrismaServiceMock();
    repo = new UserKycPrismaRepository(prisma as never);
  });

  it('findById returns null when not found', async () => {
    prisma.userKyc.findUnique.mockResolvedValue(null);
    expect(await repo.findById('missing')).toBeNull();
  });

  it('findByUserId maps row', async () => {
    prisma.userKyc.findUnique.mockResolvedValue({
      id: 'kyc-1',
      userId: 'user-1',
      document: 'nid',
      status: 'pending',
      submittedAt: new Date(),
      reviewedAt: null,
      rejectionReason: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    const r = await repo.findByUserId(UserIdVO.create('user-1'));
    expect(r).not.toBeNull();
    expect(r!.status.value).toBe('pending');
  });

  it('existsById returns boolean', async () => {
    prisma.userKyc.count.mockResolvedValue(1);
    expect(await repo.existsById(KycIdVO.create('kyc-1'))).toBe(true);
  });

  it('findByStatus filters', async () => {
    prisma.userKyc.findMany.mockResolvedValue([]);
    await repo.findByStatus(KycStatusVO.pending());
    expect(prisma.userKyc.findMany).toHaveBeenCalled();
  });

  it('latestForUser uses orderBy', async () => {
    prisma.userKyc.findFirst.mockResolvedValue(null);
    await repo.latestForUser(UserIdVO.create('user-1'));
    expect(prisma.userKyc.findFirst).toHaveBeenCalled();
  });
});
