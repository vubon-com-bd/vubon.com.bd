import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { KernelCommonModule } from '@vubon/shared-kernel/modules';

import { LoyaltyTierService } from '../../application/services/impl/loyalty-tier.service';
import { LoyaltyTierPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/loyalty-tier.prisma.repository';
import { GetLoyaltyTierHandler } from '../../application/queries/loyalty';

@Module({
  imports: [KernelCommonModule, CqrsModule],
  providers: [
    LoyaltyTierService,
    { provide: 'LoyaltyTierRepository', useClass: LoyaltyTierPrismaRepository },
    GetLoyaltyTierHandler,
  ],
  exports: [LoyaltyTierService, 'LoyaltyTierRepository'],
})
export class LoyaltyTierModule {}
