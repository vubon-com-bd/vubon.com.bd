import { Injectable } from '@nestjs/common';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { ForecastServiceInterface } from '../interfaces/forecast.service.interface';
import type { ForecastRepository } from '../../../domain/repositories/forecast.repository.interface';
import { ForecastEntity } from '../../../domain/entities/forecast.entity';
import { ForecastIdVO } from '../../../domain/value-objects/primitives/forecast-id.vo';
import { ForecastHorizonVO } from '../../../domain/value-objects/primitives/forecast-horizon.vo';
import { ForecastResultVO } from '../../../domain/value-objects/composites/forecast-result.vo';
import { ForecastingService } from '../../../domain/services/forecasting.service';
import { InsufficientDataForForecastError } from '../../errors/forecast.errors';
import type { GenerateForecastRequestDTO } from '../../dtos/requests/forecast/generate-forecast.dto';
import type { ForecastResponseDTO } from '../../dtos/responses/forecast-response.dto';

@Injectable()
export class ForecastService
  extends BaseService<ForecastEntity, ForecastIdVO>
  implements ForecastServiceInterface
{
  readonly name = 'ForecastService';

  constructor(
    private readonly forecastRepo: ForecastRepository,
    private readonly forecastingService: ForecastingService,
  ) {
    super();
  }

  async generate(input: GenerateForecastRequestDTO): Promise<ForecastResponseDTO> {
    if (input.historicalData.length < 3) {
      throw new InsufficientDataForForecastError(3, input.historicalData.length);
    }

    const horizon = ForecastHorizonVO.create(input.horizonDays);
    const series = input.historicalData.map((p) => ({
      timestamp: new Date(p.timestamp),
      value: p.value,
    }));

    const model = String(input.model ?? 'linear_regression');
    const points =
      model === 'moving_average'
        ? this.forecastingService.movingAverage(series, horizon, input.windowSize ?? 3)
        : this.forecastingService.linearRegression(series, horizon);

    const result = ForecastResultVO.create({
      id: ForecastIdVO.create(crypto.randomUUID()),
      points: points.map((p) => ({
        timestamp: p.timestamp,
        value: p.value,
        confidenceLower: p.confidenceLower,
        confidenceUpper: p.confidenceUpper,
      })),
      model,
    });

    const entity = ForecastEntity.create({
      target: input.target,
      horizon,
      model,
      result,
    });

    await this.forecastRepo.save(entity);

    return {
      id: entity.id.value,
      target: entity.target,
      model: entity.model,
      horizonDays: entity.horizon.value,
      points: entity.result.points.map((p) => ({
        timestamp: p.timestamp.toISOString(),
        value: p.value,
        confidenceLower: p.confidenceLower,
        confidenceUpper: p.confidenceUpper,
      })),
      generatedAt: new Date().toISOString(),
    };
  }
}
