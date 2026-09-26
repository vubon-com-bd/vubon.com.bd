import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { AuthSsoController } from '../../interfaces/controllers/rest/auth-sso.controller';
import { AuthSsoService } from '../../application/services/impl/auth-sso.service';
import { SsoLoginHandler } from '../../application/commands/auth/sso-login.handler';
import { SsoCallbackHandler } from '../../application/commands/auth/sso-callback.handler';
import { AuthSsoPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/auth-sso.prisma.repository';
import { UserPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/user.prisma.repository';
import { AuthSessionModule } from '../auth-session/auth-session.module';
import { AuthTokenModule } from '../auth-token/auth-token.module';
import {
  AUTH_SSO_REPO,
  AUTH_SSO_SERVICE,
  USER_REPO,
} from '../../application/services/tokens';

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
