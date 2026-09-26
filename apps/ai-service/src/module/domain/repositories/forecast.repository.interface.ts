import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { ForecastEntity } from '../entities/forecast.entity';
import { ForecastIdVO } from '../value-objects/primitives/forecast-id.vo';

export interface ForecastRepository
  extends BaseRepository<ForecastEntity, ForecastIdVO> {
  findByTarget(target: string): Promise<readonly ForecastEntity[]>;
  findByModel(model: string): Promise<readonly ForecastEntity[]>;
  findRecentByTarget(target: string, limit: number): Promise<readonly ForecastEntity[]>;
}
