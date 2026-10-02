import { jest } from '@jest/globals';
void jest;

import { CartVendorIdVO } from '../../../../../src/module/domain/value-objects/primitives/vendor-id.vo.js';

describe('CartVendorIdVO', () => {
  const VALID_UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';
  const OTHER_UUID = '00000000-0000-0000-0000-000000000000';

  it('creates VO from valid UUID', () => {
    expect(CartVendorIdVO.create(VALID_UUID).value).toBe(VALID_UUID);
  });
  it('trims whitespace', () => {
    expect(CartVendorIdVO.create(`  ${VALID_UUID}  `).value).toBe(VALID_UUID);
  });
  it('throws on empty string', () => {
    expect(() => CartVendorIdVO.create('')).toThrow();
  });
  it('throws on non-UUID', () => {
    expect(() => CartVendorIdVO.create('not-uuid')).toThrow();
  });
  it('reconstitute skips validation', () => {
    expect(CartVendorIdVO.reconstitute('any').value).toBe('any');
  });
  it('equals true for same values', () => {
    expect(CartVendorIdVO.create(VALID_UUID).equals(CartVendorIdVO.create(VALID_UUID))).toBe(true);
  });
  it('equals false for different values', () => {
    expect(CartVendorIdVO.create(VALID_UUID).equals(CartVendorIdVO.create(OTHER_UUID))).toBe(false);
  });
});
