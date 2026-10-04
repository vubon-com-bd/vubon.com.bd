import { ReverifyKycHandler } from '@application/commands/kyc/reverify-kyc.handler';
import { ReverifyKycCommand } from '@application/commands/kyc/reverify-kyc.command';
import { UserKycEntity } from '@domain/entities/user-kyc.entity';
import { UserIdVO } from '@domain/value-objects/primitives/user-id.vo';
import { KycIdVO } from '@domain/value-objects/primitives/kyc-id.vo';
import { KycDocumentVO } from '@domain/value-objects/primitives/kyc-document.vo';
import { createUserKycRepositoryMock } from '../../../helpers/user-repository.mock';

describe('ReverifyKycHandler', () => {
  let handler: ReverifyKycHandler;
  let kycRepo: ReturnType<typeof createUserKycRepositoryMock>;
  const now = '2026-01-01T00:00:00.000Z';

  beforeEach(() => {
    kycRepo = createUserKycRepositoryMock();
    handler = new ReverifyKycHandler(kycRepo as never);
  });

  it('should re-submit rejected KYC', async () => {
    const k = UserKycEntity.create({
      kycId: KycIdVO.create('kyc-1'),
      userId: UserIdVO.create('user-1'),
      document: KycDocumentVO.create('nid'),
      now,
    });
    k.submit(now);
    k.reject('blurry', now);
    kycRepo.findById.mockResolvedValue(k);

    const result = await handler.execute(new ReverifyKycCommand('kyc-1', 'user-1'));
    expect(result.status).toBe('pending');
  });

  it('should throw when KYC not found', async () => {
    kycRepo.findById.mockResolvedValue(null);
    await expect(
      handler.execute(new ReverifyKycCommand('missing', 'user-1'))
    ).rejects.toThrow();
  });
});
