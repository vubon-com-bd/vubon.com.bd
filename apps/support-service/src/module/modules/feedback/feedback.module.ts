/**
 * FeedbackModule
 * @module support-service/modules/feedback
 */
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { FeedbackService } from '../../application/services/impl/feedback.service';
import { FeedbackMapper } from '../../application/mappers/feedback.mapper';
import { SubmitFeedbackHandler } from '../../application/commands/feedback/submit-feedback.handler';
import { ReviewFeedbackHandler } from '../../application/commands/feedback/review-feedback.handler';
import { GetFeedbackHandler } from '../../application/queries/feedback/get-feedback.handler';
import { ListFeedbacksHandler } from '../../application/queries/feedback/list-feedbacks.handler';
import { FeedbackController } from '../../interfaces/controllers/rest/feedback.controller';
import { FeedbackControllerMapper } from '../../interfaces/mappers/feedback.controller.mapper';

@Module({
  imports: [CqrsModule],
  controllers: [FeedbackController],
  providers: [
    FeedbackService,
    FeedbackMapper,
    FeedbackControllerMapper,
    SubmitFeedbackHandler,
    ReviewFeedbackHandler,
    GetFeedbackHandler,
    ListFeedbacksHandler,
  ],
  exports: [FeedbackService],
})
export class FeedbackModule {}
