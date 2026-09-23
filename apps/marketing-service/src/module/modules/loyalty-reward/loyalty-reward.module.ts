import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { KernelCommonModule } from '@vubon/shared-kernel/modules';

import { LoyaltyRewardService } from '../../application/services/impl/loyalty-reward.service';
import { LoyaltyRewardPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/loyalty-reward.prisma.repository';
import { ListLoyaltyRewardsHandler } from '../../application/queries/loyalty';

@Module({
  imports: [KernelCommonModule, CqrsModule],
  providers: [
    LoyaltyRewardService,
    { provide: 'LoyaltyRewardRepository', useClass: LoyaltyRewardPrismaRepository },
    ListLoyaltyRewardsHandler,
  ],
  exports: [LoyaltyRewardService, 'LoyaltyRewardRepository'],
})
export class LoyaltyRewardModule {}
