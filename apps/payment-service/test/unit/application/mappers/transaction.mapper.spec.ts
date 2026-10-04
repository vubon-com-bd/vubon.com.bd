import { TransactionMapper } from '../../../../src/module/application/mappers/transaction.mapper.js';
import { TransactionEntity } from '../../../../src/module/domain/entities/transaction.entity.js';
import { PaymentIdVO } from '../../../../src/module/domain/value-objects/primitives/payment-id.vo.js';
import { TransactionTypeVO } from '../../../../src/module/domain/value-objects/primitives/transaction-type.vo.js';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';
const NOW = '2026-01-01T00:00:00.000Z';

function makeTx(): TransactionEntity {
  return TransactionEntity.create({
    id: UUID,
    now: NOW,
    props: {
      paymentId: PaymentIdVO.create(UUID),
      type: TransactionTypeVO.create('payment'),
      amount: 1000,
      currency: 'BDT',
    },
  });
}

describe('TransactionMapper', () => {
  it('toResponse maps all fields', () => {
    const dto = TransactionMapper.toResponse(makeTx());
    expect(dto.id).toBe(UUID);
    expect(dto.paymentId).toBe(UUID);
    expect(dto.type).toBe('payment');
    expect(dto.status).toBe('pending');
    expect(dto.amount).toBe(1000);
  });

  it('toListResponse computes totalPages', () => {
    const dto = TransactionMapper.toListResponse([makeTx()], 45, 1, 20);
    expect(dto.totalPages).toBe(3);
  });
});
