import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { PrismaModule, RedisModule } from '@vubon/shared-kernel/infrastructure';

import { AuthMfaController } from '../../interfaces/controllers/rest/auth-mfa.controller';
import { AuthMfaService } from '../../application/services/impl/auth-mfa.service';
import { MfaControllerMapper } from '../../interfaces/mappers/mfa.controller.mapper';
import { EnableMfaHandler } from '../../application/commands/auth/enable-mfa.handler';
import { DisableMfaHandler } from '../../application/commands/auth/disable-mfa.handler';
import { VerifyMfaHandler } from '../../application/commands/auth/verify-mfa.handler';
import { GetAuthMfaSettingsHandler } from '../../application/queries/auth/get-auth-mfa-settings.handler';
import { GetAuthRecoveryCodesHandler } from '../../application/queries/auth/get-auth-recovery-codes.handler';
import { AuthMfaSaga } from '../../application/sagas/auth-mfa.saga';
import { PrismaService } from '../../infrastructure/persistence/prisma/prisma.service';
import { AuthMfaPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/auth-mfa.prisma.repository';
import { AuthRecoveryCodePrismaRepository } from '../../infrastructure/persistence/prisma/repositories/auth-recovery-code.prisma.repository';
import { MfaValidatorService } from '../../infrastructure/services/internal/mfa-validator.service';
import { RecoveryCodeGeneratorService } from '../../infrastructure/services/internal/recovery-code-generator.service';
import { MfaGuard } from '../../interfaces/guards/mfa.guard';

@Module({
  imports: [CqrsModule, PrismaModule, RedisModule],
  controllers: [AuthMfaController],
  providers: [
    PrismaService,
    AuthMfaPrismaRepository,
    AuthRecoveryCodePrismaRepository,
    MfaValidatorService,
    RecoveryCodeGeneratorService,
    AuthMfaService,
    MfaControllerMapper,
    EnableMfaHandler,
    DisableMfaHandler,
    VerifyMfaHandler,
    GetAuthMfaSettingsHandler,
    GetAuthRecoveryCodesHandler,
    AuthMfaSaga,
    MfaGuard,
    { provide: 'PrismaService', useClass: PrismaService },
    { provide: 'AuthMfaRepository', useExisting: AuthMfaPrismaRepository },
    { provide: 'AuthRecoveryCodeRepository', useExisting: AuthRecoveryCodePrismaRepository },
    { provide: 'MfaValidatorPort', useExisting: MfaValidatorService },
    { provide: 'RecoveryCodeGeneratorPort', useExisting: RecoveryCodeGeneratorService },
    { provide: 'AuthMfaService', useExisting: AuthMfaService },
  ],
  exports: [
    AuthMfaService,
    AuthMfaPrismaRepository,
    MfaValidatorService,
    MfaGuard,
    { provide: 'AuthMfaService', useExisting: AuthMfaService },
    { provide: 'MfaValidatorPort', useExisting: MfaValidatorService },
  ],
})
export class AuthMfaModule {}
