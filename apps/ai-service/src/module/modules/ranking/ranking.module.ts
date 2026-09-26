import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { RankingController } from '../../interfaces/controllers/rest/ranking.controller';

import { RankingPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/ranking.prisma.repository';
import { RankingResultPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/ranking-result.prisma.repository';

import { RankingService } from '../../application/services/impl/ranking.service';
import { RankingResultService } from '../../application/services/impl/ranking-result.service';

import { RankingQueryHandlers } from './queries';

@Module({
  imports: [CqrsModule],
  controllers: [RankingController],
  providers: [
    RankingPrismaRepository,
    RankingResultPrismaRepository,
    RankingService,
    RankingResultService,
    ...RankingQueryHandlers,
  ],
  exports: [RankingService, RankingResultService],
})
export class RankingModule {}
