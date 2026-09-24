import { Injectable } from '@nestjs/common';
import type { FeedbackServiceInterface } from '../interfaces/feedback.service.interface';
import type { FeedbackRepository } from '../../../domain/repositories/feedback.repository.interface';
import { FeedbackEntity } from '../../../domain/entities/feedback.entity';
import { FeedbackIdVO } from '../../../domain/value-objects/primitives/feedback-id.vo';
import { FeedbackTypeVO } from '../../../domain/value-objects/primitives/feedback-type.vo';
import { FeedbackStatusVO } from '../../../domain/value-objects/primitives/feedback-status.vo';
import { FeedbackContentVO } from '../../../domain/value-objects/primitives/feedback-content.vo';
import { UserIdVO } from '../../../domain/value-objects/primitives/user-id.vo';
import { FeedbackNotFoundError, FeedbackOperationFailedError } from '../../errors/feedback.errors';
import type { SubmitFeedbackRequestDTO } from '../../dtos/requests/feedback';
import type { FeedbackResponseDTO } from '../../dtos/responses/feedback-response.dto';

@Injectable()
export class FeedbackService implements FeedbackServiceInterface {
  constructor(private readonly feedbackRepo: FeedbackRepository) {}

  async submit(input: SubmitFeedbackRequestDTO): Promise<FeedbackResponseDTO> {
    try {
      const entity = FeedbackEntity.create({
        userId: UserIdVO.create(input.userId),
        type: FeedbackTypeVO.create(input.type),
        status: FeedbackStatusVO.create('pending'),
        content: FeedbackContentVO.create(input.content),
      });
      const saved = await this.feedbackRepo.save(entity);
      return this.toDTO(saved);
    } catch (error) {
      throw new FeedbackOperationFailedError(
        error instanceof Error ? error.message : 'unknown',
      );
    }
  }

  async findById(id: FeedbackIdVO): Promise<FeedbackEntity | null> {
    return this.feedbackRepo.findById(id);
  }

  private toDTO(entity: FeedbackEntity): FeedbackResponseDTO {
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
