/**
 * AbandonedCartEntity — Unit Tests
 */
import { AbandonedCartEntity } from '../../../../src/module/domain/entities/abandoned-cart.entity.js';
import { AbandonedCartStatusVO } from '../../../../src/module/domain/value-objects/primitives/abandoned-cart-status.vo.js';
import { AbandonedCartReminderVO } from '../../../../src/module/domain/value-objects/primitives/abandoned-cart-reminder.vo.js';
import { CartIdVO } from '../../../../src/module/domain/value-objects/primitives/cart-id.vo.js';
import {
  ABANDONED_CART,
  ABANDONED_CART_STATUS,
  ABANDONED_CART_REMINDER,
} from '@vubon/shared-constants/business/cart';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';
const NOW = '2026-01-01T00:00:00Z';

function makeProps(overrides = {}) {
  return {
    cartId: CartIdVO.create(UUID),
    status: AbandonedCartStatusVO.create(ABANDONED_CART_STATUS.PENDING),
    reminderType: AbandonedCartReminderVO.create(ABANDONED_CART_REMINDER.EMAIL),
    itemCount: 2,
    cartValue: 500,
    currency: 'BDT',
    abandonedAt: NOW,
    remindersSent: 0,
    ...overrides,
  };
}

describe('AbandonedCartEntity', () => {
  it('creates entity and emits AbandonedCartDetectedEvent', () => {
    const e = AbandonedCartEntity.create({ id: UUID, props: makeProps() as never, now: NOW });
    expect(e.itemCount).toBe(2);
    expect(e.domainEvents.some((ev) => ev.type === 'abandoned.cart.detected')).toBe(true);
  });

  it('throws on zero itemCount', () => {
    expect(() =>
      AbandonedCartEntity.create({
        id: UUID,
        props: makeProps({ itemCount: 0 }) as never,
        now: NOW,
      }),
    ).toThrow();
  });

  it('throws on zero cartValue', () => {
    expect(() =>
      AbandonedCartEntity.create({
        id: UUID,
        props: makeProps({ cartValue: 0 }) as never,
        now: NOW,
      }),
    ).toThrow();
  });

  it('canSendAnotherReminder() true for pending with reminders left', () => {
    const e = AbandonedCartEntity.create({ id: UUID, props: makeProps() as never, now: NOW });
    expect(e.canSendAnotherReminder()).toBe(true);
  });

  it('sendReminder() increments count + changes status + emits event', () => {
    const e = AbandonedCartEntity.create({ id: UUID, props: makeProps() as never, now: NOW });
    const n = e.sendReminder('email', NOW);
    expect(n).toBe(1);
    expect(e.remindersSent).toBe(1);
    expect(e.status.value).toBe(ABANDONED_CART_STATUS.REMINDED);
    expect(e.domainEvents.some((ev) => ev.type === 'abandoned.cart.reminder.sent')).toBe(true);
  });

  it('sendReminder() throws when max reminders reached', () => {
    const e = AbandonedCartEntity.create({
      id: UUID,
      props: makeProps({ remindersSent: ABANDONED_CART.MAX_REMINDERS }) as never,
      now: NOW,
    });
    expect(() => e.sendReminder('email', NOW)).toThrow();
  });

  it('recover() changes status to RECOVERED + emits event', () => {
    const e = AbandonedCartEntity.create({ id: UUID, props: makeProps() as never, now: NOW });
    e.recover('order-1', 500, NOW);
    expect(e.status.isRecovered()).toBe(true);
    expect(e.recoveredOrderId).toBe('order-1');
    expect(e.domainEvents.some((ev) => ev.type === 'abandoned.cart.recovered')).toBe(true);
  });

  it('recover() throws when in final state', () => {
    const e = AbandonedCartEntity.create({
      id: UUID,
      props: makeProps({ status: AbandonedCartStatusVO.create(ABANDONED_CART_STATUS.LOST) }) as never,
      now: NOW,
    });
    expect(() => e.recover('order-1', 500, NOW)).toThrow();
  });

  it('markLost() changes status to LOST', () => {
    const e = AbandonedCartEntity.create({ id: UUID, props: makeProps() as never, now: NOW });
    e.markLost('expired', NOW);
    expect(e.status.isLost()).toBe(true);
  });

  it('unsubscribe() changes status to UNSUBSCRIBED', () => {
    const e = AbandonedCartEntity.create({ id: UUID, props: makeProps() as never, now: NOW });
    e.unsubscribe(NOW);
    expect(e.status.isUnsubscribed()).toBe(true);
  });
});
