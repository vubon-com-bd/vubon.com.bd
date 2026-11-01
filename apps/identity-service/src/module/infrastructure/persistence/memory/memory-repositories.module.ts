/**
 * Memory Repositories Module — All 27 InMemory repos
 * @module identity-service/infrastructure/persistence/memory
 */
import { Module } from '@nestjs/common';

// Auth
import { InMemoryAuthRepository } from './repositories/auth.memory.repository.js';
import { InMemorySessionRepository } from './repositories/session.memory.repository.js';
import { InMemoryTokenRepository } from './repositories/token.memory.repository.js';
import { InMemoryMfaRepository } from './repositories/mfa.memory.repository.js';
import { InMemoryAccountLockRepository } from './repositories/account-lock.memory.repository.js';
import { InMemoryLoginAttemptRepository } from './repositories/login-attempt.memory.repository.js';
import { InMemoryDeviceRepository } from './repositories/device.memory.repository.js';
import { InMemoryBackupCodeRepository } from './repositories/backup-code.memory.repository.js';
import { InMemoryCredentialRepository } from './repositories/credential.memory.repository.js';
import { InMemoryVerificationRepository } from './repositories/verification.memory.repository.js';
import { InMemorySocialAccountRepository } from './repositories/social-account.memory.repository.js';
import { InMemoryOAuthClientRepository } from './repositories/oauth-client.memory.repository.js';
import { InMemorySsoConfigRepository } from './repositories/sso-config.memory.repository.js';
import { InMemoryRoleRepository } from './repositories/role.memory.repository.js';
import { InMemoryPermissionRepository } from './repositories/permission.memory.repository.js';
import { InMemoryAuth2FaRepository } from './repositories/auth-2fa.memory.repository.js';
import { InMemoryAuthBiometricRepository } from './repositories/auth-biometric.memory.repository.js';
import { InMemoryAuthRecoveryCodeRepository } from './repositories/auth-recovery-code.memory.repository.js';

// User
import { InMemoryUserRepository } from './repositories/user.memory.repository.js';
import { InMemoryUserProfileRepository } from './repositories/user-profile.memory.repository.js';
import { InMemoryUserSettingsRepository } from './repositories/user-settings.memory.repository.js';
import { InMemoryUserPreferencesRepository } from './repositories/user-preferences.memory.repository.js';
import { InMemoryUserAddressRepository } from './repositories/user-address.memory.repository.js';
import { InMemoryUserContactRepository } from './repositories/user-contact.memory.repository.js';
import { InMemoryUserVerificationRepository } from './repositories/user-verification.memory.repository.js';
import { InMemoryUserKycRepository } from './repositories/user-kyc.memory.repository.js';
import { InMemoryUserActivityRepository } from './repositories/user-activity.memory.repository.js';

// DI Tokens
import { AUTH_REPOSITORY } from '../../../domain/repositories/auth.repository.interface.js';
import { SESSION_REPOSITORY } from '../../../domain/repositories/session.repository.interface.js';
import { TOKEN_REPOSITORY } from '../../../domain/repositories/token.repository.interface.js';
import { MFA_REPOSITORY } from '../../../domain/repositories/mfa.repository.interface.js';
import { ACCOUNT_LOCK_REPOSITORY } from '../../../domain/repositories/account-lock.repository.interface.js';
import { LOGIN_ATTEMPT_REPOSITORY } from '../../../domain/repositories/login-attempt.repository.interface.js';
import { DEVICE_REPOSITORY } from '../../../domain/repositories/device.repository.interface.js';
import { BACKUP_CODE_REPOSITORY } from '../../../domain/repositories/backup-code.repository.interface.js';
import { CREDENTIAL_REPOSITORY } from '../../../domain/repositories/credential.repository.interface.js';
import { VERIFICATION_REPOSITORY } from '../../../domain/repositories/verification.repository.interface.js';
import { SOCIAL_ACCOUNT_REPOSITORY } from '../../../domain/repositories/social-account.repository.interface.js';
import { OAUTH_CLIENT_REPOSITORY } from '../../../domain/repositories/oauth-client.repository.interface.js';
import { SSO_CONFIG_REPOSITORY } from '../../../domain/repositories/sso-config.repository.interface.js';
import { ROLE_REPOSITORY } from '../../../domain/repositories/role.repository.interface.js';
import { PERMISSION_REPOSITORY } from '../../../domain/repositories/permission.repository.interface.js';
import { AUTH_2FA_REPOSITORY } from '../../../domain/repositories/auth-2fa.repository.interface.js';
import { AUTH_BIOMETRIC_REPOSITORY } from '../../../domain/repositories/auth-biometric.repository.interface.js';
import { AUTH_RECOVERY_CODE_REPOSITORY } from '../../../domain/repositories/auth-recovery-code.repository.interface.js';
import { USER_REPOSITORY } from '../../../domain/repositories/user.repository.interface.js';
import { USER_PROFILE_REPOSITORY } from '../../../domain/repositories/user-profile.repository.interface.js';
import { USER_SETTINGS_REPOSITORY } from '../../../domain/repositories/user-settings.repository.interface.js';
import { USER_PREFERENCES_REPOSITORY } from '../../../domain/repositories/user-preferences.repository.interface.js';
import { USER_ADDRESS_REPOSITORY } from '../../../domain/repositories/user-address.repository.interface.js';
import { USER_CONTACT_REPOSITORY } from '../../../domain/repositories/user-contact.repository.interface.js';
import { USER_VERIFICATION_REPOSITORY } from '../../../domain/repositories/user-verification.repository.interface.js';
import { USER_KYC_REPOSITORY } from '../../../domain/repositories/user-kyc.repository.interface.js';
import { USER_ACTIVITY_REPOSITORY } from '../../../domain/repositories/user-activity.repository.interface.js';

const REPOSITORIES = [
  // Auth
  { provide: AUTH_REPOSITORY, useClass: InMemoryAuthRepository },
  { provide: SESSION_REPOSITORY, useClass: InMemorySessionRepository },
  { provide: TOKEN_REPOSITORY, useClass: InMemoryTokenRepository },
  { provide: MFA_REPOSITORY, useClass: InMemoryMfaRepository },
  { provide: ACCOUNT_LOCK_REPOSITORY, useClass: InMemoryAccountLockRepository },
  { provide: LOGIN_ATTEMPT_REPOSITORY, useClass: InMemoryLoginAttemptRepository },
  { provide: DEVICE_REPOSITORY, useClass: InMemoryDeviceRepository },
  { provide: BACKUP_CODE_REPOSITORY, useClass: InMemoryBackupCodeRepository },
  { provide: CREDENTIAL_REPOSITORY, useClass: InMemoryCredentialRepository },
  { provide: VERIFICATION_REPOSITORY, useClass: InMemoryVerificationRepository },
  { provide: SOCIAL_ACCOUNT_REPOSITORY, useClass: InMemorySocialAccountRepository },
  { provide: OAUTH_CLIENT_REPOSITORY, useClass: InMemoryOAuthClientRepository },
  { provide: SSO_CONFIG_REPOSITORY, useClass: InMemorySsoConfigRepository },
  { provide: ROLE_REPOSITORY, useClass: InMemoryRoleRepository },
  { provide: PERMISSION_REPOSITORY, useClass: InMemoryPermissionRepository },
  { provide: AUTH_2FA_REPOSITORY, useClass: InMemoryAuth2FaRepository },
  { provide: AUTH_BIOMETRIC_REPOSITORY, useClass: InMemoryAuthBiometricRepository },
  { provide: AUTH_RECOVERY_CODE_REPOSITORY, useClass: InMemoryAuthRecoveryCodeRepository },

  // User
  { provide: USER_REPOSITORY, useClass: InMemoryUserRepository },
  { provide: USER_PROFILE_REPOSITORY, useClass: InMemoryUserProfileRepository },
  { provide: USER_SETTINGS_REPOSITORY, useClass: InMemoryUserSettingsRepository },
  { provide: USER_PREFERENCES_REPOSITORY, useClass: InMemoryUserPreferencesRepository },
  { provide: USER_ADDRESS_REPOSITORY, useClass: InMemoryUserAddressRepository },
  { provide: USER_CONTACT_REPOSITORY, useClass: InMemoryUserContactRepository },
  { provide: USER_VERIFICATION_REPOSITORY, useClass: InMemoryUserVerificationRepository },
  { provide: USER_KYC_REPOSITORY, useClass: InMemoryUserKycRepository },
  { provide: USER_ACTIVITY_REPOSITORY, useClass: InMemoryUserActivityRepository },
];

@Module({
  providers: REPOSITORIES,
  exports: REPOSITORIES,
})
export class MemoryRepositoriesModule {}
