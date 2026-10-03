import { UserProfileVO } from '@domain/value-objects/composites/user-profile.vo';
import { UserIdVO } from '@domain/value-objects/primitives/user-id.vo';
import { UserAvatarVO } from '@domain/value-objects/primitives/user-avatar.vo';
import { UserBioVO } from '@domain/value-objects/primitives/user-bio.vo';
import { ProfileVisibilityVO } from '@domain/value-objects/primitives/profile-visibility.vo';

describe('UserProfileVO', () => {
  const build = (withAvatar = false, withBio = false, visibility: 'public' | 'private' = 'public') =>
    UserProfileVO.create({
      userId: UserIdVO.create('u-1'),
      avatar: withAvatar ? UserAvatarVO.create('https://cdn.example.com/a.png') : UserAvatarVO.empty(),
      bio: withBio ? UserBioVO.create('Hello') : UserBioVO.empty(),
      visibility: ProfileVisibilityVO.create(visibility),
    });

  it('creates empty profile', () => {
    const vo = build();
    expect(vo.hasAvatar()).toBe(false);
    expect(vo.hasBio()).toBe(false);
  });

  it('hasAvatar when set', () => {
    expect(build(true).hasAvatar()).toBe(true);
  });

  it('hasBio when set', () => {
    expect(build(false, true).hasBio()).toBe(true);
  });

  it('isPublic when visibility public', () => {
    expect(build().isPublic()).toBe(true);
  });

  it('isComplete only with avatar + bio', () => {
    expect(build().isComplete()).toBe(false);
    expect(build(true, true).isComplete()).toBe(true);
  });

  it('completionScore 0 / 50 / 100', () => {
    expect(build().completionScore()).toBe(0);
    expect(build(true).completionScore()).toBe(50);
    expect(build(false, true).completionScore()).toBe(50);
    expect(build(true, true).completionScore()).toBe(100);
  });

  it('throws when userId missing', () => {
    expect(() =>
      UserProfileVO.create({ userId: null as never, avatar: {} as never, bio: {} as never, visibility: {} as never })
    ).toThrow();
  });
});
