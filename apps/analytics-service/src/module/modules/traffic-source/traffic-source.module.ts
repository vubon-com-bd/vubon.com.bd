import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { TrafficController } from '../../interfaces/controllers/rest/traffic.controller';
import { TrafficSourceService } from '../../application/services/impl/traffic-source.service';
import { TrafficSourcePrismaRepository } from '../../infrastructure/persistence/prisma/repositories/traffic-source.prisma.repository';

@Module({
  imports: [CqrsModule],
  controllers: [TrafficController],
  providers: [
    TrafficSourcePrismaRepository,
    TrafficSourceService,
  ],
  exports: [
    TrafficSourceService,
    TrafficSourcePrismaRepository,
  ],
})
export class TrafficSourceModule {}
