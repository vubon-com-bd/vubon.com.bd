/**
 * AuthCommonModule — Global providers shared across feature modules
 * @module auth-service/modules/common
 *
 * Registers all cross-cutting internal/external services AND binds
 * string DI tokens to their concrete classes so @Inject(TOKEN) resolves.
 */
import { Global, Module } from '@nestjs/common';

// Kernel external modules
import { EmailModule } from '@vubon/shared-kernel/infrastructure/external/email/index';
import { SmsModule } from '@vubon/shared-kernel/infrastructure/external/sms/index';
import { PushModule } from '@vubon/shared-kernel/infrastructure/external/push/index';

// Internal services
import { PasswordHasherService } from '../../infrastructure/services/internal/password-hasher.service';
import { PasswordValidatorService } from '../../infrastructure/services/internal/password-validator.service';
import { IdGeneratorService } from '../../infrastructure/services/internal/id-generator.service';
import { TotpService } from '../../infrastructure/services/internal/totp.service';
import { TokenSignerService } from '../../infrastructure/services/internal/token-signer.service';
import { TokenGeneratorService } from '../../infrastructure/services/internal/token-generator.service';
import { SessionManagerService } from '../../infrastructure/services/internal/session-manager.service';
import { MfaValidatorService } from '../../infrastructure/services/internal/mfa-validator.service';
import { AccountLockValidatorService } from '../../infrastructure/services/internal/account-lock-validator.service';
import { LoginAttemptTrackerService } from '../../infrastructure/services/internal/login-attempt-tracker.service';
import { DeviceFingerprintService } from '../../infrastructure/services/internal/device-fingerprint.service';
import { RecoveryCodeGeneratorService } from '../../infrastructure/services/internal/recovery-code-generator.service';
import { RateLimiterService } from '../../infrastructure/services/internal/rate-limiter.service';
import { SocialValidatorService } from '../../infrastructure/services/internal/social-validator.service';
import { OAuthValidatorService } from '../../infrastructure/services/internal/oauth-validator.service';
import { SsoValidatorService } from '../../infrastructure/services/internal/sso-validator.service';
import { BiometricValidatorService } from '../../infrastructure/services/internal/biometric-validator.service';
import { PermissionValidatorService } from '../../infrastructure/services/internal/permission-validator.service';
import { UnitOfWorkService } from '../../infrastructure/services/internal/unit-of-work.service';

// External wrappers
import { EmailService } from '../../infrastructure/services/external/email.service';
import { SmsService } from '../../infrastructure/services/external/sms.service';
import { PushService } from '../../infrastructure/services/external/push.service';

// Central tokens
import {
  PASSWORD_HASHER,
  TOKEN_SIGNER,
  ID_GENERATOR,
  TOTP_SERVICE,
  RECOVERY_CODE_GENERATOR,
} from '../../application/services/tokens';

const INTERNAL_SERVICES = [
  PasswordHasherService,
  PasswordValidatorService,
  IdGeneratorService,
  TotpService,
  TokenSignerService,
  TokenGeneratorService,
  SessionManagerService,
  MfaValidatorService,
  AccountLockValidatorService,
  LoginAttemptTrackerService,
  DeviceFingerprintService,
  RecoveryCodeGeneratorService,
  RateLimiterService,
  SocialValidatorService,
  OAuthValidatorService,
  SsoValidatorService,
  BiometricValidatorService,
  PermissionValidatorService,
  UnitOfWorkService,
];

const EXTERNAL_WRAPPERS = [EmailService, SmsService, PushService];

const TOKEN_BINDINGS = [
  { provide: PASSWORD_HASHER, useExisting: PasswordHasherService },
  { provide: TOKEN_SIGNER, useExisting: TokenSignerService },
  { provide: ID_GENERATOR, useExisting: IdGeneratorService },
  { provide: TOTP_SERVICE, useExisting: TotpService },
  { provide: RECOVERY_CODE_GENERATOR, useExisting: RecoveryCodeGeneratorService },
];

@Global()
@Module({
  imports: [EmailModule, SmsModule, PushModule],
  providers: [
    ...INTERNAL_SERVICES,
    ...EXTERNAL_WRAPPERS,
    ...TOKEN_BINDINGS,
  ],
  exports: [
    ...INTERNAL_SERVICES,
    ...EXTERNAL_WRAPPERS,
    ...TOKEN_BINDINGS.map((b) => b.provide),
  ],
})
export class AuthCommonModule {}
