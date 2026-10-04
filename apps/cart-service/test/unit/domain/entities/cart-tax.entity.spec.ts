/**
 * CartTaxEntity — Unit Tests
 */
import { CartTaxEntity } from '../../../../src/module/domain/entities/cart-tax.entity.js';
import { CartIdVO } from '../../../../src/module/domain/value-objects/primitives/cart-id.vo.js';
import { CartTaxRateVO } from '../../../../src/module/domain/value-objects/primitives/cart-tax-rate.vo.js';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';
const NOW = '2026-01-01T00:00:00Z';

describe('CartTaxEntity', () => {
  it('creates entity', () => {
    const e = CartTaxEntity.create({
      id: UUID,
      now: NOW,
      props: {
        cartId: CartIdVO.create(UUID),
        rate: CartTaxRateVO.create(15),
        inclusive: false,
      },
    });
    expect(e.rate.percent).toBe(15);
  });

  it('computeTax returns rate applied on amount', () => {
    const e = CartTaxEntity.create({
      id: UUID,
      now: NOW,
      props: { cartId: CartIdVO.create(UUID), rate: CartTaxRateVO.create(15), inclusive: false },
    });
    expect(e.computeTax(1000)).toBe(150);
  });

  it('computeTax throws on negative amount', () => {
    const e = CartTaxEntity.create({
      id: UUID,
      now: NOW,
      props: { cartId: CartIdVO.create(UUID), rate: CartTaxRateVO.create(15), inclusive: false },
    });
    expect(() => e.computeTax(-1)).toThrow();
  });

  it('changeRate updates rate', () => {
    const e = CartTaxEntity.create({
      id: UUID,
      now: NOW,
      props: { cartId: CartIdVO.create(UUID), rate: CartTaxRateVO.create(15), inclusive: false },
    });
    e.changeRate(CartTaxRateVO.create(20), '2026-01-02T00:00:00Z');
    expect(e.rate.percent).toBe(20);
  });
});
