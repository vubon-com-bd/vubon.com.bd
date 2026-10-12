import { VendorSuspensionPolicyService } from '../../../../src/module/domain/services/vendor-suspension-policy.service.js';
import { SuspensionReasonVO } from '../../../../src/module/domain/value-objects/primitives/suspension-reason.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

describe('VendorSuspensionPolicyService', () => {
  describe('defaultPolicy', () => {
    it('returns defaults', () => {
      const p = VendorSuspensionPolicyService.defaultPolicy();
      expect(p.defaultDuration).toBeGreaterThan(0);
      expect(p.maxDuration).toBeGreaterThan(0);
    });
  });

  describe('durationFor', () => {
    it('fraud → 365', () => {
      expect(VendorSuspensionPolicyService.durationFor(SuspensionReasonVO.create('fraud'))).toBe(365);
    });

    it('document_expired → 7', () => {
      expect(VendorSuspensionPolicyService.durationFor(SuspensionReasonVO.create('document_expired'))).toBe(7);
    });

    it('other → default', () => {
      expect(VendorSuspensionPolicyService.durationFor(SuspensionReasonVO.create('other'))).toBeGreaterThan(0);
    });
  });

  describe('recommend', () => {
    it('suspends on low performance', () => {
      const r = VendorSuspensionPolicyService.recommend({
        performanceScore: 30, orderCount: 20, openDisputes: 0,
      });
      expect(r.shouldSuspend).toBe(true);
      expect(r.reason?.value).toBe('poor_performance');
    });

    it('suspends on too many disputes', () => {
      const r = VendorSuspensionPolicyService.recommend({
        performanceScore: 80, orderCount: 20, openDisputes: 5,
      });
      expect(r.reason?.value).toBe('customer_complaints');
    });

    it('does not suspend healthy vendor', () => {
      expect(VendorSuspensionPolicyService.recommend({
        performanceScore: 85, orderCount: 20, openDisputes: 0,
      }).shouldSuspend).toBe(false);
    });

    it('manual reason overrides', () => {
      const r = VendorSuspensionPolicyService.recommend({
        performanceScore: 85, orderCount: 20, openDisputes: 0,
        reason: SuspensionReasonVO.create('fraud'),
      });
      expect(r.reason?.value).toBe('fraud');
    });
  });

  describe('validateDuration', () => {
    it('accepts valid', () => {
      expect(() => VendorSuspensionPolicyService.validateDuration(30)).not.toThrow();
    });

    it('throws on zero', () => {
      expect(() => VendorSuspensionPolicyService.validateDuration(0)).toThrow(ValidationError);
    });

    it('throws on negative', () => {
      expect(() => VendorSuspensionPolicyService.validateDuration(-1)).toThrow(ValidationError);
    });

    it('throws on above max', () => {
      expect(() => VendorSuspensionPolicyService.validateDuration(9999)).toThrow(ValidationError);
    });

    it('throws on non-integer', () => {
      expect(() => VendorSuspensionPolicyService.validateDuration(1.5)).toThrow(ValidationError);
    });
  });

  describe('shouldAutoLift', () => {
    it('true for non-severe + resolved', () => {
      expect(VendorSuspensionPolicyService.shouldAutoLift(
        SuspensionReasonVO.create('poor_performance'), true,
      )).toBe(true);
    });

    it('false when unresolved', () => {
      expect(VendorSuspensionPolicyService.shouldAutoLift(
        SuspensionReasonVO.create('poor_performance'), false,
      )).toBe(false);
    });

    it('false for severe reason', () => {
      expect(VendorSuspensionPolicyService.shouldAutoLift(
        SuspensionReasonVO.create('fraud'), true,
      )).toBe(false);
    });
  });

  describe('canAcceptAppeal', () => {
    it('false when window expired', () => {
      expect(VendorSuspensionPolicyService.canAcceptAppeal({
        reason: SuspensionReasonVO.create('poor_performance'),
        appealReason: 'This is a long enough appeal reason text',
        daysSinceSuspension: 100,
      })).toBe(false);
    });

    it('false when reason too short', () => {
      expect(VendorSuspensionPolicyService.canAcceptAppeal({
        reason: SuspensionReasonVO.create('poor_performance'),
        appealReason: 'short',
        daysSinceSuspension: 5,
      })).toBe(false);
    });

    it('true when within window + reason sufficient', () => {
      expect(VendorSuspensionPolicyService.canAcceptAppeal({
        reason: SuspensionReasonVO.create('poor_performance'),
        appealReason: 'This is a detailed appeal reason with enough chars',
        daysSinceSuspension: 5,
      })).toBe(true);
    });
  });

  describe('severity', () => {
    it('critical for fraud', () => {
      expect(VendorSuspensionPolicyService.severity(SuspensionReasonVO.create('fraud'), 30)).toBe('critical');
    });

    it('critical for long duration', () => {
      expect(VendorSuspensionPolicyService.severity(
        SuspensionReasonVO.create('poor_performance'), 90,
      )).toBe('critical');
    });

    it('high for 30+ days', () => {
      expect(VendorSuspensionPolicyService.severity(
        SuspensionReasonVO.create('poor_performance'), 30,
      )).toBe('high');
    });

    it('medium for 14+ days', () => {
      expect(VendorSuspensionPolicyService.severity(
        SuspensionReasonVO.create('poor_performance'), 14,
      )).toBe('medium');
    });

    it('low for short durations', () => {
      expect(VendorSuspensionPolicyService.severity(
        SuspensionReasonVO.create('poor_performance'), 5,
      )).toBe('low');
    });
  });

  describe('onExpiry', () => {
    it('lift when all clear', () => {
      expect(VendorSuspensionPolicyService.onExpiry({
        performanceScore: 80, hasOpenDisputes: false, appealPending: false,
      })).toBe('lift');
    });

    it('extend when appeal pending', () => {
      expect(VendorSuspensionPolicyService.onExpiry({
        performanceScore: 80, hasOpenDisputes: false, appealPending: true,
      })).toBe('extend');
    });

    it('extend when open disputes', () => {
      expect(VendorSuspensionPolicyService.onExpiry({
        performanceScore: 80, hasOpenDisputes: true, appealPending: false,
      })).toBe('extend');
    });

    it('block when performance critically low', () => {
      expect(VendorSuspensionPolicyService.onExpiry({
        performanceScore: 30, hasOpenDisputes: false, appealPending: false,
      })).toBe('block');
    });
  });

  describe('daysRemaining', () => {
    it('positive for future', () => {
      const now = new Date('2026-01-01T00:00:00Z');
      expect(VendorSuspensionPolicyService.daysRemaining('2025-12-25T00:00:00Z', 30, now)).toBeGreaterThan(0);
    });

    it('0 for expired', () => {
      const now = new Date('2026-06-01T00:00:00Z');
      expect(VendorSuspensionPolicyService.daysRemaining('2025-01-01T00:00:00Z', 30, now)).toBe(0);
    });
  });
});
