/**
 * SavedItemStatusVO extended tests
 */
import { describe, it, expect } from '@jest/globals';
import { SavedItemStatusVO } from '@domain/value-objects/primitives/saved-item-status.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

describe('SavedItemStatusVO — extended', () => {
  it.each(['active', 'moved_to_cart', 'removed', 'out_of_stock', 'unavailable'])(
    'accepts %s',
    (s) => expect(SavedItemStatusVO.create(s).value).toBe(s),
  );

  it('throws on invalid', () => {
    expect(() => SavedItemStatusVO.create('bogus')).toThrow(ValidationError);
  });

  it('active() factory', () => {
    expect(SavedItemStatusVO.active().value).toBe('active');
  });

  it('all predicates', () => {
    expect(SavedItemStatusVO.active().isActiveStatus()).toBe(true);
    expect(SavedItemStatusVO.create('moved_to_cart').isMovedToCart()).toBe(true);
    expect(SavedItemStatusVO.create('removed').isRemoved()).toBe(true);
    expect(SavedItemStatusVO.create('out_of_stock').isOutOfStock()).toBe(true);
    expect(SavedItemStatusVO.create('unavailable').isUnavailable()).toBe(true);
  });

  it('isFinal() for removed', () => {
    expect(SavedItemStatusVO.create('removed').isFinal()).toBe(true);
    expect(SavedItemStatusVO.active().isFinal()).toBe(false);
  });

  it('canMoveToCart()', () => {
    expect(SavedItemStatusVO.active().canMoveToCart()).toBe(true);
    expect(SavedItemStatusVO.create('removed').canMoveToCart()).toBe(false);
  });

  it('reconstitute()', () => {
    expect(SavedItemStatusVO.reconstitute('active').value).toBe('active');
  });
});
