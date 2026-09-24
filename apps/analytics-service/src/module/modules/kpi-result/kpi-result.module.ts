import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { KpiResultService } from '../../application/services/impl/kpi-result.service';
import { KpiResultPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/kpi-result.prisma.repository';

@Module({
  imports: [CqrsModule],
  providers: [
    KpiResultPrismaRepository,
    KpiResultService,
  ],
  exports: [
    KpiResultService,
    KpiResultPrismaRepository,
  ],
})
export class KpiResultModule {}
