/**
 * Extended tests for all *IdVO (simple wrapper VOs)
 */
import { describe, it, expect } from '@jest/globals';
import { CartItemIdVO } from '@domain/value-objects/primitives/cart-item-id.vo.js';
import { CartTaxIdVO } from '@domain/value-objects/primitives/cart-tax-id.vo.js';
import { CartShippingIdVO } from '@domain/value-objects/primitives/cart-shipping-id.vo.js';
import { CartMergerIdVO } from '@domain/value-objects/primitives/cart-merger-id.vo.js';
import { SavedItemIdVO } from '@domain/value-objects/primitives/saved-item-id.vo.js';
import { AbandonedCartIdVO } from '@domain/value-objects/primitives/abandoned-cart-id.vo.js';
import { GuestCartIdVO } from '@domain/value-objects/primitives/guest-cart-id.vo.js';
import { ProductIdVO } from '@domain/value-objects/primitives/product-id.vo.js';
import { VariantIdVO } from '@domain/value-objects/primitives/variant-id.vo.js';
import { VendorIdVO } from '@domain/value-objects/primitives/vendor-id.vo.js';
import { UserIdVO } from '@domain/value-objects/primitives/user-id.vo.js';
import { AddressIdVO } from '@domain/value-objects/primitives/address-id.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { TEST_IDS } from '../../../../fixtures/index.js';

const UUID_VOS = [
  { name: 'CartItemIdVO', VO: CartItemIdVO, id: TEST_IDS.CART_ITEM_ID },
  { name: 'CartTaxIdVO', VO: CartTaxIdVO, id: TEST_IDS.TAX_ID },
  { name: 'CartShippingIdVO', VO: CartShippingIdVO, id: TEST_IDS.SHIPPING_ID },
  { name: 'CartMergerIdVO', VO: CartMergerIdVO, id: TEST_IDS.MERGER_ID },
  { name: 'SavedItemIdVO', VO: SavedItemIdVO, id: TEST_IDS.SAVED_ITEM_ID },
  { name: 'AbandonedCartIdVO', VO: AbandonedCartIdVO, id: TEST_IDS.ABANDONED_CART_ID },
  { name: 'GuestCartIdVO', VO: GuestCartIdVO, id: TEST_IDS.GUEST_CART_ID },
  { name: 'ProductIdVO', VO: ProductIdVO, id: TEST_IDS.PRODUCT_ID },
  { name: 'VariantIdVO', VO: VariantIdVO, id: TEST_IDS.VARIANT_ID },
  { name: 'VendorIdVO', VO: VendorIdVO, id: TEST_IDS.VENDOR_ID },
  { name: 'UserIdVO', VO: UserIdVO, id: TEST_IDS.USER_ID },
  { name: 'AddressIdVO', VO: AddressIdVO, id: TEST_IDS.ADDRESS_ID },
];

describe.each(UUID_VOS)('$name', ({ VO, id }) => {
  it('create() accepts valid UUID', () => {
    const vo = VO.create(id);
    expect(vo.value).toBe(id);
  });

  it('create() trims whitespace', () => {
    const vo = VO.create(`  ${id}  `);
    expect(vo.value).toBe(id);
  });

  it('create() throws on empty string', () => {
    expect(() => VO.create('')).toThrow(ValidationError);
  });

  it('create() throws on invalid UUID', () => {
    expect(() => VO.create('not-a-uuid')).toThrow(ValidationError);
  });

  it('create() throws on non-string', () => {
    expect(() => VO.create(null as never)).toThrow(ValidationError);
  });

  it('reconstitute() bypasses validation', () => {
    const vo = VO.reconstitute('anything');
    expect(vo.value).toBe('anything');
  });

  it('equals() for same value', () => {
    expect(VO.create(id).equals(VO.create(id))).toBe(true);
  });

  it('toString()', () => {
    expect(VO.create(id).toString()).toBe(id);
  });
});
