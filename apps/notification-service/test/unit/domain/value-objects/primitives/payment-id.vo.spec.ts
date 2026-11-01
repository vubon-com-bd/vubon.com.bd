import { PaymentIdVO } from '@domain/primitives/payment-id.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { IDS } from '@domain-fixtures/ids.fixture.js';

describe('PaymentIdVO', () => {
  it('creates valid', () => {
    expect(PaymentIdVO.create(IDS.paymentId).value).toBe(IDS.paymentId);
  });
  it('rejects empty', () => {
    expect(() => PaymentIdVO.create('')).toThrow(ValidationError);
  });
  it('branded round-trip', () => {
    const vo = PaymentIdVO.create(IDS.paymentId);
    expect(PaymentIdVO.fromBranded(vo.toBranded()).value).toBe(IDS.paymentId);
  });
});
