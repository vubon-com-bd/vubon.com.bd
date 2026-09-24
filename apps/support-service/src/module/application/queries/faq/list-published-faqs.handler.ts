import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { ListPublishedFaqsQuery } from './list-published-faqs.query';
import type { FaqRepository } from '../../../domain/repositories/faq.repository.interface';

@QueryHandler(ListPublishedFaqsQuery)
export class ListPublishedFaqsHandler
  extends BaseQueryHandler<ListPublishedFaqsQuery, readonly unknown[]>
  implements IQueryHandler<ListPublishedFaqsQuery>
{
  readonly queryType = 'support.faq.list-published';

  constructor(private readonly faqRepo: FaqRepository) {
    super();
  }

  async execute(_query: ListPublishedFaqsQuery): Promise<readonly unknown[]> {
    const faqs = await this.faqRepo.findPublished();
    return faqs.map((f) => ({
      id: f.id.value,
      question: f.question.value,
      answer: f.answer.value,
      status: f.status.value,
    }));
  }
}
