import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { RecommendationController } from '../../interfaces/controllers/rest/recommendation.controller';

import { RecommendationPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/recommendation.prisma.repository';
import { RecommendationContextPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/recommendation-context.prisma.repository';
import { RecommendationResultPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/recommendation-result.prisma.repository';
import { RecommendationCacheRepository } from '../../infrastructure/persistence/cache/repositories/recommendation.cache.repository';

import { RecommendationService } from '../../application/services/impl/recommendation.service';
import { RecommendationContextService } from '../../application/services/impl/recommendation-context.service';
import { RecommendationResultService } from '../../application/services/impl/recommendation-result.service';

import { RecommendationCommandHandlers } from './commands';
import { RecommendationQueryHandlers } from './queries';
import { RecommendationSagas } from './sagas';

@Module({
  imports: [CqrsModule],
  controllers: [RecommendationController],
  providers: [
    RecommendationPrismaRepository,
    RecommendationContextPrismaRepository,
    RecommendationResultPrismaRepository,
    RecommendationCacheRepository,
    RecommendationService,
    RecommendationContextService,
    RecommendationResultService,
    ...RecommendationCommandHandlers,
    ...RecommendationQueryHandlers,
    ...RecommendationSagas,
  ],
  exports: [
    RecommendationService,
    RecommendationContextService,
    RecommendationResultService,
  ],
})
export class RecommendationModule {}
