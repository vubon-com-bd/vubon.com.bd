import { RejectKycHandler } from '@application/commands/kyc/reject-kyc.handler';
import { RejectKycCommand } from '@application/commands/kyc/reject-kyc.command';
import { UserKycEntity } from '@domain/entities/user-kyc.entity';
import { UserIdVO } from '@domain/value-objects/primitives/user-id.vo';
import { KycIdVO } from '@domain/value-objects/primitives/kyc-id.vo';
import { KycDocumentVO } from '@domain/value-objects/primitives/kyc-document.vo';
import { createUserKycRepositoryMock } from '../../../helpers/user-repository.mock';

describe('RejectKycHandler', () => {
  let handler: RejectKycHandler;
  let kycRepo: ReturnType<typeof createUserKycRepositoryMock>;
  const now = '2026-01-01T00:00:00.000Z';

  beforeEach(() => {
    kycRepo = createUserKycRepositoryMock();
    handler = new RejectKycHandler(kycRepo as never);
  });

  it('should reject submitted KYC', async () => {
    const k = UserKycEntity.create({
      kycId: KycIdVO.create('kyc-1'),
      userId: UserIdVO.create('user-1'),
      document: KycDocumentVO.create('nid'),
      now,
    });
    k.submit(now);
    kycRepo.findById.mockResolvedValue(k);

    const result = await handler.execute(
      new RejectKycCommand('kyc-1', 'Blurry image', 'admin-1')
    );
    expect(result.status).toBe('rejected');
    expect(result.rejectionReason).toBe('Blurry image');
  });

  it('should throw when KYC not found', async () => {
    kycRepo.findById.mockResolvedValue(null);
    await expect(
      handler.execute(new RejectKycCommand('missing', 'reason', 'admin-1'))
    ).rejects.toThrow();
  });
});
