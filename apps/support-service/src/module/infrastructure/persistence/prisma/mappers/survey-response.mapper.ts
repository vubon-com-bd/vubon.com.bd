/**
 * SurveyResponseMapper
 * @module support-service/infrastructure/persistence/prisma/mappers
 */
import { Injectable } from '@nestjs/common';
import type { SurveyResponse as PrismaSurveyResponse } from '@prisma/client';
import { SurveyResponseEntity } from '../../../../domain/entities/survey-response.entity';

interface AnswerShape {
  readonly questionId: string;
  readonly value: string | number | readonly string[];
}

@Injectable()
export class SurveyResponseMapper {
  toDomain(raw: PrismaSurveyResponse): SurveyResponseEntity {
    const answers = this.parseAnswers(raw.answers);
    return SurveyResponseEntity.rehydrate({
      id: raw.id,
      surveyId: raw.surveyId,
      userId: raw.userId,
      answers,
      createdAt: raw.createdAt.toISOString(),
      updatedAt: raw.updatedAt.toISOString(),
    });
  }

  toPersistence(entity: SurveyResponseEntity): {
    readonly id: string;
    readonly surveyId: string;
    readonly userId: string;
    readonly answers: readonly AnswerShape[];
    readonly createdAt: Date;
    readonly updatedAt: Date;
  } {
    const snap = entity.toSnapshot();
    return {
      id: snap.id,
      surveyId: snap.surveyId,
      userId: snap.userId,
      answers: snap.answers,
      createdAt: new Date(snap.createdAt),
      updatedAt: new Date(snap.updatedAt),
    };
  }

  private parseAnswers(raw: unknown): readonly AnswerShape[] {
    if (!Array.isArray(raw)) return [];
    return raw
      .filter((item): item is AnswerShape => {
        return (
          typeof item === 'object' &&
          item !== null &&
          typeof (item as AnswerShape).questionId === 'string' &&
          'value' in item
        );
      })
      .map((item) => ({ questionId: item.questionId, value: item.value }));
  }
}
