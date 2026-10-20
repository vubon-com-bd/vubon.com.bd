import { describe, it, expect } from '@jest/globals';
import { CustomerIdVO } from '@domain/primitives/customer-id.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const VALID_UUID = '550e8400-e29b-41d4-a716-446655440000';

describe('CustomerIdVO', () => {
  it('creates from valid UUID', () => {
    expect(CustomerIdVO.create(VALID_UUID).value).toBe(VALID_UUID);
  });
  it('trims whitespace', () => {
    expect(CustomerIdVO.create(`  ${VALID_UUID}  `).value).toBe(VALID_UUID);
  });
  it('throws for empty', () => {
    expect(() => CustomerIdVO.create('')).toThrow(ValidationError);
    expect(() => CustomerIdVO.create('')).toThrow('CustomerId cannot be empty');
  });
  it('throws for non-UUID', () => {
    expect(() => CustomerIdVO.create('abc')).toThrow(ValidationError);
    expect(() => CustomerIdVO.create('abc')).toThrow('must be a valid UUID');
  });
  it('reconstitute skips validation', () => {
    expect(CustomerIdVO.reconstitute('legacy').value).toBe('legacy');
  });
  it('equality', () => {
    expect(CustomerIdVO.create(VALID_UUID).equals(CustomerIdVO.create(VALID_UUID))).toBe(true);
    expect(CustomerIdVO.create(VALID_UUID).equals(CustomerIdVO.create('660f9511-f3ac-52e5-b827-557766551111'))).toBe(false);
  });
});
