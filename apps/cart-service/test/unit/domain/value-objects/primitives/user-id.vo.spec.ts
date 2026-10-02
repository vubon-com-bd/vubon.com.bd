import { jest } from '@jest/globals';
void jest;

import { CartUserIdVO } from '../../../../../src/module/domain/value-objects/primitives/user-id.vo.js';

describe('CartUserIdVO', () => {
  const VALID_UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';
  const OTHER_UUID = '00000000-0000-0000-0000-000000000000';

  it('creates VO from valid UUID', () => {
    expect(CartUserIdVO.create(VALID_UUID).value).toBe(VALID_UUID);
  });
  it('trims whitespace', () => {
    expect(CartUserIdVO.create(`  ${VALID_UUID}  `).value).toBe(VALID_UUID);
  });
  it('throws on empty string', () => {
    expect(() => CartUserIdVO.create('')).toThrow();
  });
  it('throws on non-UUID', () => {
    expect(() => CartUserIdVO.create('not-uuid')).toThrow();
  });
  it('reconstitute skips validation', () => {
    expect(CartUserIdVO.reconstitute('any').value).toBe('any');
  });
  it('equals true for same values', () => {
    expect(CartUserIdVO.create(VALID_UUID).equals(CartUserIdVO.create(VALID_UUID))).toBe(true);
  });
  it('equals false for different values', () => {
    expect(CartUserIdVO.create(VALID_UUID).equals(CartUserIdVO.create(OTHER_UUID))).toBe(false);
  });
});
