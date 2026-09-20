import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { PrismaModule, RedisModule } from '@vubon/shared-kernel/infrastructure';

import { AuthController } from '../../interfaces/controllers/rest/auth.controller';
import { AuthLoginSaga } from '../../application/sagas/auth-login.saga';
import { AuthRegisterSaga } from '../../application/sagas/auth-register.saga';
import {
  NotifyLoginHandler,
  UpdateAnalyticsHandler,
  SendWelcomeEmailHandler,
  SendVerificationEmailHandler,
  SendPasswordResetEmailHandler,
  SendMfaCodeHandler,
  SendRecoveryCodeHandler,
  SendAccountLockEmailHandler,
} from '../../application/sagas/handlers';
import { LoginHandler } from '../../application/commands/auth/login.handler';
import { RegisterHandler } from '../../application/commands/auth/register.handler';
import { RefreshTokenHandler } from '../../application/commands/auth/refresh-token.handler';
import { LogoutHandler } from '../../application/commands/auth/logout.handler';
import { ForgotPasswordHandler } from '../../application/commands/auth/forgot-password.handler';
import { ResetPasswordHandler } from '../../application/commands/auth/reset-password.handler';
import { VerifyEmailHandler } from '../../application/commands/auth/verify-email.handler';
import { ResendVerificationHandler } from '../../application/commands/auth/resend-verification.handler';
import { AuthService } from '../../application/services/impl/auth.service';
import { AuthTokenService } from '../../application/services/impl/auth-token.service';
import { AuthSessionService } from '../../application/services/impl/auth-session.service';
import { AuthControllerMapper } from '../../interfaces/mappers/auth.controller.mapper';
import { UserVerificationService } from '../../application/services/impl/user-verification.service';
import { UserVerificationPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/user-verification.prisma.repository';

import { PrismaService } from '../../infrastructure/persistence/prisma/prisma.service';
import { UserPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/user.prisma.repository';
import { AuthSessionPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/auth-session.prisma.repository';
import { AuthTokenPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/auth-token.prisma.repository';
import { PasswordHasherService } from '../../infrastructure/services/internal/password-hasher.service';
import { TokenGeneratorService } from '../../infrastructure/services/internal/token-generator.service';
import { SessionTokenGeneratorService } from '../../infrastructure/services/internal/session-token-generator.service';

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

const SAGAS = [AuthLoginSaga, AuthRegisterSaga];

const SAGA_HANDLERS = [
  NotifyLoginHandler,
  UpdateAnalyticsHandler,
  SendWelcomeEmailHandler,
  SendVerificationEmailHandler,
  SendPasswordResetEmailHandler,
  SendMfaCodeHandler,
  SendRecoveryCodeHandler,
  SendAccountLockEmailHandler,
];

const PORT_BINDINGS = [
  { provide: 'PrismaService', useClass: PrismaService },
  { provide: 'UserRepository', useExisting: UserPrismaRepository },
  { provide: 'AuthSessionRepository', useExisting: AuthSessionPrismaRepository },
  { provide: 'AuthTokenRepository', useExisting: AuthTokenPrismaRepository },
  { provide: 'PasswordHasherPort', useExisting: PasswordHasherService },
  { provide: 'TokenGeneratorPort', useExisting: TokenGeneratorService },
  { provide: 'SessionTokenGeneratorPort', useExisting: SessionTokenGeneratorService },
  { provide: 'AuthService', useExisting: AuthService },
  { provide: 'AuthTokenService', useExisting: AuthTokenService },
  { provide: 'AuthSessionService', useExisting: AuthSessionService },
  { provide: 'UserVerificationRepository', useExisting: UserVerificationPrismaRepository },
  { provide: 'UserVerificationService', useExisting: UserVerificationService },
];

@Module({
  imports: [CqrsModule, PrismaModule, RedisModule],
  controllers: [AuthController],
  providers: [
    PrismaService,
    UserPrismaRepository,
    AuthSessionPrismaRepository,
    AuthTokenPrismaRepository,
    PasswordHasherService,
    TokenGeneratorService,
    SessionTokenGeneratorService,
    AuthService,
    AuthTokenService,
    AuthSessionService,
    UserVerificationService,
    UserVerificationPrismaRepository,
    AuthControllerMapper,
    ...HANDLERS,
    ...SAGAS,
    ...SAGA_HANDLERS,
    ...PORT_BINDINGS,
  ],
  exports: [
    'PrismaService',
    'AuthService',
    'AuthTokenService',
    'AuthSessionService',
    UserPrismaRepository,
    AuthSessionPrismaRepository,
    AuthTokenPrismaRepository,
    PasswordHasherService,
    TokenGeneratorService,
    SessionTokenGeneratorService,
    ...PORT_BINDINGS,
  ],
})
export class AuthModule {}
