/**
 * CheckoutEntity tests
 */
import { CheckoutEntity } from '../../../../src/module/domain/entities/checkout.entity.js';
import { CheckoutStatusVO } from '../../../../src/module/domain/value-objects/primitives/checkout-status.vo.js';
import { CheckoutStepVO } from '../../../../src/module/domain/value-objects/primitives/checkout-step.vo.js';
import { CustomerIdVO } from '../../../../src/module/domain/value-objects/primitives/customer-id.vo.js';
import { ShippingAddressLineVO } from '../../../../src/module/domain/value-objects/primitives/shipping-address-line.vo.js';
import { CHECKOUT_STEP } from '@vubon/shared-constants/business/checkout';

const NOW = '2026-01-01T10:00:00Z';
const FUTURE = '2027-01-01T10:00:00Z';
const UUID_CHECKOUT = '77777777-7777-4777-8777-777777777777';
const UUID_CUSTOMER = '22222222-2222-4222-8222-222222222222';

function makeCheckout(): CheckoutEntity {
  return CheckoutEntity.create({
    id: UUID_CHECKOUT,
    now: NOW,
    props: {
      customerId: CustomerIdVO.create(UUID_CUSTOMER),
      status: CheckoutStatusVO.pending(),
      currentStep: CheckoutStepVO.create(CHECKOUT_STEP.CART_REVIEW),
      type: 'registered',
      currency: 'BDT',
      subtotal: 0,
      discountAmount: 0,
      taxAmount: 0,
      shippingAmount: 0,
      total: 0,
      expiresAt: FUTURE,
    },
  });
}

const ADDR = ShippingAddressLineVO.create({
  fullName: 'John Doe',
  phone: '01700000000',
  line1: '123 Main St',
  city: 'Dhaka',
  country: 'BD',
});

describe('CheckoutEntity', () => {
  it('create()', () => {
    const c = makeCheckout();
    expect(c.id).toBe(UUID_CHECKOUT);
    expect(c.status.isPending()).toBe(true);
    expect(c.currentStep.isFirst()).toBe(true);
  });

  it('isExpired()', () => {
    const c = makeCheckout();
    expect(c.isExpired(new Date(NOW))).toBe(false);
    expect(c.isExpired(new Date('2030-01-01'))).toBe(true);
  });

  it('selectAddress() advances step', () => {
    const c = makeCheckout();
    c.selectAddress(ADDR, undefined, NOW);
    expect(c.shippingAddress).toBe(ADDR);
    expect(c.currentStep.value).toBe(CHECKOUT_STEP.SHIPPING_METHOD);
  });

  it('selectShippingMethod() requires address first', () => {
    const c = makeCheckout();
    expect(() => c.selectShippingMethod('std', 50, NOW)).toThrow();
  });

  it('selectShippingMethod() sets cost and advances', () => {
    const c = makeCheckout();
    c.selectAddress(ADDR, undefined, NOW);
    c.selectShippingMethod('std', 50, NOW);
    expect(c.shippingMethodId).toBe('std');
    expect(c.shippingAmount).toBe(50);
    expect(c.currentStep.value).toBe(CHECKOUT_STEP.PAYMENT_METHOD);
  });

  it('selectPaymentMethod() requires shipping', () => {
    const c = makeCheckout();
    c.selectAddress(ADDR, undefined, NOW);
    expect(() => c.selectPaymentMethod('card', NOW)).toThrow();
  });

  it('isReadyToConfirm() only when all steps done', () => {
    const c = makeCheckout();
    expect(c.isReadyToConfirm()).toBe(false);
    c.selectAddress(ADDR, undefined, NOW);
    c.selectShippingMethod('std', 50, NOW);
    c.selectPaymentMethod('card', NOW);
    expect(c.isReadyToConfirm()).toBe(true);
  });

  it('complete() transitions to completed', () => {
    const c = makeCheckout();
    c.selectAddress(ADDR, undefined, NOW);
    c.selectShippingMethod('std', 50, NOW);
    c.selectPaymentMethod('card', NOW);
    c.complete('99999999-9999-4999-8999-999999999999', NOW);
    expect(c.status.isCompleted()).toBe(true);
    expect(c.orderId).toBeDefined();
  });

  it('abandon()', () => {
    const c = makeCheckout();
    c.abandon(NOW);
    expect(c.status.isAbandoned()).toBe(true);
  });

  it('expire()', () => {
    const c = makeCheckout();
    c.expire(NOW);
    expect(c.status.isExpired()).toBe(true);
  });
});
