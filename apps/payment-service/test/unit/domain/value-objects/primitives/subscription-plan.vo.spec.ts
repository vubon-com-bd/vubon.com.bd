/**
 * SubscriptionPlanVO unit tests
 */
import { describe, it, expect } from '@jest/globals';
import { SubscriptionPlanVO } from '@domain/primitives/subscription-plan.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

describe('SubscriptionPlanVO', () => {
  describe('create()', () => {
    it('accepts all plans', () => {
      for (const p of ['free', 'basic', 'standard', 'premium', 'enterprise', 'custom']) {
        expect(SubscriptionPlanVO.create(p).value).toBe(p);
      }
    });
    it('normalizes case', () => {
      expect(SubscriptionPlanVO.create('FREE').value).toBe('free');
    });
    it('throws on invalid', () => {
      expect(() => SubscriptionPlanVO.create('unknown')).toThrow(ValidationError);
    });
    it('throws on non-string', () => {
      expect(() => SubscriptionPlanVO.create(123 as unknown as string)).toThrow(ValidationError);
    });
  });

  describe('reconstitute()', () => {
    it('preserves value', () => {
      expect(SubscriptionPlanVO.reconstitute('premium').value).toBe('premium');
    });
  });

  describe('predicates', () => {
    it('isFree', () => expect(SubscriptionPlanVO.create('free').isFree()).toBe(true));
    it('isPremium', () => expect(SubscriptionPlanVO.create('premium').isPremium()).toBe(true));
    it('isEnterprise', () => expect(SubscriptionPlanVO.create('enterprise').isEnterprise()).toBe(true));
    it('isCustom', () => expect(SubscriptionPlanVO.create('custom').isCustom()).toBe(true));
  });

  describe('isPaid', () => {
    it('true for non-free', () => {
      expect(SubscriptionPlanVO.create('basic').isPaid()).toBe(true);
      expect(SubscriptionPlanVO.create('premium').isPaid()).toBe(true);
    });
    it('false for free', () => {
      expect(SubscriptionPlanVO.create('free').isPaid()).toBe(false);
    });
  });

  describe('isHighTier', () => {
    it('true for premium/enterprise', () => {
      expect(SubscriptionPlanVO.create('premium').isHighTier()).toBe(true);
      expect(SubscriptionPlanVO.create('enterprise').isHighTier()).toBe(true);
    });
    it('false for basic/standard', () => {
      expect(SubscriptionPlanVO.create('basic').isHighTier()).toBe(false);
      expect(SubscriptionPlanVO.create('standard').isHighTier()).toBe(false);
    });
  });
});
