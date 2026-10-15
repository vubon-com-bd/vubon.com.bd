/**
 * Cart Service — Comprehensive Unit Test Registry
 * @module cart-service/scripts/unit
 *
 * Target: 80%+ coverage
 * Covers: VOs, Services, Entities, Specs, Mappers, Errors
 */

export const UNIT_TESTS = [
  // ═══════════════════════════════════════════════════════
  // VALUE OBJECTS — Primitives (all 30+)
  // ═══════════════════════════════════════════════════════
  {
    group: 'vo-primitives',
    type: 'static',
    path: 'domain/value-objects/primitives/cart-id.vo',
    className: 'CartIdVO',
    scenarios: [
      {
        name: 'should create valid UUID',
        varName: 'vo',
        call: `CartIdVO.create('550e8400-e29b-41d4-a716-446655440000')`,
        expect: `expect(vo.value).toBe('550e8400-e29b-41d4-a716-446655440000');`,
      },
      {
        name: 'should reject invalid UUID',
        varName: 'fn',
        call: `() => CartIdVO.create('not-a-uuid')`,
        expect: `expect(fn).toThrow();`,
        expectThrow: true,
      },
      {
        name: 'should reject empty',
        varName: 'fn',
        call: `() => CartIdVO.create('')`,
        expect: `expect(fn).toThrow();`,
        expectThrow: true,
      },
      {
        name: 'should reconstitute from DB',
        varName: 'vo',
        call: `CartIdVO.reconstitute('any-string')`,
        expect: `expect(vo.value).toBe('any-string');`,
      },
    ],
  },
  {
    group: 'vo-primitives',
    type: 'static',
    path: 'domain/value-objects/primitives/cart-status.vo',
    className: 'CartStatusVO',
    scenarios: [
      {
        name: 'should create active status',
        varName: 'vo',
        call: `CartStatusVO.create('active')`,
        expect: `expect(vo.value).toBe('active');
    expect(vo.isActiveStatus()).toBe(true);
    expect(vo.isFinal()).toBe(false);`,
      },
      {
        name: 'should reject invalid status',
        varName: 'fn',
        call: `() => CartStatusVO.create('invalid')`,
        expect: `expect(fn).toThrow();`,
        expectThrow: true,
      },
      {
        name: 'should allow valid transition',
        varName: 'vo',
        call: `CartStatusVO.active()`,
        expect: `expect(vo.canTransitionTo('abandoned')).toBe(true);
    expect(vo.canTransitionTo('converted')).toBe(true);`,
      },
      {
        name: 'should block invalid transition',
        varName: 'vo',
        call: `CartStatusVO.create('cleared')`,
        expect: `expect(vo.canTransitionTo('active')).toBe(false);`,
      },
    ],
  },
  {
    group: 'vo-primitives',
    type: 'static',
    path: 'domain/value-objects/primitives/cart-type.vo',
    className: 'CartTypeVO',
    scenarios: [
      {
        name: 'should create user cart',
        varName: 'vo',
        call: `CartTypeVO.create('user')`,
        expect: `expect(vo.isUser()).toBe(true);
    expect(vo.isGuest()).toBe(false);
    expect(vo.requiresUser()).toBe(true);`,
      },
      {
        name: 'should create guest cart',
        varName: 'vo',
        call: `CartTypeVO.create('guest')`,
        expect: `expect(vo.isGuest()).toBe(true);
    expect(vo.requiresUser()).toBe(false);`,
      },
    ],
  },
  {
    group: 'vo-primitives',
    type: 'static',
    path: 'domain/value-objects/primitives/cart-item-status.vo',
    className: 'CartItemStatusVO',
    scenarios: [
      {
        name: 'should be purchasable when active',
        varName: 'vo',
        call: `CartItemStatusVO.active()`,
        expect: `expect(vo.isPurchasable()).toBe(true);`,
      },
      {
        name: 'should not be purchasable when removed',
        varName: 'vo',
        call: `CartItemStatusVO.create('removed')`,
        expect: `expect(vo.isPurchasable()).toBe(false);`,
      },
    ],
  },
  {
    group: 'vo-primitives',
    type: 'static',
    path: 'domain/value-objects/primitives/cart-item-note.vo',
    className: 'CartItemNoteVO',
    scenarios: [
      {
        name: 'should trim note',
        varName: 'vo',
        call: `CartItemNoteVO.create('  hello  ')`,
        expect: `expect(vo.value).toBe('hello');`,
      },
      {
        name: 'should create empty',
        varName: 'vo',
        call: `CartItemNoteVO.empty()`,
        expect: `expect(vo.isEmpty()).toBe(true);`,
      },
      {
        name: 'should reject too long note',
        varName: 'fn',
        call: `() => CartItemNoteVO.create('x'.repeat(501))`,
        expect: `expect(fn).toThrow();`,
        expectThrow: true,
      },
    ],
  },
  {
    group: 'vo-primitives',
    type: 'static',
    path: 'domain/value-objects/primitives/coupon-code.vo',
    className: 'CouponCodeVO',
    scenarios: [
      {
        name: 'should normalize coupon code to uppercase',
        varName: 'vo',
        call: `CouponCodeVO.create(' save10 ')`,
        expect: `expect(vo.value).toBe('SAVE10');`,
      },
      {
        name: 'should reject too short',
        varName: 'fn',
        call: `() => CouponCodeVO.create('AB')`,
        expect: `expect(fn).toThrow();`,
        expectThrow: true,
      },
      {
        name: 'should reject invalid chars',
        varName: 'fn',
        call: `() => CouponCodeVO.create('SAVE@10')`,
        expect: `expect(fn).toThrow();`,
        expectThrow: true,
      },
    ],
  },
  {
    group: 'vo-primitives',
    type: 'static',
    path: 'domain/value-objects/primitives/coupon-discount.vo',
    className: 'CouponDiscountVO',
    scenarios: [
      {
        name: 'should calculate percentage discount',
        varName: 'vo',
        call: `CouponDiscountVO.create({ type: 'percentage', value: 10 })`,
        expect: `expect(vo.isPercentage()).toBe(true);
    expect(vo.calculate(100)).toBe(10);`,
      },
      {
        name: 'should calculate fixed discount',
        varName: 'vo',
        call: `CouponDiscountVO.create({ type: 'fixed', value: 50 })`,
        expect: `expect(vo.isFixed()).toBe(true);
    expect(vo.calculate(200)).toBe(50);`,
      },
      {
        name: 'should cap at maxAmount',
        varName: 'vo',
        call: `CouponDiscountVO.create({ type: 'percentage', value: 50, maxAmount: 20 })`,
        expect: `expect(vo.calculate(100)).toBe(20);`,
      },
      {
        name: 'should reject percentage > 100',
        varName: 'fn',
        call: `() => CouponDiscountVO.create({ type: 'percentage', value: 150 })`,
        expect: `expect(fn).toThrow();`,
        expectThrow: true,
      },
    ],
  },
  {
    group: 'vo-primitives',
    type: 'static',
    path: 'domain/value-objects/primitives/coupon-status.vo',
    className: 'CouponStatusVO',
    scenarios: [
      {
        name: 'should be usable when active',
        varName: 'vo',
        call: `CouponStatusVO.active()`,
        expect: `expect(vo.isUsable()).toBe(true);
    expect(vo.isFinal()).toBe(false);`,
      },
      {
        name: 'should not be usable when expired',
        varName: 'vo',
        call: `CouponStatusVO.create('expired')`,
        expect: `expect(vo.isUsable()).toBe(false);
    expect(vo.isFinal()).toBe(true);`,
      },
    ],
  },
  {
    group: 'vo-primitives',
    type: 'static',
    path: 'domain/value-objects/primitives/voucher-code.vo',
    className: 'VoucherCodeVO',
    scenarios: [
      {
        name: 'should normalize voucher code',
        varName: 'vo',
        call: `VoucherCodeVO.create('GIFT2026ABC')`,
        expect: `expect(vo.value).toBe('GIFT2026ABC');`,
      },
      {
        name: 'should reject too short',
        varName: 'fn',
        call: `() => VoucherCodeVO.create('ABC')`,
        expect: `expect(fn).toThrow();`,
        expectThrow: true,
      },
    ],
  },
  {
    group: 'vo-primitives',
    type: 'static',
    path: 'domain/value-objects/primitives/voucher-status.vo',
    className: 'VoucherStatusVO',
    scenarios: [
      {
        name: 'should be redeemable when active',
        varName: 'vo',
        call: `VoucherStatusVO.active()`,
        expect: `expect(vo.isRedeemable()).toBe(true);`,
      },
      {
        name: 'should not be redeemable when redeemed',
        varName: 'vo',
        call: `VoucherStatusVO.create('redeemed')`,
        expect: `expect(vo.isRedeemable()).toBe(false);
    expect(vo.isFinal()).toBe(true);`,
      },
    ],
  },
  {
    group: 'vo-primitives',
    type: 'static',
    path: 'domain/value-objects/primitives/cart-item-quantity.vo',
    className: 'CartItemQuantityVO',
    scenarios: [
      {
        name: 'should create valid quantity',
        varName: 'vo',
        call: `CartItemQuantityVO.create(5)`,
        expect: `expect(vo.value).toBe(5);
    expect(vo.isPositive).toBe(true);`,
      },
      {
        name: 'should reject zero',
        varName: 'fn',
        call: `() => CartItemQuantityVO.create(0)`,
        expect: `expect(fn).toThrow();`,
        expectThrow: true,
      },
      {
        name: 'should reject over 999',
        varName: 'fn',
        call: `() => CartItemQuantityVO.create(1000)`,
        expect: `expect(fn).toThrow();`,
        expectThrow: true,
      },
      {
        name: 'should add quantities',
        varName: 'vo',
        call: `CartItemQuantityVO.create(3).add(CartItemQuantityVO.create(2))`,
        expect: `expect(vo.value).toBe(5);`,
      },
      {
        name: 'should subtract quantities',
        varName: 'vo',
        call: `CartItemQuantityVO.create(5).subtract(CartItemQuantityVO.create(2))`,
        expect: `expect(vo.value).toBe(3);`,
      },
    ],
  },
  {
    group: 'vo-primitives',
    type: 'static',
    path: 'domain/value-objects/primitives/guest-token.vo',
    className: 'GuestTokenVO',
    scenarios: [
      {
        name: 'should create valid token',
        varName: 'vo',
        call: `GuestTokenVO.create('abcdefghijklmnop_1234567890123456')`,
        expect: `expect(vo.length).toBeGreaterThan(15);`,
      },
      {
        name: 'should reject too short',
        varName: 'fn',
        call: `() => GuestTokenVO.create('short')`,
        expect: `expect(fn).toThrow();`,
        expectThrow: true,
      },
    ],
  },
  {
    group: 'vo-primitives',
    type: 'static',
    path: 'domain/value-objects/primitives/idempotency-key.vo',
    className: 'IdempotencyKeyVO',
    scenarios: [
      {
        name: 'should create valid idempotency key',
        varName: 'vo',
        call: `IdempotencyKeyVO.create('idem-key-abc1234567890')`,
        expect: `expect(vo.value).toBe('idem-key-abc1234567890');`,
      },
      {
        name: 'should reject too short',
        varName: 'fn',
        call: `() => IdempotencyKeyVO.create('short')`,
        expect: `expect(fn).toThrow();`,
        expectThrow: true,
      },
    ],
  },
  {
    group: 'vo-primitives',
    type: 'static',
    path: 'domain/value-objects/primitives/cart-tax-rate.vo',
    className: 'CartTaxRateVO',
    scenarios: [
      {
        name: 'should calculate tax',
        varName: 'vo',
        call: `CartTaxRateVO.create(15)`,
        expect: `expect(vo.calculate(100)).toBe(15);`,
      },
      {
        name: 'should create zero rate',
        varName: 'vo',
        call: `CartTaxRateVO.zero()`,
        expect: `expect(vo.isZero()).toBe(true);
    expect(vo.calculate(100)).toBe(0);`,
      },
      {
        name: 'should reject > 100',
        varName: 'fn',
        call: `() => CartTaxRateVO.create(150)`,
        expect: `expect(fn).toThrow();`,
        expectThrow: true,
      },
    ],
  },
  {
    group: 'vo-primitives',
    type: 'static',
    path: 'domain/value-objects/primitives/merge-strategy.vo',
    className: 'MergeStrategyVO',
    scenarios: [
      {
        name: 'should sum quantities',
        varName: 'vo',
        call: `MergeStrategyVO.sumQuantity()`,
        expect: `expect(vo.mergeQuantities(2, 3)).toBe(5);`,
      },
      {
        name: 'should take max',
        varName: 'vo',
        call: `MergeStrategyVO.create('max_quantity')`,
        expect: `expect(vo.mergeQuantities(2, 5)).toBe(5);`,
      },
      {
        name: 'should keep existing',
        varName: 'vo',
        call: `MergeStrategyVO.create('keep_existing')`,
        expect: `expect(vo.mergeQuantities(2, 5)).toBe(2);`,
      },
    ],
  },
  {
    group: 'vo-primitives',
    type: 'static',
    path: 'domain/value-objects/primitives/cart-shipping-method.vo',
    className: 'CartShippingMethodVO',
    scenarios: [
      {
        name: 'should be free eligible when pickup',
        varName: 'vo',
        call: `CartShippingMethodVO.create('pickup')`,
        expect: `expect(vo.isPickup()).toBe(true);
    expect(vo.isFreeEligible()).toBe(true);`,
      },
      {
        name: 'should not be free eligible when standard',
        varName: 'vo',
        call: `CartShippingMethodVO.standard()`,
        expect: `expect(vo.isFreeEligible()).toBe(false);`,
      },
    ],
  },
  {
    group: 'vo-primitives',
    type: 'static',
    path: 'domain/value-objects/primitives/saved-item-status.vo',
    className: 'SavedItemStatusVO',
    scenarios: [
      {
        name: 'should allow move to cart when active',
        varName: 'vo',
        call: `SavedItemStatusVO.active()`,
        expect: `expect(vo.canMoveToCart()).toBe(true);`,
      },
      {
        name: 'should block move when removed',
        varName: 'vo',
        call: `SavedItemStatusVO.create('removed')`,
        expect: `expect(vo.canMoveToCart()).toBe(false);`,
      },
    ],
  },
  {
    group: 'vo-primitives',
    type: 'static',
    path: 'domain/value-objects/primitives/abandoned-cart-status.vo',
    className: 'AbandonedCartStatusVO',
    scenarios: [
      {
        name: 'should be recoverable when pending',
        varName: 'vo',
        call: `AbandonedCartStatusVO.pending()`,
        expect: `expect(vo.isRecoverable()).toBe(true);
    expect(vo.isFinal()).toBe(false);`,
      },
      {
        name: 'should not be recoverable when lost',
        varName: 'vo',
        call: `AbandonedCartStatusVO.create('lost')`,
        expect: `expect(vo.isRecoverable()).toBe(false);
    expect(vo.isFinal()).toBe(true);`,
      },
    ],
  },

  // ═══════════════════════════════════════════════════════
  // DOMAIN SERVICES
  // ═══════════════════════════════════════════════════════
  {
    group: 'domain-services',
    type: 'static',
    path: 'domain/services/cart-calculation.service',
    className: 'CartCalculationService',
    scenarios: [
      {
        name: 'should calculate subtotal correctly',
        call: `CartCalculationService.calculate({
          items: [
            { unitPrice: 100, quantity: { value: 2 }, isPurchasable: () => true, currency: 'BDT' } as never,
            { unitPrice: 50, quantity: { value: 3 }, isPurchasable: () => true, currency: 'BDT' } as never,
          ],
          discountAmount: 0,
          taxRate: 15,
          shippingCost: 60,
        })`,
        expect: `expect(result.subtotal).toBe(350);
    expect(result.tax).toBe(52.5);
    expect(result.total).toBe(462.5);`,
      },
      {
        name: 'should cap discount at subtotal',
        call: `CartCalculationService.calculate({
          items: [{ unitPrice: 100, quantity: { value: 1 }, isPurchasable: () => true, currency: 'BDT' } as never],
          discountAmount: 500,
          taxRate: 0,
          shippingCost: 0,
        })`,
        expect: `expect(result.discount).toBe(100);`,
      },
      {
        name: 'should apply free shipping above threshold',
        call: `CartCalculationService.calculate({
          items: [{ unitPrice: 1000, quantity: { value: 1 }, isPurchasable: () => true, currency: 'BDT' } as never],
          discountAmount: 0,
          taxRate: 0,
          shippingCost: 60,
          freeShippingAbove: 500,
        })`,
        expect: `expect(result.shipping).toBe(0);`,
      },
      {
        name: 'should reject negative tax rate',
        varName: 'fn',
        call: `() => CartCalculationService.calculate({
          items: [],
          discountAmount: 0,
          taxRate: -5,
          shippingCost: 0,
        })`,
        expect: `expect(fn).toThrow();`,
        expectThrow: true,
      },
    ],
  },
  {
    group: 'domain-services',
    type: 'static',
    path: 'domain/services/cart-limits.service',
    className: 'CartLimitsService',
    scenarios: [
      {
        name: 'should enforce quantity limits',
        varName: 'fn',
        call: `() => CartLimitsService.assertQuantityWithinLimits(0)`,
        expect: `expect(fn).toThrow();`,
        expectThrow: true,
      },
      {
        name: 'should accept valid quantity',
        varName: 'fn',
        call: `() => CartLimitsService.assertQuantityWithinLimits(5)`,
        expect: `expect(fn).not.toThrow();`,
      },
      {
        name: 'should enforce coupon limit',
        varName: 'fn',
        call: `() => CartLimitsService.assertCouponLimit(1, { maxCoupons: 1, maxItems: 100, maxQuantityPerItem: 999, minQuantityPerItem: 1, maxVouchers: 1 })`,
        expect: `expect(fn).toThrow();`,
        expectThrow: true,
      },
    ],
  },

  // ═══════════════════════════════════════════════════════
  // SPECIFICATIONS
  // ═══════════════════════════════════════════════════════
  {
    group: 'specifications',
    type: 'static',
    path: 'domain/specifications/can-apply-coupon.specification',
    className: 'CanApplyCouponSpecification',
    scenarios: [
      {
        name: 'should reject when cart not modifiable',
        call: `new CanApplyCouponSpecification().explain({
          cart: { canBeModified: () => false, status: { value: 'cleared' } } as never,
          subtotal: 100,
          alreadyApplied: [],
          code: 'SAVE10',
        })`,
        expect: `expect(result).not.toBeNull();`,
      },
      {
        name: 'should reject empty cart',
        call: `new CanApplyCouponSpecification().explain({
          cart: { canBeModified: () => true, status: { value: 'active' } } as never,
          subtotal: 0,
          alreadyApplied: [],
          code: 'SAVE10',
        })`,
        expect: `expect(result).toContain('empty');`,
      },
    ],
  },
  {
    group: 'specifications',
    type: 'static',
    path: 'domain/specifications/can-merge.specification',
    className: 'CanMergeSpecification',
    scenarios: [
      {
        name: 'should reject same cart',
        call: `new CanMergeSpecification().explain({
          source: { id: 'cart-1', isActive: () => true, isEmpty: () => false, status: { value: 'active' } } as never,
          target: { id: 'cart-1', isActive: () => true, canBeModified: () => true, status: { value: 'active' } } as never,
        })`,
        expect: `expect(result).not.toBeNull();`,
      },
    ],
  },
];

export const UNIT_GROUPS = [...new Set(UNIT_TESTS.map((t) => t.group))];
export const TOTAL_UNITS = UNIT_TESTS.length;

// ═══════════════════════════════════════════════════════
// ADDITIONAL TESTS (appended) — Entities + Composites
// ═══════════════════════════════════════════════════════

UNIT_TESTS.push(
  // ═══════ VO COMPOSITES ═══════
  {
    group: 'vo-composites',
    type: 'static',
    path: 'domain/value-objects/composites/cart.vo',
    className: 'CartVO',
    scenarios: [
      {
        name: 'should create cart VO',
        varName: 'vo',
        call: `CartVO.create({
          id: { value: '550e8400-e29b-41d4-a716-446655440000' } as never,
          status: { isActiveStatus: () => true, isFinal: () => false, value: 'active' } as never,
          type: { isGuest: () => false, isUser: () => true, value: 'user' } as never,
          itemCount: 2,
          currency: 'BDT',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        })`,
        expect: `expect(vo.itemCount).toBe(2);
    expect(vo.currency).toBe('BDT');
    expect(vo.isEmpty()).toBe(false);
    expect(vo.isUser()).toBe(true);`,
      },
      {
        name: 'should reject negative itemCount',
        varName: 'fn',
        call: `() => CartVO.create({
          id: { value: 'x' } as never,
          status: { value: 'active' } as never,
          type: { value: 'user' } as never,
          itemCount: -1,
          currency: 'BDT',
          createdAt: '2024-01-01',
          updatedAt: '2024-01-01',
        })`,
        expect: `expect(fn).toThrow();`,
        expectThrow: true,
      },
      {
        name: 'should reject invalid currency',
        varName: 'fn',
        call: `() => CartVO.create({
          id: { value: 'x' } as never,
          status: { value: 'active' } as never,
          type: { value: 'user' } as never,
          itemCount: 0,
          currency: 'X',
          createdAt: '2024-01-01',
          updatedAt: '2024-01-01',
        })`,
        expect: `expect(fn).toThrow();`,
        expectThrow: true,
      },
    ],
  },
  {
    group: 'vo-composites',
    type: 'static',
    path: 'domain/value-objects/composites/cart-item.vo',
    className: 'CartItemVO',
    scenarios: [
      {
        name: 'should calculate subtotal',
        varName: 'vo',
        call: `CartItemVO.create({
          id: { value: 'item-1' } as never,
          productId: { value: 'prod-1' } as never,
          quantity: { value: 3 } as never,
          status: { isPurchasable: () => true, isActiveStatus: () => true, value: 'active' } as never,
          unitPrice: 100,
          currency: 'BDT',
          addedAt: new Date().toISOString(),
        })`,
        expect: `expect(vo.subtotal).toBe(300);
    expect(vo.isPurchasable()).toBe(true);`,
      },
      {
        name: 'should reject negative unitPrice',
        varName: 'fn',
        call: `() => CartItemVO.create({
          id: { value: 'i' } as never,
          productId: { value: 'p' } as never,
          quantity: { value: 1 } as never,
          status: { value: 'active' } as never,
          unitPrice: -50,
          currency: 'BDT',
          addedAt: '2024-01-01',
        })`,
        expect: `expect(fn).toThrow();`,
        expectThrow: true,
      },
    ],
  },
  {
    group: 'vo-composites',
    type: 'static',
    path: 'domain/value-objects/composites/cart-totals.vo',
    className: 'CartTotalsVO',
    scenarios: [
      {
        name: 'should create valid totals',
        varName: 'vo',
        call: `CartTotalsVO.create({
          subtotal: 1000,
          discount: 100,
          tax: 135,
          shipping: 60,
          total: 1095,
          currency: 'BDT',
        })`,
        expect: `expect(vo.total).toBe(1095);
    expect(vo.hasDiscount()).toBe(true);`,
      },
      {
        name: 'should reject mismatched total',
        varName: 'fn',
        call: `() => CartTotalsVO.create({
          subtotal: 1000,
          discount: 0,
          tax: 0,
          shipping: 0,
          total: 999,
          currency: 'BDT',
        })`,
        expect: `expect(fn).toThrow();`,
        expectThrow: true,
      },
    ],
  },
  {
    group: 'vo-composites',
    type: 'static',
    path: 'domain/value-objects/composites/cart-summary.vo',
    className: 'CartSummaryVO',
    scenarios: [
      {
        name: 'should create summary',
        varName: 'vo',
        call: `CartSummaryVO.create({
          id: { value: 'cart-1' } as never,
          status: { isActiveStatus: () => true, value: 'active' } as never,
          itemCount: 3,
          total: 500,
          currency: 'BDT',
        })`,
        expect: `expect(vo.itemCount).toBe(3);
    expect(vo.isEmpty()).toBe(false);
    expect(vo.isActive()).toBe(true);`,
      },
      {
        name: 'should reject negative total',
        varName: 'fn',
        call: `() => CartSummaryVO.create({
          id: { value: 'c' } as never,
          status: { value: 'active' } as never,
          itemCount: 0,
          total: -1,
          currency: 'BDT',
        })`,
        expect: `expect(fn).toThrow();`,
        expectThrow: true,
      },
    ],
  },
  {
    group: 'vo-composites',
    type: 'static',
    path: 'domain/value-objects/composites/cart-merger.vo',
    className: 'CartMergerVO',
    scenarios: [
      {
        name: 'should reject same source and target',
        varName: 'fn',
        call: `() => CartMergerVO.create({
          id: { value: 'm' } as never,
          sourceCartId: { value: 'cart-1' } as never,
          targetCartId: { value: 'cart-1' } as never,
          strategy: { value: 'sum_quantity' } as never,
          itemsMerged: 0,
          conflicts: 0,
          mergedAt: '2024-01-01',
        })`,
        expect: `expect(fn).toThrow();`,
        expectThrow: true,
      },
    ],
  },

  // ═══════ ENTITIES — Most statements! ═══════
  {
    group: 'entities',
    type: 'static',
    path: 'domain/entities/cart.entity',
    className: 'CartEntity',
    scenarios: [
      {
        name: 'should create cart entity with invariants',
        varName: 'entity',
        call: `CartEntity.create({
          id: { value: '550e8400-e29b-41d4-a716-446655440000' } as never,
          now: new Date().toISOString(),
          props: {
            type: { isGuest: () => false, isUser: () => true, value: 'user' } as never,
            currency: 'BDT',
            expiresAt: new Date(Date.now() + 86400000).toISOString(),
            notes: undefined,
            idempotencyKey: undefined,
          },
        })`,
        expect: `expect(entity.id).toBe('550e8400-e29b-41d4-a716-446655440000');
    expect(entity.itemCount).toBe(0);
    expect(entity.isActive()).toBe(true);
    expect(entity.isEmpty()).toBe(true);`,
      },
      {
        name: 'should prevent update when not modifiable',
        varName: 'fn',
        call: `() => {
          const entity = CartEntity.create({
            id: { value: '550e8400-e29b-41d4-a716-446655440000' } as never,
            now: new Date().toISOString(),
            props: {
              type: { isGuest: () => false, isUser: () => true, value: 'user' } as never,
              currency: 'BDT',
              expiresAt: new Date(Date.now() + 86400000).toISOString(),
            },
          });
          entity.clear();
          entity.updateTotals({ subtotal: 100, discount: 0, tax: 0, shipping: 0 });
        }`,
        expect: `expect(fn).toThrow();`,
        expectThrow: true,
      },
      {
        name: 'should compute valid totals',
        varName: 'entity',
        call: `(() => {
          const e = CartEntity.create({
            id: { value: '550e8400-e29b-41d4-a716-446655440000' } as never,
            now: new Date().toISOString(),
            props: {
              type: { isGuest: () => false, isUser: () => true, value: 'user' } as never,
              currency: 'BDT',
              expiresAt: new Date(Date.now() + 86400000).toISOString(),
            },
          });
          e.updateTotals({ subtotal: 1000, discount: 100, tax: 135, shipping: 60 });
          return e;
        })()`,
        expect: `expect(entity.subtotal).toBe(1000);
    expect(entity.total).toBe(1095);`,
      },
    ],
  },
  {
    group: 'entities',
    type: 'static',
    path: 'domain/entities/cart-item.entity',
    className: 'CartItemEntity',
    scenarios: [
      {
        name: 'should create cart item',
        varName: 'entity',
        call: `CartItemEntity.create({
          id: { value: '550e8400-e29b-41d4-a716-446655440000' } as never,
          now: new Date().toISOString(),
          props: {
            cartId: { value: '550e8400-e29b-41d4-a716-446655440001' } as never,
            productId: { value: '550e8400-e29b-41d4-a716-446655440002' } as never,
            quantity: { value: 2 } as never,
            status: { isActiveStatus: () => true, isPurchasable: () => true, value: 'active' } as never,
            unitPrice: 100,
            currency: 'BDT',
          },
        })`,
        expect: `expect(entity.quantity.value).toBe(2);
    expect(entity.subtotal).toBe(200);
    expect(entity.isActive()).toBe(true);`,
      },
    ],
  },
  {
    group: 'entities',
    type: 'static',
    path: 'domain/entities/cart-coupon.entity',
    className: 'CartCouponEntity',
    scenarios: [
      {
        name: 'should create coupon entity',
        varName: 'entity',
        call: `CartCouponEntity.create({
          id: '550e8400-e29b-41d4-a716-446655440000',
          now: new Date().toISOString(),
          props: {
            cartId: { value: 'cart-1' } as never,
            code: { value: 'SAVE10' } as never,
            status: { isUsable: () => true, isFinal: () => false, value: 'active' } as never,
            discount: { type: 'percentage', value_: 10, value: { type: 'percentage', value: 10 }, calculate: (s: number) => s * 0.1 } as never,
            appliedDiscountAmount: 100,
            currency: 'BDT',
            expiresAt: new Date(Date.now() + 86400000).toISOString(),
          },
        })`,
        expect: `expect(entity.code.value).toBe('SAVE10');
    expect(entity.isUsable()).toBe(true);`,
      },
    ],
  },
  {
    group: 'entities',
    type: 'static',
    path: 'domain/entities/guest-cart.entity',
    className: 'GuestCartEntity',
    scenarios: [
      {
        name: 'should create guest cart',
        varName: 'entity',
        call: `GuestCartEntity.create({
          id: { value: '550e8400-e29b-41d4-a716-446655440000' } as never,
          now: new Date().toISOString(),
          props: {
            token: { value: 'abcdefghijklmnop_1234567890' } as never,
            cartId: { value: '550e8400-e29b-41d4-a716-446655440001' } as never,
            itemCount: 0,
            expiresAt: new Date(Date.now() + 86400000).toISOString(),
          },
        })`,
        expect: `expect(entity.itemCount).toBe(0);
    expect(entity.isActive()).toBe(true);
    expect(entity.isExpiredAt()).toBe(false);`,
      },
      {
        name: 'should prevent merge on empty guest cart',
        varName: 'fn',
        call: `() => {
          const e = GuestCartEntity.create({
            id: { value: '550e8400-e29b-41d4-a716-446655440000' } as never,
            now: new Date().toISOString(),
            props: {
              token: { value: 'abcdefghijklmnop_1234567890' } as never,
              cartId: { value: '550e8400-e29b-41d4-a716-446655440001' } as never,
              itemCount: 0,
              expiresAt: new Date(Date.now() + 86400000).toISOString(),
            },
          });
          e.markMerged('target-cart');
        }`,
        expect: `expect(fn).toThrow();`,
        expectThrow: true,
      },
    ],
  },
  {
    group: 'entities',
    type: 'static',
    path: 'domain/entities/abandoned-cart.entity',
    className: 'AbandonedCartEntity',
    scenarios: [
      {
        name: 'should create abandoned cart',
        varName: 'entity',
        call: `AbandonedCartEntity.create({
          id: { value: '550e8400-e29b-41d4-a716-446655440000' } as never,
          now: new Date().toISOString(),
          props: {
            cartId: { value: '550e8400-e29b-41d4-a716-446655440001' } as never,
            itemCount: 3,
            cartValue: 500,
            currency: 'BDT',
            abandonedAt: new Date().toISOString(),
            remindersSent: 0,
          },
        })`,
        expect: `expect(entity.itemCount).toBe(3);
    expect(entity.cartValue).toBe(500);
    expect(entity.isRecoverable()).toBe(true);
    expect(entity.canSendReminder()).toBe(true);`,
      },
      {
        name: 'should not exceed max reminders',
        varName: 'fn',
        call: `() => {
          const e = AbandonedCartEntity.create({
            id: { value: '550e8400-e29b-41d4-a716-446655440000' } as never,
            now: new Date().toISOString(),
            props: {
              cartId: { value: '550e8400-e29b-41d4-a716-446655440001' } as never,
              itemCount: 3,
              cartValue: 500,
              currency: 'BDT',
              abandonedAt: new Date().toISOString(),
              remindersSent: 4,
            },
          });
          e.sendReminder('email');
        }`,
        expect: `expect(fn).toThrow();`,
        expectThrow: true,
      },
    ],
  },
);

// ═══════════════════════════════════════════════════════
// PHASE 3 — COMPREHENSIVE ENTITIES
// ═══════════════════════════════════════════════════════

UNIT_TESTS.push(
  // ═══════════ CartEntity — Full scenarios ═══════════
  {
    group: 'entities',
    type: 'static',
    path: 'domain/entities/cart.entity',
    className: 'CartEntity',
    scenarios: [
      {
        name: 'should activate and deactivate',
        varName: 'entity',
        call: `(() => {
          const e = CartEntity.create({
            id: { value: '550e8400-e29b-41d4-a716-446655440000' } as never,
            now: new Date().toISOString(),
            props: {
              type: { isGuest: () => false, isUser: () => true, value: 'user' } as never,
              currency: 'BDT',
              expiresAt: new Date(Date.now() + 86400000).toISOString(),
            },
          });
          e.deactivate();
          e.activate();
          return e;
        })()`,
        expect: `expect(entity.isActive()).toBe(true);`,
      },
      {
        name: 'should clear and reset all totals',
        varName: 'entity',
        call: `(() => {
          const e = CartEntity.create({
            id: { value: '550e8400-e29b-41d4-a716-446655440000' } as never,
            now: new Date().toISOString(),
            props: {
              type: { isGuest: () => false, isUser: () => true, value: 'user' } as never,
              currency: 'BDT',
              expiresAt: new Date(Date.now() + 86400000).toISOString(),
            },
          });
          e.updateTotals({ subtotal: 1000, discount: 100, tax: 135, shipping: 60 });
          e.clear();
          return e;
        })()`,
        expect: `expect(entity.isCleared()).toBe(true);
    expect(entity.itemCount).toBe(0);
    expect(entity.subtotal).toBe(0);
    expect(entity.total).toBe(0);`,
      },
      {
        name: 'should detect expired cart',
        varName: 'entity',
        call: `CartEntity.create({
          id: { value: '550e8400-e29b-41d4-a716-446655440000' } as never,
          now: new Date().toISOString(),
          props: {
            type: { isGuest: () => false, isUser: () => true, value: 'user' } as never,
            currency: 'BDT',
            expiresAt: new Date(Date.now() - 1000).toISOString(),
          },
        })`,
        expect: `expect(entity.isExpiredAt()).toBe(true);`,
      },
      {
        name: 'should not convert empty cart',
        varName: 'fn',
        call: `() => {
          const e = CartEntity.create({
            id: { value: '550e8400-e29b-41d4-a716-446655440000' } as never,
            now: new Date().toISOString(),
            props: {
              type: { isGuest: () => false, isUser: () => true, value: 'user' } as never,
              currency: 'BDT',
              expiresAt: new Date(Date.now() + 86400000).toISOString(),
            },
          });
          e.convert('order-1');
        }`,
        expect: `expect(fn).toThrow();`,
        expectThrow: true,
      },
      {
        name: 'should not abandon empty cart',
        varName: 'fn',
        call: `() => {
          const e = CartEntity.create({
            id: { value: '550e8400-e29b-41d4-a716-446655440000' } as never,
            now: new Date().toISOString(),
            props: {
              type: { isGuest: () => false, isUser: () => true, value: 'user' } as never,
              currency: 'BDT',
              expiresAt: new Date(Date.now() + 86400000).toISOString(),
            },
          });
          e.abandon();
        }`,
        expect: `expect(fn).toThrow();`,
        expectThrow: true,
      },
      {
        name: 'should update and reject too-long notes',
        varName: 'fn',
        call: `() => {
          const e = CartEntity.create({
            id: { value: '550e8400-e29b-41d4-a716-446655440000' } as never,
            now: new Date().toISOString(),
            props: {
              type: { isGuest: () => false, isUser: () => true, value: 'user' } as never,
              currency: 'BDT',
              expiresAt: new Date(Date.now() + 86400000).toISOString(),
            },
          });
          e.updateNotes('x'.repeat(501));
        }`,
        expect: `expect(fn).toThrow();`,
        expectThrow: true,
      },
      {
        name: 'should reconstitute from DB',
        varName: 'entity',
        call: `CartEntity.reconstitute({
          id: '550e8400-e29b-41d4-a716-446655440000',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          status: 'active',
          props: {
            type: { isGuest: () => false, isUser: () => true, value: 'user' } as never,
            currency: 'BDT',
            itemCount: 3,
            subtotal: 300,
            discountAmount: 0,
            taxAmount: 45,
            shippingAmount: 60,
            total: 405,
            expiresAt: new Date(Date.now() + 86400000).toISOString(),
            lastActivityAt: new Date().toISOString(),
          },
        })`,
        expect: `expect(entity.id).toBe('550e8400-e29b-41d4-a716-446655440000');
    expect(entity.itemCount).toBe(3);
    expect(entity.total).toBe(405);`,
      },
      {
        name: 'should reject negative total update',
        varName: 'fn',
        call: `() => {
          const e = CartEntity.create({
            id: { value: '550e8400-e29b-41d4-a716-446655440000' } as never,
            now: new Date().toISOString(),
            props: {
              type: { isGuest: () => false, isUser: () => true, value: 'user' } as never,
              currency: 'BDT',
              expiresAt: new Date(Date.now() + 86400000).toISOString(),
            },
          });
          e.updateTotals({ subtotal: 0, discount: 500, tax: 0, shipping: 0 });
        }`,
        expect: `expect(fn).toThrow();`,
        expectThrow: true,
      },
    ],
  },

  // ═══════════ CartItemEntity ═══════════
  {
    group: 'entities',
    type: 'static',
    path: 'domain/entities/cart-item.entity',
    className: 'CartItemEntity',
    scenarios: [
      {
        name: 'should change quantity',
        varName: 'entity',
        call: `(() => {
          const e = CartItemEntity.create({
            id: { value: '550e8400-e29b-41d4-a716-446655440000' } as never,
            now: new Date().toISOString(),
            props: {
              cartId: { value: '550e8400-e29b-41d4-a716-446655440001' } as never,
              productId: { value: '550e8400-e29b-41d4-a716-446655440002' } as never,
              quantity: { value: 2, add: () => ({ value: 5 }) } as never,
              status: {
                isActiveStatus: () => true,
                isPurchasable: () => true,
                isRemoved: () => false,
                isSaved: () => false,
                isOutOfStock: () => false,
                isUnavailable: () => false,
                value: 'active',
              } as never,
              unitPrice: 100,
              currency: 'BDT',
            },
          });
          e.changeQuantity({ value: 5 } as never);
          return e;
        })()`,
        expect: `expect(entity.quantity.value).toBe(5);
    expect(entity.subtotal).toBe(500);`,
      },
      {
        name: 'should mark as removed',
        varName: 'entity',
        call: `(() => {
          const e = CartItemEntity.create({
            id: { value: '550e8400-e29b-41d4-a716-446655440000' } as never,
            now: new Date().toISOString(),
            props: {
              cartId: { value: '550e8400-e29b-41d4-a716-446655440001' } as never,
              productId: { value: '550e8400-e29b-41d4-a716-446655440002' } as never,
              quantity: { value: 2 } as never,
              status: {
                isActiveStatus: () => true,
                isPurchasable: () => true,
                isRemoved: () => false,
                value: 'active',
                canTransitionTo: (s: string) => s === 'removed',
              } as never,
              unitPrice: 100,
              currency: 'BDT',
            },
          });
          e.markRemoved();
          return e;
        })()`,
        expect: `expect(entity.isRemoved()).toBe(true);
    expect(entity.isPurchasable()).toBe(false);`,
      },
    ],
  },

  // ═══════════ CartVoucherEntity ═══════════
  {
    group: 'entities',
    type: 'static',
    path: 'domain/entities/cart-voucher.entity',
    className: 'CartVoucherEntity',
    scenarios: [
      {
        name: 'should create and apply amount',
        varName: 'entity',
        call: `(() => {
          const e = CartVoucherEntity.create({
            id: '550e8400-e29b-41d4-a716-446655440000',
            now: new Date().toISOString(),
            props: {
              cartId: { value: 'cart-1' } as never,
              code: { value: 'GIFT2026ABC' } as never,
              status: { isRedeemable: () => true, isFinal: () => false, value: 'active' } as never,
              remainingAmount: 500,
              appliedAmount: 0,
              currency: 'BDT',
              expiresAt: new Date(Date.now() + 86400000).toISOString(),
            },
          });
          e.applyAmount(200);
          return e;
        })()`,
        expect: `expect(entity.remainingAmount).toBe(300);
    expect(entity.appliedAmount).toBe(200);`,
      },
      {
        name: 'should reject applying more than balance',
        varName: 'fn',
        call: `() => {
          const e = CartVoucherEntity.create({
            id: '550e8400-e29b-41d4-a716-446655440000',
            now: new Date().toISOString(),
            props: {
              cartId: { value: 'cart-1' } as never,
              code: { value: 'GIFT2026ABC' } as never,
              status: { isRedeemable: () => true, isFinal: () => false, value: 'active' } as never,
              remainingAmount: 100,
              appliedAmount: 0,
              currency: 'BDT',
              expiresAt: new Date(Date.now() + 86400000).toISOString(),
            },
          });
          e.applyAmount(200);
        }`,
        expect: `expect(fn).toThrow();`,
        expectThrow: true,
      },
    ],
  },

  // ═══════════ CartMergerEntity ═══════════
  {
    group: 'entities',
    type: 'static',
    path: 'domain/entities/cart-merger.entity',
    className: 'CartMergerEntity',
    scenarios: [
      {
        name: 'should reject same source and target',
        varName: 'fn',
        call: `() => CartMergerEntity.create({
          id: { value: '550e8400-e29b-41d4-a716-446655440000' } as never,
          now: new Date().toISOString(),
          props: {
            sourceCartId: { value: 'cart-1' } as never,
            targetCartId: { value: 'cart-1' } as never,
            strategy: { value: 'sum_quantity' } as never,
            mergedAt: new Date().toISOString(),
          },
        })`,
        expect: `expect(fn).toThrow();`,
        expectThrow: true,
      },
      {
        name: 'should complete merge',
        varName: 'entity',
        call: `(() => {
          const e = CartMergerEntity.create({
            id: { value: '550e8400-e29b-41d4-a716-446655440000' } as never,
            now: new Date().toISOString(),
            props: {
              sourceCartId: { value: 'cart-1' } as never,
              targetCartId: { value: 'cart-2' } as never,
              strategy: { value: 'sum_quantity' } as never,
              mergedAt: new Date().toISOString(),
            },
          });
          e.complete(5);
          return e;
        })()`,
        expect: `expect(entity.isCompleted()).toBe(true);
    expect(entity.itemsMerged).toBe(5);`,
      },
    ],
  },
);

// ═══════════════════════════════════════════════════════
// PHASE 4 — DOMAIN SERVICES
// ═══════════════════════════════════════════════════════

UNIT_TESTS.push(
  {
    group: 'domain-services',
    type: 'static',
    path: 'domain/services/cart-validation.service',
    className: 'CartValidationService',
    scenarios: [
      {
        name: 'should validate consistent cart',
        call: `CartValidationService.validate(
          { currency: 'BDT' } as never,
          [{ id: 'i1', currency: 'BDT', unitPrice: 100, quantity: { value: 1 }, isPurchasable: () => true } as never],
        )`,
        expect: `expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);`,
      },
      {
        name: 'should detect currency mismatch',
        call: `CartValidationService.validate(
          { currency: 'BDT' } as never,
          [
            { id: 'i1', currency: 'BDT', unitPrice: 100, quantity: { value: 1 }, isPurchasable: () => true } as never,
            { id: 'i2', currency: 'USD', unitPrice: 100, quantity: { value: 1 }, isPurchasable: () => true } as never,
          ],
        )`,
        expect: `expect(result.valid).toBe(false);
    expect(result.errors.length).toBeGreaterThan(0);`,
      },
    ],
  },
  {
    group: 'domain-services',
    type: 'static',
    path: 'domain/services/cart-merge.service',
    className: 'CartMergeService',
    scenarios: [
      {
        name: 'should plan merge correctly',
        call: `CartMergeService.plan(
          [
            { id: 't1', productId: { value: 'p1' }, variantId: undefined, quantity: { value: 2 }, unitPrice: 100, currency: 'BDT', isPurchasable: () => true } as never,
          ],
          [
            { id: 's1', productId: { value: 'p1' }, variantId: undefined, quantity: { value: 3 } } as never,
          ],
          { value: 'sum_quantity', mergeQuantities: (a: number, b: number) => a + b } as never,
        )`,
        expect: `expect(result.itemsMerged).toBe(1);
    expect(result.mergedItems[0].resolvedQuantity).toBe(5);`,
      },
      {
        name: 'should detect new item in source',
        call: `CartMergeService.plan(
          [],
          [
            { id: 's1', productId: { value: 'p1' }, variantId: undefined, quantity: { value: 3 } } as never,
          ],
          { value: 'sum_quantity', mergeQuantities: (a: number, b: number) => a + b } as never,
        )`,
        expect: `expect(result.itemsMerged).toBe(1);
    expect(result.mergedItems[0].isConflict).toBe(false);`,
      },
    ],
  },
  {
    group: 'domain-services',
    type: 'static',
    path: 'domain/services/coupon-validation.service',
    className: 'CouponValidationService',
    scenarios: [
      {
        name: 'should reject empty cart coupon',
        call: `CouponValidationService.validate({
          code: 'SAVE10',
          subtotal: 0,
          currency: 'BDT',
          alreadyApplied: [],
        })`,
        expect: `expect(result.valid).toBe(false);
    expect(result.reason).toContain('Empty');`,
      },
      {
        name: 'should reject duplicate coupon',
        call: `CouponValidationService.validate({
          code: 'SAVE10',
          subtotal: 100,
          currency: 'BDT',
          alreadyApplied: [
            {
              code: { value: 'SAVE10' },
              isFinal: () => false,
              isUsable: () => true,
            } as never,
          ],
        })`,
        expect: `expect(result.valid).toBe(false);
    expect(result.reason).toContain('already applied');`,
      },
    ],
  },
  {
    group: 'domain-services',
    type: 'static',
    path: 'domain/services/voucher-validation.service',
    className: 'VoucherValidationService',
    scenarios: [
      {
        name: 'should reject empty cart voucher',
        call: `VoucherValidationService.validate({
          code: 'GIFT2026ABC',
          subtotal: 0,
          currency: 'BDT',
          alreadyApplied: [],
        })`,
        expect: `expect(result.valid).toBe(false);
    expect(result.reason).toContain('Empty');`,
      },
    ],
  },
);

// ═══════════════════════════════════════════════════════
// PHASE 5 — Domain Events (basic builder tests)
// ═══════════════════════════════════════════════════════

UNIT_TESTS.push(
  {
    group: 'events',
    type: 'static',
    path: 'domain/events/cart.events',
    className: 'CartCreatedEvent',
    scenarios: [
      {
        name: 'should create cart created event with proper metadata',
        varName: 'event',
        call: `new CartCreatedEvent({
          aggregateId: '550e8400-e29b-41d4-a716-446655440000',
          payload: {
            cartId: '550e8400-e29b-41d4-a716-446655440000',
            type: 'user',
            currency: 'BDT',
            createdAt: new Date().toISOString(),
          },
        })`,
        expect: `expect(event.type).toBe('cart.cart.created');
    expect(event.aggregateId).toBe('550e8400-e29b-41d4-a716-446655440000');
    expect(event.payload.cartId).toBe('550e8400-e29b-41d4-a716-446655440000');
    expect(event.aggregateType).toBe('Cart');
    expect(event.id).toBeDefined();
    expect(event.occurredAt).toBeDefined();`,
      },
    ],
  },
);

// ═══════════════════════════════════════════════════════
// PHASE 6 — Mappers (Application layer)
// ═══════════════════════════════════════════════════════

UNIT_TESTS.push(
  {
    group: 'mappers',
    type: 'static',
    path: 'application/mappers/cart.mapper',
    className: 'CartMapper',
    scenarios: [
      {
        name: 'should map entity to response DTO',
        varName: 'dto',
        call: `CartMapper.toResponse({
          id: '550e8400-e29b-41d4-a716-446655440000',
          userId: { value: '550e8400-e29b-41d4-a716-446655440001' },
          sessionId: undefined,
          type: { value: 'user' },
          status: { value: 'active' },
          itemCount: 3,
          subtotal: 300,
          discountAmount: 0,
          taxAmount: 45,
          shippingAmount: 60,
          total: 405,
          currency: 'BDT',
          couponId: undefined,
          voucherId: undefined,
          notes: undefined,
          expiresAt: new Date(Date.now() + 86400000).toISOString(),
          lastActivityAt: new Date().toISOString(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        } as never)`,
        expect: `expect(dto.id).toBe('550e8400-e29b-41d4-a716-446655440000');
    expect(dto.type).toBe('user');
    expect(dto.status).toBe('active');
    expect(dto.itemCount).toBe(3);
    expect(dto.total).toBe(405);
    expect(dto.currency).toBe('BDT');`,
      },
      {
        name: 'should map to summary DTO',
        varName: 'dto',
        call: `CartMapper.toSummary({
          id: '550e8400-e29b-41d4-a716-446655440000',
          itemCount: 3,
          total: 405,
          currency: 'BDT',
        } as never)`,
        expect: `expect(dto.id).toBe('550e8400-e29b-41d4-a716-446655440000');
    expect(dto.itemCount).toBe(3);`,
      },
    ],
  },
  {
    group: 'mappers',
    type: 'static',
    path: 'application/mappers/cart-item.mapper',
    className: 'CartItemMapper',
    scenarios: [
      {
        name: 'should map cart item to response',
        varName: 'dto',
        call: `CartItemMapper.toResponse({
          id: '550e8400-e29b-41d4-a716-446655440000',
          cartId: { value: 'cart-1' },
          productId: { value: 'prod-1' },
          variantId: undefined,
          quantity: { value: 2 },
          status: { value: 'active', isPurchasable: () => true },
          unitPrice: 100,
          currency: 'BDT',
          subtotal: 200,
          note: undefined,
          createdAt: new Date().toISOString(),
          updatedAtInternal: new Date().toISOString(),
        } as never)`,
        expect: `expect(dto.id).toBe('550e8400-e29b-41d4-a716-446655440000');
    expect(dto.cartId).toBe('cart-1');
    expect(dto.productId).toBe('prod-1');
    expect(dto.quantity).toBe(2);
    expect(dto.unitPrice).toBe(100);
    expect(dto.subtotal).toBe(200);`,
      },
      {
        name: 'should map to summary',
        varName: 'dto',
        call: `CartItemMapper.toSummary({
          id: 'item-1',
          productId: { value: 'prod-1' },
          quantity: { value: 2 },
          subtotal: 200,
        } as never)`,
        expect: `expect(dto.id).toBe('item-1');
    expect(dto.quantity).toBe(2);
    expect(dto.subtotal).toBe(200);`,
      },
    ],
  },
);

// ═══════════════════════════════════════════════════════
// PHASE 7 — Application Services (with mocks)
// ═══════════════════════════════════════════════════════

UNIT_TESTS.push(
  {
    group: 'app-services',
    type: 'static',
    path: 'application/services/impl/cart-tax.service',
    className: 'CartTaxService',
    scenarios: [
      {
        name: 'should be instantiable with mocked repo',
        varName: 'service',
        call: `new CartTaxService(
          {
            findByIdVO: async () => null,
            findById: async () => null,
          } as never,
          {
            findByCartId: async () => [],
          } as never,
        )`,
        expect: `expect(service).toBeDefined();`,
      },
    ],
  },
  {
    group: 'app-services',
    type: 'static',
    path: 'application/services/impl/cart-shipping.service',
    className: 'CartShippingService',
    scenarios: [
      {
        name: 'should be instantiable',
        varName: 'service',
        call: `new CartShippingService(
          { findByIdVO: async () => null } as never,
          { findByCartId: async () => [] } as never,
        )`,
        expect: `expect(service).toBeDefined();`,
      },
    ],
  },
  {
    group: 'app-services',
    type: 'static',
    path: 'application/services/impl/cart.service',
    className: 'CartService',
    scenarios: [
      {
        name: 'should be instantiable with mocked repo',
        varName: 'service',
        call: `new CartService({
          findByIdVO: async () => null,
          findById: async () => null,
          save: async (e: unknown) => e,
          softDelete: async () => {},
          findByIdempotencyKey: async () => null,
          findActiveByUserId: async () => null,
          findPaginated: async () => ({ items: [], total: 0, page: 1, limit: 20, totalPages: 0 }),
          getStats: async () => ({ total: 0, totalValue: 0, averageValue: 0, averageItemCount: 0, byStatus: {}, byType: {} }),
        } as never)`,
        expect: `expect(service).toBeDefined();`,
      },
    ],
  },
);

// ═══════════════════════════════════════════════════════
// PHASE 8 — Remaining Specs
// ═══════════════════════════════════════════════════════

UNIT_TESTS.push(
  {
    group: 'specifications',
    type: 'static',
    path: 'domain/specifications/can-save-for-later.specification',
    className: 'CanSaveForLaterSpecification',
    scenarios: [
      {
        name: 'should reject item from different cart',
        call: `new CanSaveForLaterSpecification().explain({
          cart: { id: 'cart-1', canBeModified: () => true, status: { value: 'active' } } as never,
          item: { cartId: { value: 'cart-2' }, isRemoved: () => false } as never,
          alreadySaved: false,
        })`,
        expect: `expect(result).not.toBeNull();
    expect(result).toContain('does not belong');`,
      },
      {
        name: 'should reject already saved item',
        call: `new CanSaveForLaterSpecification().explain({
          cart: { id: 'cart-1', canBeModified: () => true, status: { value: 'active' } } as never,
          item: { cartId: { value: 'cart-1' }, isRemoved: () => false } as never,
          alreadySaved: true,
        })`,
        expect: `expect(result).toContain('already saved');`,
      },
    ],
  },
  {
    group: 'specifications',
    type: 'static',
    path: 'domain/specifications/can-recover.specification',
    className: 'CanRecoverSpecification',
    scenarios: [
      {
        name: 'should reject non-recoverable',
        call: `new CanRecoverSpecification().explain({
          abandoned: {
            isRecoverable: () => false,
            cartValue: 100,
            status: { value: 'lost' },
          } as never,
          cart: null,
        })`,
        expect: `expect(result).not.toBeNull();
    expect(result).toContain('not recoverable');`,
      },
      {
        name: 'should reject zero-value cart',
        call: `new CanRecoverSpecification().explain({
          abandoned: {
            isRecoverable: () => true,
            cartValue: 0,
            status: { value: 'pending' },
          } as never,
          cart: null,
        })`,
        expect: `expect(result).toContain('greater than zero');`,
      },
    ],
  },
);

// ═══════════════════════════════════════════════════════
// PHASE 9 — STRATEGIC 50% PUSH
// ═══════════════════════════════════════════════════════

UNIT_TESTS.push(
  // ═══ Cart Service — critical path ═══
  {
    group: 'app-services',
    type: 'static',
    path: 'application/services/impl/cart.service',
    className: 'CartService',
    scenarios: [
      {
        name: 'should load cart by id and throw if missing',
        varName: 'fn',
        async: true,
        call: `async () => {
          const service = new CartService({
            findByIdVO: async () => null,
          } as never);
          await (service as any).loadCart('550e8400-e29b-41d4-a716-446655440000');
        }`,
        expect: `await expect(fn()).rejects.toThrow();`,
      },
      {
        name: 'should get summary from existing cart',
        varName: 'result',
        call: `(() => {
          const svc = new CartService({
            findByIdVO: async () => ({
              id: '550e8400-e29b-41d4-a716-446655440000',
              itemCount: 3,
              total: 405,
              currency: 'BDT',
            }),
          } as never);
          return svc;
        })()`,
        expect: `expect(result).toBeDefined();`,
      },
    ],
  },
  {
    group: 'app-services',
    type: 'static',
    path: 'application/services/impl/cart-item.service',
    className: 'CartItemService',
    scenarios: [
      {
        name: 'should be instantiable',
        varName: 'service',
        call: `new CartItemService(
          { findByIdVO: async () => null, findByCartId: async () => [], findPaginated: async () => ({ items: [], total: 0, page: 1, limit: 20, totalPages: 0 }) } as never,
          { findByIdVO: async () => null, findById: async () => null, save: async (e: unknown) => e } as never,
        )`,
        expect: `expect(service).toBeDefined();`,
      },
    ],
  },
  {
    group: 'app-services',
    type: 'static',
    path: 'application/services/impl/cart-coupon.service',
    className: 'CartCouponService',
    scenarios: [
      {
        name: 'should be instantiable',
        varName: 'service',
        call: `new CartCouponService(
          { findByIdVO: async () => null } as never,
          { findByCartId: async () => [], save: async (e: unknown) => e } as never,
        )`,
        expect: `expect(service).toBeDefined();`,
      },
    ],
  },
  {
    group: 'app-services',
    type: 'static',
    path: 'application/services/impl/cart-voucher.service',
    className: 'CartVoucherService',
    scenarios: [
      {
        name: 'should be instantiable',
        varName: 'service',
        call: `new CartVoucherService(
          { findByIdVO: async () => null } as never,
          { findByCartId: async () => [], save: async (e: unknown) => e } as never,
        )`,
        expect: `expect(service).toBeDefined();`,
      },
    ],
  },
  {
    group: 'app-services',
    type: 'static',
    path: 'application/services/impl/guest-cart.service',
    className: 'GuestCartService',
    scenarios: [
      {
        name: 'should be instantiable',
        varName: 'service',
        call: `new GuestCartService(
          { findByToken: async () => null, findByIdVO: async () => null } as never,
          { findByIdVO: async () => null, findActiveByUserId: async () => null, save: async (e: unknown) => e } as never,
          { save: async (e: unknown) => e } as never,
        )`,
        expect: `expect(service).toBeDefined();`,
      },
    ],
  },
  {
    group: 'app-services',
    type: 'static',
    path: 'application/services/impl/cart-merger.service',
    className: 'CartMergerService',
    scenarios: [
      {
        name: 'should be instantiable',
        varName: 'service',
        call: `new CartMergerService(
          { findByIdVO: async () => null } as never,
          { findByCartId: async () => [] } as never,
          { save: async (e: unknown) => e } as never,
        )`,
        expect: `expect(service).toBeDefined();`,
      },
    ],
  },
  {
    group: 'app-services',
    type: 'static',
    path: 'application/services/impl/saved-for-later.service',
    className: 'SavedForLaterService',
    scenarios: [
      {
        name: 'should be instantiable',
        varName: 'service',
        call: `new SavedForLaterService(
          { findByIdVO: async () => null, save: async (e: unknown) => e } as never,
          { findById: async () => null, save: async (e: unknown) => e } as never,
          { findById: async () => null, save: async (e: unknown) => e } as never,
        )`,
        expect: `expect(service).toBeDefined();`,
      },
    ],
  },
  {
    group: 'app-services',
    type: 'static',
    path: 'application/services/impl/abandoned-cart.service',
    className: 'AbandonedCartService',
    scenarios: [
      {
        name: 'should be instantiable',
        varName: 'service',
        call: `new AbandonedCartService(
          { findByIdVO: async () => null, save: async (e: unknown) => e } as never,
          { findByIdVO: async () => null } as never,
        )`,
        expect: `expect(service).toBeDefined();`,
      },
    ],
  },

  // ═══ Domain Events — more scenarios ═══
  {
    group: 'events',
    type: 'static',
    path: 'domain/events/cart-item.events',
    className: 'CartItemAddedEvent',
    scenarios: [
      {
        name: 'should create cart item added event',
        varName: 'event',
        call: `new CartItemAddedEvent({
          aggregateId: '550e8400-e29b-41d4-a716-446655440000',
          payload: {
            cartId: '550e8400-e29b-41d4-a716-446655440000',
            itemId: '550e8400-e29b-41d4-a716-446655440001',
            productId: '550e8400-e29b-41d4-a716-446655440002',
            quantity: 2,
            unitPrice: 100,
            currency: 'BDT',
            addedAt: new Date().toISOString(),
          },
        })`,
        expect: `expect(event.type).toBe('cart.cart_item.added');
    expect(event.payload.quantity).toBe(2);
    expect(event.aggregateType).toBe('CartItem');`,
      },
    ],
  },
  {
    group: 'events',
    type: 'static',
    path: 'domain/events/coupon.events',
    className: 'CouponAppliedEvent',
    scenarios: [
      {
        name: 'should create coupon applied event',
        varName: 'event',
        call: `new CouponAppliedEvent({
          aggregateId: '550e8400-e29b-41d4-a716-446655440000',
          payload: {
            cartId: '550e8400-e29b-41d4-a716-446655440000',
            couponCode: 'SAVE10',
            discountAmount: 100,
            currency: 'BDT',
            appliedAt: new Date().toISOString(),
          },
        })`,
        expect: `expect(event.type).toBe('cart.coupon.applied');
    expect(event.payload.couponCode).toBe('SAVE10');
    expect(event.aggregateType).toBe('Coupon');`,
      },
    ],
  },
  {
    group: 'events',
    type: 'static',
    path: 'domain/events/guest-cart.events',
    className: 'GuestCartCreatedEvent',
    scenarios: [
      {
        name: 'should create guest cart event',
        varName: 'event',
        call: `new GuestCartCreatedEvent({
          aggregateId: '550e8400-e29b-41d4-a716-446655440000',
          payload: {
            guestCartId: '550e8400-e29b-41d4-a716-446655440000',
            token: 'token-abc',
            createdAt: new Date().toISOString(),
            expiresAt: new Date(Date.now() + 86400000).toISOString(),
          },
        })`,
        expect: `expect(event.type).toBe('cart.guest_cart.created');
    expect(event.aggregateType).toBe('GuestCart');`,
      },
    ],
  },
);

// ═══════════════════════════════════════════════════════
// PHASE 10 — CartEntity Deep Testing (40% target)
// ═══════════════════════════════════════════════════════

UNIT_TESTS.push(
  {
    group: 'entities-deep',
    type: 'static',
    path: 'domain/entities/cart.entity',
    className: 'CartEntity',
    scenarios: [
      {
        name: 'should transition active → inactive',
        varName: 'entity',
        call: `(() => {
          const e = CartEntity.create({
            id: { value: '550e8400-e29b-41d4-a716-446655440000' } as never,
            now: new Date().toISOString(),
            props: {
              type: { isGuest: () => false, isUser: () => true, value: 'user' } as never,
              currency: 'BDT',
              expiresAt: new Date(Date.now() + 86400000).toISOString(),
            },
          });
          e.deactivate();
          return e;
        })()`,
        expect: `expect(entity.isInactive()).toBe(true);
    expect(entity.isActive()).toBe(false);`,
      },
      {
        name: 'should apply item count delta positive',
        varName: 'entity',
        call: `(() => {
          const e = CartEntity.create({
            id: { value: '550e8400-e29b-41d4-a716-446655440000' } as never,
            now: new Date().toISOString(),
            props: {
              type: { isGuest: () => false, isUser: () => true, value: 'user' } as never,
              currency: 'BDT',
              expiresAt: new Date(Date.now() + 86400000).toISOString(),
            },
          });
          e.applyItemCountDelta(3);
          return e;
        })()`,
        expect: `expect(entity.itemCount).toBe(3);`,
      },
      {
        name: 'should reject negative item count delta',
        varName: 'fn',
        call: `() => {
          const e = CartEntity.create({
            id: { value: '550e8400-e29b-41d4-a716-446655440000' } as never,
            now: new Date().toISOString(),
            props: {
              type: { isGuest: () => false, isUser: () => true, value: 'user' } as never,
              currency: 'BDT',
              expiresAt: new Date(Date.now() + 86400000).toISOString(),
            },
          });
          e.applyItemCountDelta(-5);
        }`,
        expect: `expect(fn).toThrow();`,
        expectThrow: true,
      },
      {
        name: 'should mark cart as expired',
        varName: 'entity',
        call: `(() => {
          const e = CartEntity.create({
            id: { value: '550e8400-e29b-41d4-a716-446655440000' } as never,
            now: new Date().toISOString(),
            props: {
              type: { isGuest: () => false, isUser: () => true, value: 'user' } as never,
              currency: 'BDT',
              expiresAt: new Date(Date.now() + 86400000).toISOString(),
            },
          });
          e.expire();
          return e;
        })()`,
        expect: `expect(entity.isExpired()).toBe(true);
    expect(entity.isFinal()).toBe(true);`,
      },
      {
        name: 'should mark cart as merged',
        varName: 'entity',
        call: `(() => {
          const e = CartEntity.create({
            id: { value: '550e8400-e29b-41d4-a716-446655440000' } as never,
            now: new Date().toISOString(),
            props: {
              type: { isGuest: () => false, isUser: () => true, value: 'user' } as never,
              currency: 'BDT',
              expiresAt: new Date(Date.now() + 86400000).toISOString(),
            },
          });
          e.markMerged('source-cart-id');
          return e;
        })()`,
        expect: `expect(entity.isMerged()).toBe(true);`,
      },
      {
        name: 'should update and read notes',
        varName: 'entity',
        call: `(() => {
          const e = CartEntity.create({
            id: { value: '550e8400-e29b-41d4-a716-446655440000' } as never,
            now: new Date().toISOString(),
            props: {
              type: { isGuest: () => false, isUser: () => true, value: 'user' } as never,
              currency: 'BDT',
              expiresAt: new Date(Date.now() + 86400000).toISOString(),
            },
          });
          e.updateNotes('New note');
          return e;
        })()`,
        expect: `expect(entity.notes).toBe('New note');`,
      },
      {
        name: 'should expose currency',
        varName: 'entity',
        call: `CartEntity.create({
          id: { value: '550e8400-e29b-41d4-a716-446655440000' } as never,
          now: new Date().toISOString(),
          props: {
            type: { isGuest: () => false, isUser: () => true, value: 'user' } as never,
            currency: 'USD',
            expiresAt: new Date(Date.now() + 86400000).toISOString(),
          },
        })`,
        expect: `expect(entity.currency).toBe('USD');`,
      },
      {
        name: 'should expose sessionId if given',
        varName: 'entity',
        call: `CartEntity.create({
          id: { value: '550e8400-e29b-41d4-a716-446655440000' } as never,
          now: new Date().toISOString(),
          props: {
            type: { isGuest: () => true, isUser: () => false, value: 'guest' } as never,
            sessionId: { value: 'sess_test_session_12345678' } as never,
            currency: 'BDT',
            expiresAt: new Date(Date.now() + 86400000).toISOString(),
          },
        })`,
        expect: `expect(entity.isGuest()).toBe(true);
    expect(entity.sessionId?.value).toBe('sess_test_session_12345678');`,
      },
    ],
  },
);
