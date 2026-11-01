// shared-types/business/checkout/index.ts — Checkout sub-domain barrel

// Canonical (exports CheckoutStatusValue, CheckoutStepValue)
export * from './checkout.types.js';

// Metadata-only (no duplicate exports)
export * from './checkout-status.types.js';
export * from './checkout-step.types.js';

// Session
export * from './checkout-session.types.js';
