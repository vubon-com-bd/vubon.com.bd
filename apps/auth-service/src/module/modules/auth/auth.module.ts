import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { AuthController } from '../../interfaces/controllers/rest/auth.controller.js';

import { AuthService } from '../../application/services/impl/auth.service.js';
import { AuthSessionService } from '../../application/services/impl/auth-session.service.js';
import { AuthTokenService } from '../../application/services/impl/auth-token.service.js';
import { UserVerificationService } from '../../application/services/impl/user-verification.service.js';

import { LoginHandler } from '../../application/commands/auth/login.handler.js';
import { RegisterHandler } from '../../application/commands/auth/register.handler.js';
import { RefreshTokenHandler } from '../../application/commands/auth/refresh-token.handler.js';
import { LogoutHandler } from '../../application/commands/auth/logout.handler.js';
import { ForgotPasswordHandler } from '../../application/commands/auth/forgot-password.handler.js';
import { ResetPasswordHandler } from '../../application/commands/auth/reset-password.handler.js';
import { VerifyEmailHandler } from '../../application/commands/auth/verify-email.handler.js';
import { ResendVerificationHandler } from '../../application/commands/auth/resend-verification.handler.js';

import { AuthLoginSaga } from '../../application/sagas/auth-login.saga.js';
import { AuthRegisterSaga } from '../../application/sagas/auth-register.saga.js';

import { UserPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/user.prisma.repository.js';
import { AuthSessionPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/auth-session.prisma.repository.js';
import { AuthTokenPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/auth-token.prisma.repository.js';
import { UserVerificationPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/user-verification.prisma.repository.js';

import { AuthControllerMapper } from '../../interfaces/mappers/auth.controller.mapper.js';

import { UserModule } from '../user/user.module.js';
import { AuthSessionModule } from '../auth-session/auth-session.module.js';
import { AuthTokenModule } from '../auth-token/auth-token.module.js';

import {
  USER_REPO,
  USER_VERIFICATION_REPO,
  USER_VERIFICATION_SERVICE,
  AUTH_SESSION_REPO,
  AUTH_TOKEN_REPO,
  AUTH_SESSION_SERVICE,
  AUTH_TOKEN_SERVICE,
  AUTH_SERVICE,
} from '../../application/services/tokens.js';

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
