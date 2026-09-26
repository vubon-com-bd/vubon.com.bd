/**
 * FeedbackMapper — domain ↔ DTO
 * @module support-service/application/mappers
 */
import { OneWayMapper } from '@vubon/shared-kernel/application/mappers';
import { FeedbackEntity } from '../../domain/entities/feedback.entity';
import type { FeedbackResponseDTO } from '../dtos/responses/feedback-response.dto';

export class FeedbackMapper extends OneWayMapper<FeedbackEntity, FeedbackResponseDTO> {
  map(entity: FeedbackEntity): FeedbackResponseDTO {
    const snapshot = entity.toSnapshot();
    return {
      id: snapshot.id,
      type: snapshot.type as FeedbackResponseDTO['type'],
      status: snapshot.status as FeedbackResponseDTO['status'],
      message: snapshot.content,
      rating: snapshot.rating,
      userId: snapshot.userId,
      isAnonymous: false,
      referenceId: snapshot.ticketId ?? snapshot.orderId,
      reviewedAt: snapshot.reviewedAt,
      createdAt: snapshot.createdAt,
      updatedAt: snapshot.updatedAt,
    };
  }

  toList(entities: readonly FeedbackEntity[]): readonly FeedbackResponseDTO[] {
    return entities.map((e) => this.map(e));
  }
}
