import { PreferenceOptionVO } from '@domain/primitives/preference-option.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

describe('PreferenceOptionVO', () => {
  it('accepts valid option', () => {
    const vo = PreferenceOptionVO.create({ channel: 'email', enabled: true });
    expect(vo.channel).toBe('email');
    expect(vo.enabled).toBe(true);
    expect(vo.category).toBeUndefined();
  });

  it('accepts category-specific option', () => {
    const vo = PreferenceOptionVO.create({
      channel: 'email',
      category: 'Order',
      enabled: false,
    });
    expect(vo.category).toBe('order');
  });

  it('rejects invalid channel', () => {
    expect(() =>
      PreferenceOptionVO.create({ channel: 'pigeon' as any, enabled: true }),
    ).toThrow(ValidationError);
  });

  it('rejects non-boolean enabled', () => {
    expect(() =>
      PreferenceOptionVO.create({ channel: 'email', enabled: 'yes' as any }),
    ).toThrow(ValidationError);
  });

  it('matchesChannel', () => {
    const vo = PreferenceOptionVO.create({ channel: 'email', enabled: true });
    expect(vo.matchesChannel('email')).toBe(true);
    expect(vo.matchesChannel('sms')).toBe(false);
  });

  it('reconstitute', () => {
    const vo = PreferenceOptionVO.reconstitute({ channel: 'sms', enabled: false });
    expect(vo.channel).toBe('sms');
  });
});
