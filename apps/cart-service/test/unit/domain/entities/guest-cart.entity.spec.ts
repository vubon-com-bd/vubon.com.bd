/**
 * GuestCartEntity — Unit Tests
 */
import { GuestCartEntity } from '../../../../src/module/domain/entities/guest-cart.entity.js';
import { GuestCartStatusVO } from '../../../../src/module/domain/value-objects/primitives/guest-cart-status.vo.js';
import { GuestTokenVO } from '../../../../src/module/domain/value-objects/primitives/guest-token.vo.js';
import { GUEST_CART_STATUS } from '@vubon/shared-constants/business/cart';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';
const TOKEN = 'a'.repeat(32);
const NOW = '2026-01-01T00:00:00Z';
const FUTURE = '2099-12-31T23:59:59Z';

function makeProps(overrides = {}) {
  return {
    token: GuestTokenVO.create(TOKEN),
    status: GuestCartStatusVO.create(GUEST_CART_STATUS.ACTIVE),
    itemCount: 2,
    expiresAt: FUTURE,
    ...overrides,
  };
}

describe('GuestCartEntity', () => {
  it('creates entity and emits GuestCartCreatedEvent', () => {
    const e = GuestCartEntity.create({ id: UUID, props: makeProps() as never, now: NOW });
    expect(e.itemCount).toBe(2);
    expect(e.domainEvents.some((ev) => ev.type === 'guest.cart.created')).toBe(true);
  });

  it('throws on negative itemCount', () => {
    expect(() =>
      GuestCartEntity.create({ id: UUID, props: makeProps({ itemCount: -1 }) as never, now: NOW }),
    ).toThrow();
  });

  it('isExpired() true after expiresAt', () => {
    const e = GuestCartEntity.create({ id: UUID, props: makeProps() as never, now: NOW });
    expect(e.isExpired(new Date('2100-01-01T00:00:00Z'))).toBe(true);
  });

  it('canBeMerged() true for active + not expired', () => {
    const e = GuestCartEntity.create({ id: UUID, props: makeProps() as never, now: NOW });
    expect(e.canBeMerged()).toBe(true);
  });

  it('updateItemCount() updates itemCount', () => {
    const e = GuestCartEntity.create({ id: UUID, props: makeProps() as never, now: NOW });
    e.updateItemCount(5, NOW);
    expect(e.itemCount).toBe(5);
  });

  it('markMerged() changes status + emits event', () => {
    const e = GuestCartEntity.create({ id: UUID, props: makeProps() as never, now: NOW });
    e.markMerged(UUID, 'user-1', 2, NOW);
    expect(e.status.isMerged()).toBe(true);
    expect(e.mergedIntoCartId).toBe(UUID);
    expect(e.domainEvents.some((ev) => ev.type === 'guest.cart.merged')).toBe(true);
  });

  it('markMerged() throws when not mergeable', () => {
    const e = GuestCartEntity.create({
      id: UUID,
      props: makeProps({ status: GuestCartStatusVO.create(GUEST_CART_STATUS.MERGED) }) as never,
      now: NOW,
    });
    expect(() => e.markMerged(UUID, 'user-1', 2, NOW)).toThrow();
  });

  it('expire() changes status to EXPIRED', () => {
    const e = GuestCartEntity.create({ id: UUID, props: makeProps() as never, now: NOW });
    e.expire(NOW);
    expect(e.status.isExpired()).toBe(true);
  });
});
