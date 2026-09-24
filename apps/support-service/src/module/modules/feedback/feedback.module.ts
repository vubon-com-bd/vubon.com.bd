import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { FeedbackController } from '../../interfaces/controllers/rest/feedback.controller';
import { SubmitFeedbackHandler } from '../../application/commands/feedback/submit-feedback.handler';
import { ReviewFeedbackHandler } from '../../application/commands/feedback/review-feedback.handler';
import { GetFeedbackHandler } from '../../application/queries/feedback/get-feedback.handler';
import { ListFeedbackByUserHandler } from '../../application/queries/feedback/list-feedback-by-user.handler';
import { FeedbackService } from '../../application/services/impl/feedback.service';

const HANDLERS = [
  SubmitFeedbackHandler,
  ReviewFeedbackHandler,
  GetFeedbackHandler,
  ListFeedbackByUserHandler,
];

@Module({
  imports: [CqrsModule],
  controllers: [FeedbackController],
  providers: [...HANDLERS, FeedbackService],
  exports: [FeedbackService],
})
export class FeedbackModule {}
