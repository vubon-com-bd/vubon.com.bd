/**
 * UserPreferencesEntity Unit Test
 */
import { UserPreferencesEntity } from '@domain/entities/user-preferences.entity';
import { PreferenceKeyVO } from '@domain/value-objects/primitives/preference-key.vo';
import { PreferenceValueVO } from '@domain/value-objects/primitives/preference-value.vo';

describe('UserPreferencesEntity', () => {
  const now = '2026-01-01T00:00:00.000Z';

  const buildPrefs = () =>
    UserPreferencesEntity.create({ id: 'user-1', userId: 'user-1', now });

  it('should start empty', () => {
    expect(buildPrefs().count()).toBe(0);
  });

  it('should set a boolean preference', () => {
    const p = buildPrefs();
    p.set(PreferenceKeyVO.create('newsletter'), PreferenceValueVO.fromBoolean(true));
    expect(p.isEnabled('newsletter')).toBe(true);
  });

  it('should return false for unset preference', () => {
    const p = buildPrefs();
    expect(p.isEnabled('newsletter')).toBe(false);
  });

  it('should overwrite on set again', () => {
    const p = buildPrefs();
    p.set(PreferenceKeyVO.create('newsletter'), PreferenceValueVO.fromBoolean(true));
    p.set(PreferenceKeyVO.create('newsletter'), PreferenceValueVO.fromBoolean(false));
    expect(p.isEnabled('newsletter')).toBe(false);
  });

  it('should convert to PreferencesVO', () => {
    const p = buildPrefs();
    p.set(PreferenceKeyVO.create('newsletter'), PreferenceValueVO.fromBoolean(true));
    const vo = p.toPreferencesVO();
    expect(vo.userId).toBe('user-1');
    expect(vo.entries.length).toBe(1);
  });
});
