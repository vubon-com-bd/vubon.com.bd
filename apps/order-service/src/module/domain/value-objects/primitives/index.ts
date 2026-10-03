// domain/value-objects/primitives/index.ts — Primitive VOs barrel export

// ═══ Order Core ═══
export * from './order-id.vo.js';
export * from './order-number.vo.js';
export * from './order-status.vo.js';
export * from './order-type.vo.js';
export * from './order-priority.vo.js';
export * from './order-total.vo.js';
export * from './order-subtotal.vo.js';
export * from './order-discount.vo.js';
export * from './order-tax.vo.js';
export * from './order-shipping.vo.js';
export * from './order-note.vo.js';
export * from './order-channel.vo.js';
export * from './order-source.vo.js';

// ═══ Order Item ═══
export * from './order-item-id.vo.js';
export * from './order-item-quantity.vo.js';
export * from './order-item-price.vo.js';
export * from './order-item-status.vo.js';

// ═══ Checkout ═══
export * from './checkout-id.vo.js';
export * from './checkout-status.vo.js';
export * from './checkout-step.vo.js';

// ═══ Delivery ═══
export * from './delivery-id.vo.js';
export * from './delivery-status.vo.js';
export * from './delivery-type.vo.js';
export * from './delivery-method-id.vo.js';
export * from './delivery-method-type.vo.js';

// ═══ Address (Snapshot) ═══
export * from './shipping-address-id.vo.js';
export * from './shipping-address-line.vo.js';
export * from './billing-address-id.vo.js';
export * from './billing-address-line.vo.js';

// ═══ Cancel ═══
export * from './cancel-id.vo.js';
export * from './cancel-reason.vo.js';
export * from './cancel-status.vo.js';

// ═══ Return ═══
export * from './return-id.vo.js';
export * from './return-reason.vo.js';
export * from './return-status.vo.js';

// ═══ Fulfillment ═══
export * from './fulfillment-id.vo.js';
export * from './fulfillment-status.vo.js';

// ═══ History ═══
export * from './history-id.vo.js';
export * from './history-type.vo.js';

// ═══ Tracking ═══
export * from './tracking-id.vo.js';
export * from './tracking-status.vo.js';
export * from './tracking-number.vo.js';

// ═══ Cross-Service References ═══
export * from './customer-id.vo.js';
export * from './vendor-id.vo.js';
export * from './product-id.vo.js';
export * from './variant-id.vo.js';
export * from './payment-id.vo.js';
