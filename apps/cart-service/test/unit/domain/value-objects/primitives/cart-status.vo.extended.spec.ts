/**
 * CartStatusVO extended — cover remaining branches
 */
import { describe, it, expect } from '@jest/globals';
import { CartStatusVO } from '@domain/value-objects/primitives/cart-status.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

describe('CartStatusVO — extended', () => {
  it('create() throws on non-string', () => {
    expect(() => CartStatusVO.create(123 as never)).toThrow(ValidationError);
  });

  it('reconstitute()', () => {
    expect(CartStatusVO.reconstitute('inactive').value).toBe('inactive');
  });

  it('isInactive()', () => {
    expect(CartStatusVO.create('inactive').isInactive()).toBe(true);
  });

  it('isMerged()', () => {
    expect(CartStatusVO.create('merged').isMerged()).toBe(true);
  });

  it('isCleared()', () => {
    expect(CartStatusVO.cleared().isCleared()).toBe(true);
  });

  it('inactive → active transition', () => {
    expect(CartStatusVO.create('inactive').canTransitionTo('active')).toBe(true);
  });
});
