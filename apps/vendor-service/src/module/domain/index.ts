/**
 * Vendor Service — Domain Layer Barrel
 * @module vendor-service/domain
 *
 * Order: errors → primitives → composites → events → entities
 *        → repositories → event-store → services → specifications
 *
 * NOTE: Some names collide across layers (e.g. PerformanceGradeValue,
 * PayoutMethodValue, VerificationType) — re-exported explicitly below.
 */
export * from './errors/index.js';

// ═══ Primitives ═══
export * from './value-objects/primitives/index.js';

// ═══ Composites (explicit to avoid collisions) ═══
export * from './value-objects/composites/vendor.vo.js';
export * from './value-objects/composites/vendor-profile.vo.js';
export * from './value-objects/composites/vendor-business.vo.js';
export * from './value-objects/composites/vendor-contact.vo.js';
export * from './value-objects/composites/vendor-address.vo.js';
export * from './value-objects/composites/vendor-bank-account.vo.js';
export * from './value-objects/composites/vendor-document.vo.js';
export * from './value-objects/composites/vendor-verification.vo.js';
export * from './value-objects/composites/vendor-approval.vo.js';
export * from './value-objects/composites/vendor-suspension.vo.js';
export * from './value-objects/composites/vendor-commission.vo.js';
export * from './value-objects/composites/vendor-payout.vo.js';
export * from './value-objects/composites/vendor-settlement.vo.js';
export * from './value-objects/composites/vendor-performance.vo.js';
export * from './value-objects/composites/vendor-rating.vo.js';
export * from './value-objects/composites/vendor-review.vo.js';
export * from './value-objects/composites/vendor-shipping.vo.js';
export * from './value-objects/composites/vendor-return-policy.vo.js';
export * from './value-objects/composites/vendor-warranty.vo.js';
export * from './value-objects/composites/vendor-team.vo.js';
export * from './value-objects/composites/vendor-feature.vo.js';
export * from './value-objects/composites/vendor-subscription.vo.js';
export * from './value-objects/composites/vendor-permission.vo.js';

// ═══ Events ═══
export * from './events/index.js';

// ═══ Entities ═══
export * from './entities/index.js';

// ═══ Repositories ═══
export * from './repositories/index.js';

// ═══ Event Store ═══
export * from './event-store/index.js';

// ═══ Services (explicit to avoid collisions) ═══
export * from './services/vendor-slug.service.js';
export * from './services/vendor-eligibility.service.js';
export * from './services/vendor-tier-calculator.service.js';
export * from './services/commission-calculator.service.js';
export * from './services/payout-eligibility.service.js';
export * from './services/payout-calculator.service.js';
export * from './services/settlement-calculator.service.js';
export * from './services/performance-calculator.service.js';
export * from './services/rating-calculator.service.js';
export * from './services/suspension-policy.service.js';
export * from './services/verification-policy.service.js';
export * from './services/team-permission.service.js';

// ═══ Specifications ═══
export * from './specifications/index.js';
