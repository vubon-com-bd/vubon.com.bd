import { Injectable } from '@nestjs/common';
import { SurveyEntity } from '../../domain/entities/survey.entity';
import type { SurveyResponseDTO } from '../dtos/responses/survey-response.dto';

@Injectable()
export class SurveyMapper {
  toDTO(entity: SurveyEntity): SurveyResponseDTO {
    return {
      id: entity.id.value,
      title: entity.title,
      type: entity.type.value,
      status: entity.status.value,
      questions: entity.questions,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }
}
