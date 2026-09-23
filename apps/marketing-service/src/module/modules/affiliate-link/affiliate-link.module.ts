import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { KernelCommonModule } from '@vubon/shared-kernel/modules';

import { AffiliateLinkService } from '../../application/services/impl/affiliate-link.service';
import { AffiliateLinkPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/affiliate-link.prisma.repository';
import { AffiliateLinkController } from '../../interfaces/controllers/rest/affiliate-link.controller';

@Module({
  imports: [KernelCommonModule, CqrsModule],
  controllers: [AffiliateLinkController],
  providers: [
    AffiliateLinkService,
    { provide: 'AffiliateLinkRepository', useClass: AffiliateLinkPrismaRepository },
  ],
  exports: [AffiliateLinkService, 'AffiliateLinkRepository'],
})
export class AffiliateLinkModule {}
