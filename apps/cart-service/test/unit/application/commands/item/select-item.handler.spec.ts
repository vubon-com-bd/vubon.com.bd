import { jest } from '@jest/globals';

/**
 * SelectItemHandler — Unit Tests
 * Uses direct CartRepository (not service)
 */
import { SelectItemHandler } from '../../../../../src/module/application/commands/item/select-item.handler.js';
import { SelectItemCommand } from '../../../../../src/module/application/commands/item/select-item.command.js';
import { CartEntity } from '../../../../../src/module/domain/entities/cart.entity.js';
import { CartItemEntity } from '../../../../../src/module/domain/entities/cart-item.entity.js';
import { CartStatusVO } from '../../../../../src/module/domain/value-objects/primitives/cart-status.vo.js';
import { CartTypeVO } from '../../../../../src/module/domain/value-objects/primitives/cart-type.vo.js';
import { CartUserIdVO } from '../../../../../src/module/domain/value-objects/primitives/user-id.vo.js';
import { CartItemQuantityVO } from '../../../../../src/module/domain/value-objects/primitives/cart-item-quantity.vo.js';
import { CartItemStatusVO } from '../../../../../src/module/domain/value-objects/primitives/cart-item-status.vo.js';
import { CartProductIdVO } from '../../../../../src/module/domain/value-objects/primitives/product-id.vo.js';
import type { CartRepository } from '../../../../../src/module/domain/repositories/cart.repository.interface.js';
import { CART_STATUS, CART_TYPE, CART_ITEM_STATUS } from '@vubon/shared-constants/business/cart';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';
const ITEM_UUID = '11111111-1111-1111-1111-111111111111';
const USER = '00000000-0000-0000-0000-000000000001';
const NOW = '2026-01-01T00:00:00Z';
const FUTURE = '2099-12-31T23:59:59Z';

function makeRepo(): jest.Mocked<CartRepository> {
  return {
    findById: jest.fn(), findByIdVO: jest.fn(), findAll: jest.fn(),
    save: jest.fn(async (c) => c), delete: jest.fn(), exists: jest.fn(),
    findByUserId: jest.fn(), findBySessionId: jest.fn(), findActiveByUserId: jest.fn(),
    findAllByUserId: jest.fn(), findExpired: jest.fn(), findInactive: jest.fn(),
    findPaginated: jest.fn(), countByUserId: jest.fn(), softDelete: jest.fn(),
  };
}

function makeCart() {
  const item = CartItemEntity.create({
    id: ITEM_UUID,
    now: NOW,
    props: {
      productId: CartProductIdVO.create(UUID),
      sku: 'SKU',
      name: 'Item',
      unitPrice: 100,
      quantity: CartItemQuantityVO.create(2),
      discountAmount: 0,
      status: CartItemStatusVO.create(CART_ITEM_STATUS.ACTIVE),
      isAvailable: true,
      currency: 'BDT',
    },
  });
  const c = CartEntity.create({
    id: UUID,
    now: NOW,
    props: {
      type: CartTypeVO.create(CART_TYPE.USER),
      status: CartStatusVO.create(CART_STATUS.ACTIVE),
      userId: CartUserIdVO.create(USER),
      currency: 'BDT',
      expiresAt: FUTURE,
      lastActivityAt: NOW,
    },
  });
  c['_items'] = [item];
  return c;
}

describe('SelectItemHandler', () => {
  it('updates cart item selection', async () => {
    const repo = makeRepo();
    const handler = new SelectItemHandler(repo);
    repo.findById.mockResolvedValue(makeCart());
    const cmd = new SelectItemCommand({ cartId: UUID, itemId: ITEM_UUID, selected: false });
    const r = await handler.execute(cmd);
    expect(r.id).toBe(UUID);
    expect(r.items[0].isSelected).toBe(false);
    expect(repo.save).toHaveBeenCalled();
  });

  it('throws when cart not found', async () => {
    const repo = makeRepo();
    const handler = new SelectItemHandler(repo);
    repo.findById.mockResolvedValue(null);
    await expect(
      handler.execute(new SelectItemCommand({ cartId: 'x', itemId: ITEM_UUID, selected: true })),
    ).rejects.toThrow();
  });
});
