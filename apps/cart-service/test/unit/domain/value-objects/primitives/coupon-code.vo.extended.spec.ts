/**
 * CouponCodeVO extended tests
 */
import { describe, it, expect } from '@jest/globals';
import { CouponCodeVO } from '@domain/value-objects/primitives/coupon-code.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

describe('CouponCodeVO — extended', () => {
  it('create() uppercases', () => {
    expect(CouponCodeVO.create('save20').value).toBe('SAVE20');
  });

  it('trims whitespace', () => {
    expect(CouponCodeVO.create('  save20  ').value).toBe('SAVE20');
  });

  it('length getter', () => {
    expect(CouponCodeVO.create('SAVE20').length).toBe(6);
  });

  it('throws on too short', () => {
    expect(() => CouponCodeVO.create('abc')).toThrow(ValidationError);
  });

  it('throws on too long', () => {
    expect(() => CouponCodeVO.create('X'.repeat(33))).toThrow(ValidationError);
  });

  it('throws on invalid chars', () => {
    expect(() => CouponCodeVO.create('bad code!')).toThrow(ValidationError);
  });

  it('throws on non-string', () => {
    expect(() => CouponCodeVO.create(123 as never)).toThrow(ValidationError);
  });

  it('reconstitute()', () => {
    expect(CouponCodeVO.reconstitute('any').value).toBe('any');
  });
});
