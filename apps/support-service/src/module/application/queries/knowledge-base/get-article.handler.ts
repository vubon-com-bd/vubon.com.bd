import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetArticleQuery } from './get-article.query';
import type { KnowledgeArticleRepository } from '../../../domain/repositories/knowledge-article.repository.interface';
import { KnowledgeArticleIdVO } from '../../../domain/value-objects/primitives/knowledge-article-id.vo';

@QueryHandler(GetArticleQuery)
export class GetArticleHandler
  extends BaseQueryHandler<GetArticleQuery, unknown>
  implements IQueryHandler<GetArticleQuery>
{
  readonly queryType = 'support.kb.get';

  constructor(private readonly kbRepo: KnowledgeArticleRepository) {
    super();
  }

  async execute(query: GetArticleQuery): Promise<unknown> {
    const article = await this.kbRepo.findById(
      KnowledgeArticleIdVO.create(query.articleId),
    );
    if (!article) throw new Error(`Article not found: ${query.articleId}`);
    return {
      id: article.id.value,
      title: article.title.value,
      body: article.body.value,
      status: article.status.value,
    };
  }
}
