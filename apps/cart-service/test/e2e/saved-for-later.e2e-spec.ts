/**
 * E2E — Saved for later + move to cart
 */
import { describe, it, expect, beforeEach } from '@jest/globals';
import { SavedForLaterEntity } from '@domain/entities/saved-for-later.entity.js';
import { SavedItemIdVO } from '@domain/value-objects/primitives/saved-item-id.vo.js';
import { UserIdVO } from '@domain/value-objects/primitives/user-id.vo.js';
import { ProductIdVO } from '@domain/value-objects/primitives/product-id.vo.js';
import { CanSaveForLaterSpecification } from '@domain/specifications/can-save-for-later.specification.js';
import { e2eDb } from './setup/e2e-database';
import { makeE2EUserCart, makeE2EItem, E2E_IDS, E2E_DATES } from './setup/e2e-fixtures';

describe('E2E — Saved for later', () => {
  beforeEach(() => e2eDb.reset());

  function makeSaved() {
    return SavedForLaterEntity.create({
      id: SavedItemIdVO.create('aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa'),
      props: {
        userId: UserIdVO.create(E2E_IDS.USER),
        productId: ProductIdVO.create(E2E_IDS.PRODUCT),
        savedAt: E2E_DATES.NOW,
      },
      now: E2E_DATES.NOW,
    });
  }

  it('create + save in db', () => {
    const s = makeSaved();
    e2eDb.saved.add(s);
    expect(e2eDb.saved.size).toBe(1);
    expect(s.isActive()).toBe(true);
  });

  it('updateNote flow', () => {
    const s = makeSaved();
    s.updateNote('Buy later', E2E_DATES.NOW);
    expect(s.note).toBe('Buy later');
  });

  it('moveToCart flow', () => {
    const s = makeSaved();
    s.moveToCart(E2E_DATES.NOW);
    expect(s.isMovedToCart()).toBe(true);
  });

  it('remove flow', () => {
    const s = makeSaved();
    s.remove(E2E_DATES.NOW);
    expect(s.isRemoved()).toBe(true);
  });

  it('CanSaveForLaterSpecification — accept', () => {
    const cart = makeE2EUserCart();
    const item = makeE2EItem();
    const spec = new CanSaveForLaterSpecification();
    expect(spec.isSatisfiedBy({ cart, item, alreadySaved: false })).toBe(true);
  });

  it('CanSaveForLaterSpecification — reject already saved', () => {
    const cart = makeE2EUserCart();
    const item = makeE2EItem();
    const spec = new CanSaveForLaterSpecification();
    expect(spec.isSatisfiedBy({ cart, item, alreadySaved: true })).toBe(false);
  });

  it('moveToCart twice throws', () => {
    const s = makeSaved();
    s.moveToCart(E2E_DATES.NOW);
    expect(() => s.moveToCart(E2E_DATES.NOW)).toThrow();
  });
});
