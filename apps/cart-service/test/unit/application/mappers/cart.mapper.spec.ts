import { describe, it, expect } from '@jest/globals';
import { CartMapper } from '../../../../src/module/application/mappers/cart.mapper.js';
import { CartEntity } from '../../../../src/module/domain/entities/cart.entity.js';
import { CartIdVO } from '../../../../src/module/domain/value-objects/primitives/cart-id.vo.js';
import { CartTypeVO } from '../../../../src/module/domain/value-objects/primitives/cart-type.vo.js';
import { UserIdVO } from '../../../../src/module/domain/value-objects/primitives/user-id.vo.js';

const CART_ID = '123e4567-e89b-12d3-a456-426614174000';
const USER_ID = '223e4567-e89b-12d3-a456-426614174000';
const NOW = '2024-01-15T10:00:00.000Z';

function makeCart(): CartEntity {
  const entity = CartEntity.create({
    id: CartIdVO.create(CART_ID),
    now: NOW,
    props: {
      type: CartTypeVO.user(),
      userId: UserIdVO.create(USER_ID),
      currency: 'BDT',
      expiresAt: '2024-02-15T10:00:00.000Z',
    },
  });
  return entity;
}

describe('CartMapper', () => {
  describe('toResponse', () => {
    it('should map all fields correctly', () => {
      const entity = makeCart();
      const dto = CartMapper.toResponse(entity);

      expect(dto.id).toBe(CART_ID);
      expect(dto.userId).toBe(USER_ID);
      expect(dto.type).toBe('user');
      expect(dto.status).toBe('active');
      expect(dto.itemCount).toBe(0);
      expect(dto.subtotal).toBe(0);
      expect(dto.discountAmount).toBe(0);
      expect(dto.taxAmount).toBe(0);
      expect(dto.shippingAmount).toBe(0);
      expect(dto.total).toBe(0);
      expect(dto.currency).toBe('BDT');
      expect(dto.createdAt).toBe(NOW);
      expect(dto.updatedAt).toBe(NOW);
    });

    it('should handle cart without user (guest)', () => {
      const entity = CartEntity.create({
        id: CartIdVO.create(CART_ID),
        now: NOW,
        props: {
          type: CartTypeVO.guest(),
          currency: 'USD',
          expiresAt: '2024-01-22T10:00:00.000Z',
        },
      });
      const dto = CartMapper.toResponse(entity);

      expect(dto.userId).toBeUndefined();
      expect(dto.type).toBe('guest');
      expect(dto.currency).toBe('USD');
    });

    it('should include notes when present', () => {
      const entity = CartEntity.create({
        id: CartIdVO.create(CART_ID),
        now: NOW,
        props: {
          type: CartTypeVO.user(),
          currency: 'BDT',
          notes: 'urgent delivery',
          expiresAt: '2024-02-15T10:00:00.000Z',
        },
      });
      const dto = CartMapper.toResponse(entity);
      expect(dto.notes).toBe('urgent delivery');
    });
  });

  describe('toPublicResponse', () => {
    it('should produce customer-safe DTO without userId', () => {
      const entity = makeCart();
      const dto = CartMapper.toPublicResponse(entity);

      expect(dto.id).toBe(CART_ID);
      expect(dto.type).toBe('user');
      expect(dto.status).toBe('active');
      expect(dto.currency).toBe('BDT');
      expect((dto as Record<string, unknown>).userId).toBeUndefined();
    });
  });

  describe('toSummary', () => {
    it('should produce minimal summary DTO', () => {
      const entity = makeCart();
      const dto = CartMapper.toSummary(entity);

      expect(dto.id).toBe(CART_ID);
      expect(dto.itemCount).toBe(0);
      expect(dto.total).toBe(0);
      expect(dto.currency).toBe('BDT');
    });
  });

  describe('toListResponse', () => {
    it('should map array of entities with pagination', () => {
      const e1 = makeCart();
      const e2 = makeCart();
      const dto = CartMapper.toListResponse([e1, e2], 2, 1, 10);

      expect(dto.items).toHaveLength(2);
      expect(dto.total).toBe(2);
      expect(dto.page).toBe(1);
      expect(dto.limit).toBe(10);
      expect(dto.totalPages).toBe(1);
    });

    it('should calculate totalPages correctly', () => {
      const e1 = makeCart();
      const dto = CartMapper.toListResponse([e1], 25, 1, 10);
      expect(dto.totalPages).toBe(3);
    });

    it('should handle empty list', () => {
      const dto = CartMapper.toListResponse([], 0, 1, 10);
      expect(dto.items).toHaveLength(0);
      expect(dto.totalPages).toBe(0);
    });
  });

  describe('toDetail', () => {
    it('should produce detail DTO with empty items', () => {
      const entity = makeCart();
      const dto = CartMapper.toDetail(entity, []);
      expect(dto.cart.id).toBe(CART_ID);
      expect(dto.items).toHaveLength(0);
    });
  });
});
