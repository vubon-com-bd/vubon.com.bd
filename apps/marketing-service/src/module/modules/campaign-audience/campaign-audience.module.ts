import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { KernelCommonModule } from '@vubon/shared-kernel/modules';

import { CampaignAudienceService } from '../../application/services/impl/campaign-audience.service';
import { CampaignAudiencePrismaRepository } from '../../infrastructure/persistence/prisma/repositories/campaign-audience.prisma.repository';
import { CampaignAudienceController } from '../../interfaces/controllers/rest/campaign-audience.controller';

@Module({
  imports: [KernelCommonModule, CqrsModule],
  controllers: [CampaignAudienceController],
  providers: [
    CampaignAudienceService,
    { provide: 'CampaignAudienceRepository', useClass: CampaignAudiencePrismaRepository },
  ],
  exports: [CampaignAudienceService, 'CampaignAudienceRepository'],
})
export class CampaignAudienceModule {}
