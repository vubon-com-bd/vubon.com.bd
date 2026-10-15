/**
 * VoucherCodeVO extended tests
 */
import { describe, it, expect } from '@jest/globals';
import { VoucherCodeVO } from '@domain/value-objects/primitives/voucher-code.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

describe('VoucherCodeVO — extended', () => {
  it('create() uppercases and trims', () => {
    expect(VoucherCodeVO.create('  gift1234  ').value).toBe('GIFT1234');
  });

  it('length getter', () => {
    expect(VoucherCodeVO.create('GIFT1234').length).toBe(8);
  });

  it('throws too short (<8)', () => {
    expect(() => VoucherCodeVO.create('abc123')).toThrow(ValidationError);
  });

  it('throws too long (>32)', () => {
    expect(() => VoucherCodeVO.create('X'.repeat(33))).toThrow(ValidationError);
  });

  it('throws invalid chars', () => {
    expect(() => VoucherCodeVO.create('bad voucher!')).toThrow(ValidationError);
  });

  it('throws non-string', () => {
    expect(() => VoucherCodeVO.create(123 as never)).toThrow(ValidationError);
  });

  it('reconstitute()', () => {
    expect(VoucherCodeVO.reconstitute('any').value).toBe('any');
  });
});
