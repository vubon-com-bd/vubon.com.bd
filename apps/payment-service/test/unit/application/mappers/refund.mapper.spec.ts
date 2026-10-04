import { RefundMapper } from '../../../../src/module/application/mappers/refund.mapper.js';
import { RefundEntity } from '../../../../src/module/domain/entities/refund.entity.js';
import { PaymentIdVO } from '../../../../src/module/domain/value-objects/primitives/payment-id.vo.js';
import { RefundReasonVO } from '../../../../src/module/domain/value-objects/primitives/refund-reason.vo.js';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';
const NOW = '2026-01-01T00:00:00.000Z';

function makeRefund(): RefundEntity {
  return RefundEntity.request({
    id: UUID,
    now: NOW,
    props: {
      paymentId: PaymentIdVO.create(UUID),
      amount: 500,
      currency: 'BDT',
      reason: RefundReasonVO.create('customer requested'),
    },
  });
}

describe('RefundMapper', () => {
  it('toResponse maps all fields', () => {
    const dto = RefundMapper.toResponse(makeRefund());
    expect(dto.id).toBe(UUID);
    expect(dto.paymentId).toBe(UUID);
    expect(dto.amount).toBe(500);
    expect(dto.currency).toBe('BDT');
    expect(dto.status).toBe('pending');
    expect(dto.reason).toBe('customer requested');
  });

  it('toPublicResponse limited fields', () => {
    const dto = RefundMapper.toPublicResponse(makeRefund());
    expect(dto.id).toBe(UUID);
    expect(dto).not.toHaveProperty('paymentId');
  });

  it('toListResponse computes totalPages', () => {
    const dto = RefundMapper.toListResponse([makeRefund()], 5, 1, 20);
    expect(dto.totalPages).toBe(1);
  });
});
