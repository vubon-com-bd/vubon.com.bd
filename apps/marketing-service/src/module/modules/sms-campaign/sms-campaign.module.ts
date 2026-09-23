import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { KernelCommonModule } from '@vubon/shared-kernel/modules';

import { SmsCampaignService } from '../../application/services/impl/sms-campaign.service';
import { SmsCampaignPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/sms-campaign.prisma.repository';

@Module({
  imports: [KernelCommonModule, CqrsModule],
  providers: [
    SmsCampaignService,
    { provide: 'SmsCampaignRepository', useClass: SmsCampaignPrismaRepository },
  ],
  exports: [SmsCampaignService, 'SmsCampaignRepository'],
})
export class SmsCampaignModule {}
