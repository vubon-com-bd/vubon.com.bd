import { BaseMapper } from '@vubon/shared-kernel/application/mappers/base.mapper';
import { ForecastEntity } from '../../domain/entities/forecast.entity';
import type { ForecastResponseDTO } from '../dtos/responses/forecast-response.dto';

export class ForecastMapper extends BaseMapper<ForecastEntity, ForecastResponseDTO> {
  toTarget(source: ForecastEntity): ForecastResponseDTO {
    return {
      id: source.id.value,
      target: source.target,
      model: source.model,
      horizonDays: source.horizon.value,
      points: source.result.points.map((p) => ({
        timestamp: p.timestamp.toISOString(),
        value: p.value,
        confidenceLower: p.confidenceLower,
        confidenceUpper: p.confidenceUpper,
      })),
      generatedAt: source.createdAt,
    };
  }

  toSource(_target: ForecastResponseDTO): ForecastEntity {
    throw new Error('ForecastMapper.toSource not supported');
  }
}
