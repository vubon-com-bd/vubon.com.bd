// domain/value-objects/primitives/index.ts — Primitive VOs barrel export

// ═══ Payment Core ═══
export * from './payment-id.vo.js';
export * from './payment-status.vo.js';
export * from './payment-type.vo.js';
export * from './payment-method.vo.js';
export * from './payment-gateway.vo.js';
export * from './payment-amount.vo.js';
export * from './currency.vo.js';
export * from './idempotency-key.vo.js';

// ═══ Gateway References ═══
export * from './gateway-payment-id.vo.js';
export * from './gateway-signature.vo.js';

// ═══ Failure ═══
export * from './failure-reason.vo.js';
export * from './failure-code.vo.js';

// ═══ Transaction ═══
export * from './transaction-id.vo.js';
export * from './transaction-type.vo.js';
export * from './transaction-status.vo.js';
export * from './transaction-reference.vo.js';

// ═══ Refund ═══
export * from './refund-id.vo.js';
export * from './refund-status.vo.js';
export * from './refund-reason.vo.js';

// ═══ Cross-Service References ═══
export * from './order-id.vo.js';
export * from './user-id.vo.js';
