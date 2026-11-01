/**
 * Primitives VOs — Barrel
 * @module identity-service/domain/value-objects/primitives
 */

// ═══ IDs (BaseIdVO) ═══
export * from './auth-id.vo.js';
export * from './session-id.vo.js';
export * from './token-id.vo.js';
export * from './device-id.vo.js';
export * from './verification-id.vo.js';
export * from './mfa-id.vo.js';
export * from './user-id.vo.js';
export * from './role-id.vo.js';
export * from './address-id.vo.js';
export * from './kyc-id.vo.js';
export * from './activity-id.vo.js';
export * from './biometric-id.vo.js';
export * from './contact-id.vo.js';        // NEW
export * from './preference-id.vo.js';     // NEW
export * from './setting-id.vo.js';        // NEW

// ═══ Auth Types/Status ═══
export * from './auth-type.vo.js';
export * from './auth-status.vo.js';
export * from './auth-provider.vo.js';
export * from './auth-method.vo.js';
export * from './session-status.vo.js';
export * from './token-type.vo.js';
export * from './mfa-method.vo.js';
export * from './login-attempt-status.vo.js';
export * from './device-type.vo.js';

// ═══ User Types/Status ═══
export * from './user-status.vo.js';
export * from './user-type.vo.js';
export * from './user-role.vo.js';
export * from './user-gender.vo.js';       // NEW
export * from './user-language.vo.js';     // NEW
export * from './user-timezone.vo.js';     // NEW

// ═══ Profile VOs ═══
export * from './user-avatar.vo.js';       // NEW
export * from './user-bio.vo.js';          // NEW
export * from './profile-visibility.vo.js';// NEW

// ═══ Address Types ═══
export * from './address-type.vo.js';
export * from './address-label.vo.js';     // NEW
export * from './district.vo.js';          // NEW
export * from './division.vo.js';          // NEW

// ═══ KYC ═══
export * from './kyc-status.vo.js';
export * from './kyc-document-type.vo.js';
export * from './kyc-document.vo.js';      // NEW

// ═══ Activity ═══
export * from './activity-type.vo.js';
export * from './activity-timestamp.vo.js';// NEW

// ═══ Biometric ═══
export * from './biometric-type.vo.js';
export * from './recovery-code-status.vo.js';
export * from './twofa-method.vo.js';
export * from './twofa-status.vo.js';

// ═══ Contact ═══
export * from './contact-type.vo.js';      // NEW
export * from './contact-value.vo.js';     // NEW

// ═══ Preference ═══
export * from './preference-key.vo.js';    // NEW
export * from './preference-value.vo.js';  // NEW

// ═══ Setting ═══
export * from './setting-key.vo.js';       // NEW
export * from './setting-value.vo.js';     // NEW

// ═══ Existing Email/Password/Name ═══
export * from './identifier.vo.js';
export * from './password-hash.vo.js';
export * from './otp-code.vo.js';
export * from './backup-code.vo.js';
export * from './token-value.vo.js';
export * from './user-email.vo.js';
export * from './user-phone.vo.js';
export * from './user-name.vo.js';
export * from './user-permission.vo.js';
export * from './address-line.vo.js';
export * from './city.vo.js';
export * from './postal-code.vo.js';
export * from './recovery-code-value.vo.js';

// ═══ Misc ═══
export * from './device-fingerprint.vo.js';
export * from './mfa-secret.vo.js';
export * from './ip-address.vo.js';
export * from './user-agent.vo.js';
export * from './token-expiry.vo.js';
export * from './session-expiry.vo.js';
export * from './lock-reason.vo.js';
export * from './lock-duration.vo.js';
export * from './verification-channel.vo.js';
export * from './verification-purpose.vo.js';
export * from './verification-status.vo.js';
export * from './social-provider.vo.js';
export * from './oauth-grant-type.vo.js';
export * from './sso-provider.vo.js';
export * from './role-name.vo.js';
export * from './permission-name.vo.js';
