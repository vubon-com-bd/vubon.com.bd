import { describe, it, expect } from '@jest/globals';
import { AbandonedCartMapper } from '../../../../src/module/application/mappers/abandoned-cart.mapper.js';
import { AbandonedCartEntity } from '../../../../src/module/domain/entities/abandoned-cart.entity.js';
import { AbandonedCartIdVO } from '../../../../src/module/domain/value-objects/primitives/abandoned-cart-id.vo.js';
import { CartIdVO } from '../../../../src/module/domain/value-objects/primitives/cart-id.vo.js';
import { UserIdVO } from '../../../../src/module/domain/value-objects/primitives/user-id.vo.js';

const ABANDONED_ID = '123e4567-e89b-12d3-a456-426614174000';
const CART_ID = '223e4567-e89b-12d3-a456-426614174000';
const USER_ID = '323e4567-e89b-12d3-a456-426614174000';
const NOW = '2024-01-15T10:00:00.000Z';

function makeAbandoned(): AbandonedCartEntity {
  return AbandonedCartEntity.create({
    id: AbandonedCartIdVO.create(ABANDONED_ID),
    now: NOW,
    props: {
      cartId: CartIdVO.create(CART_ID),
      userId: UserIdVO.create(USER_ID),
      itemCount: 3,
      cartValue: 1500,
      currency: 'BDT',
      abandonedAt: NOW,
      remindersSent: 0,
    },
  });
}

describe('AbandonedCartMapper', () => {
  describe('toResponse', () => {
    it('should map all fields correctly', () => {
      const entity = makeAbandoned();
      const dto = AbandonedCartMapper.toResponse(entity);

      expect(dto.id).toBe(ABANDONED_ID);
      expect(dto.cartId).toBe(CART_ID);
      expect(dto.userId).toBe(USER_ID);
      expect(dto.status).toBe('pending');
      expect(dto.itemCount).toBe(3);
      expect(dto.cartValue).toBe(1500);
      expect(dto.currency).toBe('BDT');
      expect(dto.abandonedAt).toBe(NOW);
      expect(dto.remindersSent).toBe(0);
    });

    it('should handle entity without user', () => {
      const entity = AbandonedCartEntity.create({
        id: AbandonedCartIdVO.create(ABANDONED_ID),
        now: NOW,
        props: {
          cartId: CartIdVO.create(CART_ID),
          itemCount: 2,
          cartValue: 500,
          currency: 'BDT',
          abandonedAt: NOW,
          remindersSent: 0,
        },
      });
      const dto = AbandonedCartMapper.toResponse(entity);
      expect(dto.userId).toBeUndefined();
    });

    it('should include recovery fields when recovered', () => {
      const entity = makeAbandoned();
      const recoveredAt = new Date().toISOString();
      entity.recover('order-abc', recoveredAt);
      const dto = AbandonedCartMapper.toResponse(entity);
      expect(dto.status).toBe('recovered');
      expect(dto.recoveredAt).toBe(recoveredAt);
      expect(dto.recoveredOrderId).toBe('order-abc');
    });
  });

  describe('toPublicResponse', () => {
    it('should produce customer-safe response without PII', () => {
      const entity = makeAbandoned();
      const dto = AbandonedCartMapper.toPublicResponse(entity);

      expect(dto.id).toBe(ABANDONED_ID);
      expect(dto.status).toBe('pending');
      expect(dto.itemCount).toBe(3);
      expect(dto.cartValue).toBe(1500);
      expect((dto as Record<string, unknown>).cartId).toBeUndefined();
      expect((dto as Record<string, unknown>).userId).toBeUndefined();
      expect((dto as Record<string, unknown>).email).toBeUndefined();
    });
  });
});
