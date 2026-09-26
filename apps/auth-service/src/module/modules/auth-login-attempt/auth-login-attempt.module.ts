import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { AuthLoginAttemptController } from '../../interfaces/controllers/rest/auth-login-attempt.controller';
import { AuthLoginAttemptService } from '../../application/services/impl/auth-login-attempt.service';
import { ListAuthLoginAttemptsHandler } from '../../application/queries/auth/list-auth-login-attempts.handler';
import { AuthLoginAttemptPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/auth-login-attempt.prisma.repository';
import {
  AUTH_LOGIN_ATTEMPT_REPO,
  AUTH_LOGIN_ATTEMPT_SERVICE,
} from '../../application/services/tokens';

const TOKEN_BINDINGS = [
  { provide: AUTH_LOGIN_ATTEMPT_REPO, useExisting: AuthLoginAttemptPrismaRepository },
  { provide: AUTH_LOGIN_ATTEMPT_SERVICE, useExisting: AuthLoginAttemptService },
];

@Module({
  imports: [CqrsModule],
  controllers: [AuthLoginAttemptController],
  providers: [
    AuthLoginAttemptService,
    AuthLoginAttemptPrismaRepository,
    ListAuthLoginAttemptsHandler,
    ...TOKEN_BINDINGS,
  ],
  exports: [
    AuthLoginAttemptService,
    AuthLoginAttemptPrismaRepository,
    ...TOKEN_BINDINGS.map((b) => b.provide),
  ],
})
export class AuthLoginAttemptModule {}
