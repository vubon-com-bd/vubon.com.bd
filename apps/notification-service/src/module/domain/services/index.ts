// notification-service/domain/services/index.ts
// Service barrel export

// ─── Core build pipeline ─────────────────
export * from './notification-builder.service.js';
export * from './channel-selector.service.js';
export * from './priority-calculator.service.js';
export * from './recipient-resolver.service.js';

// ─── Template engine ─────────────────────
export * from './template-renderer.service.js';
export * from './template-validator.service.js';
export * from './variable-interpolator.service.js';
export * from './personalization.service.js';

// ─── Scheduling ──────────────────────────
export * from './schedule-calculator.service.js';
export * from './schedule-matcher.service.js';
export * from './digest-builder.service.js';
export * from './digest-scheduler.service.js';

// ─── Rules & Policies ────────────────────
export * from './preference-checker.service.js';
export * from './rate-limiter.service.js';
export * from './quiet-hours.service.js';

// ─── Delivery pipeline ───────────────────
export * from './retry-policy.service.js';
export * from './bounce-handler.service.js';
export * from './unsubscribe.service.js';
export * from './content-splitter.service.js';
export * from './delivery-tracker.service.js';
