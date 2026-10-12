/**
 * Domain Services — Barrel
 * @module identity-service/domain/services
 */
export * from './credential-validator.service.js';
export * from './password-policy.service.js';
export * from './token-generator.service.js';
export * from './session-manager.service.js';
export * from './mfa-challenge.service.js';
export * from './backup-code.service.js';
export * from './login-attempt-tracker.service.js';
export * from './account-lock-policy.service.js';
export * from './device-trust.service.js';
export * from './otp-generator.service.js';
export * from './verification-validator.service.js';
export * from './social-account-linker.service.js';
export * from './oauth-flow.service.js';
export * from './sso-flow.service.js';
export * from './role-assigner.service.js';
export * from './permission-evaluator.service.js';

// User domain (new)
export * from './user-eligibility.service.js';
export * from './kyc-validator.service.js';
export * from './address-validator.service.js';
export * from './biometric-validator.service.js';
export * from './recovery-code-generator.service.js';

// NEW
export * from './profile-completion.service.js';
export * from './profile-visibility.service.js';
export * from './address-validation.service.js';
export * from './contact-validation.service.js';
export * from './kyc-eligibility.service.js';
export * from './preference-merger.service.js';
export * from './user-tier.service.js';
export * from './user-persona.service.js';
