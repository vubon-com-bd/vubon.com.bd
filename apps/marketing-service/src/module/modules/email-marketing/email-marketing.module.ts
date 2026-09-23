import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { KernelCommonModule } from '@vubon/shared-kernel/modules';

import { EmailMarketingService } from '../../application/services/impl/email-marketing.service';
import { EmailCampaignService } from '../../application/services/impl/email-campaign.service';
import { EmailTemplateService } from '../../application/services/impl/email-template.service';
import { EmailSubscriberService } from '../../application/services/impl/email-subscriber.service';

import {
  CreateEmailCampaignHandler,
  SendEmailCampaignHandler,
  ScheduleEmailCampaignHandler,
  CreateEmailTemplateHandler,
} from '../../application/commands/email-marketing';

import {
  GetEmailCampaignHandler,
  ListEmailCampaignsHandler,
} from '../../application/queries/email-marketing';

import { EmailMarketingPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/email-marketing.prisma.repository';
import { EmailCampaignPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/email-campaign.prisma.repository';
import { EmailTemplatePrismaRepository } from '../../infrastructure/persistence/prisma/repositories/email-template.prisma.repository';
import { EmailSubscriberPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/email-subscriber.prisma.repository';

import { EmailMarketingController } from '../../interfaces/controllers/rest/email-marketing.controller';

@Module({
  imports: [KernelCommonModule, CqrsModule],
  controllers: [EmailMarketingController],
  providers: [
    EmailMarketingService,
    EmailCampaignService,
    EmailTemplateService,
    EmailSubscriberService,

    { provide: 'EmailMarketingRepository', useClass: EmailMarketingPrismaRepository },
    { provide: 'EmailCampaignRepository', useClass: EmailCampaignPrismaRepository },
    { provide: 'EmailTemplateRepository', useClass: EmailTemplatePrismaRepository },
    { provide: 'EmailSubscriberRepository', useClass: EmailSubscriberPrismaRepository },

    CreateEmailCampaignHandler,
    SendEmailCampaignHandler,
    ScheduleEmailCampaignHandler,
    CreateEmailTemplateHandler,
    GetEmailCampaignHandler,
    ListEmailCampaignsHandler,
  ],
  exports: [EmailMarketingService, 'EmailMarketingRepository'],
})
export class EmailMarketingModule {}
