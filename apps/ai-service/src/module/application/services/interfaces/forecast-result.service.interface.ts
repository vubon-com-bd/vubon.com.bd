import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { ForecastResultEntity } from '../../../domain/entities/forecast-result.entity';
import type { ForecastIdVO } from '../../../domain/value-objects/primitives/forecast-id.vo';

export interface ForecastResultServiceInterface
  extends BaseServiceInterface<ForecastResultEntity, ForecastIdVO> {
  findByForecastId(forecastId: string): Promise<ForecastResultEntity | null>;
}
