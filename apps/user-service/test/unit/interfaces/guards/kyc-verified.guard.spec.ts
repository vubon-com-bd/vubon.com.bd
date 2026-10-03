/**
 * KycVerifiedGuard Unit Test
 */
import { ForbiddenException } from '@nestjs/common';
import type { ExecutionContext } from '@nestjs/common';
import { KycVerifiedGuard } from '@interfaces/guards/kyc-verified.guard';
import { UserKycEntity } from '@domain/entities/user-kyc.entity';
import { UserIdVO } from '@domain/value-objects/primitives/user-id.vo';
import { KycIdVO } from '@domain/value-objects/primitives/kyc-id.vo';
import { KycDocumentVO } from '@domain/value-objects/primitives/kyc-document.vo';
import { createUserKycRepositoryMock } from '../../../helpers/user-repository.mock';

describe('KycVerifiedGuard', () => {
  let guard: KycVerifiedGuard;
  let kycRepo: ReturnType<typeof createUserKycRepositoryMock>;
  const now = '2026-01-01T00:00:00.000Z';

  beforeEach(() => {
    kycRepo = createUserKycRepositoryMock();
    guard = new KycVerifiedGuard(kycRepo as never);
  });

  const buildContext = (user: unknown): ExecutionContext =>
    ({
      switchToHttp: () => ({
        getRequest: () => ({ user, params: {} }),
      }),
    }) as unknown as ExecutionContext;

  it('should allow when KYC verified', async () => {
    const k = UserKycEntity.create({
      kycId: KycIdVO.create('kyc-1'),
      userId: UserIdVO.create('user-1'),
      document: KycDocumentVO.create('nid'),
      now,
    });
    k.submit(now);
    k.approve(now);
    kycRepo.findByUserId.mockResolvedValue(k);

    const ctx = buildContext({ userId: 'user-1' });
    await expect(guard.canActivate(ctx)).resolves.toBe(true);
  });

  it('should throw when no authenticated user', async () => {
    const ctx = buildContext(null);
    await expect(guard.canActivate(ctx)).rejects.toThrow(ForbiddenException);
  });

  it('should throw when no KYC found', async () => {
    kycRepo.findByUserId.mockResolvedValue(null);
    const ctx = buildContext({ userId: 'user-1' });
    await expect(guard.canActivate(ctx)).rejects.toThrow(ForbiddenException);
  });

  it('should throw when KYC not verified', async () => {
    const k = UserKycEntity.create({
      kycId: KycIdVO.create('kyc-1'),
      userId: UserIdVO.create('user-1'),
      document: KycDocumentVO.create('nid'),
      now,
    });
    k.submit(now);
    kycRepo.findByUserId.mockResolvedValue(k);

    const ctx = buildContext({ userId: 'user-1' });
    await expect(guard.canActivate(ctx)).rejects.toThrow(ForbiddenException);
  });
});
