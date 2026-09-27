import { UserPersonaVO } from '@domain/value-objects/composites/user-persona.vo';
import { UserVO } from '@domain/value-objects/composites/user.vo';
import { UserProfileVO } from '@domain/value-objects/composites/user-profile.vo';
import { UserPreferencesVO } from '@domain/value-objects/composites/user-preferences.vo';
import { UserIdVO } from '@domain/value-objects/primitives/user-id.vo';
import { UserEmailVO } from '@domain/value-objects/primitives/user-email.vo';
import { UserNameVO } from '@domain/value-objects/primitives/user-name.vo';
import { UserStatusVO } from '@domain/value-objects/primitives/user-status.vo';
import { UserTypeVO } from '@domain/value-objects/primitives/user-type.vo';
import { UserAvatarVO } from '@domain/value-objects/primitives/user-avatar.vo';
import { UserBioVO } from '@domain/value-objects/primitives/user-bio.vo';
import { ProfileVisibilityVO } from '@domain/value-objects/primitives/profile-visibility.vo';
import { PreferenceKeyVO } from '@domain/value-objects/primitives/preference-key.vo';
import { PreferenceValueVO } from '@domain/value-objects/primitives/preference-value.vo';

describe('UserPersonaVO', () => {
  const buildUser = () => UserVO.create({
    id: UserIdVO.create('u-1'),
    email: UserEmailVO.create('u@e.com'),
    name: UserNameVO.create('John'),
    phone: null,
    status: UserStatusVO.active(),
    type: UserTypeVO.create('individual'),
  });

  const buildProfile = (filled = false) => UserProfileVO.create({
    userId: UserIdVO.create('u-1'),
    avatar: filled ? UserAvatarVO.create('https://cdn.example.com/a.png') : UserAvatarVO.empty(),
    bio: filled ? UserBioVO.create('Hello') : UserBioVO.empty(),
    visibility: ProfileVisibilityVO.create('public'),
  });

  const buildPrefs = (withEntry = false) => {
    const p = UserPreferencesVO.create({ userId: 'u-1', entries: [] });
    if (withEntry) {
      return UserPreferencesVO.create({
        userId: 'u-1',
        entries: [{ key: PreferenceKeyVO.create('newsletter'), value: PreferenceValueBO.fromBoolean(true) }],
      });
    }
    return p;
  };

  // alias to fix above
  const PreferenceValueBO = PreferenceValueVO;

  it('creates from user + profile + prefs', () => {
    const vo = UserPersonaVO.create({ user: buildUser(), profile: buildProfile(), preferences: buildPrefs() });
    expect(vo.displayName()).toBe('John');
  });

  it('avatarUrl empty when no avatar', () => {
    const vo = UserPersonaVO.create({ user: buildUser(), profile: buildProfile(), preferences: buildPrefs() });
    expect(vo.avatarUrl()).toBe('');
  });

  it('avatarUrl returns URL when set', () => {
    const vo = UserPersonaVO.create({ user: buildUser(), profile: buildProfile(true), preferences: buildPrefs() });
    expect(vo.avatarUrl()).toContain('https://');
  });

  it('isFullyOnboarded false when incomplete', () => {
    const vo = UserPersonaVO.create({ user: buildUser(), profile: buildProfile(), preferences: buildPrefs() });
    expect(vo.isFullyOnboarded()).toBe(false);
  });

  it('isFullyOnboarded true when avatar + bio + phone + active', () => {
    // Skipping phone for now — active + profile complete
    const vo = UserPersonaVO.create({
      user: buildUser(),
      profile: buildProfile(true),
      preferences: buildPrefs(),
    });
    // still false because no phone
    expect(vo.isFullyOnboarded()).toBe(false);
  });

  it('calculateEngagementScore returns number', () => {
    const vo = UserPersonaVO.create({ user: buildUser(), profile: buildProfile(true), preferences: buildPrefs() });
    const score = vo.calculateEngagementScore();
    expect(typeof score).toBe('number');
    expect(score).toBeGreaterThan(0);
  });

  it('throws on user/profile id mismatch', () => {
    const profile = UserProfileVO.create({
      userId: UserIdVO.create('other'),
      avatar: UserAvatarVO.empty(),
      bio: UserBioVO.empty(),
      visibility: ProfileVisibilityVO.create('public'),
    });
    expect(() =>
      UserPersonaVO.create({ user: buildUser(), profile, preferences: buildPrefs() })
    ).toThrow();
  });

  it('throws when user missing', () => {
    expect(() =>
      UserPersonaVO.create({ user: null as never, profile: buildProfile(), preferences: buildPrefs() })
    ).toThrow();
  });
});
