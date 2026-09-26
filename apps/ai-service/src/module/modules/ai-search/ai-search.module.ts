import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { SearchController } from '../../interfaces/controllers/rest/search.controller';

import { AiSearchPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/ai-search.prisma.repository';
import { SearchResultPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/search-result.prisma.repository';

import { AiSearchService } from '../../application/services/impl/ai-search.service';
import { SearchResultService } from '../../application/services/impl/search-result.service';

import { AiSearchQueryHandlers } from './queries';

@Module({
  imports: [CqrsModule],
  controllers: [SearchController],
  providers: [
    AiSearchPrismaRepository,
    SearchResultPrismaRepository,
    AiSearchService,
    SearchResultService,
    ...AiSearchQueryHandlers,
  ],
  exports: [AiSearchService, SearchResultService],
})
export class AiSearchModule {}
