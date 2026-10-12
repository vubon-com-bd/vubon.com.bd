import { VendorVerificationMapper } from '../../../../src/module/application/mappers/vendor-verification.mapper.js';
import { VendorVerificationEntity } from '../../../../src/module/domain/entities/vendor-verification.entity.js';
import { VerificationStatusVO } from '../../../../src/module/domain/value-objects/primitives/verification-status.vo.js';
import { VerificationTypeVO } from '../../../../src/module/domain/value-objects/primitives/verification-type.vo.js';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';
const NOW = '2026-01-01T00:00:00.000Z';

function makeVerification(): VendorVerificationEntity {
  return VendorVerificationEntity.reconstitute({
    id: UUID,
    createdAt: NOW,
    updatedAt: NOW,
    props: {
      vendorId: UUID,
      overallStatus: VerificationStatusVO.pending(),
      checks: [
        { type: VerificationTypeVO.create('email'), status: VerificationStatusVO.approved() },
      ],
    },
  });
}

describe('VendorVerificationMapper', () => {
  it('toResponse maps all fields', () => {
    const r = VendorVerificationMapper.toResponse(makeVerification());
    expect(r.id).toBe(UUID);
    expect(r.overallStatus).toBe('pending');
    expect(r.checks).toHaveLength(1);
    expect(r.checks[0]?.type).toBe('email');
  });

  it('includes completionRatio', () => {
    const r = VendorVerificationMapper.toResponse(makeVerification());
    expect(r.completionRatio).toBe(1);
  });

  it('toResponseList maps multiple', () => {
    expect(VendorVerificationMapper.toResponseList([makeVerification()])).toHaveLength(1);
  });
});
