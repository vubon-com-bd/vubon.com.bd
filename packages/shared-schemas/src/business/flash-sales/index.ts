// shared-schemas/business/flash-sales/index.ts
// Flash-sales sub-domain barrel export

// Base
export * from './flash-sale.schema.js';
export * from './flash-sale-status.schema.js';
export * from './flash-sale-type.schema.js';
export * from './deal.schema.js';
export * from './deal-status.schema.js';
export * from './deal-discount-type.schema.js';
export * from './product-deal.schema.js';
export * from './bundle-deal.schema.js';
export * from './flash-sale-schedule.schema.js';
export * from './flash-sale-participant.schema.js';
export * from './flash-sale-inventory.schema.js';
export * from './flash-sale-price.schema.js';
export * from './flash-sale-coupon.schema.js';
export * from './flash-sale-voucher.schema.js';

// Requests
export * from './create-flash-sale.schema.js';
export * from './create-deal.schema.js';
export * from './join-flash-sale.schema.js';

// Responses
export * from './flash-sale-response.schema.js';
