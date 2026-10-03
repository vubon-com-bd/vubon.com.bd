import { UserGenderVO } from '@domain/value-objects/primitives/user-gender.vo';

describe('UserGenderVO', () => {
  it('should create male', () => {
    expect(UserGenderVO.create('male').value).toBe('male');
  });
  it('should create female', () => {
    expect(UserGenderVO.create('female').value).toBe('female');
  });
  it('should create prefer_not_to_say', () => {
    expect(UserGenderVO.create('prefer_not_to_say').value).toBe('prefer_not_to_say');
  });
  it('should lowercase', () => {
    expect(UserGenderVO.create('MALE').value).toBe('male');
  });
  it('should throw on invalid', () => {
    expect(() => UserGenderVO.create('invalid')).toThrow();
  });
});
