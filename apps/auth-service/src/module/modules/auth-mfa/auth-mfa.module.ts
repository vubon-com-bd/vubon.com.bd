import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { AuthMfaController } from '../../interfaces/controllers/rest/auth-mfa.controller.js';
import { AuthMfaService } from '../../application/services/impl/auth-mfa.service.js';
import { EnableMfaHandler } from '../../application/commands/auth/enable-mfa.handler.js';
import { DisableMfaHandler } from '../../application/commands/auth/disable-mfa.handler.js';
import { VerifyMfaHandler } from '../../application/commands/auth/verify-mfa.handler.js';
import { GetAuthMfaSettingsHandler } from '../../application/queries/auth/get-auth-mfa-settings.handler.js';
import { AuthMfaSaga } from '../../application/sagas/auth-mfa.saga.js';
import { AuthMfaPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/auth-mfa.prisma.repository.js';
import { AuthMfaCacheRepository } from '../../infrastructure/persistence/cache/repositories/auth-mfa.cache.repository.js';
import { UserPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/user.prisma.repository.js';
import { MfaGuard } from '../../interfaces/guards/mfa.guard.js';
import { MfaControllerMapper } from '../../interfaces/mappers/mfa.controller.mapper.js';
import {
  AUTH_MFA_REPO,
  AUTH_MFA_SERVICE,
  USER_REPO,
} from '../../application/services/tokens.js';

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
