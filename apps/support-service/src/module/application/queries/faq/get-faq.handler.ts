import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetFaqQuery } from './get-faq.query';
import type { FaqRepository } from '../../../domain/repositories/faq.repository.interface';
import { FaqIdVO } from '../../../domain/value-objects/primitives/faq-id.vo';

@QueryHandler(GetFaqQuery)
export class GetFaqHandler
  extends BaseQueryHandler<GetFaqQuery, unknown>
  implements IQueryHandler<GetFaqQuery>
{
  readonly queryType = 'support.faq.get';

  constructor(private readonly faqRepo: FaqRepository) {
    super();
  }

  async execute(query: GetFaqQuery): Promise<unknown> {
    const faq = await this.faqRepo.findById(FaqIdVO.create(query.faqId));
    if (!faq) throw new Error(`FAQ not found: ${query.faqId}`);
    return {
      id: faq.id.value,
      question: faq.question.value,
      answer: faq.answer.value,
      status: faq.status.value,
    };
  }
}
