import { PrismaService } from '../../infrastructure/persistence/prisma/prisma.service';
import { PrismaModule, RedisModule } from '@vubon/shared-kernel/infrastructure';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { AuthLoginAttemptController } from '../../interfaces/controllers/rest/auth-login-attempt.controller';
import { AuthLoginAttemptService } from '../../application/services/impl/auth-login-attempt.service';
import { ListAuthLoginAttemptsHandler } from '../../application/queries/auth/list-auth-login-attempts.handler';
import { AuthLoginAttemptPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/auth-login-attempt.prisma.repository';
import { LoginAttemptTrackerService } from '../../infrastructure/services/internal/login-attempt-tracker.service';

@Module({
  imports: [CqrsModule, PrismaModule, RedisModule],
  controllers: [AuthLoginAttemptController],
  providers: [PrismaService, { provide: 'PrismaService', useClass: PrismaService },
    { provide: 'AuthLoginAttemptRepository', useExisting: AuthLoginAttemptPrismaRepository },
    { provide: 'LoginAttemptTrackerService', useExisting: LoginAttemptTrackerService },
    { provide: 'AuthLoginAttemptService', useExisting: AuthLoginAttemptService },

    AuthLoginAttemptPrismaRepository,
    LoginAttemptTrackerService,
    AuthLoginAttemptService,
    ListAuthLoginAttemptsHandler,
  ],
  exports: [AuthLoginAttemptService, LoginAttemptTrackerService],
})
export class AuthLoginAttemptModule {}
