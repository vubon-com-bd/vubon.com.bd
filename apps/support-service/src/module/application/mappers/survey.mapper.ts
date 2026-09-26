/**
 * SurveyMapper — domain ↔ DTO
 * @module support-service/application/mappers
 */
import { OneWayMapper } from '@vubon/shared-kernel/application/mappers';
import { SurveyEntity } from '../../domain/entities/survey.entity';
import type { SurveyResponseDTO } from '../dtos/responses/survey-response.dto';

export class SurveyMapper extends OneWayMapper<SurveyEntity, SurveyResponseDTO> {
  map(entity: SurveyEntity): SurveyResponseDTO {
    const snapshot = entity.toSnapshot();
    return {
      id: snapshot.id,
      title: snapshot.title,
      type: snapshot.type as SurveyResponseDTO['type'],
      status: snapshot.status as SurveyResponseDTO['status'],
      questions: snapshot.questions.map((q, idx) => ({
        id: String(idx),
        type: 'text' as SurveyResponseDTO['questions'][number]['type'],
        text: q,
        required: false,
        order: idx,
      })),
      isAnonymous: false,
      startAt: snapshot.publishedAt ?? snapshot.createdAt,
      endAt: snapshot.closedAt,
      responseCount: snapshot.responseCount,
      createdBy: 'system',
      createdAt: snapshot.createdAt,
      updatedAt: snapshot.updatedAt,
    };
  }

  toList(entities: readonly SurveyEntity[]): readonly SurveyResponseDTO[] {
    return entities.map((e) => this.map(e));
  }
}
