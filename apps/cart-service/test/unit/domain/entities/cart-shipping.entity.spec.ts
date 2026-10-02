/**
 * CartShippingEntity — Unit Tests
 */
import { CartShippingEntity } from '../../../../src/module/domain/entities/cart-shipping.entity.js';
import { CartIdVO } from '../../../../src/module/domain/value-objects/primitives/cart-id.vo.js';
import { CartShippingMethodVO } from '../../../../src/module/domain/value-objects/primitives/cart-shipping-method.vo.js';
import { SHIPPING_METHOD } from '@vubon/shared-constants/logistics';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';
const ADDR = '00000000-0000-0000-0000-000000000001';
const NOW = '2026-01-01T00:00:00Z';

function makeProps(overrides = {}) {
  return {
    cartId: CartIdVO.create(UUID),
    method: CartShippingMethodVO.create(SHIPPING_METHOD.STANDARD),
    cost: 100,
    currency: 'BDT',
    freeShippingThreshold: 1000,
    addressId: ADDR,
    ...overrides,
  };
}

describe('CartShippingEntity', () => {
  it('creates entity', () => {
    const e = CartShippingEntity.create({ id: UUID, props: makeProps() as never, now: NOW });
    expect(e.cost).toBe(100);
  });

  it('throws on negative cost', () => {
    expect(() =>
      CartShippingEntity.create({ id: UUID, props: makeProps({ cost: -1 }) as never, now: NOW }),
    ).toThrow();
  });

  it('throws on negative freeShippingThreshold', () => {
    expect(() =>
      CartShippingEntity.create({
        id: UUID,
        props: makeProps({ freeShippingThreshold: -1 }) as never,
        now: NOW,
      }),
    ).toThrow();
  });

  it('accepts pickup without address', () => {
    const e = CartShippingEntity.create({
      id: UUID,
      props: makeProps({
        method: CartShippingMethodVO.create(SHIPPING_METHOD.PICKUP),
        addressId: undefined,
      }) as never,
      now: NOW,
    });
    expect(e.method.isPickup()).toBe(true);
  });

  it('effectiveCost = cost when below threshold', () => {
    const e = CartShippingEntity.create({ id: UUID, props: makeProps() as never, now: NOW });
    expect(e.effectiveCost(500)).toBe(100);
  });

  it('effectiveCost = 0 when threshold met', () => {
    const e = CartShippingEntity.create({ id: UUID, props: makeProps() as never, now: NOW });
    expect(e.effectiveCost(1000)).toBe(0);
  });

  it('effectiveCost = 0 for pickup', () => {
    const e = CartShippingEntity.create({
      id: UUID,
      props: makeProps({
        method: CartShippingMethodVO.create(SHIPPING_METHOD.PICKUP),
        addressId: undefined,
      }) as never,
      now: NOW,
    });
    expect(e.effectiveCost(100)).toBe(0);
  });

  it('changeMethod updates method + cost + address', () => {
    const e = CartShippingEntity.create({ id: UUID, props: makeProps() as never, now: NOW });
    e.changeMethod(CartShippingMethodVO.create(SHIPPING_METHOD.EXPRESS), 200, ADDR, NOW);
    expect(e.method.value).toBe(SHIPPING_METHOD.EXPRESS);
    expect(e.cost).toBe(200);
  });

  it('setAddress() throws when method requires address but none given', () => {
    const e = CartShippingEntity.create({ id: UUID, props: makeProps() as never, now: NOW });
    expect(() => e.setAddress(undefined, NOW)).toThrow();
  });

  it('setAddress() accepts undefined for pickup method', () => {
    const e = CartShippingEntity.create({
      id: UUID,
      props: makeProps({
        method: CartShippingMethodVO.create(SHIPPING_METHOD.PICKUP),
        addressId: undefined,
      }) as never,
      now: NOW,
    });
    expect(() => e.setAddress(undefined, NOW)).not.toThrow();
  });

  it('estimatedDays delegates to method', () => {
    const e = CartShippingEntity.create({ id: UUID, props: makeProps() as never, now: NOW });
    expect(e.estimatedDays()).toEqual({ min: 3, max: 7 });
  });
});
