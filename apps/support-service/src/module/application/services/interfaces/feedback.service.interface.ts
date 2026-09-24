import type { FeedbackEntity } from '../../../domain/entities/feedback.entity';
import type { FeedbackIdVO } from '../../../domain/value-objects/primitives/feedback-id.vo';
import type { SubmitFeedbackRequestDTO } from '../../dtos/requests/feedback';
import type { FeedbackResponseDTO } from '../../dtos/responses/feedback-response.dto';

export interface FeedbackServiceInterface {
  submit(input: SubmitFeedbackRequestDTO): Promise<FeedbackResponseDTO>;
  findById(id: FeedbackIdVO): Promise<FeedbackEntity | null>;
}
