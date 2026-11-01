/**
 * Product Service — Modules Layer Barrel
 * @module product-service/modules
 *
 * Order: common → health → app.module → features
 */
export * from './common/index.js';
export * from './health/index.js';
export * from './app.module.js';

// ─── Feature modules ────────────────────────
export * from './product/index.js';
export * from './product-variant/index.js';
export * from './product-attribute/index.js';
export * from './product-inventory/index.js';
export * from './product-pricing/index.js';
export * from './product-pricing-rule/index.js';
export * from './product-collection/index.js';
export * from './product-review/index.js';
export * from './product-media/index.js';
export * from './brand/index.js';
export * from './category/index.js';
export * from './public-product/index.js';
