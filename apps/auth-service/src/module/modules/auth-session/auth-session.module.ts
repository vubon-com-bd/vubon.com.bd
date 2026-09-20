import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { PrismaModule, RedisModule } from '@vubon/shared-kernel/infrastructure';

import { AuthSessionController } from '../../interfaces/controllers/rest/auth-session.controller';
import { AuthSessionService } from '../../application/services/impl/auth-session.service';
import { SessionControllerMapper } from '../../interfaces/mappers/session.controller.mapper';
import { GetAuthSessionHandler } from '../../application/queries/auth/get-auth-session.handler';
import { ListAuthSessionsHandler } from '../../application/queries/auth/list-auth-sessions.handler';
import { PrismaService } from '../../infrastructure/persistence/prisma/prisma.service';
import { AuthSessionPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/auth-session.prisma.repository';
import { AuthSessionCacheRepository } from '../../infrastructure/persistence/cache/repositories/auth-session.cache.repository';
import { SessionTokenGeneratorService } from '../../infrastructure/services/internal/session-token-generator.service';

@Module({
  imports: [CqrsModule, PrismaModule, RedisModule],
  controllers: [AuthSessionController],
  providers: [
    PrismaService,
    AuthSessionPrismaRepository,
    AuthSessionCacheRepository,
    SessionTokenGeneratorService,
    AuthSessionService,
    SessionControllerMapper,
    GetAuthSessionHandler,
    ListAuthSessionsHandler,
    { provide: 'PrismaService', useClass: PrismaService },
    { provide: 'AuthSessionRepository', useExisting: AuthSessionPrismaRepository },
    { provide: 'SessionTokenGeneratorPort', useExisting: SessionTokenGeneratorService },
    { provide: 'AuthSessionService', useExisting: AuthSessionService },
  ],
  exports: [
    AuthSessionService,
    AuthSessionPrismaRepository,
    SessionTokenGeneratorService,
    { provide: 'AuthSessionService', useExisting: AuthSessionService },
    { provide: 'AuthSessionRepository', useExisting: AuthSessionPrismaRepository },
    { provide: 'SessionTokenGeneratorPort', useExisting: SessionTokenGeneratorService },
  ],
})
export class AuthSessionModule {}
