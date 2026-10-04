import { VerifyKycHandler } from '@application/commands/kyc/verify-kyc.handler';
import { VerifyKycCommand } from '@application/commands/kyc/verify-kyc.command';
import { UserKycEntity } from '@domain/entities/user-kyc.entity';
import { UserIdVO } from '@domain/value-objects/primitives/user-id.vo';
import { KycIdVO } from '@domain/value-objects/primitives/kyc-id.vo';
import { KycDocumentVO } from '@domain/value-objects/primitives/kyc-document.vo';
import { createUserKycRepositoryMock } from '../../../helpers/user-repository.mock';

describe('VerifyKycHandler', () => {
  let handler: VerifyKycHandler;
  let kycRepo: ReturnType<typeof createUserKycRepositoryMock>;
  const now = '2026-01-01T00:00:00.000Z';

  beforeEach(() => {
    kycRepo = createUserKycRepositoryMock();
    handler = new VerifyKycHandler(kycRepo as never);
  });

  const buildSubmittedKyc = () => {
    const k = UserKycEntity.create({
      kycId: KycIdVO.create('kyc-1'),
      userId: UserIdVO.create('user-1'),
      document: KycDocumentVO.create('nid'),
      now,
    });
    k.submit(now);
    return k;
  };

  it('should approve submitted KYC', async () => {
    kycRepo.findById.mockResolvedValue(buildSubmittedKyc());
    const result = await handler.execute(new VerifyKycCommand('kyc-1', 'admin-1'));
    expect(result.status).toBe('approved');
  });

  it('should throw when KYC not found', async () => {
    kycRepo.findById.mockResolvedValue(null);
    await expect(handler.execute(new VerifyKycCommand('missing', 'admin-1'))).rejects.toThrow();
  });

  it('should throw when not submitted yet', async () => {
    const k = UserKycEntity.create({
      kycId: KycIdVO.create('kyc-1'),
      userId: UserIdVO.create('user-1'),
      document: KycDocumentVO.create('nid'),
      now,
    });
    kycRepo.findById.mockResolvedValue(k);
    await expect(handler.execute(new VerifyKycCommand('kyc-1', 'admin-1'))).rejects.toThrow();
  });
});
