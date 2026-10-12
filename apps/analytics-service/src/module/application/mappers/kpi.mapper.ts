/**
 * KPI Mapper
 */
import type { KpiEntity } from '../../domain/entities/kpi.entity.js';
import type { KpiResponseData } from '../dtos/responses/kpi-response.dto.js';

export class KpiMapper {
  static toResponse(entity: KpiEntity): KpiResponseData {
    return {
      id: entity.id,
      name: entity.name.value,
      metric: entity.metric.value,
      target: entity.target.numeric,
      thresholdPercent: entity.threshold.percent,
      higherIsBetter: entity.higherIsBetter,
      isActive: entity.isActive,
      lastActualValue: entity.lastActualValue,
      lastEvaluatedAt: entity.lastEvaluatedAt,
    };
  }

  static toResponseList(entities: readonly KpiEntity[]): readonly KpiResponseData[] {
    return entities.map((e) => KpiMapper.toResponse(e));
  }
}
