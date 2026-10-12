/**
 * Traffic Source Module
 */
import { Module } from '@nestjs/common';
import { TrafficSourceController } from '../../interfaces/controllers/rest/traffic-source.controller.js';
import { TRAFFIC_SOURCE_QUERY_HANDLERS } from './queries/index.js';
import { TrafficSourcePrismaRepository } from '../../infrastructure/persistence/prisma/repositories/traffic-source.prisma.repository.js';
import { TrafficSourceService } from '../../application/services/impl/traffic-source.service.js';

@Module({
  controllers: [TrafficSourceController],
  providers: [
    TrafficSourcePrismaRepository,
    TrafficSourceService,
    ...TRAFFIC_SOURCE_QUERY_HANDLERS as readonly unknown[] as never[],
  ],
  exports: [
    TrafficSourceService,
    TrafficSourcePrismaRepository,
  ],
})
export class TrafficSourceModule {}
