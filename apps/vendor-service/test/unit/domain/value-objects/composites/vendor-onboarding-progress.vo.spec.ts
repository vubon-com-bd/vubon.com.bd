import {
  VendorOnboardingProgressVO,
  ONBOARDING_STEP,
} from '../../../../../src/module/domain/value-objects/composites/vendor-onboarding-progress.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const NOW = '2026-01-01T00:00:00.000Z';

function makeProgress(overrides: {
  completedSteps?: string[];
  currentStep?: string;
} = {}): VendorOnboardingProgressVO {
  return VendorOnboardingProgressVO.create({
    completedSteps: (overrides.completedSteps ?? []) as never,
    currentStep: (overrides.currentStep ?? 'basic_info') as never,
    startedAt: NOW,
    lastUpdatedAt: NOW,
    abandoned: false,
  });
}

describe('VendorOnboardingProgressVO', () => {
  describe('initial()', () => {
    it('starts at basic_info', () => {
      const v = VendorOnboardingProgressVO.initial(NOW);
      expect(v.currentStep).toBe('basic_info');
      expect(v.completedSteps).toHaveLength(0);
    });
  });

  describe('create()', () => {
    it('creates with completed steps', () => {
      const v = makeProgress({
        completedSteps: ['basic_info'],
        currentStep: 'business_info',
      });
      expect(v.getCompletedCount()).toBe(1);
    });

    it('throws on invalid step', () => {
      expect(() => makeProgress({ completedSteps: ['invalid'] })).toThrow(ValidationError);
    });

    it('throws when current step in completed', () => {
      expect(() =>
        makeProgress({
          completedSteps: ['basic_info'],
          currentStep: 'basic_info',
        }),
      ).toThrow(ValidationError);
    });
  });

  describe('isStepCompleted', () => {
    it('true for completed', () => {
      const v = makeProgress({ completedSteps: ['basic_info'], currentStep: 'business_info' });
      expect(v.isStepCompleted('basic_info')).toBe(true);
    });

    it('false for not completed', () => {
      expect(makeProgress().isStepCompleted('basic_info')).toBe(false);
    });
  });

  describe('getCompletionRatio / getCompletionPercent', () => {
    it('ratio between 0 and 1', () => {
      const v = makeProgress({ completedSteps: ['basic_info'], currentStep: 'business_info' });
      expect(v.getCompletionRatio()).toBeGreaterThan(0);
      expect(v.getCompletionRatio()).toBeLessThan(1);
    });

    it('percent is 0-100', () => {
      const v = makeProgress({ completedSteps: ['basic_info'], currentStep: 'business_info' });
      expect(v.getCompletionPercent()).toBeGreaterThan(0);
      expect(v.getCompletionPercent()).toBeLessThan(100);
    });

    it('0% initially', () => {
      expect(makeProgress().getCompletionPercent()).toBe(0);
    });
  });

  describe('isComplete', () => {
    it('false when not all steps done', () => {
      const allSteps = Object.values(ONBOARDING_STEP);
      const completed = allSteps.slice(0, allSteps.length - 1);
      const v = VendorOnboardingProgressVO.create({
        completedSteps: completed,
        currentStep: allSteps[allSteps.length - 1]!,
        startedAt: NOW,
        lastUpdatedAt: NOW,
        abandoned: false,
      });
      expect(v.isComplete()).toBe(false);
    });

    it('false initially', () => {
      expect(makeProgress().isComplete()).toBe(false);
    });
  });

  describe('getRemainingSteps / getNextStep / getPreviousStep', () => {
    it('getRemainingSteps excludes completed', () => {
      const v = makeProgress({ completedSteps: ['basic_info'], currentStep: 'business_info' });
      const remaining = v.getRemainingSteps();
      expect(remaining).not.toContain('basic_info');
    });

    it('getNextStep returns next', () => {
      const v = makeProgress({ currentStep: 'basic_info' });
      expect(v.getNextStep()).toBe('business_info');
    });

    it('getPreviousStep returns previous', () => {
      const v = makeProgress({ completedSteps: ['basic_info'], currentStep: 'business_info' });
      expect(v.getPreviousStep()).toBe('basic_info');
    });

    it('getPreviousStep null at start', () => {
      expect(makeProgress().getPreviousStep()).toBeNull();
    });
  });

  describe('markStepComplete', () => {
    it('returns new progress', () => {
      const v = makeProgress();
      const updated = v.markStepComplete('basic_info', NOW);
      expect(updated.isStepCompleted('basic_info')).toBe(true);
    });

    it('no-op if already complete', () => {
      const v = makeProgress({ completedSteps: ['basic_info'], currentStep: 'business_info' });
      const updated = v.markStepComplete('basic_info', NOW);
      expect(updated).toBe(v);
    });
  });

  describe('getAgeInDays / isStale', () => {
    it('returns days since start', () => {
      const v = makeProgress();
      expect(v.getAgeInDays(new Date('2026-01-05T00:00:00Z'))).toBe(4);
    });

    it('isStale true after 14 days incomplete', () => {
      const v = makeProgress();
      expect(v.isStale(new Date('2026-02-01T00:00:00Z'))).toBe(true);
    });

    it('isStale false for recent', () => {
      expect(makeProgress().isStale(new Date('2026-01-05T00:00:00Z'))).toBe(false);
    });
  });
});
