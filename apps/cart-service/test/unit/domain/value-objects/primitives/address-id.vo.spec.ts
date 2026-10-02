import { jest } from '@jest/globals';
void jest;

import { CartAddressIdVO } from '../../../../../src/module/domain/value-objects/primitives/address-id.vo.js';

describe('CartAddressIdVO', () => {
  const VALID_UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';
  const OTHER_UUID = '00000000-0000-0000-0000-000000000000';

  it('creates VO from valid UUID', () => {
    expect(CartAddressIdVO.create(VALID_UUID).value).toBe(VALID_UUID);
  });
  it('trims whitespace', () => {
    expect(CartAddressIdVO.create(`  ${VALID_UUID}  `).value).toBe(VALID_UUID);
  });
  it('throws on empty string', () => {
    expect(() => CartAddressIdVO.create('')).toThrow();
  });
  it('throws on non-UUID', () => {
    expect(() => CartAddressIdVO.create('not-uuid')).toThrow();
  });
  it('throws on null', () => {
    expect(() => CartAddressIdVO.create(null as never)).toThrow();
  });
  it('reconstitute skips validation', () => {
    expect(CartAddressIdVO.reconstitute('any').value).toBe('any');
  });
  it('equals true for same values', () => {
    expect(CartAddressIdVO.create(VALID_UUID).equals(CartAddressIdVO.create(VALID_UUID))).toBe(true);
  });
  it('equals false for different values', () => {
    expect(CartAddressIdVO.create(VALID_UUID).equals(CartAddressIdVO.create(OTHER_UUID))).toBe(false);
  });
});
