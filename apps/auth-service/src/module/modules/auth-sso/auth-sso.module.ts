import { PrismaService } from '../../infrastructure/persistence/prisma/prisma.service';
import { PrismaModule, RedisModule } from '@vubon/shared-kernel/infrastructure';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { AuthSsoController } from '../../interfaces/controllers/rest/auth-sso.controller';
import { AuthSsoService } from '../../application/services/impl/auth-sso.service';
import { SsoLoginHandler } from '../../application/commands/auth/sso-login.handler';
import { SsoCallbackHandler } from '../../application/commands/auth/sso-callback.handler';
import { AuthSsoPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/auth-sso.prisma.repository';
import { SsoValidatorService } from '../../infrastructure/services/internal/sso-validator.service';

@Module({
  imports: [CqrsModule, PrismaModule, RedisModule],
  controllers: [AuthSsoController],
  providers: [PrismaService, { provide: 'PrismaService', useClass: PrismaService },
    { provide: 'AuthSsoRepository', useExisting: AuthSsoPrismaRepository },
    { provide: 'SsoValidatorService', useExisting: SsoValidatorService },
    { provide: 'AuthSsoService', useExisting: AuthSsoService },

    AuthSsoPrismaRepository,
    SsoValidatorService,
    AuthSsoService,
    SsoLoginHandler,
    SsoCallbackHandler,
  ],
  exports: [AuthSsoService, AuthSsoPrismaRepository, SsoValidatorService],
})
export class AuthSsoModule {}
