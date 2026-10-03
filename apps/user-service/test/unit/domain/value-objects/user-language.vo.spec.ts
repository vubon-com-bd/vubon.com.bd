import { UserLanguageVO } from '@domain/value-objects/primitives/user-language.vo';

describe('UserLanguageVO', () => {
  it('should create bn', () => {
    expect(UserLanguageVO.create('bn').value).toBe('bn');
  });
  it('should create en', () => {
    expect(UserLanguageVO.create('en').value).toBe('en');
  });
  it('should throw on invalid', () => {
    expect(() => UserLanguageVO.create('xx')).toThrow();
  });
});
