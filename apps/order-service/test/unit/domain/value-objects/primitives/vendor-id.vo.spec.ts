import { describe, it, expect } from '@jest/globals';
import { VendorIdVO } from '@domain/primitives/vendor-id.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const VALID_UUID = '550e8400-e29b-41d4-a716-446655440000';

describe('VendorIdVO', () => {
  it('creates from valid UUID', () => {
    expect(VendorIdVO.create(VALID_UUID).value).toBe(VALID_UUID);
  });
  it('throws for empty', () => {
    expect(() => VendorIdVO.create('')).toThrow(ValidationError);
    expect(() => VendorIdVO.create('')).toThrow('VendorId cannot be empty');
  });
  it('throws for non-UUID', () => {
    expect(() => VendorIdVO.create('abc')).toThrow(ValidationError);
  });
  it('reconstitute skips validation', () => {
    expect(VendorIdVO.reconstitute('legacy').value).toBe('legacy');
  });
});
