import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { AuthSsoController } from '../../interfaces/controllers/rest/auth-sso.controller.js';
import { AuthSsoService } from '../../application/services/impl/auth-sso.service.js';
import { SsoLoginHandler } from '../../application/commands/auth/sso-login.handler.js';
import { SsoCallbackHandler } from '../../application/commands/auth/sso-callback.handler.js';
import { AuthSsoPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/auth-sso.prisma.repository.js';
import { UserPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/user.prisma.repository.js';
import { AuthSessionModule } from '../auth-session/auth-session.module.js';
import { AuthTokenModule } from '../auth-token/auth-token.module.js';
import {
  AUTH_SSO_REPO,
  AUTH_SSO_SERVICE,
  USER_REPO,
} from '../../application/services/tokens.js';

const TOKEN_BINDINGS = [
  { provide: AUTH_SSO_REPO, useExisting: AuthSsoPrismaRepository },
  { provide: AUTH_SSO_SERVICE, useExisting: AuthSsoService },
  { provide: USER_REPO, useExisting: UserPrismaRepository },
];

@Module({
  imports: [CqrsModule, AuthSessionModule, AuthTokenModule],
  controllers: [AuthSsoController],
  providers: [
    AuthSsoService,
    AuthSsoPrismaRepository,
    UserPrismaRepository,
    SsoLoginHandler,
    SsoCallbackHandler,
    ...TOKEN_BINDINGS,
  ],
  exports: [
    AuthSsoService,
    AuthSsoPrismaRepository,
    ...TOKEN_BINDINGS.map((b) => b.provide),
  ],
})
export class AuthSsoModule {}
