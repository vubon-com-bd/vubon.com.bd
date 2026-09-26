import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { ForecastResultEntity } from '../entities/forecast-result.entity';
import { ForecastIdVO } from '../value-objects/primitives/forecast-id.vo';

export interface ForecastResultRepository
  extends BaseRepository<ForecastResultEntity, ForecastIdVO> {
  findByForecastId(forecastId: ForecastIdVO): Promise<ForecastResultEntity | null>;
}
