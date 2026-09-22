import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { VendorApprovalController } from '../../interfaces/controllers/rest/vendor-approval.controller';
import { ApproveVendorHandler } from '../../application/commands/approval';
import { RejectVendorHandler } from '../../application/commands/approval';
import { RequestInfoHandler } from '../../application/commands/approval';
import { GetApprovalStatusHandler } from '../../application/queries/approval';
import { VendorApprovalSaga } from '../../application/sagas/vendor-approval.saga';
import { VendorApprovalPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/vendor-approval.prisma.repository';

@Module({
  imports: [CqrsModule],
  controllers: [VendorApprovalController],
  providers: [
    VendorApprovalPrismaRepository,
    ApproveVendorHandler,
    RejectVendorHandler,
    RequestInfoHandler,
    GetApprovalStatusHandler,
    VendorApprovalSaga,
  ],
  exports: [VendorApprovalPrismaRepository],
})
export class VendorApprovalModule {}
