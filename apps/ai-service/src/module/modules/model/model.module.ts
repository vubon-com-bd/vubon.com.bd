import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { ModelController } from '../../interfaces/controllers/rest/model.controller';

import { ModelPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/model.prisma.repository';
import { ModelMetadataPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/model-metadata.prisma.repository';
import { ModelMetricsPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/model-metrics.prisma.repository';
import { ModelArtifactPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/model-artifact.prisma.repository';
import { ModelCacheRepository } from '../../infrastructure/persistence/cache/repositories/model.cache.repository';

import { ModelService } from '../../application/services/impl/model.service';
import { ModelMetadataService } from '../../application/services/impl/model-metadata.service';
import { ModelMetricsService } from '../../application/services/impl/model-metrics.service';
import { ModelArtifactService } from '../../application/services/impl/model-artifact.service';

import { ProviderPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/provider.prisma.repository';

import { ModelCommandHandlers } from './commands';
import { ModelQueryHandlers } from './queries';
import { ModelSagas } from './sagas';
import { ModelHealthIndicator } from './health';

@Module({
  imports: [CqrsModule],
  controllers: [ModelController],
  providers: [
    ModelPrismaRepository,
    ModelMetadataPrismaRepository,
    ModelMetricsPrismaRepository,
    ModelArtifactPrismaRepository,
    ModelCacheRepository,
    ProviderPrismaRepository,
    ModelService,
    ModelMetadataService,
    ModelMetricsService,
    ModelArtifactService,
    ...ModelCommandHandlers,
    ...ModelQueryHandlers,
    ...ModelSagas,
    ModelHealthIndicator,
  ],
  exports: [
    ModelService,
    ModelMetadataService,
    ModelMetricsService,
    ModelArtifactService,
    ModelHealthIndicator,
  ],
})
export class ModelModule {}
