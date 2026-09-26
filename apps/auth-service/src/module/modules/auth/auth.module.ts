import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { AuthController } from '../../interfaces/controllers/rest/auth.controller';

import { AuthService } from '../../application/services/impl/auth.service';
import { AuthSessionService } from '../../application/services/impl/auth-session.service';
import { AuthTokenService } from '../../application/services/impl/auth-token.service';
import { UserVerificationService } from '../../application/services/impl/user-verification.service';

import { LoginHandler } from '../../application/commands/auth/login.handler';
import { RegisterHandler } from '../../application/commands/auth/register.handler';
import { RefreshTokenHandler } from '../../application/commands/auth/refresh-token.handler';
import { LogoutHandler } from '../../application/commands/auth/logout.handler';
import { ForgotPasswordHandler } from '../../application/commands/auth/forgot-password.handler';
import { ResetPasswordHandler } from '../../application/commands/auth/reset-password.handler';
import { VerifyEmailHandler } from '../../application/commands/auth/verify-email.handler';
import { ResendVerificationHandler } from '../../application/commands/auth/resend-verification.handler';

import { AuthLoginSaga } from '../../application/sagas/auth-login.saga';
import { AuthRegisterSaga } from '../../application/sagas/auth-register.saga';

import { UserPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/user.prisma.repository';
import { AuthSessionPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/auth-session.prisma.repository';
import { AuthTokenPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/auth-token.prisma.repository';
import { UserVerificationPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/user-verification.prisma.repository';

import { AuthControllerMapper } from '../../interfaces/mappers/auth.controller.mapper';

import { UserModule } from '../user/user.module';
import { AuthSessionModule } from '../auth-session/auth-session.module';
import { AuthTokenModule } from '../auth-token/auth-token.module';

import {
  USER_REPO,
  USER_VERIFICATION_REPO,
  USER_VERIFICATION_SERVICE,
  AUTH_SESSION_REPO,
  AUTH_TOKEN_REPO,
  AUTH_SESSION_SERVICE,
  AUTH_TOKEN_SERVICE,
  AUTH_SERVICE,
} from '../../application/services/tokens';

const HANDLERS = [
  LoginHandler,
  RegisterHandler,
  RefreshTokenHandler,
  LogoutHandler,
  ForgotPasswordHandler,
  ResetPasswordHandler,
  VerifyEmailHandler,
  ResendVerificationHandler,
];

const TOKEN_BINDINGS = [
  { provide: USER_REPO, useExisting: UserPrismaRepository },
  { provide: USER_VERIFICATION_REPO, useExisting: UserVerificationPrismaRepository },
  { provide: USER_VERIFICATION_SERVICE, useExisting: UserVerificationService },
  { provide: AUTH_SESSION_REPO, useExisting: AuthSessionPrismaRepository },
  { provide: AUTH_TOKEN_REPO, useExisting: AuthTokenPrismaRepository },
  { provide: AUTH_SESSION_SERVICE, useExisting: AuthSessionService },
  { provide: AUTH_TOKEN_SERVICE, useExisting: AuthTokenService },
  { provide: AUTH_SERVICE, useExisting: AuthService },
];

@Module({
  imports: [
    CqrsModule,
    UserModule,
    AuthSessionModule,
    AuthTokenModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    AuthSessionService,
    AuthTokenService,
    UserVerificationService,
    UserPrismaRepository,
    AuthSessionPrismaRepository,
    AuthTokenPrismaRepository,
    UserVerificationPrismaRepository,
    AuthControllerMapper,
    AuthLoginSaga,
    AuthRegisterSaga,
    ...HANDLERS,
    ...TOKEN_BINDINGS,
  ],
  exports: [
    AuthService,
    AuthSessionService,
    AuthTokenService,
    ...TOKEN_BINDINGS.map((b) => b.provide),
  ],
})
export class AuthModule {}
