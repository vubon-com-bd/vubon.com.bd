import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { DimensionService } from '../../application/services/impl/dimension.service';
import { DimensionValueService } from '../../application/services/impl/dimension-value.service';
import { DimensionPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/dimension.prisma.repository';
import { DimensionValuePrismaRepository } from '../../infrastructure/persistence/prisma/repositories/dimension-value.prisma.repository';

@Module({
  imports: [CqrsModule],
  providers: [
    DimensionPrismaRepository,
    DimensionValuePrismaRepository,
    DimensionService,
    DimensionValueService,
  ],
  exports: [
    DimensionService,
    DimensionValueService,
    DimensionPrismaRepository,
    DimensionValuePrismaRepository,
  ],
})
export class DimensionModule {}
