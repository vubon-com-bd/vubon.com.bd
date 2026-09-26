import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { KernelCommonModule } from '@vubon/shared-kernel/modules';

import { LoyaltyService } from '../../application/services/impl/loyalty.service';
import { LoyaltyPointsService } from '../../application/services/impl/loyalty-points.service';
import { LoyaltyTierService } from '../../application/services/impl/loyalty-tier.service';
import { LoyaltyRewardService } from '../../application/services/impl/loyalty-reward.service';

import {
  EarnPointsHandler,
  RedeemPointsHandler,
  UpgradeTierHandler,
  ClaimRewardHandler,
} from '../../application/commands/loyalty';
import {
  GetLoyaltyHandler,
  GetLoyaltyTierHandler,
  ListLoyaltyRewardsHandler,
} from '../../application/queries/loyalty';

import { LoyaltyMapper } from '../../application/mappers/loyalty.mapper';

import { LoyaltyPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/loyalty.prisma.repository';
import { LoyaltyPointsPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/loyalty-points.prisma.repository';
import { LoyaltyTierPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/loyalty-tier.prisma.repository';
import { LoyaltyRewardPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/loyalty-reward.prisma.repository';

import { LoyaltyController } from '../../interfaces/controllers/rest/loyalty.controller';
import { LoyaltyControllerMapper } from '../../interfaces/mappers/loyalty.controller.mapper';

@Module({
  imports: [KernelCommonModule, CqrsModule],
  controllers: [LoyaltyController],
  providers: [
    LoyaltyService,
    LoyaltyPointsService,
    LoyaltyTierService,
    LoyaltyRewardService,

    { provide: 'LoyaltyRepository', useClass: LoyaltyPrismaRepository },
    { provide: 'LoyaltyPointsRepository', useClass: LoyaltyPointsPrismaRepository },
    { provide: 'LoyaltyTierRepository', useClass: LoyaltyTierPrismaRepository },
    { provide: 'LoyaltyRewardRepository', useClass: LoyaltyRewardPrismaRepository },

    LoyaltyMapper,
    LoyaltyControllerMapper,

    EarnPointsHandler,
    RedeemPointsHandler,
    UpgradeTierHandler,
    ClaimRewardHandler,
    GetLoyaltyHandler,
    GetLoyaltyTierHandler,
    ListLoyaltyRewardsHandler,
  ],
  exports: [LoyaltyService, 'LoyaltyRepository'],
})
export class LoyaltyModule {}
