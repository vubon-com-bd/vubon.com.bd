import { Global, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { PrismaModule, RedisModule } from '@vubon/shared-kernel/infrastructure';

import { PrismaService } from '../infrastructure/persistence/prisma/prisma.service';
import { JwtService } from '@vubon/shared-kernel/infrastructure';
import { JwtMiddleware } from '../interfaces/middlewares/jwt.middleware';

// Repositories
import { UserPrismaRepository } from '../infrastructure/persistence/prisma/repositories/user.prisma.repository';
import { UserProfilePrismaRepository } from '../infrastructure/persistence/prisma/repositories/user-profile.prisma.repository';
import { UserSettingsPrismaRepository } from '../infrastructure/persistence/prisma/repositories/user-settings.prisma.repository';
import { UserPreferencesPrismaRepository } from '../infrastructure/persistence/prisma/repositories/user-preferences.prisma.repository';
import { UserAddressPrismaRepository } from '../infrastructure/persistence/prisma/repositories/user-address.prisma.repository';
import { UserContactPrismaRepository } from '../infrastructure/persistence/prisma/repositories/user-contact.prisma.repository';
import { UserVerificationPrismaRepository } from '../infrastructure/persistence/prisma/repositories/user-verification.prisma.repository';
import { UserKycPrismaRepository } from '../infrastructure/persistence/prisma/repositories/user-kyc.prisma.repository';
import { UserActivityPrismaRepository } from '../infrastructure/persistence/prisma/repositories/user-activity.prisma.repository';
import { AuthSessionPrismaRepository } from '../infrastructure/persistence/prisma/repositories/auth-session.prisma.repository';
import { AuthTokenPrismaRepository } from '../infrastructure/persistence/prisma/repositories/auth-token.prisma.repository';
import { AuthMfaPrismaRepository } from '../infrastructure/persistence/prisma/repositories/auth-mfa.prisma.repository';
import { AuthRecoveryCodePrismaRepository } from '../infrastructure/persistence/prisma/repositories/auth-recovery-code.prisma.repository';
import { AuthAccountLockPrismaRepository } from '../infrastructure/persistence/prisma/repositories/auth-account-lock.prisma.repository';
import { AuthLoginAttemptPrismaRepository } from '../infrastructure/persistence/prisma/repositories/auth-login-attempt.prisma.repository';
import { AuthDevicePrismaRepository } from '../infrastructure/persistence/prisma/repositories/auth-device.prisma.repository';
import { AuthSocialPrismaRepository } from '../infrastructure/persistence/prisma/repositories/auth-social.prisma.repository';
import { AuthOAuthPrismaRepository } from '../infrastructure/persistence/prisma/repositories/auth-oauth.prisma.repository';
import { AuthSsoPrismaRepository } from '../infrastructure/persistence/prisma/repositories/auth-sso.prisma.repository';
import { Auth2FaPrismaRepository } from '../infrastructure/persistence/prisma/repositories/auth-2fa.prisma.repository';
import { AuthBiometricPrismaRepository } from '../infrastructure/persistence/prisma/repositories/auth-biometric.prisma.repository';
import { AuthPermissionPrismaRepository } from '../infrastructure/persistence/prisma/repositories/auth-permission.prisma.repository';
import { AuthRolePrismaRepository } from '../infrastructure/persistence/prisma/repositories/auth-role.prisma.repository';

// Cache
import { UserCacheRepository } from '../infrastructure/persistence/cache/repositories/user.cache.repository';
import { AuthSessionCacheRepository } from '../infrastructure/persistence/cache/repositories/auth-session.cache.repository';
import { AuthTokenCacheRepository } from '../infrastructure/persistence/cache/repositories/auth-token.cache.repository';
import { AuthMfaCacheRepository } from '../infrastructure/persistence/cache/repositories/auth-mfa.cache.repository';
import { AuthAccountLockCacheRepository } from '../infrastructure/persistence/cache/repositories/auth-account-lock.cache.repository';

// Services — internal (Ports)
import { PasswordHasherService } from '../infrastructure/services/internal/password-hasher.service';
import { TokenGeneratorService } from '../infrastructure/services/internal/token-generator.service';
import { SessionTokenGeneratorService } from '../infrastructure/services/internal/session-token-generator.service';
import { MfaValidatorService } from '../infrastructure/services/internal/mfa-validator.service';
import { RecoveryCodeGeneratorService } from '../infrastructure/services/internal/recovery-code-generator.service';
import { DeviceFingerprintService } from '../infrastructure/services/internal/device-fingerprint.service';
import { SocialValidatorService } from '../infrastructure/services/internal/social-validator.service';
import { SsoValidatorService } from '../infrastructure/services/internal/sso-validator.service';
import { AccountLockValidatorService } from '../infrastructure/services/internal/account-lock-validator.service';
import { LoginAttemptTrackerService } from '../infrastructure/services/internal/login-attempt-tracker.service';
import { OAuthValidatorService } from '../infrastructure/services/internal/oauth-validator.service';
import { BiometricValidatorService } from '../infrastructure/services/internal/biometric-validator.service';
import { PermissionValidatorService } from '../infrastructure/services/internal/permission-validator.service';

// Application services
import { AuthService } from '../application/services/impl/auth.service';
import { AuthSessionService } from '../application/services/impl/auth-session.service';
import { AuthTokenService } from '../application/services/impl/auth-token.service';
import { AuthMfaService } from '../application/services/impl/auth-mfa.service';
import { AuthRecoveryCodeService } from '../application/services/impl/auth-recovery-code.service';
import { AuthAccountLockService } from '../application/services/impl/auth-account-lock.service';
import { AuthLoginAttemptService } from '../application/services/impl/auth-login-attempt.service';
import { AuthDeviceService } from '../application/services/impl/auth-device.service';
import { AuthSocialService } from '../application/services/impl/auth-social.service';
import { AuthOAuthService } from '../application/services/impl/auth-oauth.service';
import { AuthSsoService } from '../application/services/impl/auth-sso.service';
import { Auth2FaService } from '../application/services/impl/auth-2fa.service';
import { AuthBiometricService } from '../application/services/impl/auth-biometric.service';
import { AuthPermissionService } from '../application/services/impl/auth-permission.service';
import { AuthRoleService } from '../application/services/impl/auth-role.service';
import { AuthSettingsService } from '../application/services/impl/auth-settings.service';
import { UserService } from '../application/services/impl/user.service';
import { UserProfileService } from '../application/services/impl/user-profile.service';
import { UserSettingsService } from '../application/services/impl/user-settings.service';
import { UserPreferencesService } from '../application/services/impl/user-preferences.service';
import { UserAddressService } from '../application/services/impl/user-address.service';
import { UserContactService } from '../application/services/impl/user-contact.service';
import { UserVerificationService } from '../application/services/impl/user-verification.service';
import { UserKycService } from '../application/services/impl/user-kyc.service';
import { UserActivityService } from '../application/services/impl/user-activity.service';
import { UserPermissionService } from '../application/services/impl/user-permission.service';
import { UserRoleService } from '../application/services/impl/user-role.service';
import { UserPermissionPrismaRepository } from '../infrastructure/persistence/prisma/repositories/user-permission.prisma.repository';
import { UserRolePrismaRepository } from '../infrastructure/persistence/prisma/repositories/user-role.prisma.repository';

const REPOSITORIES = [
  UserPrismaRepository, UserProfilePrismaRepository, UserSettingsPrismaRepository,
  UserPreferencesPrismaRepository, UserAddressPrismaRepository, UserContactPrismaRepository,
  UserVerificationPrismaRepository, UserKycPrismaRepository, UserActivityPrismaRepository,
  AuthSessionPrismaRepository, AuthTokenPrismaRepository, AuthMfaPrismaRepository,
  AuthRecoveryCodePrismaRepository, AuthAccountLockPrismaRepository, AuthLoginAttemptPrismaRepository,
  AuthDevicePrismaRepository, AuthSocialPrismaRepository, AuthOAuthPrismaRepository,
  AuthSsoPrismaRepository, Auth2FaPrismaRepository, AuthBiometricPrismaRepository,
  AuthPermissionPrismaRepository, AuthRolePrismaRepository,
  UserPermissionPrismaRepository,
  UserRolePrismaRepository,
  UserCacheRepository, AuthSessionCacheRepository, AuthTokenCacheRepository,
  AuthMfaCacheRepository, AuthAccountLockCacheRepository,
];

const INTERNAL_SERVICES = [
  PasswordHasherService, TokenGeneratorService, SessionTokenGeneratorService,
  MfaValidatorService, RecoveryCodeGeneratorService, DeviceFingerprintService,
  SocialValidatorService, SsoValidatorService, AccountLockValidatorService,
  LoginAttemptTrackerService, OAuthValidatorService, BiometricValidatorService,
  PermissionValidatorService,
];

const APP_SERVICES = [
  AuthService, AuthSessionService, AuthTokenService, AuthMfaService,
  AuthRecoveryCodeService, AuthAccountLockService, AuthLoginAttemptService,
  AuthDeviceService, AuthSocialService, AuthOAuthService, AuthSsoService,
  Auth2FaService, AuthBiometricService, AuthPermissionService, AuthRoleService,
  AuthSettingsService, UserService, UserProfileService, UserSettingsService,
  UserPreferencesService, UserAddressService, UserContactService,
  UserVerificationService, UserKycService, UserActivityService,
  UserPermissionService, UserRoleService,
];

const BINDINGS = [
  { provide: 'PrismaService', useExisting: PrismaService },
  { provide: 'UserRepository', useExisting: UserPrismaRepository },
  { provide: 'UserProfileRepository', useExisting: UserProfilePrismaRepository },
  { provide: 'UserSettingsRepository', useExisting: UserSettingsPrismaRepository },
  { provide: 'UserPreferencesRepository', useExisting: UserPreferencesPrismaRepository },
  { provide: 'UserAddressRepository', useExisting: UserAddressPrismaRepository },
  { provide: 'UserContactRepository', useExisting: UserContactPrismaRepository },
  { provide: 'UserVerificationRepository', useExisting: UserVerificationPrismaRepository },
  { provide: 'UserKycRepository', useExisting: UserKycPrismaRepository },
  { provide: 'UserActivityRepository', useExisting: UserActivityPrismaRepository },
  { provide: 'AuthSessionRepository', useExisting: AuthSessionPrismaRepository },
  { provide: 'AuthTokenRepository', useExisting: AuthTokenPrismaRepository },
  { provide: 'AuthMfaRepository', useExisting: AuthMfaPrismaRepository },
  { provide: 'AuthRecoveryCodeRepository', useExisting: AuthRecoveryCodePrismaRepository },
  { provide: 'AuthAccountLockRepository', useExisting: AuthAccountLockPrismaRepository },
  { provide: 'AuthLoginAttemptRepository', useExisting: AuthLoginAttemptPrismaRepository },
  { provide: 'AuthDeviceRepository', useExisting: AuthDevicePrismaRepository },
  { provide: 'AuthSocialRepository', useExisting: AuthSocialPrismaRepository },
  { provide: 'AuthOAuthRepository', useExisting: AuthOAuthPrismaRepository },
  { provide: 'AuthSsoRepository', useExisting: AuthSsoPrismaRepository },
  { provide: 'Auth2FaRepository', useExisting: Auth2FaPrismaRepository },
  { provide: 'AuthBiometricRepository', useExisting: AuthBiometricPrismaRepository },
  { provide: 'AuthPermissionRepository', useExisting: AuthPermissionPrismaRepository },
  { provide: 'AuthRoleRepository', useExisting: AuthRolePrismaRepository },

  { provide: 'PasswordHasherPort', useExisting: PasswordHasherService },
  { provide: 'TokenGeneratorPort', useExisting: TokenGeneratorService },
  { provide: 'SessionTokenGeneratorPort', useExisting: SessionTokenGeneratorService },
  { provide: 'MfaValidatorPort', useExisting: MfaValidatorService },
  { provide: 'RecoveryCodeGeneratorPort', useExisting: RecoveryCodeGeneratorService },
  { provide: 'DeviceFingerprintPort', useExisting: DeviceFingerprintService },
  { provide: 'SocialValidatorPort', useExisting: SocialValidatorService },
  { provide: 'SsoValidatorPort', useExisting: SsoValidatorService },

  { provide: 'AuthService', useExisting: AuthService },
  { provide: 'AuthSessionService', useExisting: AuthSessionService },
  { provide: 'AuthTokenService', useExisting: AuthTokenService },
  { provide: 'AuthMfaService', useExisting: AuthMfaService },
  { provide: 'AuthRecoveryCodeService', useExisting: AuthRecoveryCodeService },
  { provide: 'AuthAccountLockService', useExisting: AuthAccountLockService },
  { provide: 'AuthLoginAttemptService', useExisting: AuthLoginAttemptService },
  { provide: 'AuthDeviceService', useExisting: AuthDeviceService },
  { provide: 'AuthSocialService', useExisting: AuthSocialService },
  { provide: 'AuthOAuthService', useExisting: AuthOAuthService },
  { provide: 'AuthSsoService', useExisting: AuthSsoService },
  { provide: 'Auth2FaService', useExisting: Auth2FaService },
  { provide: 'AuthBiometricService', useExisting: AuthBiometricService },
  { provide: 'AuthPermissionService', useExisting: AuthPermissionService },
  { provide: 'AuthRoleService', useExisting: AuthRoleService },
  { provide: 'AuthSettingsService', useExisting: AuthSettingsService },
  { provide: 'UserService', useExisting: UserService },
  { provide: 'UserProfileService', useExisting: UserProfileService },
  { provide: 'UserSettingsService', useExisting: UserSettingsService },
  { provide: 'UserPreferencesService', useExisting: UserPreferencesService },
  { provide: 'UserAddressService', useExisting: UserAddressService },
  { provide: 'UserContactService', useExisting: UserContactService },
  { provide: 'UserVerificationService', useExisting: UserVerificationService },
  { provide: 'UserKycService', useExisting: UserKycService },
  { provide: 'UserActivityService', useExisting: UserActivityService },
  { provide: 'UserPermissionRepository', useExisting: UserPermissionPrismaRepository },
  { provide: 'UserRoleRepository', useExisting: UserRolePrismaRepository },
  { provide: 'UserPermissionService', useExisting: UserPermissionService },
  { provide: 'UserRoleService', useExisting: UserRoleService },
];

@Global()
@Module({
  imports: [CqrsModule, PrismaModule, RedisModule],
  providers: [PrismaService, JwtService, JwtMiddleware, ...REPOSITORIES, ...INTERNAL_SERVICES, ...APP_SERVICES, ...BINDINGS],
  exports: [PrismaService, JwtService, JwtMiddleware, ...REPOSITORIES, ...INTERNAL_SERVICES, ...APP_SERVICES, ...BINDINGS],
})
export class ServiceRegistryModule {}
