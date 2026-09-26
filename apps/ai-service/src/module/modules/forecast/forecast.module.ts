import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { ForecastController } from '../../interfaces/controllers/rest/forecast.controller';

import { ForecastPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/forecast.prisma.repository';
import { ForecastResultPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/forecast-result.prisma.repository';

import { ForecastService } from '../../application/services/impl/forecast.service';
import { ForecastResultService } from '../../application/services/impl/forecast-result.service';

import { ForecastQueue } from '../../infrastructure/queues/forecast.queue';
import { ForecastGeneratorWorker } from '../../infrastructure/workers/forecast-generator.worker';

import { ForecastCommandHandlers } from './commands';
import { ForecastQueryHandlers } from './queries';
import { ForecastSagas } from './sagas';

@Module({
  imports: [CqrsModule],
  controllers: [ForecastController],
  providers: [
    ForecastPrismaRepository,
    ForecastResultPrismaRepository,
    ForecastService,
    ForecastResultService,
    ForecastQueue,
    ForecastGeneratorWorker,
    ...ForecastCommandHandlers,
    ...ForecastQueryHandlers,
    ...ForecastSagas,
  ],
  exports: [ForecastService, ForecastResultService],
})
export class ForecastModule {}
