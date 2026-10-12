/**
 * Prisma Repositories Module
 * @module identity-service/infrastructure/persistence/prisma
 *
 * Provides:
 *  - Concrete Prisma repository classes
 *  - DI token mappings so application/infrastructure services can
 *    inject via interfaces (SESSION_REPOSITORY, USER_REPOSITORY, ...)
 */
import { Module } from '@nestjs/common';
import { AuthPrismaModule } from './prisma.module.js';
import {
  AuthPrismaRepository,
  SessionPrismaRepository,
  TokenPrismaRepository,
  MfaPrismaRepository,
  DevicePrismaRepository,
  AccountLockPrismaRepository,
  LoginAttemptPrismaRepository,
  BackupCodePrismaRepository,
  CredentialPrismaRepository,
  VerificationPrismaRepository,
  SocialAccountPrismaRepository,
  OAuthClientPrismaRepository,
  SsoConfigPrismaRepository,
  RolePrismaRepository,
  PermissionPrismaRepository,
  UserPrismaRepository,
  UserProfilePrismaRepository,
  UserSettingsPrismaRepository,
  UserPreferencesPrismaRepository,
  UserAddressPrismaRepository,
  UserContactPrismaRepository,
  UserVerificationPrismaRepository,
  UserKycPrismaRepository,
  UserActivityPrismaRepository,
  Auth2FaPrismaRepository,
  AuthBiometricPrismaRepository,
  AuthRecoveryCodePrismaRepository,
} from './repositories/index.js';

// DI Tokens
import { AUTH_REPOSITORY } from '../../../domain/repositories/auth.repository.interface.js';
import { SESSION_REPOSITORY } from '../../../domain/repositories/session.repository.interface.js';
import { TOKEN_REPOSITORY } from '../../../domain/repositories/token.repository.interface.js';
import { MFA_REPOSITORY } from '../../../domain/repositories/mfa.repository.interface.js';
import { DEVICE_REPOSITORY } from '../../../domain/repositories/device.repository.interface.js';
import { ACCOUNT_LOCK_REPOSITORY } from '../../../domain/repositories/account-lock.repository.interface.js';
import { LOGIN_ATTEMPT_REPOSITORY } from '../../../domain/repositories/login-attempt.repository.interface.js';
import { BACKUP_CODE_REPOSITORY } from '../../../domain/repositories/backup-code.repository.interface.js';
import { CREDENTIAL_REPOSITORY } from '../../../domain/repositories/credential.repository.interface.js';
import { VERIFICATION_REPOSITORY } from '../../../domain/repositories/verification.repository.interface.js';
import { SOCIAL_ACCOUNT_REPOSITORY } from '../../../domain/repositories/social-account.repository.interface.js';
import { OAUTH_CLIENT_REPOSITORY } from '../../../domain/repositories/oauth-client.repository.interface.js';
import { SSO_CONFIG_REPOSITORY } from '../../../domain/repositories/sso-config.repository.interface.js';
import { ROLE_REPOSITORY } from '../../../domain/repositories/role.repository.interface.js';
import { PERMISSION_REPOSITORY } from '../../../domain/repositories/permission.repository.interface.js';
import { USER_REPOSITORY } from '../../../domain/repositories/user.repository.interface.js';
import { USER_PROFILE_REPOSITORY } from '../../../domain/repositories/user-profile.repository.interface.js';
import { USER_SETTINGS_REPOSITORY } from '../../../domain/repositories/user-settings.repository.interface.js';
import { USER_PREFERENCES_REPOSITORY } from '../../../domain/repositories/user-preferences.repository.interface.js';
import { USER_ADDRESS_REPOSITORY } from '../../../domain/repositories/user-address.repository.interface.js';
import { USER_CONTACT_REPOSITORY } from '../../../domain/repositories/user-contact.repository.interface.js';
import { USER_VERIFICATION_REPOSITORY } from '../../../domain/repositories/user-verification.repository.interface.js';
import { USER_KYC_REPOSITORY } from '../../../domain/repositories/user-kyc.repository.interface.js';
import { USER_ACTIVITY_REPOSITORY } from '../../../domain/repositories/user-activity.repository.interface.js';
import { AUTH_2FA_REPOSITORY } from '../../../domain/repositories/auth-2fa.repository.interface.js';
import { AUTH_BIOMETRIC_REPOSITORY } from '../../../domain/repositories/auth-biometric.repository.interface.js';
import { AUTH_RECOVERY_CODE_REPOSITORY } from '../../../domain/repositories/auth-recovery-code.repository.interface.js';

const REPOSITORIES = [
  AuthPrismaRepository,
  SessionPrismaRepository,
  TokenPrismaRepository,
  MfaPrismaRepository,
  DevicePrismaRepository,
  AccountLockPrismaRepository,
  LoginAttemptPrismaRepository,
  BackupCodePrismaRepository,
  CredentialPrismaRepository,
  VerificationPrismaRepository,
  SocialAccountPrismaRepository,
  OAuthClientPrismaRepository,
  SsoConfigPrismaRepository,
  RolePrismaRepository,
  PermissionPrismaRepository,
  UserPrismaRepository,
  UserProfilePrismaRepository,
  UserSettingsPrismaRepository,
  UserPreferencesPrismaRepository,
  UserAddressPrismaRepository,
  UserContactPrismaRepository,
  UserVerificationPrismaRepository,
  UserKycPrismaRepository,
  UserActivityPrismaRepository,
  Auth2FaPrismaRepository,
  AuthBiometricPrismaRepository,
  AuthRecoveryCodePrismaRepository,
];

const TOKEN_PROVIDERS = [
  { provide: AUTH_REPOSITORY, useExisting: AuthPrismaRepository },
  { provide: SESSION_REPOSITORY, useExisting: SessionPrismaRepository },
  { provide: TOKEN_REPOSITORY, useExisting: TokenPrismaRepository },
  { provide: MFA_REPOSITORY, useExisting: MfaPrismaRepository },
  { provide: DEVICE_REPOSITORY, useExisting: DevicePrismaRepository },
  { provide: ACCOUNT_LOCK_REPOSITORY, useExisting: AccountLockPrismaRepository },
  { provide: LOGIN_ATTEMPT_REPOSITORY, useExisting: LoginAttemptPrismaRepository },
  { provide: BACKUP_CODE_REPOSITORY, useExisting: BackupCodePrismaRepository },
  { provide: CREDENTIAL_REPOSITORY, useExisting: CredentialPrismaRepository },
  { provide: VERIFICATION_REPOSITORY, useExisting: VerificationPrismaRepository },
  { provide: SOCIAL_ACCOUNT_REPOSITORY, useExisting: SocialAccountPrismaRepository },
  { provide: OAUTH_CLIENT_REPOSITORY, useExisting: OAuthClientPrismaRepository },
  { provide: SSO_CONFIG_REPOSITORY, useExisting: SsoConfigPrismaRepository },
  { provide: ROLE_REPOSITORY, useExisting: RolePrismaRepository },
  { provide: PERMISSION_REPOSITORY, useExisting: PermissionPrismaRepository },
  { provide: USER_REPOSITORY, useExisting: UserPrismaRepository },
  { provide: USER_PROFILE_REPOSITORY, useExisting: UserProfilePrismaRepository },
  { provide: USER_SETTINGS_REPOSITORY, useExisting: UserSettingsPrismaRepository },
  { provide: USER_PREFERENCES_REPOSITORY, useExisting: UserPreferencesPrismaRepository },
  { provide: USER_ADDRESS_REPOSITORY, useExisting: UserAddressPrismaRepository },
  { provide: USER_CONTACT_REPOSITORY, useExisting: UserContactPrismaRepository },
  { provide: USER_VERIFICATION_REPOSITORY, useExisting: UserVerificationPrismaRepository },
  { provide: USER_KYC_REPOSITORY, useExisting: UserKycPrismaRepository },
  { provide: USER_ACTIVITY_REPOSITORY, useExisting: UserActivityPrismaRepository },
  { provide: AUTH_2FA_REPOSITORY, useExisting: Auth2FaPrismaRepository },
  { provide: AUTH_BIOMETRIC_REPOSITORY, useExisting: AuthBiometricPrismaRepository },
  { provide: AUTH_RECOVERY_CODE_REPOSITORY, useExisting: AuthRecoveryCodePrismaRepository },
];

@Module({
  imports: [AuthPrismaModule],
  providers: [...REPOSITORIES, ...TOKEN_PROVIDERS],
  exports: [...REPOSITORIES, ...TOKEN_PROVIDERS],
})
export class PrismaRepositoriesModule {}
