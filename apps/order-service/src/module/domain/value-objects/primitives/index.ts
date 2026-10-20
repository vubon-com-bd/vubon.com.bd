// order-service/domain/value-objects/primitives/index.ts — Barrel export

// ─── Order Core (১১টি) ─────────────────────
export * from './order-id.vo.js';
export * from './order-number.vo.js';
export * from './order-status.vo.js';
export * from './order-total.vo.js';
export * from './order-subtotal.vo.js';
export * from './order-discount.vo.js';
export * from './order-tax.vo.js';
export * from './order-shipping.vo.js';
export * from './order-note.vo.js';
export * from './order-channel.vo.js';
export * from './order-source.vo.js';

// ─── Order Item (৪টি) ──────────────────────
export * from './order-item-id.vo.js';
export * from './order-item-quantity.vo.js';
export * from './order-item-price.vo.js';
export * from './order-item-status.vo.js';

// ─── Checkout (৩টি) ────────────────────────
export * from './checkout-id.vo.js';
export * from './checkout-status.vo.js';
export * from './checkout-step.vo.js';

// ─── Delivery (৫টি) ────────────────────────
export * from './delivery-id.vo.js';
export * from './delivery-status.vo.js';
export * from './delivery-type.vo.js';
export * from './delivery-method-id.vo.js';
export * from './delivery-method-type.vo.js';

// ─── Address Snapshot (৪টি) ────────────────
export * from './shipping-address-id.vo.js';
export * from './shipping-address-line.vo.js';
export * from './billing-address-id.vo.js';
export * from './billing-address-line.vo.js';

// ─── Cancel (৩টি) ──────────────────────────
export * from './cancel-id.vo.js';
export * from './cancel-reason.vo.js';
export * from './cancel-status.vo.js';

// ─── Return (৩টি) ──────────────────────────
export * from './return-id.vo.js';
export * from './return-reason.vo.js';
export * from './return-status.vo.js';

// ─── Fulfillment (২টি) ─────────────────────
export * from './fulfillment-id.vo.js';
export * from './fulfillment-status.vo.js';

// ─── History (২টি) ─────────────────────────
export * from './history-id.vo.js';
export * from './history-type.vo.js';

// ─── Tracking (৩টি) ────────────────────────
export * from './tracking-id.vo.js';
export * from './tracking-status.vo.js';
export * from './tracking-number.vo.js';

// ─── Cross-Service Reference (৫টি) ─────────
export * from './customer-id.vo.js';
export * from './vendor-id.vo.js';
export * from './product-id.vo.js';
export * from './variant-id.vo.js';
export * from './payment-id.vo.js';
