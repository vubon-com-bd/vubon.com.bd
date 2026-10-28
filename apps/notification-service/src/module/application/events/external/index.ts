// notification-service/application/events/external/index.ts — Barrel

export * from './_handler-helpers.js';

// Identity events
export * from './user-created.handler.js';
export * from './user-verified.handler.js';
export * from './user-suspended.handler.js';
export * from './user-status-changed.handler.js';
export * from './user-role-assigned.handler.js';
export * from './user-role-revoked.handler.js';

// Order events
export * from './order-created.handler.js';
export * from './order-confirmed.handler.js';
export * from './order-shipped.handler.js';
export * from './order-delivered.handler.js';

// Payment events
export * from './payment-paid.handler.js';
export * from './payment-failed.handler.js';
export * from './payment-refunded.handler.js';

// Vendor events
export * from './vendor-registered.handler.js';
export * from './vendor-approved.handler.js';
export * from './vendor-suspended.handler.js';

// Cart events
export * from './cart-abandoned.handler.js';
export * from './cart-expired.handler.js';
export * from './cart-merger-completed.handler.js';

// Abandoned cart chain
export * from './abandoned-cart-detected.handler.js';
export * from './abandoned-cart-reminder-sent.handler.js';
export * from './abandoned-cart-recovered.handler.js';
export * from './abandoned-cart-lost.handler.js';
export * from './abandoned-cart-status-changed.handler.js';
export * from './abandoned-cart-unsubscribed.handler.js';

// Product events
export * from './inventory-low-stock.handler.js';
export * from './inventory-out-of-stock.handler.js';
export * from './product-review-posted.handler.js';
