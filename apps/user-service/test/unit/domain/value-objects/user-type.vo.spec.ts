/**
 * UserTypeVO Unit Test
 */
import { UserTypeVO } from '@domain/value-objects/primitives/user-type.vo';

describe('UserTypeVO', () => {
  it('should create admin', () => {
    const vo = UserTypeVO.create('admin');
    expect(vo.isAdmin()).toBe(true);
  });

  it('should create vendor', () => {
    const vo = UserTypeVO.create('vendor');
    expect(vo.isVendor()).toBe(true);
  });

  it('should identify requiresKyc', () => {
    expect(UserTypeVO.create('individual').requiresKyc()).toBe(true);
    expect(UserTypeVO.create('vendor').requiresKyc()).toBe(true);
    expect(UserTypeVO.create('admin').requiresKyc()).toBe(false);
  });

  it('should throw on invalid type', () => {
    expect(() => UserTypeVO.create('invalid')).toThrow('Invalid user type');
  });
});
