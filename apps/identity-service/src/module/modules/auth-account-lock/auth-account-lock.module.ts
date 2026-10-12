/**
 * AuthAccountLockModule
 * @module identity-service/modules/auth-account-lock
 */
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { AuthAccountLockController } from '../../interfaces/controllers/rest/auth-account-lock.controller.js';
import { AuthLoginAttemptController } from '../../interfaces/controllers/rest/auth-login-attempt.controller.js';
import { LOCK_COMMAND_HANDLERS } from './commands/index.js';
import { LOCK_QUERY_HANDLERS } from './queries/index.js';

import { AuthAccountLockService } from '../../application/services/impl/auth-account-lock.service.js';
import { AuthLoginAttemptService } from '../../application/services/impl/auth-login-attempt.service.js';
import { AUTH_ACCOUNT_LOCK_SERVICE } from '../../application/services/interfaces/auth-account-lock.service.interface.js';
import { AUTH_LOGIN_ATTEMPT_SERVICE } from '../../application/services/interfaces/auth-login-attempt.service.interface.js';

const SERVICES = [
  AuthAccountLockService,
  { provide: AUTH_ACCOUNT_LOCK_SERVICE, useExisting: AuthAccountLockService },
  AuthLoginAttemptService,
  { provide: AUTH_LOGIN_ATTEMPT_SERVICE, useExisting: AuthLoginAttemptService },
];

@Module({
  imports: [CqrsModule],
  controllers: [AuthAccountLockController, AuthLoginAttemptController],
  providers: [
    ...SERVICES,
    ...(LOCK_COMMAND_HANDLERS as readonly unknown[] as never[]),
    ...(LOCK_QUERY_HANDLERS as readonly unknown[] as never[]),
  ],
  exports: SERVICES,
})
export class AuthAccountLockModule {}
