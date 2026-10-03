/**
 * GetKycStatusHandler Unit Test
 */
import { GetKycStatusHandler } from '@application/queries/kyc/get-kyc-status.handler';
import { GetKycStatusQuery } from '@application/queries/kyc/get-kyc-status.query';
import { UserKycEntity } from '@domain/entities/user-kyc.entity';
import { UserIdVO } from '@domain/value-objects/primitives/user-id.vo';
import { KycIdVO } from '@domain/value-objects/primitives/kyc-id.vo';
import { KycDocumentVO } from '@domain/value-objects/primitives/kyc-document.vo';
import { createUserKycRepositoryMock } from '../../../helpers/user-repository.mock';

describe('GetKycStatusHandler', () => {
  let handler: GetKycStatusHandler;
  let kycRepo: ReturnType<typeof createUserKycRepositoryMock>;
  const now = '2026-01-01T00:00:00.000Z';

  beforeEach(() => {
    kycRepo = createUserKycRepositoryMock();
    handler = new GetKycStatusHandler(kycRepo);
  });

  it('should return KycResponseDTO when found', async () => {
    const kyc = UserKycEntity.create({
      kycId: KycIdVO.create('kyc-1'),
      userId: UserIdVO.create('user-1'),
      document: KycDocumentVO.create('nid'),
      now,
    });
    kycRepo.findByUserId.mockResolvedValue(kyc);

    const result = await handler.execute(new GetKycStatusQuery('user-1'));
    expect(result.userId).toBe('user-1');
    expect(result.status).toBe('not_started');
  });

  it('should throw when KYC not found', async () => {
    kycRepo.findByUserId.mockResolvedValue(null);
    await expect(handler.execute(new GetKycStatusQuery('missing'))).rejects.toThrow();
  });
});
