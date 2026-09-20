import { PrismaService } from '../../infrastructure/persistence/prisma/prisma.service';
import { PrismaModule, RedisModule } from '@vubon/shared-kernel/infrastructure';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { AuthOAuthController } from '../../interfaces/controllers/rest/auth-oauth.controller';
import { AuthOAuthService } from '../../application/services/impl/auth-oauth.service';
import { AuthOAuthPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/auth-oauth.prisma.repository';
import { OAuthValidatorService } from '../../infrastructure/services/internal/oauth-validator.service';

@Module({
  imports: [CqrsModule, PrismaModule, RedisModule],
  controllers: [AuthOAuthController],
  providers: [PrismaService, { provide: 'PrismaService', useClass: PrismaService },
    { provide: 'AuthOAuthRepository', useExisting: AuthOAuthPrismaRepository },
    { provide: 'OAuthValidatorService', useExisting: OAuthValidatorService },
    { provide: 'AuthOAuthService', useExisting: AuthOAuthService },

    AuthOAuthPrismaRepository,
    OAuthValidatorService,
    AuthOAuthService,
  ],
  exports: [AuthOAuthService, AuthOAuthPrismaRepository, OAuthValidatorService],
})
export class AuthOAuthModule {}
