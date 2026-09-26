import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { AuthMfaController } from '../../interfaces/controllers/rest/auth-mfa.controller';
import { AuthMfaService } from '../../application/services/impl/auth-mfa.service';
import { EnableMfaHandler } from '../../application/commands/auth/enable-mfa.handler';
import { DisableMfaHandler } from '../../application/commands/auth/disable-mfa.handler';
import { VerifyMfaHandler } from '../../application/commands/auth/verify-mfa.handler';
import { GetAuthMfaSettingsHandler } from '../../application/queries/auth/get-auth-mfa-settings.handler';
import { AuthMfaSaga } from '../../application/sagas/auth-mfa.saga';
import { AuthMfaPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/auth-mfa.prisma.repository';
import { AuthMfaCacheRepository } from '../../infrastructure/persistence/cache/repositories/auth-mfa.cache.repository';
import { UserPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/user.prisma.repository';
import { MfaGuard } from '../../interfaces/guards/mfa.guard';
import { MfaControllerMapper } from '../../interfaces/mappers/mfa.controller.mapper';
import {
  AUTH_MFA_REPO,
  AUTH_MFA_SERVICE,
  USER_REPO,
} from '../../application/services/tokens';

const TOKEN_BINDINGS = [
  { provide: AUTH_MFA_REPO, useExisting: AuthMfaPrismaRepository },
  { provide: AUTH_MFA_SERVICE, useExisting: AuthMfaService },
  { provide: USER_REPO, useExisting: UserPrismaRepository },
];

@Module({
  imports: [CqrsModule],
  controllers: [AuthMfaController],
  providers: [
    AuthMfaService,
    AuthMfaPrismaRepository,
    AuthMfaCacheRepository,
    UserPrismaRepository,
    MfaGuard,
    MfaControllerMapper,
    AuthMfaSaga,
    EnableMfaHandler,
    DisableMfaHandler,
    VerifyMfaHandler,
    GetAuthMfaSettingsHandler,
    ...TOKEN_BINDINGS,
  ],
  exports: [
    AuthMfaService,
    AuthMfaPrismaRepository,
    MfaGuard,
    ...TOKEN_BINDINGS.map((b) => b.provide),
  ],
})
export class AuthMfaModule {}
