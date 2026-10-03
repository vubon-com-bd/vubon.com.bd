/**
 * SavedForLaterEntity — Unit Tests
 */
import { SavedForLaterEntity } from '../../../../src/module/domain/entities/saved-for-later.entity.js';
import { CartUserIdVO } from '../../../../src/module/domain/value-objects/primitives/user-id.vo.js';
import { CartProductIdVO } from '../../../../src/module/domain/value-objects/primitives/product-id.vo.js';
import { SavedItemStatusVO } from '../../../../src/module/domain/value-objects/primitives/saved-item-status.vo.js';
import { SAVED_ITEM_STATUS } from '@vubon/shared-constants/business/cart';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';
const NOW = '2026-01-01T00:00:00Z';

function makeProps(overrides = {}) {
  return {
    userId: CartUserIdVO.create(UUID),
    productId: CartProductIdVO.create(UUID),
    quantity: 2,
    status: SavedItemStatusVO.create(SAVED_ITEM_STATUS.ACTIVE),
    ...overrides,
  };
}

describe('SavedForLaterEntity', () => {
  it('creates entity and emits ItemSavedForLaterEvent', () => {
    const e = SavedForLaterEntity.create({ id: UUID, props: makeProps() as never, now: NOW });
    expect(e.quantity).toBe(2);
    expect(e.domainEvents.some((ev) => ev.type === 'saved.item.saved')).toBe(true);
  });

  it('throws on zero quantity', () => {
    expect(() =>
      SavedForLaterEntity.create({ id: UUID, props: makeProps({ quantity: 0 }) as never, now: NOW }),
    ).toThrow();
  });

  it('canMoveToCart() true for active', () => {
    const e = SavedForLaterEntity.create({ id: UUID, props: makeProps() as never, now: NOW });
    expect(e.canMoveToCart()).toBe(true);
  });

  it('moveToCart() changes status + emits event', () => {
    const e = SavedForLaterEntity.create({ id: UUID, props: makeProps() as never, now: NOW });
    e.moveToCart(UUID, NOW);
    expect(e.status.value).toBe(SAVED_ITEM_STATUS.MOVED_TO_CART);
    expect(e.domainEvents.some((ev) => ev.type === 'saved.item.moved.to.cart')).toBe(true);
  });

  it('moveToCart() throws when not active', () => {
    const e = SavedForLaterEntity.create({
      id: UUID,
      props: makeProps({ status: SavedItemStatusVO.create(SAVED_ITEM_STATUS.MOVED_TO_CART) }) as never,
      now: NOW,
    });
    expect(() => e.moveToCart(UUID, NOW)).toThrow();
  });

  it('changeQuantity() updates quantity', () => {
    const e = SavedForLaterEntity.create({ id: UUID, props: makeProps() as never, now: NOW });
    e.changeQuantity(5, NOW);
    expect(e.quantity).toBe(5);
  });
});
