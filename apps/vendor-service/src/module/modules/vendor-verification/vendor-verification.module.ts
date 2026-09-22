import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { VendorVerificationController } from '../../interfaces/controllers/rest/vendor-verification.controller';
import { SubmitVerificationHandler } from '../../application/commands/verification';
import { ReverifyHandler } from '../../application/commands/verification';
import { GetVerificationHandler } from '../../application/queries/verification';
import { VendorVerificationSaga } from '../../application/sagas/vendor-verification.saga';
import { VendorVerificationPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/vendor-verification.prisma.repository';

@Module({
  imports: [CqrsModule],
  controllers: [VendorVerificationController],
  providers: [
    VendorVerificationPrismaRepository,
    SubmitVerificationHandler,
    ReverifyHandler,
    GetVerificationHandler,
    VendorVerificationSaga,
  ],
  exports: [VendorVerificationPrismaRepository],
})
export class VendorVerificationModule {}
