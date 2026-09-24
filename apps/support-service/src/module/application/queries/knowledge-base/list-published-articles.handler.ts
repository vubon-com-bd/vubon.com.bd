import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { ListPublishedArticlesQuery } from './list-published-articles.query';
import type { KnowledgeArticleRepository } from '../../../domain/repositories/knowledge-article.repository.interface';

@QueryHandler(ListPublishedArticlesQuery)
export class ListPublishedArticlesHandler
  extends BaseQueryHandler<ListPublishedArticlesQuery, readonly unknown[]>
  implements IQueryHandler<ListPublishedArticlesQuery>
{
  readonly queryType = 'support.kb.list-published';

  constructor(private readonly kbRepo: KnowledgeArticleRepository) {
    super();
  }

  async execute(_query: ListPublishedArticlesQuery): Promise<readonly unknown[]> {
    const articles = await this.kbRepo.findPublished();
    return articles.map((a) => ({
      id: a.id.value,
      title: a.title.value,
      status: a.status.value,
    }));
  }
}
