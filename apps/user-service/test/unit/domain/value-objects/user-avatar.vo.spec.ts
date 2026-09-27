import { UserAvatarVO } from '@domain/value-objects/primitives/user-avatar.vo';

describe('UserAvatarVO', () => {
  it('should create valid URL', () => {
    const vo = UserAvatarVO.create('https://cdn.example.com/a.png');
    expect(vo.value).toContain('https://');
    expect(vo.isHttps()).toBe(true);
  });
  it('should throw on invalid URL', () => {
    expect(() => UserAvatarVO.create('not-a-url')).toThrow();
  });
  it('should throw on empty', () => {
    expect(() => UserAvatarVO.create('')).toThrow();
  });
  it('should detect image format', () => {
    expect(UserAvatarVO.create('https://x.com/a.png').isImageFormat()).toBe(true);
  });
  it('should support empty avatar', () => {
    const vo = UserAvatarVO.empty();
    expect(vo.isEmpty()).toBe(true);
  });
});
