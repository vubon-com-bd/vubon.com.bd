import { PreferenceTypeVO } from '@domain/primitives/preference-type.vo.js';
import { InvalidPreferenceTypeError } from '@domain/errors/preference.errors.js';

describe('PreferenceTypeVO', () => {
  it.each(['opt_in', 'opt_out', 'channel_specific', 'category_specific', 'quiet_hours', 'frequency'])(
    'accepts "%s"',
    (t) => {
      expect(PreferenceTypeVO.create(t).value).toBe(t);
    },
  );

  it('rejects invalid', () => {
    expect(() => PreferenceTypeVO.create('whatever')).toThrow(InvalidPreferenceTypeError);
  });

  it('predicates', () => {
    expect(PreferenceTypeVO.create('opt_in').isOptIn()).toBe(true);
    expect(PreferenceTypeVO.create('opt_out').isOptOut()).toBe(true);
    expect(PreferenceTypeVO.create('quiet_hours').isQuietHours()).toBe(true);
    expect(PreferenceTypeVO.create('frequency').isFrequency()).toBe(true);
  });
});
