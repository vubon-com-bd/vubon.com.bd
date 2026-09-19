import { Module } from '@nestjs/common';

// Kernel modules (global) — re-imported for DI
import {
  PrismaModule,
  RedisModule,
  EmailModule,
  SmsModule,
  PushModule,
  QueueModule,
} from '@vubon/shared-kernel/infrastructure';

// App-level Prisma module
import { PrismaModule as AppPrismaModule } from './persistence/prisma/prisma.module';

// Repositories
import {
  UserPrismaRepository,
  UserProfilePrismaRepository,
  UserSettingsPrismaRepository,
  UserPreferencesPrismaRepository,
  UserAddressPrismaRepository,
  UserContactPrismaRepository,
  UserVerificationPrismaRepository,
  UserKycPrismaRepository,
  UserActivityPrismaRepository,
  AuthSessionPrismaRepository,
  AuthTokenPrismaRepository,
  AuthMfaPrismaRepository,
  AuthRecoveryCodePrismaRepository,
  AuthAccountLockPrismaRepository,
  AuthLoginAttemptPrismaRepository,
  AuthDevicePrismaRepository,
  AuthSocialPrismaRepository,
  AuthOAuthPrismaRepository,
  AuthSsoPrismaRepository,
  Auth2FaPrismaRepository,
  AuthBiometricPrismaRepository,
  AuthPermissionPrismaRepository,
  AuthRolePrismaRepository,
} from './persistence/prisma/repositories';

import {
  UserCacheRepository,
  AuthSessionCacheRepository,
  AuthTokenCacheRepository,
  AuthMfaCacheRepository,
  AuthAccountLockCacheRepository,
} from './persistence/cache/repositories';

// Internal services (16)
import {
  PasswordHasherService,
  TokenGeneratorService,
  SessionTokenGeneratorService,
  MfaValidatorService,
  RecoveryCodeGeneratorService,
  DeviceFingerprintService,
  SocialValidatorService,
  SsoValidatorService,
  PasswordValidatorService,
  SessionManagerService,
  AccountLockValidatorService,
  LoginAttemptTrackerService,
  OAuthValidatorService,
  BiometricValidatorService,
  PermissionValidatorService,
  RateLimiterService,
} from './services/internal';

// External services (3)
import {
  EmailService,
  SmsService,
  PushService,
} from './services/external';

// Queues (5)
import {
  AuthQueue,
  SessionQueue,
  TokenQueue,
  NotificationQueue,
  AnalyticsQueue,
} from './queues';

// Workers (8)
import {
  AuthProcessorWorker,
  SessionCleanupWorker,
  TokenCleanupWorker,
  AccountLockWorker,
  LoginAttemptWorker,
  DeviceSyncWorker,
  SocialSyncWorker,
  AnalyticsProcessorWorker,
} from './workers';

// ─── Application ports (for DI binding) ────────────────────
import type {
  PasswordHasherPort,
  TokenGeneratorPort,
  SessionTokenGeneratorPort,
  MfaValidatorPort,
  RecoveryCodeGeneratorPort,
  DeviceFingerprintPort,
  SocialValidatorPort,
  SsoValidatorPort,
} from '../application/ports';

// ─── Domain repositories ───────────────────────────────────
import type { UserRepository } from '../domain/repositories/user.repository.interface';

const REPOSITORIES = [
  UserPrismaRepository,
  UserProfilePrismaRepository,
  UserSettingsPrismaRepository,
  UserPreferencesPrismaRepository,
  UserAddressPrismaRepository,
  UserContactPrismaRepository,
  UserVerificationPrismaRepository,
  UserKycPrismaRepository,
  UserActivityPrismaRepository,
  AuthSessionPrismaRepository,
  AuthTokenPrismaRepository,
  AuthMfaPrismaRepository,
  AuthRecoveryCodePrismaRepository,
  AuthAccountLockPrismaRepository,
  AuthLoginAttemptPrismaRepository,
  AuthDevicePrismaRepository,
  AuthSocialPrismaRepository,
  AuthOAuthPrismaRepository,
  AuthSsoPrismaRepository,
  Auth2FaPrismaRepository,
  AuthBiometricPrismaRepository,
  AuthPermissionPrismaRepository,
  AuthRolePrismaRepository,
];

const CACHE_REPOSITORIES = [
  UserCacheRepository,
  AuthSessionCacheRepository,
  AuthTokenCacheRepository,
  AuthMfaCacheRepository,
  AuthAccountLockCacheRepository,
];

const INTERNAL_SERVICES = [
  PasswordHasherService,
  TokenGeneratorService,
  SessionTokenGeneratorService,
  MfaValidatorService,
  RecoveryCodeGeneratorService,
  DeviceFingerprintService,
  SocialValidatorService,
  SsoValidatorService,
  PasswordValidatorService,
  SessionManagerService,
  AccountLockValidatorService,
  LoginAttemptTrackerService,
  OAuthValidatorService,
  BiometricValidatorService,
  PermissionValidatorService,
  RateLimiterService,
];

const EXTERNAL_SERVICES = [EmailService, SmsService, PushService];

const QUEUES = [AuthQueue, SessionQueue, TokenQueue, NotificationQueue, AnalyticsQueue];

const WORKERS = [
  AuthProcessorWorker,
  SessionCleanupWorker,
  TokenCleanupWorker,
  AccountLockWorker,
  LoginAttemptWorker,
  DeviceSyncWorker,
  SocialSyncWorker,
  AnalyticsProcessorWorker,
];

// ─── Port → Service bindings ────────────────────────────────
const PORT_BINDINGS = [
  { provide: 'PasswordHasherPort', useExisting: PasswordHasherService },
  { provide: 'TokenGeneratorPort', useExisting: TokenGeneratorService },
  { provide: 'SessionTokenGeneratorPort', useExisting: SessionTokenGeneratorService },
  { provide: 'MfaValidatorPort', useExisting: MfaValidatorService },
  { provide: 'RecoveryCodeGeneratorPort', useExisting: RecoveryCodeGeneratorService },
  { provide: 'DeviceFingerprintPort', useExisting: DeviceFingerprintService },
  { provide: 'SocialValidatorPort', useExisting: SocialValidatorService },
  { provide: 'SsoValidatorPort', useExisting: SsoValidatorService },
];

// ─── Repository interface → Prisma impl bindings ────────────
const REPOSITORY_BINDINGS = [
  { provide: 'UserRepository', useExisting: UserPrismaRepository },
];

@Module({
  imports: [
    PrismaModule,
    AppPrismaModule,
    RedisModule,
    EmailModule,
    SmsModule,
    PushModule,
    QueueModule,
  ],
  providers: [
    ...REPOSITORIES,
    ...CACHE_REPOSITORIES,
    ...INTERNAL_SERVICES,
    ...EXTERNAL_SERVICES,
    ...QUEUES,
    ...WORKERS,
    ...PORT_BINDINGS,
    ...REPOSITORY_BINDINGS,
  ],
  exports: [
    AppPrismaModule,
    ...REPOSITORIES,
    ...CACHE_REPOSITORIES,
    ...INTERNAL_SERVICES,
    ...EXTERNAL_SERVICES,
    ...QUEUES,
    ...PORT_BINDINGS,
    ...REPOSITORY_BINDINGS,
  ],
})
export class InfrastructureModule {}
