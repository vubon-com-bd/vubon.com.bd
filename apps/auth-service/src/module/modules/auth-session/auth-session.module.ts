import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { AuthSessionController } from '../../interfaces/controllers/rest/auth-session.controller.js';
import { AuthSessionService } from '../../application/services/impl/auth-session.service.js';
import { GetAuthSessionHandler } from '../../application/queries/auth/get-auth-session.handler.js';
import { ListAuthSessionsHandler } from '../../application/queries/auth/list-auth-sessions.handler.js';
import { AuthSessionPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/auth-session.prisma.repository.js';
import { AuthSessionCacheRepository } from '../../infrastructure/persistence/cache/repositories/auth-session.cache.repository.js';
import { SessionControllerMapper } from '../../interfaces/mappers/session.controller.mapper.js';
import {
  AUTH_SESSION_REPO,
  AUTH_SESSION_SERVICE,
} from '../../application/services/tokens.js';

const TOKEN_BINDINGS = [
  { provide: AUTH_SESSION_REPO, useExisting: AuthSessionPrismaRepository },
  { provide: AUTH_SESSION_SERVICE, useExisting: AuthSessionService },
];

@Module({
  imports: [CqrsModule],
  controllers: [AuthSessionController],
  providers: [
    AuthSessionService,
    AuthSessionPrismaRepository,
    AuthSessionCacheRepository,
    SessionControllerMapper,
    GetAuthSessionHandler,
    ListAuthSessionsHandler,
    ...TOKEN_BINDINGS,
  ],
  exports: [
    AuthSessionService,
    AuthSessionPrismaRepository,
    AuthSessionCacheRepository,
    ...TOKEN_BINDINGS.map((b) => b.provide),
  ],
})
export class AuthSessionModule {}
