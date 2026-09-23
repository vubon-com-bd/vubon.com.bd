import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { KernelCommonModule } from '@vubon/shared-kernel/modules';

import { PromotionDiscountService } from '../../application/services/impl/promotion-discount.service';
import { PromotionDiscountPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/promotion-discount.prisma.repository';

@Module({
  imports: [KernelCommonModule, CqrsModule],
  providers: [
    PromotionDiscountService,
    { provide: 'PromotionDiscountRepository', useClass: PromotionDiscountPrismaRepository },
  ],
  exports: [PromotionDiscountService, 'PromotionDiscountRepository'],
})
export class PromotionDiscountModule {}
