import { VendorPayoutMapper } from '../../../../src/module/application/mappers/vendor-payout.mapper.js';
import { VendorPayoutEntity } from '../../../../src/module/domain/entities/vendor-payout.entity.js';
import { PayoutMethodVO } from '../../../../src/module/domain/value-objects/primitives/payout-method.vo.js';
import { PayoutCycleVO } from '../../../../src/module/domain/value-objects/primitives/payout-cycle.vo.js';
import { PayoutAmountVO } from '../../../../src/module/domain/value-objects/primitives/payout-amount.vo.js';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';
const NOW = '2026-01-01T00:00:00.000Z';

function makePayout(): VendorPayoutEntity {
  return VendorPayoutEntity.create({
    id: UUID,
    now: NOW,
    props: {
      vendorId: UUID,
      payoutNumber: 'PO-TEST-000001',
      method: PayoutMethodVO.reconstitute('bank_transfer'),
      cycle: PayoutCycleVO.reconstitute('on_demand'),
      amount: PayoutAmountVO.create(5000, 'BDT'),
      netAmount: PayoutAmountVO.create(5000, 'BDT'),
      periodStart: NOW,
      periodEnd: NOW,
      bankAccountId: UUID,
    },
  });
}

describe('VendorPayoutMapper', () => {
  it('toResponse maps all fields', () => {
    const r = VendorPayoutMapper.toResponse(makePayout());
    expect(r.id).toBe(UUID);
    expect(r.status).toBe('pending');
    expect(r.method).toBe('bank_transfer');
    expect(r.amount).toBe(5000);
    expect(r.netAmount).toBe(5000);
    expect(r.currency).toBe('BDT');
  });

  it('toPublic maps public fields', () => {
    const r = VendorPayoutMapper.toPublic(makePayout());
    expect(r.id).toBe(UUID);
    expect(r.amount).toBe(5000);
  });

  it('toResponseList maps multiple', () => {
    expect(VendorPayoutMapper.toResponseList([makePayout()])).toHaveLength(1);
  });

  it('toPublicList maps multiple', () => {
    expect(VendorPayoutMapper.toPublicList([makePayout()])).toHaveLength(1);
  });

  it('toListResponse creates paginated result', () => {
    const r = VendorPayoutMapper.toListResponse([makePayout()], 1, 1, 20);
    expect(r.items).toHaveLength(1);
    expect(r.total).toBe(1);
    expect(r.totalPages).toBe(1);
  });
});
