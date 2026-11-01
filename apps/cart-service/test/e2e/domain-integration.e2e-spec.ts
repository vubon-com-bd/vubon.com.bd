/**
 * E2E — Domain Integration
 * Tests cross-entity orchestration within domain layer.
 */
import { describe, it, expect } from '@jest/globals';
import { CartEntity } from '@domain/entities/cart.entity.js';
import { CartItemEntity } from '@domain/entities/cart-item.entity.js';
import { CartIdVO } from '@domain/value-objects/primitives/cart-id.vo.js';
import { CartTypeVO } from '@domain/value-objects/primitives/cart-type.vo.js';
import { UserIdVO } from '@domain/value-objects/primitives/user-id.vo.js';
import { CartItemIdVO } from '@domain/value-objects/primitives/cart-item-id.vo.js';
import { CartItemQuantityVO } from '@domain/value-objects/primitives/cart-item-quantity.vo.js';
import { ProductIdVO } from '@domain/value-objects/primitives/product-id.vo.js';
import { CartCalculationService } from '@domain/services/cart-calculation.service.js';
import { CouponValidationService } from '@domain/services/coupon-validation.service.js';
import { CanCheckoutSpecification } from '@domain/specifications/can-checkout.specification.js';
import { CartEligibilityService } from '@domain/services/cart-eligibility.service.js';
import { CartMergeService } from '@domain/services/cart-merge.service.js';
import { MergeStrategyVO } from '@domain/value-objects/primitives/merge-strategy.vo.js';
import {
  makeE2EUserCart,
  makeE2EGuestCart,
  makeE2EItem,
  E2E_IDS,
  E2E_DATES,
  E2E_CURRENCY,
} from './setup/e2e-fixtures';

describe('E2E — Domain Integration: Full cart lifecycle', () => {
  it('creates cart → adds item → calculates → checks out', () => {
    // 1. Create cart
    const cart = makeE2EUserCart();
    expect(cart.isActive()).toBe(true);
    expect(cart.isEmpty()).toBe(true);

    // 2. Add item
    const item = makeE2EItem({ quantity: 2, unitPrice: 100 });
    cart.applyItemCountDelta(1, E2E_DATES.NOW);

    // 3. Calculate totals
    const totals = CartCalculationService.calculate({
      items: [item],
      discountAmount: 0,
      taxRate: 15,
      shippingCost: 50,
    });

    expect(totals.subtotal).toBe(200);
    expect(totals.tax).toBe(30);
    expect(totals.total).toBe(280);

    // 4. Update cart
    cart.updateTotals(
      {
        subtotal: totals.subtotal,
        discount: totals.discount,
        tax: totals.tax,
        shipping: totals.shipping,
      },
      E2E_DATES.NOW,
    );

    expect(cart.total).toBe(280);

    // 5. Checkout eligibility
    const spec = new CanCheckoutSpecification();
    expect(spec.isSatisfiedBy({ cart, items: [item] })).toBe(true);
    expect(CartEligibilityService.isEligibleForCheckout(cart, [item])).toBe(true);

    // 6. Convert
    cart.convert('ORDER-001', E2E_DATES.NOW);
    expect(cart.isConverted()).toBe(true);
  });

  it('guest cart merge lifecycle: guest → user cart', () => {
    const userCart = makeE2EUserCart();
    const guestCart = makeE2EGuestCart();
    guestCart.applyItemCountDelta(2, E2E_DATES.NOW);

    const existingUserItem = CartItemEntity.create({
      id: CartItemIdVO.create(E2E_IDS.ITEM),
      props: {
        cartId: CartIdVO.create(E2E_IDS.CART),
        productId: ProductIdVO.create(E2E_IDS.PRODUCT),
        quantity: CartItemQuantityVO.create(2),
        unitPrice: 100,
        currency: E2E_CURRENCY,
      },
      now: E2E_DATES.NOW,
    });

    const guestItem = CartItemEntity.create({
      id: CartItemIdVO.create(E2E_IDS.ITEM_2),
      props: {
        cartId: CartIdVO.create(E2E_IDS.CART_2),
        productId: ProductIdVO.create(E2E_IDS.PRODUCT),
        quantity: CartItemQuantityVO.create(3),
        unitPrice: 100,
        currency: E2E_CURRENCY,
      },
      now: E2E_DATES.NOW,
    });

    // Merge
    const merge = CartMergeService.plan(
      [existingUserItem],
      [guestItem],
      MergeStrategyVO.sumQuantity(),
    );

    expect(merge.itemsMerged).toBe(1);
    expect(merge.mergedItems[0].resolvedQuantity).toBe(5);
    expect(merge.conflicts).toBe(0);
  });

  it('coupon application lifecycle: valid → invalid → expired', () => {
    // valid: no meta → returns lookup-required
    const r1 = CouponValidationService.validate({
      code: 'SAVE20',
      subtotal: 200,
      currency: E2E_CURRENCY,
      alreadyApplied: [],
    });
    expect(r1.valid).toBe(true);

    // invalid: empty cart
    const r2 = CouponValidationService.validate({
      code: 'SAVE20',
      subtotal: 0,
      currency: E2E_CURRENCY,
      alreadyApplied: [],
    });
    expect(r2.valid).toBe(false);

    // invalid: bad format
    const r3 = CouponValidationService.validate({
      code: '###',
      subtotal: 200,
      currency: E2E_CURRENCY,
      alreadyApplied: [],
    });
    expect(r3.valid).toBe(false);
  });

  it('cart state machine: active → abandoned → recovered', () => {
    const cart = makeE2EUserCart();
    cart.applyItemCountDelta(1, E2E_DATES.NOW);
    cart.abandon(E2E_DATES.NOW);
    expect(cart.isAbandoned()).toBe(true);

    cart.activate(E2E_DATES.NOW);
    expect(cart.isActive()).toBe(true);
  });

  it('cart cannot checkout if expired', () => {
    const expired = CartEntity.reconstitute({
      id: E2E_IDS.CART,
      createdAt: E2E_DATES.NOW,
      updatedAt: E2E_DATES.NOW,
      status: 'active',
      props: {
        type: CartTypeVO.user(),
        userId: UserIdVO.create(E2E_IDS.USER),
        currency: E2E_CURRENCY,
        itemCount: 1,
        subtotal: 100,
        discountAmount: 0,
        taxAmount: 0,
        shippingAmount: 0,
        total: 100,
        expiresAt: new Date(Date.now() - 86400000).toISOString(),
        lastActivityAt: E2E_DATES.NOW,
      },
    });

    const item = makeE2EItem();
    const spec = new CanCheckoutSpecification();
    expect(spec.isSatisfiedBy({ cart: expired, items: [item] })).toBe(false);
  });
});
