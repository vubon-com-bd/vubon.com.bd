/**
 * SubscriptionValidator — Unit Tests
 */
import { describe, it, expect } from '@jest/globals';
import { SubscriptionValidator } from '@application/validators/subscription.validator';
import { ApplicationValidationError } from '@vubon/shared-kernel/application/errors/validation.error';

describe('SubscriptionValidator', () => {
  describe('validateCreate', () => {
    it('should accept valid subscription input', () => {
      const result = SubscriptionValidator.validateCreate({
        plan: 'premium',
        price: 500,
        currency: 'BDT',
        interval: 'monthly',
        intervalCount: 1,
      });
      expect(result.plan).toBe('premium');
      expect(result.price).toBe(500);
      expect(result.currency).toBe('BDT');
      expect(result.interval).toBe('monthly');
    });

    it('should uppercase currency', () => {
      const result = SubscriptionValidator.validateCreate({
        plan: 'basic',
        price: 100,
        currency: 'bdt',
        interval: 'weekly',
        intervalCount: 1,
      });
      expect(result.currency).toBe('BDT');
    });

    it('should throw on null input', () => {
      expect(() => SubscriptionValidator.validateCreate(null)).toThrow(ApplicationValidationError);
    });

    it('should throw on non-object input', () => {
      expect(() => SubscriptionValidator.validateCreate('string')).toThrow(
        ApplicationValidationError,
      );
    });

    it('should throw on invalid plan', () => {
      expect(() =>
        SubscriptionValidator.validateCreate({
          plan: 'ultra-mega',
          price: 500,
          currency: 'BDT',
          interval: 'monthly',
          intervalCount: 1,
        }),
      ).toThrow(ApplicationValidationError);
    });

    it('should throw on non-positive price', () => {
      expect(() =>
        SubscriptionValidator.validateCreate({
          plan: 'premium',
          price: 0,
          currency: 'BDT',
          interval: 'monthly',
          intervalCount: 1,
        }),
      ).toThrow(ApplicationValidationError);
    });

    it('should throw on invalid currency length', () => {
      expect(() =>
        SubscriptionValidator.validateCreate({
          plan: 'premium',
          price: 100,
          currency: 'BD',
          interval: 'monthly',
          intervalCount: 1,
        }),
      ).toThrow(ApplicationValidationError);
    });

    it('should throw on invalid interval', () => {
      expect(() =>
        SubscriptionValidator.validateCreate({
          plan: 'premium',
          price: 100,
          currency: 'BDT',
          interval: 'hourly',
          intervalCount: 1,
        }),
      ).toThrow(ApplicationValidationError);
    });

    it('should throw on non-integer intervalCount', () => {
      expect(() =>
        SubscriptionValidator.validateCreate({
          plan: 'premium',
          price: 100,
          currency: 'BDT',
          interval: 'monthly',
          intervalCount: 1.5,
        }),
      ).toThrow(ApplicationValidationError);
    });

    it('should throw on intervalCount < 1', () => {
      expect(() =>
        SubscriptionValidator.validateCreate({
          plan: 'premium',
          price: 100,
          currency: 'BDT',
          interval: 'monthly',
          intervalCount: 0,
        }),
      ).toThrow(ApplicationValidationError);
    });
  });
});
