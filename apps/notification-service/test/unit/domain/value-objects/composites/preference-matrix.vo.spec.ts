import { PreferenceMatrixVO } from '@domain/composites/preference-matrix.vo.js';
import { PreferenceOptionVO } from '@domain/primitives/preference-option.vo.js';
import { UserIdVO } from '@domain/primitives/user-id.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { IDS } from '@domain-fixtures/ids.fixture.js';

const opt = (channel: string, enabled = true, category?: string) =>
  PreferenceOptionVO.create({ channel: channel as any, enabled, category });

const makeProps = (overrides: any = {}) => ({
  userId: UserIdVO.create(IDS.userId),
  options: [opt('email', true), opt('sms', false), opt('email', false, 'marketing')],
  quietHoursEnabled: false,
  timezone: 'UTC',
  locale: 'en',
  ...overrides,
});

describe('PreferenceMatrixVO', () => {
  describe('create()', () => {
    it('creates valid matrix', () => {
      const vo = PreferenceMatrixVO.create(makeProps());
      expect(vo.timezone).toBe('UTC');
    });

    it('rejects quiet enabled without start/end', () => {
      expect(() =>
        PreferenceMatrixVO.create(makeProps({ quietHoursEnabled: true })),
      ).toThrow(ValidationError);
    });
  });

  describe('reconstitute', () => {
    it('skips validation', () => {
      const vo = PreferenceMatrixVO.reconstitute(makeProps());
      expect(vo.userId).toBeDefined();
    });
  });

  describe('find', () => {
    const vo = PreferenceMatrixVO.reconstitute(makeProps());

    it('finds channel-wide option', () => {
      expect(vo.find('email')?.enabled).toBe(true);
    });

    it('finds category-specific option', () => {
      expect(vo.find('email', 'marketing')?.enabled).toBe(false);
    });

    it('undefined for missing', () => {
      expect(vo.find('webhook')).toBeUndefined();
    });
  });

  describe('isEnabled', () => {
    const vo = PreferenceMatrixVO.reconstitute(makeProps());

    it('category-specific takes precedence', () => {
      expect(vo.isEnabled('email', 'marketing')).toBe(false);
    });

    it('falls back to channel-wide', () => {
      expect(vo.isEnabled('email', 'order')).toBe(true);
    });

    it('defaults to true when nothing found', () => {
      expect(vo.isEnabled('webhook')).toBe(true);
    });
  });

  describe('isInQuietHours', () => {
    const noQuiet = PreferenceMatrixVO.reconstitute(makeProps());
    it('false when disabled', () => {
      expect(noQuiet.isInQuietHours(23)).toBe(false);
    });

    const quiet = PreferenceMatrixVO.reconstitute(
      makeProps({ quietHoursEnabled: true, quietHoursStart: 22, quietHoursEnd: 8 }),
    );
    it('wraps midnight', () => {
      expect(quiet.isInQuietHours(23)).toBe(true);
      expect(quiet.isInQuietHours(10)).toBe(false);
    });

    const dayQuiet = PreferenceMatrixVO.reconstitute(
      makeProps({ quietHoursEnabled: true, quietHoursStart: 9, quietHoursEnd: 17 }),
    );
    it('start < end window', () => {
      expect(dayQuiet.isInQuietHours(12)).toBe(true);
      expect(dayQuiet.isInQuietHours(20)).toBe(false);
    });
  });

  describe('counts', () => {
    const vo = PreferenceMatrixVO.reconstitute(makeProps());
    it('totalOptions', () => {
      expect(vo.totalOptions).toBe(3);
    });
    it('enabledCount', () => {
      expect(vo.enabledCount).toBe(1);
    });
    it('disabledCount', () => {
      expect(vo.disabledCount).toBe(2);
    });
  });

  describe('toSnapshot', () => {
    it('returns flat object', () => {
      const vo = PreferenceMatrixVO.reconstitute(
        makeProps({ quietHoursEnabled: true, quietHoursStart: 22, quietHoursEnd: 8 }),
      );
      const snap = vo.toSnapshot();
      expect(snap.userId).toBe(IDS.userId);
      expect(snap.options).toHaveLength(3);
      expect(snap.quietHours).toBeDefined();
      expect(snap.timezone).toBe('UTC');
    });

    it('quietHours null when disabled', () => {
      const vo = PreferenceMatrixVO.reconstitute(makeProps());
      expect(vo.toSnapshot().quietHours).toBeNull();
    });
  });

  describe('getters', () => {
    const vo = PreferenceMatrixVO.reconstitute(makeProps());
    it('exposes all fields', () => {
      expect(vo.userId).toBeDefined();
      expect(vo.options.length).toBe(3);
      expect(vo.quietHoursEnabled).toBe(false);
      expect(vo.quietHoursStart).toBeUndefined();
      expect(vo.quietHoursEnd).toBeUndefined();
      expect(vo.timezone).toBe('UTC');
      expect(vo.locale).toBe('en');
    });
  });
});
