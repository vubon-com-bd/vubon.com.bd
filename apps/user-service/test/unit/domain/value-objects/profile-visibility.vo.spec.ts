import { ProfileVisibilityVO } from '@domain/value-objects/primitives/profile-visibility.vo';

describe('ProfileVisibilityVO', () => {
  it('should create public', () => {
    const vo = ProfileVisibilityVO.create('public');
    expect(vo.isPublic()).toBe(true);
    expect(vo.isPrivate()).toBe(false);
  });
  it('should create private', () => {
    const vo = ProfileVisibilityVO.create('private');
    expect(vo.isPrivate()).toBe(true);
  });
  it('should lowercase', () => {
    expect(ProfileVisibilityVO.create('PUBLIC').value).toBe('public');
  });
  it('should throw on invalid', () => {
    expect(() => ProfileVisibilityVO.create('invalid')).toThrow();
  });
});
