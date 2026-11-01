import { PreferenceVO } from '@domain/composites/preference.vo.js';
import { PreferenceIdVO } from '@domain/primitives/preference-id.vo.js';
import { PreferenceTypeVO } from '@domain/primitives/preference-type.vo.js';
import { PreferenceOptionVO } from '@domain/primitives/preference-option.vo.js';
import { UserIdVO } from '@domain/primitives/user-id.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { IDS } from '@domain-fixtures/ids.fixture.js';

const opt = (channel: string, enabled = true, category?: string) =>
  PreferenceOptionVO.create({ channel: channel as any, enabled, category });

const makeProps = (overrides: any = {}) => ({
  id: PreferenceIdVO.create(IDS.preferenceId),
  userId: UserIdVO.create(IDS.userId),
  type: PreferenceTypeVO.create('channel_specific'),
  options: [opt('email', true), opt('sms', false), opt('push', true)],
  quietHoursEnabled: false,
  timezone: 'UTC',
  locale: 'en',
  locked: false,
  ...overrides,
});

describe('PreferenceVO', () => {
  describe('create()', () => {
    it('creates valid preference', () => {
      const vo = PreferenceVO.create(makeProps());
      expect(vo.timezone).toBe('UTC');
    });

    it('rejects quiet hours enabled without start/end', () => {
      expect(() => PreferenceVO.create(makeProps({ quietHoursEnabled: true }))).toThrow(ValidationError);
    });

    it('rejects quietHoursStart out of range', () => {
      expect(() =>
        PreferenceVO.create(
          makeProps({ quietHoursEnabled: true, quietHoursStart: 25, quietHoursEnd: 8 }),
        ),
      ).toThrow(ValidationError);
    });

    it('rejects quietHoursEnd out of range', () => {
      expect(() =>
        PreferenceVO.create(
          makeProps({ quietHoursEnabled: true, quietHoursStart: 22, quietHoursEnd: -1 }),
        ),
      ).toThrow(ValidationError);
    });

    it('rejects equal start/end', () => {
      expect(() =>
        PreferenceVO.create(
          makeProps({ quietHoursEnabled: true, quietHoursStart: 22, quietHoursEnd: 22 }),
        ),
      ).toThrow(ValidationError);
    });

    it('rejects duplicate channel+category', () => {
      expect(() =>
        PreferenceVO.create(
          makeProps({
            options: [opt('email', true), opt('email', false)],
          }),
        ),
      ).toThrow(ValidationError);
    });

    it('accepts quiet hours with both', () => {
      const vo = PreferenceVO.create(
        makeProps({ quietHoursEnabled: true, quietHoursStart: 22, quietHoursEnd: 8 }),
      );
      expect(vo.quietHoursEnabled).toBe(true);
    });
  });

  describe('reconstitute', () => {
    it('skips validation', () => {
      const vo = PreferenceVO.reconstitute(makeProps());
      expect(vo.id).toBeDefined();
    });
  });

  describe('isChannelEnabled', () => {
    const vo = PreferenceVO.reconstitute(makeProps());
    it('true for enabled channel', () => {
      expect(vo.isChannelEnabled('email')).toBe(true);
      expect(vo.isChannelEnabled('push')).toBe(true);
    });
    it('false for disabled channel', () => {
      expect(vo.isChannelEnabled('sms')).toBe(false);
    });
    it('defaults true for unknown', () => {
      expect(vo.isChannelEnabled('webhook')).toBe(true);
    });
  });

  describe('isCategoryEnabled', () => {
    const vo = PreferenceVO.reconstitute(
      makeProps({
        options: [opt('email', true), opt('email', false, 'marketing')],
      }),
    );

    it('category-specific takes precedence', () => {
      expect(vo.isCategoryEnabled('email', 'order')).toBe(true);
      expect(vo.isCategoryEnabled('email', 'marketing')).toBe(false);
    });

    it('falls back to channel-wide', () => {
      expect(vo.isCategoryEnabled('email', 'auth')).toBe(true);
    });
  });

  describe('isInQuietHours', () => {
    const vo = PreferenceVO.reconstitute(
      makeProps({ quietHoursEnabled: true, quietHoursStart: 22, quietHoursEnd: 8 }),
    );

    it('false when disabled', () => {
      const noQuiet = PreferenceVO.reconstitute(makeProps());
      expect(noQuiet.isInQuietHours(23)).toBe(false);
    });

    it('start < end window', () => {
      const voDay = PreferenceVO.reconstitute(
        makeProps({ quietHoursEnabled: true, quietHoursStart: 9, quietHoursEnd: 17 }),
      );
      expect(voDay.isInQuietHours(12)).toBe(true);
      expect(voDay.isInQuietHours(8)).toBe(false);
    });

    it('wraps midnight 22-8', () => {
      expect(vo.isInQuietHours(23)).toBe(true);
      expect(vo.isInQuietHours(2)).toBe(true);
      expect(vo.isInQuietHours(10)).toBe(false);
    });
  });

  describe('enabledChannels / disabledChannels / activeCategoryCount', () => {
    it('enabledChannels list', () => {
      const vo = PreferenceVO.reconstitute(makeProps());
      expect(vo.enabledChannels).toContain('email');
      expect(vo.enabledChannels).toContain('push');
      expect(vo.enabledChannels).not.toContain('sms');
    });

    it('disabledChannels list', () => {
      const vo = PreferenceVO.reconstitute(makeProps());
      expect(vo.disabledChannels).toContain('sms');
    });

    it('activeCategoryCount', () => {
      const vo = PreferenceVO.reconstitute(
        makeProps({
          options: [opt('email', true), opt('email', true, 'marketing'), opt('sms', false, 'promo')],
        }),
      );
      expect(vo.activeCategoryCount).toBe(1);
    });
  });

  describe('locked', () => {
    it('isLocked true when locked', () => {
      expect(PreferenceVO.reconstitute(makeProps({ locked: true })).isLocked()).toBe(true);
    });
    it('isLocked false by default', () => {
      expect(PreferenceVO.reconstitute(makeProps()).isLocked()).toBe(false);
    });
  });

  describe('withXxx methods', () => {
    const base = PreferenceVO.reconstitute(makeProps());

    it('withOptions returns new VO', () => {
      const updated = base.withOptions([opt('email', false)]);
      expect(updated.isChannelEnabled('email')).toBe(false);
    });

    it('withQuietHours toggles quiet hours', () => {
      const updated = base.withQuietHours(true, 22, 8);
      expect(updated.quietHoursEnabled).toBe(true);
    });

    it('withLocked returns new VO', () => {
      const updated = base.withLocked(true);
      expect(updated.isLocked()).toBe(true);
    });
  });

  describe('getters', () => {
    const vo = PreferenceVO.reconstitute(makeProps());
    it('exposes all fields', () => {
      expect(vo.id).toBeDefined();
      expect(vo.userId).toBeDefined();
      expect(vo.type).toBeDefined();
      expect(vo.options.length).toBe(3);
      expect(vo.quietHoursEnabled).toBe(false);
      expect(vo.quietHoursStart).toBeUndefined();
      expect(vo.quietHoursEnd).toBeUndefined();
      expect(vo.timezone).toBe('UTC');
      expect(vo.locale).toBe('en');
      expect(vo.locked).toBe(false);
    });
  });
});
