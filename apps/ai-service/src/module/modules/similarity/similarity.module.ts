import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { SimilarityController } from '../../interfaces/controllers/rest/similarity.controller';

import { SimilarityPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/similarity.prisma.repository';
import { SimilarityResultPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/similarity-result.prisma.repository';

import { SimilarityService } from '../../application/services/impl/similarity.service';
import { SimilarityResultService } from '../../application/services/impl/similarity-result.service';

import { SimilarityQueryHandlers } from './queries';

@Module({
  imports: [CqrsModule],
  controllers: [SimilarityController],
  providers: [
    SimilarityPrismaRepository,
    SimilarityResultPrismaRepository,
    SimilarityService,
    SimilarityResultService,
    ...SimilarityQueryHandlers,
  ],
  exports: [SimilarityService, SimilarityResultService],
})
export class SimilarityModule {}
