// vendor-service/domain/value-objects/primitives/index.ts
// Barrel — Vendor primitive VOs

// ─── Vendor Core IDs ───
export * from './vendor-id.vo.js';
export * from './contact-id.vo.js';
export * from './address-id.vo.js';
export * from './bank-account-id.vo.js';
export * from './document-id.vo.js';
export * from './verification-id.vo.js';
export * from './approval-id.vo.js';
export * from './suspension-id.vo.js';
export * from './commission-id.vo.js';
export * from './payout-id.vo.js';
export * from './settlement-id.vo.js';
export * from './performance-id.vo.js';
export * from './review-id.vo.js';
export * from './team-member-id.vo.js';
export * from './feature-id.vo.js';
export * from './subscription-id.vo.js';
export * from './permission-id.vo.js';

// ─── Cross-Service Reference IDs ───
export * from './user-id.vo.js';
export * from './product-id.vo.js';
export * from './order-id.vo.js';
export * from './invoice-id.vo.js';

// ─── Vendor Core VOs ───
export * from './vendor-name.vo.js';
export * from './vendor-slug.vo.js';
export * from './business-name.vo.js';
export * from './business-description.vo.js';
export * from './business-registration.vo.js';

// ─── Contact VOs ───
export * from './contact-type.vo.js';
export * from './contact-value.vo.js';

// ─── Address VOs ───
export * from './address-label.vo.js';

// ─── Bank Account VOs ───
export * from './bank-name.vo.js';
export * from './bank-account-number.vo.js';

// ─── Document VOs ───
export * from './document-type.vo.js';
export * from './document-status.vo.js';

// ─── Verification VOs ───
export * from './verification-status.vo.js';

// ─── Approval VOs ───
export * from './approval-status.vo.js';
export * from './approval-reason.vo.js';

// ─── Suspension VOs ───
export * from './suspension-reason.vo.js';
export * from './suspension-status.vo.js';

// ─── Commission VOs ───
export * from './commission-type.vo.js';
export * from './commission-rate.vo.js';

// ─── Payout VOs ───
export * from './payout-amount.vo.js';
export * from './payout-status.vo.js';

// ─── Settlement VOs ───
export * from './settlement-status.vo.js';

// ─── Performance & Review VOs ───
export * from './score-value.vo.js';
export * from './rating-value.vo.js';
export * from './review-content.vo.js';
export * from './review-status.vo.js';

// ─── Policy VOs ───
export * from './shipping-method.vo.js';
export * from './return-policy-type.vo.js';
export * from './warranty-type.vo.js';

// ─── Team VOs ───
export * from './team-role.vo.js';
export * from './team-permission.vo.js';

// ─── Subscription & Feature VOs ───
export * from './subscription-plan.vo.js';
export * from './feature-type.vo.js';

// ─── Status/Type core ───
export * from './vendor-status.vo.js';
export * from './vendor-type.vo.js';
export * from './business-type.vo.js';
export * from './vendor-tier.vo.js';
