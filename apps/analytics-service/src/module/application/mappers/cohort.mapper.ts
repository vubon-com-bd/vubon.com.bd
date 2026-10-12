/**
 * Cohort Mapper
 */
import type { CohortEntity } from '../../domain/entities/cohort.entity.js';
import type { CohortResponseData } from '../dtos/responses/cohort-response.dto.js';

export class CohortMapper {
  static toResponse(entity: CohortEntity): CohortResponseData {
    return {
      id: entity.id,
      name: entity.name.value,
      period: entity.period.value,
      fromDate: entity.range.startAt.toISOString(),
      toDate: entity.range.endAt.toISOString(),
      isActive: entity.isActive,
      bucketCount: entity.bucketCount(),
      cohortSize: entity.lastAnalysis?.cohortSize,
      lastAnalyzedAt: entity.lastAnalyzedAt,
    };
  }

  static toResponseList(entities: readonly CohortEntity[]): readonly CohortResponseData[] {
    return entities.map((e) => CohortMapper.toResponse(e));
  }
}
