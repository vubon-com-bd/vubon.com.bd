import {
  ForecastResponseDTO,
  ForecastDataPointResponseDTO,
} from '../dtos/responses/forecast.response.dto';

export interface AppForecastDTO {
  readonly id: string;
  readonly target: string;
  readonly model: string;
  readonly horizonDays: number;
  readonly points: readonly {
    readonly timestamp: string;
    readonly value: number;
    readonly confidenceLower: number;
    readonly confidenceUpper: number;
  }[];
  readonly generatedAt: string;
}

export class ForecastControllerMapper {
  static toResponse(dto: AppForecastDTO): ForecastResponseDTO {
    return {
      id: dto.id,
      target: dto.target,
      model: dto.model,
      horizonDays: dto.horizonDays,
      points: dto.points.map<ForecastDataPointResponseDTO>((p) => ({
        timestamp: p.timestamp,
        value: p.value,
        confidenceLower: p.confidenceLower,
        confidenceUpper: p.confidenceUpper,
      })),
      generatedAt: dto.generatedAt,
    };
  }
}
