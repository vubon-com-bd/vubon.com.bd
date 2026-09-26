import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { KernelCommonModule } from '@vubon/shared-kernel/modules';

import { EmailCampaignService } from '../../application/services/impl/email-campaign.service';
import { EmailCampaignPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/email-campaign.prisma.repository';
import { ListEmailCampaignsHandler } from '../../application/queries/email-marketing';

@Module({
  imports: [KernelCommonModule, CqrsModule],
  providers: [
    EmailCampaignService,
    { provide: 'EmailCampaignRepository', useClass: EmailCampaignPrismaRepository },
    ListEmailCampaignsHandler,
  ],
  exports: [EmailCampaignService, 'EmailCampaignRepository'],
})
export class EmailCampaignModule {}
