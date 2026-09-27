import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { AuthTokenController } from '../../interfaces/controllers/rest/auth-token.controller.js';
import { AuthTokenService } from '../../application/services/impl/auth-token.service.js';
import { ListAuthTokensHandler } from '../../application/queries/auth/list-auth-tokens.handler.js';
import { AuthTokenPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/auth-token.prisma.repository.js';
import { AuthTokenCacheRepository } from '../../infrastructure/persistence/cache/repositories/auth-token.cache.repository.js';
import {
  AUTH_TOKEN_REPO,
  AUTH_TOKEN_SERVICE,
} from '../../application/services/tokens.js';

const TOKEN_BINDINGS = [
  { provide: AUTH_TOKEN_REPO, useExisting: AuthTokenPrismaRepository },
  { provide: AUTH_TOKEN_SERVICE, useExisting: AuthTokenService },
];

@Module({
  imports: [CqrsModule],
  controllers: [AuthTokenController],
  providers: [
    AuthTokenService,
    AuthTokenPrismaRepository,
    AuthTokenCacheRepository,
    ListAuthTokensHandler,
    ...TOKEN_BINDINGS,
  ],
  exports: [
    AuthTokenService,
    AuthTokenPrismaRepository,
    AuthTokenCacheRepository,
    ...TOKEN_BINDINGS.map((b) => b.provide),
  ],
})
export class AuthTokenModule {}
