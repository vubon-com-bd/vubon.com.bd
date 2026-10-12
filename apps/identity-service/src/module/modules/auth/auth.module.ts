/**
 * AuthModule — auth core feature
 * @module identity-service/modules/auth
 */
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

// Controllers
import { AuthController } from '../../interfaces/controllers/rest/auth.controller.js';
import { AuthMfaController } from '../../interfaces/controllers/rest/auth-mfa.controller.js';
import { AuthRecoveryCodeController } from '../../interfaces/controllers/rest/auth-recovery-code.controller.js';
import { AuthSessionController } from '../../interfaces/controllers/rest/auth-session.controller.js';
import { AuthTokenController } from '../../interfaces/controllers/rest/auth-token.controller.js';
import { AuthSettingsController } from '../../interfaces/controllers/rest/auth-settings.controller.js';

// Handler arrays
import { AUTH_COMMAND_HANDLERS } from './commands/index.js';
import { AUTH_QUERY_HANDLERS } from './queries/index.js';

// Application services
import { AuthService } from '../../application/services/impl/auth.service.js';
import { AuthMfaService } from '../../application/services/impl/auth-mfa.service.js';
import { AuthRecoveryCodeService } from '../../application/services/impl/auth-recovery-code.service.js';
import { AuthSessionService } from '../../application/services/impl/auth-session.service.js';
import { AuthTokenService } from '../../application/services/impl/auth-token.service.js';
import { AuthSettingsService } from '../../application/services/impl/auth-settings.service.js';

import { AUTH_SERVICE } from '../../application/services/interfaces/auth.service.interface.js';
import { AUTH_MFA_SERVICE } from '../../application/services/interfaces/auth-mfa.service.interface.js';
import { AUTH_RECOVERY_CODE_SERVICE } from '../../application/services/interfaces/auth-recovery-code.service.interface.js';
import { AUTH_SESSION_SERVICE } from '../../application/services/interfaces/auth-session.service.interface.js';
import { AUTH_TOKEN_SERVICE } from '../../application/services/interfaces/auth-token.service.interface.js';
import { AUTH_SETTINGS_SERVICE } from '../../application/services/interfaces/auth-settings.service.interface.js';

// Sagas
import { AuthLoginSaga } from '../../application/sagas/auth-login.saga.js';
import { AuthRegisterSaga } from '../../application/sagas/auth-register.saga.js';
import { AuthMfaSaga } from '../../application/sagas/auth-mfa.saga.js';

const SERVICES = [
  AuthService,
  { provide: AUTH_SERVICE, useExisting: AuthService },
  AuthMfaService,
  { provide: AUTH_MFA_SERVICE, useExisting: AuthMfaService },
  AuthRecoveryCodeService,
  { provide: AUTH_RECOVERY_CODE_SERVICE, useExisting: AuthRecoveryCodeService },
  AuthSessionService,
  { provide: AUTH_SESSION_SERVICE, useExisting: AuthSessionService },
  AuthTokenService,
  { provide: AUTH_TOKEN_SERVICE, useExisting: AuthTokenService },
  AuthSettingsService,
  { provide: AUTH_SETTINGS_SERVICE, useExisting: AuthSettingsService },
];

const SAGAS = [AuthLoginSaga, AuthRegisterSaga, AuthMfaSaga];

@Module({
  imports: [CqrsModule],
  controllers: [
    AuthController,
    AuthMfaController,
    AuthRecoveryCodeController,
    AuthSessionController,
    AuthTokenController,
    AuthSettingsController,
  ],
  providers: [
    ...SERVICES,
    ...(AUTH_COMMAND_HANDLERS as readonly unknown[] as never[]),
    ...(AUTH_QUERY_HANDLERS as readonly unknown[] as never[]),
    ...SAGAS,
  ],
  exports: SERVICES,
})
export class AuthModule {}
