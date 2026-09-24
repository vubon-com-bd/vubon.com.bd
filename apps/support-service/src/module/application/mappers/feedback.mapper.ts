import { Injectable } from '@nestjs/common';
import { FeedbackEntity } from '../../domain/entities/feedback.entity';
import type { FeedbackResponseDTO } from '../dtos/responses/feedback-response.dto';

@Injectable()
export class FeedbackMapper {
  toDTO(entity: FeedbackEntity): FeedbackResponseDTO {
    return {
      id: entity.id.value,
      userId: entity.userId.value,
      type: entity.type.value,
      status: entity.status.value,
      content: entity.content.value,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }
}
