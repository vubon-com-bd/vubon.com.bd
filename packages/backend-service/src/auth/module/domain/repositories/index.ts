/**
 * Repositories Exports
 * Central export point for all repository interfaces
 */

// ✅ Export base repository interface
export { IBaseRepository } from './base.repository.interface';

// ✅ Export user repository interface
export { IUserRepository } from './user.repository.interface';

// ✅ Export session repository interface
export { ISessionRepository } from './session.repository.interface';

// ✅ Export MFA repository interface
export { IMfaRepository } from './mfa.repository.interface';

// ✅ Export refresh token repository interface
export { IRefreshTokenRepository } from './refresh-token.repository.interface';

// ✅ Export email verification repository interface
export { IEmailVerificationRepository } from './email-verification.repository.interface';

// ✅ Export password reset repository interface
export { IPasswordResetRepository } from './password-reset.repository.interface';

// ✅ Export account lock repository interface
export { IAccountLockRepository } from './account-lock.repository.interface';

// ✅ Export login attempt repository interface
export { ILoginAttemptRepository } from './login-attempt.repository.interface';

// ✅ Export device repository interface
export { IDeviceRepository } from './device.repository.interface';

// ✅ Export social account repository interface
export { ISocialAccountRepository } from './social-account.repository.interface';

// ✅ Export security event repository interface
export { ISecurityEventRepository } from './security-event.repository.interface';

// ✅ Export permission repository interface
export { IPermissionRepository } from './permission.repository.interface';

// ✅ Export role repository interface
export { IRoleRepository } from './role.repository.interface';
