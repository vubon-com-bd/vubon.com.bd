import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { ForecastEntity } from '../../../domain/entities/forecast.entity';
import type { ForecastIdVO } from '../../../domain/value-objects/primitives/forecast-id.vo';
import type { GenerateForecastRequestDTO } from '../../dtos/requests/forecast/generate-forecast.dto';
import type { ForecastResponseDTO } from '../../dtos/responses/forecast-response.dto';

export interface ForecastServiceInterface
  extends BaseServiceInterface<ForecastEntity, ForecastIdVO> {
  generate(input: GenerateForecastRequestDTO): Promise<ForecastResponseDTO>;
}
