/**
 * Cart Service — Modules Layer Barrel
 * @module cart-service/modules
 */
export * from './common/index.js';
export * from './health/index.js';
export * from './app.module.js';

// ─── Feature modules ────────────────────────
export * from './cart/index.js';
export * from './cart-item/index.js';
export * from './cart-coupon/index.js';
export * from './cart-voucher/index.js';
export * from './cart-tax/index.js';
export * from './cart-shipping/index.js';
export * from './saved-for-later/index.js';
export * from './abandoned-cart/index.js';
export * from './guest-cart/index.js';
export * from './cart-merger/index.js';
