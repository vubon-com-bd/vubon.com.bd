import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { KernelCommonModule } from '@vubon/shared-kernel/modules';

import { AffiliateService } from '../../application/services/impl/affiliate.service';
import { AffiliateCommissionService } from '../../application/services/impl/affiliate-commission.service';
import { AffiliatePayoutService } from '../../application/services/impl/affiliate-payout.service';
import { AffiliateLinkService } from '../../application/services/impl/affiliate-link.service';

import {
  RegisterAffiliateHandler,
  ApproveAffiliateHandler,
  TrackConversionHandler,
  RequestPayoutHandler,
} from '../../application/commands/affiliate';
import {
  GetAffiliateHandler,
  GetAffiliateByCodeHandler,
  ListAffiliatesHandler,
} from '../../application/queries/affiliate';

import { AffiliateMapper } from '../../application/mappers/affiliate.mapper';

import { AffiliatePrismaRepository } from '../../infrastructure/persistence/prisma/repositories/affiliate.prisma.repository';
import { AffiliateCommissionPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/affiliate-commission.prisma.repository';
import { AffiliatePayoutPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/affiliate-payout.prisma.repository';
import { AffiliateLinkPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/affiliate-link.prisma.repository';

import { AffiliateController } from '../../interfaces/controllers/rest/affiliate.controller';
import { AffiliatePayoutController } from '../../interfaces/controllers/rest/affiliate-payout.controller';
import { AffiliateLinkController } from '../../interfaces/controllers/rest/affiliate-link.controller';
import { AffiliateControllerMapper } from '../../interfaces/mappers/affiliate.controller.mapper';

@Module({
  imports: [KernelCommonModule, CqrsModule],
  controllers: [
    AffiliateController,
    AffiliatePayoutController,
    AffiliateLinkController,
  ],
  providers: [
    AffiliateService,
    AffiliateCommissionService,
    AffiliatePayoutService,
    AffiliateLinkService,

    { provide: 'AffiliateRepository', useClass: AffiliatePrismaRepository },
    { provide: 'AffiliateCommissionRepository', useClass: AffiliateCommissionPrismaRepository },
    { provide: 'AffiliatePayoutRepository', useClass: AffiliatePayoutPrismaRepository },
    { provide: 'AffiliateLinkRepository', useClass: AffiliateLinkPrismaRepository },

    AffiliateMapper,
    AffiliateControllerMapper,

    RegisterAffiliateHandler,
    ApproveAffiliateHandler,
    TrackConversionHandler,
    RequestPayoutHandler,
    GetAffiliateHandler,
    GetAffiliateByCodeHandler,
    ListAffiliatesHandler,
  ],
  exports: [AffiliateService, 'AffiliateRepository'],
})
export class AffiliateModule {}
