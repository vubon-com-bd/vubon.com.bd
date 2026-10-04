/**
 * UserKycModule
 */
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { UserKycController } from '@interfaces/controllers/rest/user-kyc.controller';
import { UserKycService } from '@application/services/impl/user-kyc.service';
import {
  SubmitKycHandler,
  VerifyKycHandler,
  RejectKycHandler,
  ReverifyKycHandler,
} from '@application/commands/kyc';
import {
  GetKycStatusHandler,
  ListKycDocumentsHandler,
} from '@application/queries/kyc';
import { KycVerificationSaga } from '@application/sagas';
import { UserKycPrismaRepository } from '@infrastructure/persistence/prisma/repositories';
import { UserKycCacheRepository } from '@infrastructure/persistence/cache/repositories';
import { USER_KYC_REPOSITORY } from '@domain/repositories/user-kyc.repository.interface';
import { PrismaModule } from '@infrastructure/persistence/prisma/prisma.module';
import { RedisModule } from '@infrastructure/persistence/cache/redis.module';
import { UserModule } from '../user/user.module.js';

@Module({
  imports: [CqrsModule, PrismaModule, RedisModule, UserModule],
  controllers: [UserKycController],
  providers: [
    UserKycService,
    { provide: USER_KYC_REPOSITORY, useClass: UserKycPrismaRepository },
    UserKycCacheRepository,
    SubmitKycHandler,
    VerifyKycHandler,
    RejectKycHandler,
    ReverifyKycHandler,
    GetKycStatusHandler,
    ListKycDocumentsHandler,
    KycVerificationSaga,
  ],
  exports: [UserKycService, USER_KYC_REPOSITORY],
})
export class UserKycModule {}
