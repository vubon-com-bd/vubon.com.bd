import { jest } from '@jest/globals';
void jest;

import { AbandonedCartMapper } from '../../../../src/module/application/mappers/abandoned-cart.mapper.js';
import { AbandonedCartEntity } from '../../../../src/module/domain/entities/abandoned-cart.entity.js';
import { AbandonedCartStatusVO } from '../../../../src/module/domain/value-objects/primitives/abandoned-cart-status.vo.js';
import { AbandonedCartReminderVO } from '../../../../src/module/domain/value-objects/primitives/abandoned-cart-reminder.vo.js';
import { CartIdVO } from '../../../../src/module/domain/value-objects/primitives/cart-id.vo.js';
import { ABANDONED_CART_STATUS, ABANDONED_CART_REMINDER } from '@vubon/shared-constants/business/cart';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';
const NOW = '2026-01-01T00:00:00Z';

function makeEntity() {
  return AbandonedCartEntity.create({
    id: UUID,
    now: NOW,
    props: {
      cartId: CartIdVO.create(UUID),
      status: AbandonedCartStatusVO.create(ABANDONED_CART_STATUS.PENDING),
      reminderType: AbandonedCartReminderVO.create(ABANDONED_CART_REMINDER.EMAIL),
      itemCount: 3,
      cartValue: 500,
      currency: 'BDT',
      abandonedAt: NOW,
      remindersSent: 0,
    },
  });
}

describe('AbandonedCartMapper', () => {
  it('maps all fields', () => {
    const r = AbandonedCartMapper.toResponse(makeEntity());
    expect(r.id).toBe(UUID);
    expect(r.cartId).toBe(UUID);
    expect(r.itemCount).toBe(3);
    expect(r.cartValue).toBe(500);
    expect(r.currency).toBe('BDT');
    expect(r.reminderType).toBe(ABANDONED_CART_REMINDER.EMAIL);
    expect(r.status).toBe(ABANDONED_CART_STATUS.PENDING);
    expect(r.remindersSent).toBe(0);
  });

  it('includes optional fields when present', () => {
    const e = makeEntity();
    e.recover('order-1', 500, NOW);
    const r = AbandonedCartMapper.toResponse(e);
    expect(r.status).toBe(ABANDONED_CART_STATUS.RECOVERED);
    expect(r.recoveredOrderId).toBe('order-1');
  });
});
