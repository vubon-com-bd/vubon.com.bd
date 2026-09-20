import { PrismaService } from '../../infrastructure/persistence/prisma/prisma.service';
import { PrismaModule, RedisModule } from '@vubon/shared-kernel/infrastructure';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { AuthRecoveryCodeController } from '../../interfaces/controllers/rest/auth-recovery-code.controller';
import { AuthRecoveryCodeService } from '../../application/services/impl/auth-recovery-code.service';
import { GenerateRecoveryCodesHandler } from '../../application/commands/auth/generate-recovery-codes.handler';
import { RecoverAccountHandler } from '../../application/commands/auth/recover-account.handler';
import { GetAuthRecoveryCodesHandler } from '../../application/queries/auth/get-auth-recovery-codes.handler';
import { AuthRecoveryCodePrismaRepository } from '../../infrastructure/persistence/prisma/repositories/auth-recovery-code.prisma.repository';
import { RecoveryCodeGeneratorService } from '../../infrastructure/services/internal/recovery-code-generator.service';

@Module({
  imports: [CqrsModule, PrismaModule, RedisModule],
  controllers: [AuthRecoveryCodeController],
  providers: [PrismaService, { provide: 'PrismaService', useClass: PrismaService },
    { provide: 'AuthRecoveryCodeRepository', useExisting: AuthRecoveryCodePrismaRepository },
    { provide: 'RecoveryCodeGeneratorPort', useExisting: RecoveryCodeGeneratorService },
    { provide: 'AuthRecoveryCodeService', useExisting: AuthRecoveryCodeService },

    AuthRecoveryCodePrismaRepository,
    RecoveryCodeGeneratorService,
    AuthRecoveryCodeService,
    GenerateRecoveryCodesHandler,
    RecoverAccountHandler,
    GetAuthRecoveryCodesHandler,
  ],
  exports: [AuthRecoveryCodeService, AuthRecoveryCodePrismaRepository],
})
export class AuthRecoveryCodeModule {}
