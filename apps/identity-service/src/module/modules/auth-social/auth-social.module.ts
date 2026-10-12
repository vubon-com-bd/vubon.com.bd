/**
 * AuthSocialModule
 * @module identity-service/modules/auth-social
 */
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { AuthSocialController } from '../../interfaces/controllers/rest/auth-social.controller.js';
import { AuthSsoController } from '../../interfaces/controllers/rest/auth-sso.controller.js';
import { SOCIAL_COMMAND_HANDLERS } from './commands/index.js';

import { AuthSocialService } from '../../application/services/impl/auth-social.service.js';
import { AuthSsoService } from '../../application/services/impl/auth-sso.service.js';
import { AuthOAuthService } from '../../application/services/impl/auth-oauth.service.js';

import { AUTH_SOCIAL_SERVICE } from '../../application/services/interfaces/auth-social.service.interface.js';
import { AUTH_SSO_SERVICE } from '../../application/services/interfaces/auth-sso.service.interface.js';
import { AUTH_OAUTH_SERVICE } from '../../application/services/interfaces/auth-oauth.service.interface.js';

import { AuthSocialSaga } from '../../application/sagas/auth-social.saga.js';

const SERVICES = [
  AuthSocialService,
  { provide: AUTH_SOCIAL_SERVICE, useExisting: AuthSocialService },
  AuthSsoService,
  { provide: AUTH_SSO_SERVICE, useExisting: AuthSsoService },
  AuthOAuthService,
  { provide: AUTH_OAUTH_SERVICE, useExisting: AuthOAuthService },
];

@Module({
  imports: [CqrsModule],
  controllers: [AuthSocialController, AuthSsoController],
  providers: [
    ...SERVICES,
    ...(SOCIAL_COMMAND_HANDLERS as readonly unknown[] as never[]),
    AuthSocialSaga,
  ],
  exports: SERVICES,
})
export class AuthSocialModule {}
