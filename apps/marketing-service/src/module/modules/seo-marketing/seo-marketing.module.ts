import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { KernelCommonModule } from '@vubon/shared-kernel/modules';

import { SeoMarketingService } from '../../application/services/impl/seo-marketing.service';
import { SeoKeywordService } from '../../application/services/impl/seo-keyword.service';

import { SeoMarketingPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/seo-marketing.prisma.repository';
import { SeoKeywordPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/seo-keyword.prisma.repository';

import { SeoMarketingController } from '../../interfaces/controllers/rest/seo-marketing.controller';

@Module({
  imports: [KernelCommonModule, CqrsModule],
  controllers: [SeoMarketingController],
  providers: [
    SeoMarketingService,
    SeoKeywordService,

    { provide: 'SeoMarketingRepository', useClass: SeoMarketingPrismaRepository },
    { provide: 'SeoKeywordRepository', useClass: SeoKeywordPrismaRepository },
  ],
  exports: [SeoMarketingService, 'SeoMarketingRepository'],
})
export class SeoMarketingModule {}
