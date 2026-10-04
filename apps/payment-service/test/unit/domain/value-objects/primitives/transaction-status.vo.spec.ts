import { TransactionStatusVO } from '../../../../../src/module/domain/value-objects/primitives/transaction-status.vo.js';
import { InvalidTransactionStatusError } from '../../../../../src/module/domain/errors/transaction.errors.js';

describe('TransactionStatusVO', () => {
  it('creates valid', () => {
    expect(TransactionStatusVO.create('pending').value).toBe('pending');
    expect(TransactionStatusVO.create('success').value).toBe('success');
    expect(TransactionStatusVO.create('settled').value).toBe('settled');
  });
  it('rejects invalid', () => {
    expect(() => TransactionStatusVO.create('bogus')).toThrow(InvalidTransactionStatusError);
  });
  it('isTerminal for final states', () => {
    expect(TransactionStatusVO.create('success').isTerminal()).toBe(true);
    expect(TransactionStatusVO.create('failed').isTerminal()).toBe(true);
    expect(TransactionStatusVO.create('pending').isTerminal()).toBe(false);
  });
  it('isSuccess for success/settled', () => {
    expect(TransactionStatusVO.create('success').isSuccess()).toBe(true);
    expect(TransactionStatusVO.create('settled').isSuccess()).toBe(true);
  });
  it('canBeReversed for success', () => {
    expect(TransactionStatusVO.create('success').canBeReversed()).toBe(true);
    expect(TransactionStatusVO.create('pending').canBeReversed()).toBe(false);
  });
  it('canTransitionTo — pending → success', () => {
    expect(TransactionStatusVO.create('pending').canTransitionTo('success')).toBe(true);
    expect(TransactionStatusVO.create('pending').canTransitionTo('failed')).toBe(true);
  });
  it('canTransitionTo — success → settled/reversed', () => {
    expect(TransactionStatusVO.create('success').canTransitionTo('settled')).toBe(true);
    expect(TransactionStatusVO.create('success').canTransitionTo('reversed')).toBe(true);
  });
});
