import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { KernelCommonModule } from '@vubon/shared-kernel/modules';

import { ReferralRewardService } from '../../application/services/impl/referral-reward.service';
import { ReferralRewardPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/referral-reward.prisma.repository';

@Module({
  imports: [KernelCommonModule, CqrsModule],
  providers: [
    ReferralRewardService,
    { provide: 'ReferralRewardRepository', useClass: ReferralRewardPrismaRepository },
  ],
  exports: [ReferralRewardService, 'ReferralRewardRepository'],
})
export class ReferralRewardModule {}
