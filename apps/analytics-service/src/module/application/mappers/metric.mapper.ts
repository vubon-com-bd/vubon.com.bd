/**
 * Metric Mapper
 */
import type { MetricEntity } from '../../domain/entities/metric.entity.js';
import type { MetricResponseData } from '../dtos/responses/metric-response.dto.js';

export class MetricMapper {
  static toResponse(entity: MetricEntity): MetricResponseData {
    return {
      id: entity.id,
      name: entity.name.value,
      value: entity.currentValue.numeric,
      unit: entity.unit.value,
      type: entity.type.value,
      sampleCount: entity.sampleCount,
      min: entity.minValue?.numeric,
      max: entity.maxValue?.numeric,
    };
  }

  static toResponseList(entities: readonly MetricEntity[]): readonly MetricResponseData[] {
    return entities.map((e) => MetricMapper.toResponse(e));
  }
}
