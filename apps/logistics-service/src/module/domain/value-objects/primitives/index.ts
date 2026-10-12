// domain/value-objects/primitives/index.ts — Primitive VOs barrel export

// ═══ Identity ═══
export * from './shipment-id.vo.js';
export * from './courier-id.vo.js';
export * from './delivery-id.vo.js';
export * from './delivery-attempt-id.vo.js';
export * from './tracking-id.vo.js';
export * from './warehouse-id.vo.js';
export * from './fulfillment-id.vo.js';
export * from './dispatch-id.vo.js';
export * from './vehicle-id.vo.js';
export * from './driver-id.vo.js';
export * from './route-id.vo.js';
export * from './route-stop-id.vo.js';
export * from './zone-id.vo.js';
export * from './shipping-method-id.vo.js';
export * from './packaging-id.vo.js';
export * from './return-shipment-id.vo.js';
export * from './insurance-id.vo.js';
export * from './insurance-claim-id.vo.js';

// ═══ Cross-Service References ═══
export * from './order-id.vo.js';
export * from './user-id.vo.js';
export * from './vendor-id.vo.js';

// ═══ Statuses ═══
export * from './shipment-status.vo.js';
export * from './courier-status.vo.js';
export * from './delivery-status.vo.js';
export * from './delivery-attempt-status.vo.js';
export * from './tracking-status.vo.js';
export * from './tracking-event.vo.js';
export * from './tracking-source.vo.js';
export * from './warehouse-status.vo.js';
export * from './warehouse-type.vo.js';
export * from './fulfillment-status.vo.js';
export * from './dispatch-status.vo.js';
export * from './vehicle-status.vo.js';
export * from './driver-status.vo.js';
export * from './route-status.vo.js';
export * from './zone-status.vo.js';
export * from './shipping-method-status.vo.js';
export * from './packaging-status.vo.js';
export * from './return-shipment-status.vo.js';
export * from './insurance-status.vo.js';
export * from './insurance-claim-status.vo.js';

// ═══ Types / Enums ═══
export * from './shipment-type.vo.js';
export * from './shipment-priority.vo.js';
export * from './courier-type.vo.js';
export * from './courier-name.vo.js';
export * from './delivery-type.vo.js';
export * from './fulfillment-type.vo.js';
export * from './fulfillment-priority.vo.js';
export * from './dispatch-type.vo.js';
export * from './vehicle-type.vo.js';
export * from './vehicle-fuel-type.vo.js';
export * from './driver-type.vo.js';
export * from './driver-license-type.vo.js';
export * from './route-type.vo.js';
export * from './route-optimization.vo.js';
export * from './zone-type.vo.js';
export * from './zone-pricing-type.vo.js';
export * from './shipping-method-value.vo.js';
export * from './shipping-rate-type.vo.js';
export * from './packaging-type.vo.js';
export * from './packaging-material.vo.js';
export * from './return-shipment-type.vo.js';
export * from './return-reason.vo.js';
export * from './insurance-type.vo.js';
export * from './insurance-coverage.vo.js';

// ═══ Numbers / Codes ═══
export * from './tracking-number.vo.js';
export * from './rma-number.vo.js';
export * from './policy-number.vo.js';
export * from './dispatch-number.vo.js';
export * from './idempotency-key.vo.js';
export * from './weight-kg.vo.js';
export * from './volume-m3.vo.js';
export * from './dimension-cm.vo.js';
export * from './distance-km.vo.js';
export * from './duration-minutes.vo.js';
export * from './utilization-percent.vo.js';
export * from './attempt-number.vo.js';
export * from './stop-order.vo.js';

// ═══ Money ═══
export * from './declared-value.vo.js';
export * from './cod-amount.vo.js';
export * from './shipping-cost.vo.js';
export * from './insurance-premium.vo.js';
export * from './refund-amount.vo.js';
export * from './distance-surcharge.vo.js';

// ═══ Text ═══
export * from './notes.vo.js';
export * from './reason-text.vo.js';
export * from './description-text.vo.js';
export * from './warehouse-code.vo.js';
export * from './route-code.vo.js';
export * from './warehouse-zone.vo.js';
