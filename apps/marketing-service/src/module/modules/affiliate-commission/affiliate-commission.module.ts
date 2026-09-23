import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { KernelCommonModule } from '@vubon/shared-kernel/modules';

import { AffiliateCommissionService } from '../../application/services/impl/affiliate-commission.service';
import { AffiliateCommissionPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/affiliate-commission.prisma.repository';
import { TrackConversionHandler } from '../../application/commands/affiliate';

@Module({
  imports: [KernelCommonModule, CqrsModule],
  providers: [
    AffiliateCommissionService,
    { provide: 'AffiliateCommissionRepository', useClass: AffiliateCommissionPrismaRepository },
    TrackConversionHandler,
  ],
  exports: [AffiliateCommissionService, 'AffiliateCommissionRepository'],
})
export class AffiliateCommissionModule {}
