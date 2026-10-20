import { describe, it, expect } from '@jest/globals';
import { BillingAddressIdVO } from '@domain/primitives/billing-address-id.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const VALID_UUID = '550e8400-e29b-41d4-a716-446655440000';

describe('BillingAddressIdVO', () => {
  it('creates from valid UUID', () => {
    expect(BillingAddressIdVO.create(VALID_UUID).value).toBe(VALID_UUID);
  });
  it('throws for empty', () => {
    expect(() => BillingAddressIdVO.create('')).toThrow(ValidationError);
  });
  it('throws for non-UUID', () => {
    expect(() => BillingAddressIdVO.create('abc')).toThrow(ValidationError);
  });
  it('reconstitute skips validation', () => {
    expect(BillingAddressIdVO.reconstitute('legacy').value).toBe('legacy');
  });
});
