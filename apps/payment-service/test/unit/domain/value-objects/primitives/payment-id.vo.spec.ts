import { PaymentIdVO } from '../../../../../src/module/domain/value-objects/primitives/payment-id.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';

describe('PaymentIdVO', () => {
  it('creates from valid UUID', () => {
    const vo = PaymentIdVO.create(UUID);
    expect(vo.value).toBe(UUID);
  });

  it('rejects empty string', () => {
    expect(() => PaymentIdVO.create('')).toThrow(ValidationError);
  });

  it('rejects non-UUID string', () => {
    expect(() => PaymentIdVO.create('not-a-uuid')).toThrow(ValidationError);
  });

  it('trims whitespace', () => {
    const vo = PaymentIdVO.create(`  ${UUID}  `);
    expect(vo.value).toBe(UUID);
  });

  it('reconstitute bypasses validation', () => {
    const vo = PaymentIdVO.reconstitute('any-id');
    expect(vo.value).toBe('any-id');
  });

  it('equals same id', () => {
    const a = PaymentIdVO.create(UUID);
    const b = PaymentIdVO.create(UUID);
    expect(a.equals(b)).toBe(true);
  });
});
