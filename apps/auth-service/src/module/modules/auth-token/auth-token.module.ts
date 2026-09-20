import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { PrismaModule, RedisModule } from '@vubon/shared-kernel/infrastructure';

import { AuthTokenController } from '../../interfaces/controllers/rest/auth-token.controller';
import { AuthTokenService } from '../../application/services/impl/auth-token.service';
import { ListAuthTokensHandler } from '../../application/queries/auth/list-auth-tokens.handler';
import { PrismaService } from '../../infrastructure/persistence/prisma/prisma.service';
import { AuthTokenPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/auth-token.prisma.repository';
import { AuthTokenCacheRepository } from '../../infrastructure/persistence/cache/repositories/auth-token.cache.repository';
import { TokenGeneratorService } from '../../infrastructure/services/internal/token-generator.service';

@Module({
  imports: [CqrsModule, PrismaModule, RedisModule],
  controllers: [AuthTokenController],
  providers: [
    PrismaService,
    AuthTokenPrismaRepository,
    AuthTokenCacheRepository,
    TokenGeneratorService,
    AuthTokenService,
    ListAuthTokensHandler,
    { provide: 'PrismaService', useClass: PrismaService },
    { provide: 'AuthTokenRepository', useExisting: AuthTokenPrismaRepository },
    { provide: 'TokenGeneratorPort', useExisting: TokenGeneratorService },
    { provide: 'AuthTokenService', useExisting: AuthTokenService },
  ],
  exports: [
    AuthTokenService,
    AuthTokenPrismaRepository,
    TokenGeneratorService,
    { provide: 'AuthTokenService', useExisting: AuthTokenService },
    { provide: 'AuthTokenRepository', useExisting: AuthTokenPrismaRepository },
    { provide: 'TokenGeneratorPort', useExisting: TokenGeneratorService },
  ],
})
export class AuthTokenModule {}
