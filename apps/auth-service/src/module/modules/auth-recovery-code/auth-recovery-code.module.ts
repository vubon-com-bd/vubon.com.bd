import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { AuthRecoveryCodeController } from '../../interfaces/controllers/rest/auth-recovery-code.controller.js';
import { AuthRecoveryCodeService } from '../../application/services/impl/auth-recovery-code.service.js';
import { GenerateRecoveryCodesHandler } from '../../application/commands/auth/generate-recovery-codes.handler.js';
import { RecoverAccountHandler } from '../../application/commands/auth/recover-account.handler.js';
import { GetAuthRecoveryCodesHandler } from '../../application/queries/auth/get-auth-recovery-codes.handler.js';
import { AuthRecoveryCodePrismaRepository } from '../../infrastructure/persistence/prisma/repositories/auth-recovery-code.prisma.repository.js';
import { UserPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/user.prisma.repository.js';
import {
  AUTH_RECOVERY_CODE_REPO,
  AUTH_RECOVERY_CODE_SERVICE,
  USER_REPO,
} from '../../application/services/tokens.js';

const TOKEN_BINDINGS = [
  { provide: AUTH_RECOVERY_CODE_REPO, useExisting: AuthRecoveryCodePrismaRepository },
  { provide: AUTH_RECOVERY_CODE_SERVICE, useExisting: AuthRecoveryCodeService },
  { provide: USER_REPO, useExisting: UserPrismaRepository },
];

@Module({
  imports: [CqrsModule],
  controllers: [AuthRecoveryCodeController],
  providers: [
    AuthRecoveryCodeService,
    AuthRecoveryCodePrismaRepository,
    UserPrismaRepository,
    GenerateRecoveryCodesHandler,
    RecoverAccountHandler,
    GetAuthRecoveryCodesHandler,
    ...TOKEN_BINDINGS,
  ],
  exports: [
    AuthRecoveryCodeService,
    AuthRecoveryCodePrismaRepository,
    ...TOKEN_BINDINGS.map((b) => b.provide),
  ],
})
export class AuthRecoveryCodeModule {}
