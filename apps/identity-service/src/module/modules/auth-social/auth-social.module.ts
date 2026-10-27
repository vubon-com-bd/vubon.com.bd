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
import { SocialIntegrationModule } from '../social-integration/social-integration.module.js';
import { GoogleOAuthClient } from '../../infrastructure/external/oauth/google-oauth.client.js';
import { FacebookOAuthClient } from '../../infrastructure/external/oauth/facebook-oauth.client.js';
import { GithubOAuthClient } from '../../infrastructure/external/oauth/github-oauth.client.js';
import { LinkedinOAuthClient } from '../../infrastructure/external/oauth/linkedin-oauth.client.js';
import { TwitterOAuthClient } from '../../infrastructure/external/oauth/twitter-oauth.client.js';
import { MicrosoftOAuthClient } from '../../infrastructure/external/oauth/microsoft-oauth.client.js';
import { AppleOAuthClient } from '../../infrastructure/external/oauth/apple-oauth.client.js';
import { OAuthStateService } from '../../infrastructure/services/internal/oauth-state.service.js';

const SERVICES = [
  AuthSocialService,
  { provide: AUTH_SOCIAL_SERVICE, useExisting: AuthSocialService },
  AuthSsoService,
  { provide: AUTH_SSO_SERVICE, useExisting: AuthSsoService },
  AuthOAuthService,
  { provide: AUTH_OAUTH_SERVICE, useExisting: AuthOAuthService },
  GoogleOAuthClient,
  FacebookOAuthClient,
  GithubOAuthClient,
  LinkedinOAuthClient,
  TwitterOAuthClient,
  MicrosoftOAuthClient,
  AppleOAuthClient,
  OAuthStateService,
];

@Module({
  imports: [CqrsModule, SocialIntegrationModule],
  controllers: [AuthSocialController, AuthSsoController],
  providers: [
    ...SERVICES,
    ...(SOCIAL_COMMAND_HANDLERS as readonly unknown[] as never[]),
    AuthSocialSaga,
  ],
  exports: SERVICES,
})
export class AuthSocialModule {}
