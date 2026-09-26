import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { KernelCommonModule } from '@vubon/shared-kernel/modules';

import { ReferralService } from '../../application/services/impl/referral.service';
import { ReferralRewardService } from '../../application/services/impl/referral-reward.service';

import {
  CreateReferralHandler,
  TrackReferralHandler,
  RedeemReferralRewardHandler,
} from '../../application/commands/referral';

import { ReferralPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/referral.prisma.repository';
import { ReferralRewardPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/referral-reward.prisma.repository';

import { ReferralController } from '../../interfaces/controllers/rest/referral.controller';

@Module({
  imports: [KernelCommonModule, CqrsModule],
  controllers: [ReferralController],
  providers: [
    ReferralService,
    ReferralRewardService,

    { provide: 'ReferralRepository', useClass: ReferralPrismaRepository },
    { provide: 'ReferralRewardRepository', useClass: ReferralRewardPrismaRepository },

    CreateReferralHandler,
    TrackReferralHandler,
    RedeemReferralRewardHandler,
  ],
  exports: [ReferralService, 'ReferralRepository'],
})
export class ReferralModule {}
