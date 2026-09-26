/**
 * FeedbackControllerMapper
 * @module support-service/interfaces/mappers
 */
import { Injectable } from '@nestjs/common';
import type { FeedbackResponseDTO as AppFeedbackResponseDTO } from '../../application/dtos/responses/feedback-response.dto';
import { FeedbackResponseDTO } from '../dtos/responses/feedback-response.dto';

@Injectable()
export class FeedbackControllerMapper {
  toResponse(app: AppFeedbackResponseDTO): FeedbackResponseDTO {
    const res = new FeedbackResponseDTO();
    res.id = app.id;
    res.type = app.type;
    res.status = app.status;
    res.title = app.title;
    res.message = app.message;
    res.rating = app.rating;
    res.attachments = app.attachments ? [...app.attachments] : undefined;
    res.userId = app.userId;
    res.isAnonymous = app.isAnonymous;
    res.referenceId = app.referenceId;
    res.reviewedBy = app.reviewedBy;
    res.reviewedAt = app.reviewedAt;
    res.createdAt = app.createdAt;
    res.updatedAt = app.updatedAt;
    return res;
  }
}
