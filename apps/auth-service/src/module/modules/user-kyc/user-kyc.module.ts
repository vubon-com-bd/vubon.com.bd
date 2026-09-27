import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { UserKycController } from '../../interfaces/controllers/rest/user-kyc.controller.js';
import { UserKycService } from '../../application/services/impl/user-kyc.service.js';
import { UserKycPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/user-kyc.prisma.repository.js';
import { SubmitKycHandler } from '../../application/commands/user/submit-kyc.handler.js';
import { VerifyKycHandler } from '../../application/commands/user/verify-kyc.handler.js';
import { RejectKycHandler } from '../../application/commands/user/reject-kyc.handler.js';
import { GetUserKycStatusHandler } from '../../application/queries/user/get-user-kyc-status.handler.js';
import {
  USER_KYC_REPO,
  USER_KYC_SERVICE,
} from '../../application/services/tokens.js';

const TOKEN_BINDINGS = [
  { provide: USER_KYC_REPO, useExisting: UserKycPrismaRepository },
  { provide: USER_KYC_SERVICE, useExisting: UserKycService },
];

@Module({
  imports: [CqrsModule],
  controllers: [UserKycController],
  providers: [
    UserKycService,
    UserKycPrismaRepository,
    SubmitKycHandler,
    VerifyKycHandler,
    RejectKycHandler,
    GetUserKycStatusHandler,
    ...TOKEN_BINDINGS,
  ],
  exports: [UserKycService, UserKycPrismaRepository, ...TOKEN_BINDINGS.map((b) => b.provide)],
})
export class UserKycModule {}
