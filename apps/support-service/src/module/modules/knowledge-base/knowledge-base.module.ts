import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { KnowledgeBaseController } from '../../interfaces/controllers/rest/knowledge-base.controller';
import { GetArticleHandler } from '../../application/queries/knowledge-base/get-article.handler';
import { ListPublishedArticlesHandler } from '../../application/queries/knowledge-base/list-published-articles.handler';
import { KnowledgeBaseService } from '../../application/services/impl/knowledge-base.service';

@Module({
  imports: [CqrsModule],
  controllers: [KnowledgeBaseController],
  providers: [
    GetArticleHandler,
    ListPublishedArticlesHandler,
    KnowledgeBaseService,
  ],
  exports: [KnowledgeBaseService],
})
export class KnowledgeBaseModule {}
