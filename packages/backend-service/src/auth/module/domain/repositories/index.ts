/**
 * Repositories Exports
 * Central export point for all repository interfaces and types in the auth domain
 */

// Export base repository interface and its associated types
export {
  type IBaseRepository,
  type PaginationOptions,
  type PaginatedResult,
} from './base.repository.interface';

// Export user repository interface
export { type IUserRepository } from './user.repository.interface';

// Export session repository interface
export { type ISessionRepository } from './session.repository.interface';

// Export MFA repository interface
export { type IMfaRepository } from './mfa.repository.interface';

// Export refresh token repository interface
export { type IRefreshTokenRepository } from './refresh-token.repository.interface';

// Export account lock repository interface
export { type IAccountLockRepository } from './account-lock.repository.interface';

// Export social account repository interface
export { type ISocialAccountRepository } from './social-account.repository.interface';

// Export login attempt repository interface
export { type ILoginAttemptRepository } from './login-attempt.repository.interface';

// Export email verification repository interface
export { type IEmailVerificationRepository } from './email-verification.repository.interface';

// Export password reset repository interface
export { type IPasswordResetRepository } from './password-reset.repository.interface';
