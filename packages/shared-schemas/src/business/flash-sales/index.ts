// shared-schemas/business/flash-sales/index.ts
// Flash-sales sub-domain barrel export

// Base
export * from './flash-sale.schema';
export * from './flash-sale-status.schema';
export * from './flash-sale-type.schema';
export * from './deal.schema';
export * from './deal-status.schema';
export * from './deal-discount-type.schema';
export * from './product-deal.schema';
export * from './bundle-deal.schema';
export * from './flash-sale-schedule.schema';
export * from './flash-sale-participant.schema';
export * from './flash-sale-inventory.schema';
export * from './flash-sale-price.schema';
export * from './flash-sale-coupon.schema';
export * from './flash-sale-voucher.schema';

// Requests
export * from './create-flash-sale.schema';
export * from './create-deal.schema';
export * from './join-flash-sale.schema';

// Responses
export * from './flash-sale-response.schema';
