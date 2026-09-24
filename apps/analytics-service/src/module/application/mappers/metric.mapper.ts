import { Injectable } from '@nestjs/common';
import { MetricEntity } from '../../domain/entities/metric.entity';
import type { MetricResponseDTO } from '../dtos/responses';
import { toMetricResponse } from '../dtos/responses';

@Injectable()
export class MetricMapper {
  toResponse(entity: MetricEntity): MetricResponseDTO {
    return toMetricResponse(entity);
  }

  toResponseList(entities: readonly MetricEntity[]): readonly MetricResponseDTO[] {
    return entities.map((e) => toMetricResponse(e));
  }
}
