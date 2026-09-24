import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { ListFeedbackByUserQuery } from './list-feedback-by-user.query';
import type { FeedbackRepository } from '../../../domain/repositories/feedback.repository.interface';
import { UserIdVO } from '../../../domain/value-objects/primitives/user-id.vo';
import type { FeedbackResponseDTO } from '../../dtos/responses/feedback-response.dto';

@QueryHandler(ListFeedbackByUserQuery)
export class ListFeedbackByUserHandler
  extends BaseQueryHandler<ListFeedbackByUserQuery, readonly FeedbackResponseDTO[]>
  implements IQueryHandler<ListFeedbackByUserQuery>
{
  readonly queryType = 'support.feedback.list-by-user';

  constructor(private readonly feedbackRepo: FeedbackRepository) {
    super();
  }

  async execute(query: ListFeedbackByUserQuery): Promise<readonly FeedbackResponseDTO[]> {
    const items = await this.feedbackRepo.findByUser(UserIdVO.create(query.userId));
    return items.map((fb) => ({
      id: fb.id.value,
      userId: fb.userId.value,
      type: fb.type.value,
      status: fb.status.value,
      content: fb.content.value,
      createdAt: fb.createdAt,
      updatedAt: fb.updatedAt,
    }));
  }
}
