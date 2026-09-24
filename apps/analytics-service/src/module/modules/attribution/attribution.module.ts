import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { AttributionService } from '../../application/services/impl/attribution.service';
import { ComputeAttributionHandler } from '../../application/commands/attribution/compute-attribution.handler';
import { AttributionPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/attribution.prisma.repository';
import { AttributionComputerService } from '../../infrastructure/services/internal/attribution-computer.service';

const HANDLERS = [ComputeAttributionHandler];

@Module({
  imports: [CqrsModule],
  providers: [
    AttributionPrismaRepository,
    AttributionComputerService,
    AttributionService,
    ...HANDLERS,
  ],
  exports: [
    AttributionService,
    AttributionPrismaRepository,
    AttributionComputerService,
  ],
})
export class AttributionModule {}
