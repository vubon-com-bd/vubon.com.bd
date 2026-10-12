/**
 * Attribution Module
 */
import { Module } from '@nestjs/common';
import { AttributionController } from '../../interfaces/controllers/rest/attribution.controller.js';
import { ATTRIBUTION_COMMAND_HANDLERS } from './commands/index.js';
import { AttributionPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/attribution.prisma.repository.js';
import { TrafficSourcePrismaRepository } from '../../infrastructure/persistence/prisma/repositories/traffic-source.prisma.repository.js';
import { AttributionService } from '../../application/services/impl/attribution.service.js';

@Module({
  controllers: [AttributionController],
  providers: [
    AttributionPrismaRepository,
    TrafficSourcePrismaRepository,
    AttributionService,
    ...ATTRIBUTION_COMMAND_HANDLERS as readonly unknown[] as never[],
  ],
  exports: [
    AttributionService,
    AttributionPrismaRepository,
  ],
})
export class AttributionModule {}
