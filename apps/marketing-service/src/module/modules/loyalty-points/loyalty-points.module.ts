import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { KernelCommonModule } from '@vubon/shared-kernel/modules';

import { LoyaltyPointsService } from '../../application/services/impl/loyalty-points.service';
import { LoyaltyPointsPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/loyalty-points.prisma.repository';

@Module({
  imports: [KernelCommonModule, CqrsModule],
  providers: [
    LoyaltyPointsService,
    { provide: 'LoyaltyPointsRepository', useClass: LoyaltyPointsPrismaRepository },
  ],
  exports: [LoyaltyPointsService, 'LoyaltyPointsRepository'],
})
export class LoyaltyPointsModule {}
