import { describe, it, expect } from '@jest/globals';
import { ProductIdVO } from '@domain/primitives/product-id.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const VALID_UUID = '550e8400-e29b-41d4-a716-446655440000';

describe('ProductIdVO', () => {
  it('creates from valid UUID', () => {
    expect(ProductIdVO.create(VALID_UUID).value).toBe(VALID_UUID);
  });
  it('throws for empty', () => {
    expect(() => ProductIdVO.create('')).toThrow(ValidationError);
    expect(() => ProductIdVO.create('')).toThrow('ProductId cannot be empty');
  });
  it('throws for non-UUID', () => {
    expect(() => ProductIdVO.create('abc')).toThrow(ValidationError);
  });
  it('reconstitute skips validation', () => {
    expect(ProductIdVO.reconstitute('legacy').value).toBe('legacy');
  });
});
