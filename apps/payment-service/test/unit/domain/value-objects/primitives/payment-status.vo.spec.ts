import { PaymentStatusVO } from '../../../../../src/module/domain/value-objects/primitives/payment-status.vo.js';
import { InvalidPaymentStatusError } from '../../../../../src/module/domain/errors/payment.errors.js';

describe('PaymentStatusVO', () => {
  it('creates for valid statuses', () => {
    expect(PaymentStatusVO.create('pending').isPending()).toBe(true);
    expect(PaymentStatusVO.create('processing').isProcessing()).toBe(true);
    expect(PaymentStatusVO.create('authorized').isAuthorized()).toBe(true);
    expect(PaymentStatusVO.create('captured').isCaptured()).toBe(true);
    expect(PaymentStatusVO.create('paid').isPaid()).toBe(true);
    expect(PaymentStatusVO.create('failed').isFailed()).toBe(true);
    expect(PaymentStatusVO.create('declined').isDeclined()).toBe(true);
    expect(PaymentStatusVO.create('cancelled').isCancelled()).toBe(true);
    expect(PaymentStatusVO.create('refunded').isRefunded()).toBe(true);
    expect(PaymentStatusVO.create('partially_refunded').isPartiallyRefunded()).toBe(true);
    expect(PaymentStatusVO.create('chargeback').isChargeback()).toBe(true);
    expect(PaymentStatusVO.create('expired').isExpired()).toBe(true);
  });

  it('rejects invalid status', () => {
    expect(() => PaymentStatusVO.create('bogus')).toThrow(InvalidPaymentStatusError);
  });

  it('named constructors', () => {
    expect(PaymentStatusVO.pending().value).toBe('pending');
    expect(PaymentStatusVO.captured().value).toBe('captured');
    expect(PaymentStatusVO.refunded().value).toBe('refunded');
  });

  it('isFinal for terminal states', () => {
    expect(PaymentStatusVO.create('cancelled').isFinal()).toBe(true);
    expect(PaymentStatusVO.create('refunded').isFinal()).toBe(true);
    expect(PaymentStatusVO.create('chargeback').isFinal()).toBe(true);
    expect(PaymentStatusVO.create('expired').isFinal()).toBe(true);
    expect(PaymentStatusVO.create('pending').isFinal()).toBe(false);
  });

  it('isSettled for captured/paid/partially_refunded', () => {
    expect(PaymentStatusVO.create('captured').isSettled()).toBe(true);
    expect(PaymentStatusVO.create('paid').isSettled()).toBe(true);
    expect(PaymentStatusVO.create('partially_refunded').isSettled()).toBe(true);
    expect(PaymentStatusVO.create('pending').isSettled()).toBe(false);
  });

  it('isRecoverable for failed/declined', () => {
    expect(PaymentStatusVO.create('failed').isRecoverable()).toBe(true);
    expect(PaymentStatusVO.create('declined').isRecoverable()).toBe(true);
    expect(PaymentStatusVO.create('captured').isRecoverable()).toBe(false);
  });

  it('canTransitionTo — pending → processing allowed', () => {
    expect(PaymentStatusVO.create('pending').canTransitionTo('processing')).toBe(true);
  });

  it('canTransitionTo — pending → captured disallowed', () => {
    expect(PaymentStatusVO.create('pending').canTransitionTo('captured')).toBe(false);
  });

  it('canTransitionTo — authorized → captured allowed', () => {
    expect(PaymentStatusVO.create('authorized').canTransitionTo('captured')).toBe(true);
  });

  it('canTransitionTo — cancelled → anything disallowed', () => {
    expect(PaymentStatusVO.create('cancelled').canTransitionTo('pending')).toBe(false);
  });

  it('canTransitionTo — failed → pending (retry)', () => {
    expect(PaymentStatusVO.create('failed').canTransitionTo('pending')).toBe(true);
  });
});
