/**
 * CartStatusVO unit tests — state machine
 */
import { describe, it, expect } from '@jest/globals';
import { CartStatusVO } from '@domain/value-objects/primitives/cart-status.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

describe('CartStatusVO', () => {
  describe('create()', () => {
    it.each([
      'active', 'inactive', 'abandoned', 'converted', 'expired', 'merged', 'cleared',
    ])('should accept "%s"', (status) => {
      expect(CartStatusVO.create(status).value).toBe(status);
    });

    it('should normalize case', () => {
      expect(CartStatusVO.create('ACTIVE').value).toBe('active');
      expect(CartStatusVO.create('  Active  ').value).toBe('active');
    });

    it('should throw on invalid status', () => {
      expect(() => CartStatusVO.create('bogus')).toThrow(ValidationError);
      expect(() => CartStatusVO.create('bogus')).toThrow(/Invalid CartStatus/);
    });
  });

  describe('factory methods', () => {
    it('active() returns active status', () => {
      expect(CartStatusVO.active().value).toBe('active');
    });
    it('abandoned() returns abandoned', () => {
      expect(CartStatusVO.abandoned().value).toBe('abandoned');
    });
    it('converted() returns converted', () => {
      expect(CartStatusVO.converted().value).toBe('converted');
    });
    it('cleared() returns cleared', () => {
      expect(CartStatusVO.cleared().value).toBe('cleared');
    });
  });

  describe('predicates', () => {
    it('isActiveStatus() true only for active', () => {
      expect(CartStatusVO.active().isActiveStatus()).toBe(true);
      expect(CartStatusVO.abandoned().isActiveStatus()).toBe(false);
    });

    it('isFinal() true for converted/expired/merged/cleared', () => {
      expect(CartStatusVO.converted().isFinal()).toBe(true);
      expect(CartStatusVO.create('expired').isFinal()).toBe(true);
      expect(CartStatusVO.create('merged').isFinal()).toBe(true);
      expect(CartStatusVO.cleared().isFinal()).toBe(true);
      expect(CartStatusVO.active().isFinal()).toBe(false);
      expect(CartStatusVO.abandoned().isFinal()).toBe(false);
    });

    it('isModifiable() true for active/inactive/abandoned', () => {
      expect(CartStatusVO.active().isModifiable()).toBe(true);
      expect(CartStatusVO.create('inactive').isModifiable()).toBe(true);
      expect(CartStatusVO.abandoned().isModifiable()).toBe(true);
      expect(CartStatusVO.converted().isModifiable()).toBe(false);
    });
  });

  describe('state machine transitions', () => {
    it('active → inactive allowed', () => {
      expect(CartStatusVO.active().canTransitionTo('inactive')).toBe(true);
    });

    it('active → abandoned allowed', () => {
      expect(CartStatusVO.active().canTransitionTo('abandoned')).toBe(true);
    });

    it('active → converted allowed', () => {
      expect(CartStatusVO.active().canTransitionTo('converted')).toBe(true);
    });

    it('converted → * forbidden', () => {
      expect(CartStatusVO.converted().canTransitionTo('active')).toBe(false);
      expect(CartStatusVO.converted().canTransitionTo('cleared')).toBe(true);
    });

    it('cleared → * forbidden', () => {
      expect(CartStatusVO.cleared().canTransitionTo('active')).toBe(false);
    });

    it('expired → cleared allowed', () => {
      expect(CartStatusVO.create('expired').canTransitionTo('cleared')).toBe(true);
    });
  });

  describe('reconstitute()', () => {
    it('should skip validation', () => {
      const vo = CartStatusVO.reconstitute('active');
      expect(vo.value).toBe('active');
    });
  });
});
