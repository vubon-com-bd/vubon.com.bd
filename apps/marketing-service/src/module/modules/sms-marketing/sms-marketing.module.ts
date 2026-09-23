import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { KernelCommonModule } from '@vubon/shared-kernel/modules';

import { SmsMarketingService } from '../../application/services/impl/sms-marketing.service';
import { SmsCampaignService } from '../../application/services/impl/sms-campaign.service';

import {
  CreateSmsCampaignHandler,
  SendSmsCampaignHandler,
  ScheduleSmsCampaignHandler,
} from '../../application/commands/sms-marketing';

import { SmsMarketingPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/sms-marketing.prisma.repository';
import { SmsCampaignPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/sms-campaign.prisma.repository';

import { SmsMarketingController } from '../../interfaces/controllers/rest/sms-marketing.controller';

@Module({
  imports: [KernelCommonModule, CqrsModule],
  controllers: [SmsMarketingController],
  providers: [
    SmsMarketingService,
    SmsCampaignService,

    { provide: 'SmsMarketingRepository', useClass: SmsMarketingPrismaRepository },
    { provide: 'SmsCampaignRepository', useClass: SmsCampaignPrismaRepository },

    CreateSmsCampaignHandler,
    SendSmsCampaignHandler,
    ScheduleSmsCampaignHandler,
  ],
  exports: [SmsMarketingService, 'SmsMarketingRepository'],
})
export class SmsMarketingModule {}
