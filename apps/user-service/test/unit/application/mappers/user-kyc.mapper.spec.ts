/**
 * UserKycMapper Unit Test
 */
import { UserKycMapper } from '@application/mappers/user-kyc.mapper';
import { UserKycEntity } from '@domain/entities/user-kyc.entity';
import { UserIdVO } from '@domain/value-objects/primitives/user-id.vo';
import { KycIdVO } from '@domain/value-objects/primitives/kyc-id.vo';
import { KycDocumentVO } from '@domain/value-objects/primitives/kyc-document.vo';

describe('UserKycMapper', () => {
  const now = '2026-01-01T00:00:00.000Z';

  const buildKyc = () =>
    UserKycEntity.create({
      kycId: KycIdVO.create('kyc-1'),
      userId: UserIdVO.create('user-1'),
      document: KycDocumentVO.create('nid'),
      now,
    });

  describe('toResponse', () => {
    it('should map to KycResponseDTO', () => {
      const dto = UserKycMapper.toResponse(buildKyc());
      expect(dto.userId).toBe('user-1');
      expect(dto.status).toBe('not_started');
      expect(dto.level).toBe(0);
      expect(dto.submittedAt).toBeUndefined();
    });

    it('should map submitted KYC', () => {
      const kyc = buildKyc();
      kyc.submit(now);
      const dto = UserKycMapper.toResponse(kyc);
      expect(dto.status).toBe('pending');
      expect(dto.submittedAt).toBeDefined();
    });
  });

  describe('toResponseList', () => {
    it('should map list', () => {
      expect(UserKycMapper.toResponseList([buildKyc()]).length).toBe(1);
    });
  });
});
