/**
 * SurveyMapper
 * @module support-service/infrastructure/persistence/prisma/mappers
 */
import { Injectable } from '@nestjs/common';
import type { Survey as PrismaSurvey } from '@prisma/client';
import { SurveyEntity } from '../../../../domain/entities/survey.entity';

@Injectable()
export class SurveyMapper {
  toDomain(raw: PrismaSurvey): SurveyEntity {
    return SurveyEntity.rehydrate({
      id: raw.id,
      type: raw.type,
      status: raw.status,
      title: raw.title,
      questions: raw.questions,
      responseCount: raw.responseCount,
      publishedAt: raw.publishedAt?.toISOString(),
      closedAt: raw.closedAt?.toISOString(),
      createdAt: raw.createdAt.toISOString(),
      updatedAt: raw.updatedAt.toISOString(),
    });
  }

  toPersistence(entity: SurveyEntity): {
    readonly id: string;
    readonly type: string;
    readonly status: string;
    readonly title: string;
    readonly questions: readonly string[];
    readonly responseCount: number;
    readonly publishedAt: Date | null;
    readonly closedAt: Date | null;
    readonly createdAt: Date;
    readonly updatedAt: Date;
  } {
    const snap = entity.toSnapshot();
    return {
      id: snap.id,
      type: snap.type,
      status: snap.status,
      title: snap.title,
      questions: snap.questions,
      responseCount: snap.responseCount,
      publishedAt: snap.publishedAt ? new Date(snap.publishedAt) : null,
      closedAt: snap.closedAt ? new Date(snap.closedAt) : null,
      createdAt: new Date(snap.createdAt),
      updatedAt: new Date(snap.updatedAt),
    };
  }
}
