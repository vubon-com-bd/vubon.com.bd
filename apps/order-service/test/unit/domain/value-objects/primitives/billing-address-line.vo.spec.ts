import { describe, it, expect } from '@jest/globals';
import { BillingAddressLineVO } from '@domain/primitives/billing-address-line.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

describe('BillingAddressLineVO', () => {
  it('creates from valid text', () => {
    expect(BillingAddressLineVO.create('123 Main Street').value).toBe('123 Main Street');
  });
  it('trims whitespace', () => {
    expect(BillingAddressLineVO.create('  hello  ').value).toBe('hello');
  });
  it('throws for too short', () => {
    expect(() => BillingAddressLineVO.create('ab')).toThrow(ValidationError);
  });
  it('throws for too long', () => {
    expect(() => BillingAddressLineVO.create('a'.repeat(256))).toThrow(ValidationError);
  });
});
