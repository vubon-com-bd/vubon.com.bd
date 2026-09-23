import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { KernelCommonModule } from '@vubon/shared-kernel/modules';

import { AffiliatePayoutService } from '../../application/services/impl/affiliate-payout.service';
import { AffiliatePayoutPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/affiliate-payout.prisma.repository';
import { AffiliatePayoutController } from '../../interfaces/controllers/rest/affiliate-payout.controller';
import { RequestPayoutHandler } from '../../application/commands/affiliate';

@Module({
  imports: [KernelCommonModule, CqrsModule],
  controllers: [AffiliatePayoutController],
  providers: [
    AffiliatePayoutService,
    { provide: 'AffiliatePayoutRepository', useClass: AffiliatePayoutPrismaRepository },
    RequestPayoutHandler,
  ],
  exports: [AffiliatePayoutService, 'AffiliatePayoutRepository'],
})
export class AffiliatePayoutModule {}
