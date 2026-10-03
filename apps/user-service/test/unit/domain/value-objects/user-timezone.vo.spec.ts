import { UserTimezoneVO } from '@domain/value-objects/primitives/user-timezone.vo';

describe('UserTimezoneVO', () => {
  it('should create Asia/Dhaka', () => {
    expect(UserTimezoneVO.create('Asia/Dhaka').value).toBe('Asia/Dhaka');
  });
  it('should create UTC', () => {
    expect(UserTimezoneVO.create('UTC').value).toBe('UTC');
  });
  it('should return default', () => {
    expect(UserTimezoneVO.default().value).toBe('Asia/Dhaka');
  });
  it('should throw on invalid', () => {
    expect(() => UserTimezoneVO.create('Invalid/Zone')).toThrow();
  });
});
