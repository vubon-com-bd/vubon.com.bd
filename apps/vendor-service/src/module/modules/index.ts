/**
 * Vendor Service — Modules Layer Barrel
 * @module vendor-service/modules
 *
 * Order: common → health → features → app.module
 */
export * from './common/index.js';
export * from './health/index.js';

// ─── Feature modules ────────────────────────
export * from './vendor/index.js';
export * from './vendor-profile/index.js';
export * from './vendor-business/index.js';
export * from './vendor-contact/index.js';
export * from './vendor-address/index.js';
export * from './vendor-bank-account/index.js';
export * from './vendor-document/index.js';
export * from './vendor-verification/index.js';
export * from './vendor-approval/index.js';
export * from './vendor-suspension/index.js';
export * from './vendor-commission/index.js';
export * from './vendor-payout/index.js';
export * from './vendor-settlement/index.js';
export * from './vendor-performance/index.js';
export * from './vendor-rating/index.js';
export * from './vendor-review/index.js';
export * from './vendor-shipping/index.js';
export * from './vendor-return-policy/index.js';
export * from './vendor-warranty/index.js';
export * from './vendor-team/index.js';
export * from './vendor-feature/index.js';
export * from './vendor-subscription/index.js';
export * from './public-vendor/index.js';

export * from './app.module.js';
