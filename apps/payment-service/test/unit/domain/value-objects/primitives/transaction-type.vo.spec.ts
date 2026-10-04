import { TransactionTypeVO } from '../../../../../src/module/domain/value-objects/primitives/transaction-type.vo.js';
import { InvalidTransactionTypeError } from '../../../../../src/module/domain/errors/transaction.errors.js';

describe('TransactionTypeVO', () => {
  it('creates valid types', () => {
    expect(TransactionTypeVO.create('payment').value).toBe('payment');
    expect(TransactionTypeVO.create('refund').value).toBe('refund');
    expect(TransactionTypeVO.create('payout').value).toBe('payout');
  });
  it('rejects invalid', () => {
    expect(() => TransactionTypeVO.create('bogus')).toThrow(InvalidTransactionTypeError);
  });
  it('isDebit for payment/transfer', () => {
    expect(TransactionTypeVO.create('payment').isDebit()).toBe(true);
    expect(TransactionTypeVO.create('transfer').isDebit()).toBe(true);
    expect(TransactionTypeVO.create('refund').isDebit()).toBe(false);
  });
  it('isCredit for refund/payout/reversal', () => {
    expect(TransactionTypeVO.create('refund').isCredit()).toBe(true);
    expect(TransactionTypeVO.create('payout').isCredit()).toBe(true);
    expect(TransactionTypeVO.create('reversal').isCredit()).toBe(true);
  });
  it('isAdjustment for adjustment/chargeback', () => {
    expect(TransactionTypeVO.create('adjustment').isAdjustment()).toBe(true);
    expect(TransactionTypeVO.create('chargeback').isAdjustment()).toBe(true);
  });
});
