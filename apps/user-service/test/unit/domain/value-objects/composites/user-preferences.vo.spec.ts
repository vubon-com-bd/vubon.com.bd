import { UserPreferencesVO } from '@domain/value-objects/composites/user-preferences.vo';
import { PreferenceKeyVO } from '@domain/value-objects/primitives/preference-key.vo';
import { PreferenceValueVO } from '@domain/value-objects/primitives/preference-value.vo';

describe('UserPreferencesVO', () => {
  const entry = (key: string, value: boolean) => ({
    key: PreferenceKeyVO.create(key),
    value: PreferenceValueVO.fromBoolean(value),
  });

  it('creates empty', () => {
    expect(UserPreferencesVO.create({ userId: 'u-1', entries: [] }).entries.length).toBe(0);
  });

  it('creates with entries', () => {
    const vo = UserPreferencesVO.create({
      userId: 'u-1',
      entries: [entry('newsletter', true)],
    });
    expect(vo.entries.length).toBe(1);
  });

  it('getBoolean returns value', () => {
    const vo = UserPreferencesVO.create({ userId: 'u-1', entries: [entry('newsletter', true)] });
    expect(vo.getBoolean('newsletter')).toBe(true);
  });

  it('getBoolean returns null for missing', () => {
    const vo = UserPreferencesVO.create({ userId: 'u-1', entries: [] });
    expect(vo.getBoolean('newsletter')).toBeNull();
  });

  it('isNotificationEnabled', () => {
    const vo = UserPreferencesVO.create({ userId: 'u-1', entries: [entry('newsletter', true)] });
    expect(vo.isNotificationEnabled('newsletter')).toBe(true);
  });

  it('throws on duplicate key', () => {
    expect(() =>
      UserPreferencesVO.create({
        userId: 'u-1',
        entries: [entry('newsletter', true), entry('newsletter', false)],
      })
    ).toThrow();
  });

  it('throws when userId empty', () => {
    expect(() => UserPreferencesVO.create({ userId: '', entries: [] })).toThrow();
  });
});
