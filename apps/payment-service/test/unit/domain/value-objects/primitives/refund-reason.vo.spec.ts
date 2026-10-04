import { RefundReasonVO } from '../../../../../src/module/domain/value-objects/primitives/refund-reason.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

describe('RefundReasonVO', () => {
  it('creates valid (min 3 chars)', () => {
    expect(RefundReasonVO.create('abc').value).toBe('abc');
  });
  it('trims', () => {
    expect(RefundReasonVO.create('  customer requested  ').value).toBe('customer requested');
  });
  it('rejects too short (<3)', () => {
    expect(() => RefundReasonVO.create('ab')).toThrow(ValidationError);
  });
  it('rejects too long (>500)', () => {
    expect(() => RefundReasonVO.create('a'.repeat(501))).toThrow(ValidationError);
  });
});
