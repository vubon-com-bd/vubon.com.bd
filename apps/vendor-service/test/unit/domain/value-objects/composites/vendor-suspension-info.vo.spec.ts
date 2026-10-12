import { VendorSuspensionInfoVO } from '../../../../../src/module/domain/value-objects/composites/vendor-suspension-info.vo.js';
import { SuspensionReasonVO } from '../../../../../src/module/domain/value-objects/primitives/suspension-reason.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';
const NOW = '2026-01-01T00:00:00.000Z';

function makeInfo(overrides: {
  reason?: string;
  durationDays?: number;
  appealDeadline?: string;
  appealSubmittedAt?: string;
} = {}): VendorSuspensionInfoVO {
  return VendorSuspensionInfoVO.create({
    reason: SuspensionReasonVO.create(overrides.reason ?? 'poor_performance'),
    suspendedAt: NOW,
    suspendedBy: UUID,
    durationDays: overrides.durationDays ?? 30,
    appealDeadline: overrides.appealDeadline,
    appealSubmittedAt: overrides.appealSubmittedAt,
    autoLiftOnResolution: true,
  });
}

describe('VendorSuspensionInfoVO', () => {
  describe('create()', () => {
    it('creates valid info', () => {
      const v = makeInfo();
      expect(v.reason.value).toBe('poor_performance');
      expect(v.durationDays).toBe(30);
    });

    it('throws on invalid date', () => {
      expect(() =>
        VendorSuspensionInfoVO.create({
          reason: SuspensionReasonVO.create('poor_performance'),
          suspendedAt: 'bad-date',
          suspendedBy: UUID,
          durationDays: 30,
          autoLiftOnResolution: true,
        }),
      ).toThrow(ValidationError);
    });

    it('throws on non-positive duration', () => {
      expect(() => makeInfo({ durationDays: 0 })).toThrow(ValidationError);
    });

    it('throws on duration above max', () => {
      expect(() => makeInfo({ durationDays: 9999 })).toThrow(ValidationError);
    });

    it('throws when notes too long', () => {
      expect(() =>
        VendorSuspensionInfoVO.create({
          reason: SuspensionReasonVO.create('poor_performance'),
          suspendedAt: NOW,
          suspendedBy: UUID,
          durationDays: 30,
          notes: 'A'.repeat(2000),
          autoLiftOnResolution: true,
        }),
      ).toThrow(ValidationError);
    });
  });

  describe('calculateLiftDate()', () => {
    it('returns date + duration', () => {
      const v = makeInfo({ durationDays: 30 });
      const liftDate = v.calculateLiftDate();
      expect(liftDate.getTime()).toBeGreaterThan(Date.parse(NOW));
    });
  });

  describe('isExpired()', () => {
    it('false for active', () => {
      expect(makeInfo().isExpired(new Date(NOW))).toBe(false);
    });

    it('true after duration', () => {
      expect(makeInfo().isExpired(new Date('2030-01-01T00:00:00Z'))).toBe(true);
    });
  });

  describe('daysRemaining()', () => {
    it('positive for active', () => {
      expect(makeInfo().daysRemaining(new Date(NOW))).toBeGreaterThan(0);
    });

    it('0 for expired', () => {
      expect(makeInfo().daysRemaining(new Date('2030-01-01T00:00:00Z'))).toBe(0);
    });
  });

  describe('canAppeal() / hasAppeal()', () => {
    it('canAppeal true within window', () => {
      const v = makeInfo({ appealDeadline: '2026-02-01T00:00:00Z' });
      expect(v.canAppeal(new Date('2026-01-05T00:00:00Z'))).toBe(true);
    });

    it('canAppeal false when already submitted', () => {
      const v = makeInfo({
        appealDeadline: '2026-02-01T00:00:00Z',
        appealSubmittedAt: NOW,
      });
      expect(v.canAppeal(new Date('2026-01-05T00:00:00Z'))).toBe(false);
    });

    it('hasAppeal true when submitted', () => {
      const v = makeInfo({ appealSubmittedAt: NOW });
      expect(v.hasAppeal()).toBe(true);
    });

    it('hasAppeal false when not submitted', () => {
      expect(makeInfo().hasAppeal()).toBe(false);
    });
  });

  describe('isSevere / isIndefinite', () => {
    it('isSevere true for fraud', () => {
      expect(makeInfo({ reason: 'fraud' }).isSevere()).toBe(true);
    });

    it('isSevere false for performance', () => {
      expect(makeInfo().isSevere()).toBe(false);
    });

    it('isIndefinite false for short', () => {
      expect(makeInfo().isIndefinite()).toBe(false);
    });
  });

  describe('static computeAppealDeadline()', () => {
    it('returns future date', () => {
      const d = VendorSuspensionInfoVO.computeAppealDeadline(NOW);
      expect(Date.parse(d)).toBeGreaterThan(Date.parse(NOW));
    });
  });
});
