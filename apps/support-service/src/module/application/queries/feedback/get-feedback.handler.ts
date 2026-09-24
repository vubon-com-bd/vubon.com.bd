import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetFeedbackQuery } from './get-feedback.query';
import type { FeedbackRepository } from '../../../domain/repositories/feedback.repository.interface';
import { FeedbackIdVO } from '../../../domain/value-objects/primitives/feedback-id.vo';
import { FeedbackNotFoundError } from '../../errors/feedback.errors';
import type { FeedbackResponseDTO } from '../../dtos/responses/feedback-response.dto';

@QueryHandler(GetFeedbackQuery)
export class GetFeedbackHandler
  extends BaseQueryHandler<GetFeedbackQuery, FeedbackResponseDTO>
  implements IQueryHandler<GetFeedbackQuery>
{
  readonly queryType = 'support.feedback.get';

  constructor(private readonly feedbackRepo: FeedbackRepository) {
    super();
  }

  async execute(query: GetFeedbackQuery): Promise<FeedbackResponseDTO> {
    const fb = await this.feedbackRepo.findById(FeedbackIdVO.create(query.feedbackId));
    if (!fb) throw new FeedbackNotFoundError(query.feedbackId);
    return {
      id: fb.id.value,
      userId: fb.userId.value,
      type: fb.type.value,
      status: fb.status.value,
      content: fb.content.value,
      createdAt: fb.createdAt,
      updatedAt: fb.updatedAt,
    };
  }
}
