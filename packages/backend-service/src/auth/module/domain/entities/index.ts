/**
 * Entities Exports
 * Central export point for all entities in the auth domain
 */

// Export base entity
export { BaseEntity } from './base.entity';

// Export user entity
export { User } from './user.entity';

// Export session entity
export { Session } from './session.entity';

// Export social account entity
export { SocialAccount } from './social-account.entity';

// Export MFA entity
export { MFA } from './mfa.entity';

// Export refresh token entity
export { RefreshToken } from './refresh-token.entity';

// Export email verification entity
export { EmailVerification } from './email-verification.entity';

// Export password reset entity
export { PasswordReset } from './password-reset.entity';

// Export user types
export type { UserStatus, UserMetadata } from './user.entity';

// Export session types
export type { SessionStatus, SessionDeviceInfo } from './session.entity';

// Export social account types
export type { SocialProvider } from './social-account.entity';

// Export MFA types
export type { MFAType, MFAStatus } from './mfa.entity';

// Export email verification types
export type { EmailVerificationStatus } from './email-verification.entity';

// Export password reset types
export type { PasswordResetStatus } from './password-reset.entity';

// Note: Import and export other entities as they are created
// export { Token } from './token.entity';
// export { Role } from './role.entity';
// export { Permission } from './permission.entity';
