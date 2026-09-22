// ═══════════════════════════════════════════════════════════
// Cart Domain — Primitive Value Objects (Barrel)
// ═══════════════════════════════════════════════════════════

// ── Cart core ───────────────────────────────────────────────
export { CartIdVO } from './cart-id.vo';
export { CartStatusVO } from './cart-status.vo';
export { CartTypeVO } from './cart-type.vo';
export { CartItemIdVO } from './cart-item-id.vo';
export { CartItemQuantityVO } from './cart-item-quantity.vo';
export { CartItemStatusVO } from './cart-item-status.vo';
export { CartItemNoteVO } from './cart-item-note.vo';

// ── Coupon ──────────────────────────────────────────────────
export { CouponCodeVO } from './coupon-code.vo';
export { CouponDiscountVO } from './coupon-discount.vo';
export { CouponStatusVO } from './coupon-status.vo';
export { CouponTypeVO } from './coupon-type.vo';
export {
  CouponDiscountTypeVO,
  CouponAppliesToVO,
} from './coupon-discount-type.vo';

// ── Voucher ─────────────────────────────────────────────────
export { VoucherCodeVO } from './voucher-code.vo';
export { VoucherStatusVO } from './voucher-status.vo';
export { VoucherTypeVO } from './voucher-type.vo';

// ── Saved for later ─────────────────────────────────────────
export { SavedItemIdVO } from './saved-item-id.vo';
export { SavedItemStatusVO } from './saved-item-status.vo';

// ── Abandoned cart ──────────────────────────────────────────
export { AbandonedCartIdVO } from './abandoned-cart-id.vo';
export { AbandonedCartStatusVO } from './abandoned-cart-status.vo';
export { AbandonedCartReminderVO } from './abandoned-cart-reminder.vo';

// ── Guest cart ──────────────────────────────────────────────
export { GuestCartIdVO } from './guest-cart-id.vo';
export { GuestCartStatusVO } from './guest-cart-status.vo';
export { GuestTokenVO } from './guest-token.vo';

// ── Tax ─────────────────────────────────────────────────────
export { CartTaxIdVO } from './cart-tax-id.vo';
export { CartTaxRateVO } from './cart-tax-rate.vo';

// ── Shipping ────────────────────────────────────────────────
export { CartShippingIdVO } from './cart-shipping-id.vo';
export { CartShippingMethodVO } from './cart-shipping-method.vo';

// ── Cart merger ─────────────────────────────────────────────
export { CartMergerIdVO } from './cart-merger-id.vo';
export { MergeStrategyVO } from './merge-strategy.vo';

// ── Reference IDs ───────────────────────────────────────────
export { UserIdVO } from './user-id.vo';
export { ProductIdVO } from './product-id.vo';
export { VariantIdVO } from './variant-id.vo';
export { VendorIdVO } from './vendor-id.vo';
export { SessionIdVO } from './session-id.vo';
export { AddressIdVO } from './address-id.vo';
