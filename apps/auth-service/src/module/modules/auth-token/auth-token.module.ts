import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { AuthTokenController } from '../../interfaces/controllers/rest/auth-token.controller';
import { AuthTokenService } from '../../application/services/impl/auth-token.service';
import { ListAuthTokensHandler } from '../../application/queries/auth/list-auth-tokens.handler';
import { AuthTokenPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/auth-token.prisma.repository';
import { AuthTokenCacheRepository } from '../../infrastructure/persistence/cache/repositories/auth-token.cache.repository';
import {
  AUTH_TOKEN_REPO,
  AUTH_TOKEN_SERVICE,
} from '../../application/services/tokens';

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
