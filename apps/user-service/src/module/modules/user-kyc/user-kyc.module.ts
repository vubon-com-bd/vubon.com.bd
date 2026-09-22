import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { UserKycController } from '../../interfaces/controllers/rest/user-kyc.controller';
import { KycControllerMapper } from '../../interfaces/mappers/kyc.controller.mapper';
import { UserKycService } from '../../application/services/impl/user-kyc.service';
import { SubmitKycHandler } from '../../application/commands/kyc/submit-kyc.handler';
import { VerifyKycHandler } from '../../application/commands/kyc/verify-kyc.handler';
import { RejectKycHandler } from '../../application/commands/kyc/reject-kyc.handler';
import { ReverifyKycHandler } from '../../application/commands/kyc/reverify-kyc.handler';
import { GetKycStatusHandler } from '../../application/queries/kyc/get-kyc-status.handler';
import { ListKycDocumentsHandler } from '../../application/queries/kyc/list-kyc-documents.handler';
import { KycVerificationSaga } from '../../application/sagas/kyc-verification.saga';
import { UserKycPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/user-kyc.prisma.repository';
import { UserKycCacheRepository } from '../../infrastructure/persistence/cache/repositories/user-kyc.cache.repository';
import { KycDocumentValidatorService } from '../../infrastructure/services/internal/kyc-document-validator.service';
import { KycVerifiedGuard } from '../../interfaces/guards/kyc-verified.guard';

@Module({
  imports: [CqrsModule],
  controllers: [UserKycController],
  providers: [
    UserKycPrismaRepository,
    UserKycCacheRepository,
    KycDocumentValidatorService,
    UserKycService,
    KycControllerMapper,
    SubmitKycHandler,
    VerifyKycHandler,
    RejectKycHandler,
    ReverifyKycHandler,
    GetKycStatusHandler,
    ListKycDocumentsHandler,
    KycVerificationSaga,
    KycVerifiedGuard,
  ],
  exports: [UserKycService, UserKycPrismaRepository, KycVerifiedGuard],
})
export class UserKycModule {}
