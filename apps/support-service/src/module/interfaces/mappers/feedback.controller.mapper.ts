import { Injectable } from '@nestjs/common';
import type { FeedbackResponseDTO } from '../../application/dtos/responses/feedback-response.dto';
import type { FeedbackResponseDto } from '../dtos/responses/feedback.response.dto';

@Injectable()
export class FeedbackControllerMapper {
  toHttp(dto: FeedbackResponseDTO): FeedbackResponseDto {
    return {
      id: dto.id,
      userId: dto.userId,
      type: dto.type,
      status: dto.status,
      content: dto.content,
      createdAt: dto.createdAt,
    };
  }
}
