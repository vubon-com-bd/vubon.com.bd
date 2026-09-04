/**
 * Business Flash Sales Constants Index
 * সকল Business Flash Sales কনস্ট্যান্টস এক্সপোর্ট
 */

// Base flash sale
export * from './flash-sale.constants';
export * from './flash-sale-status.constants';
export * from './flash-sale-type.constants';

// Deal
export * from './deal.constants';
export * from './deal-status.constants';
export * from './deal-discount-type.constants';

// Product & Bundle Deal
export * from './product-deal.constants';
export * from './bundle-deal.constants';

// Schedule & Participant
export * from './flash-sale-schedule.constants';
export * from './flash-sale-participant.constants';

// Inventory (FLASH_ prefixed to avoid conflict with product)
export { FLASH_INVENTORY as FLASH_SALE_INVENTORY } from './flash-sale-inventory.constants';
export type {
  FlashInventoryStatus as FlashSaleInventoryStatus,
  FlashInventoryType as FlashSaleInventoryType,
  FlashAllocationType as FlashSaleAllocationType,
} from './flash-sale-inventory.constants';

// Price (FLASH_ prefixed to avoid conflict with product)
export { FLASH_PRICE as FLASH_SALE_PRICE } from './flash-sale-price.constants';
export type {
  FlashPriceType as FlashSalePriceType,
  FlashPriceCalculation as FlashSalePriceCalculation,
  FlashPriceStatus as FlashSalePriceStatus,
} from './flash-sale-price.constants';

// Coupon (FLASH_ prefixed to avoid conflict with cart)
export { FLASH_COUPON as FLASH_SALE_COUPON } from './flash-sale-coupon.constants';
export type {
  FlashCouponStatus as FlashSaleCouponStatus,
  FlashCouponType as FlashSaleCouponType,
  FlashCouponDiscountType as FlashSaleCouponDiscountType,
} from './flash-sale-coupon.constants';

// Voucher (FLASH_ prefixed)
export { FLASH_VOUCHER as FLASH_SALE_VOUCHER } from './flash-sale-voucher.constants';
export type {
  FlashVoucherStatus as FlashSaleVoucherStatus,
  FlashVoucherType as FlashSaleVoucherType,
  FlashVoucherCategory as FlashSaleVoucherCategory,
} from './flash-sale-voucher.constants';
