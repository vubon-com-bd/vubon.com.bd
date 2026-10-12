/**
 * Attribution Repository Interface
 * @module analytics-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base';
import type { AttributionEntity } from '../entities/attribution.entity.js';
import type { TimeRangeVO } from '../value-objects/composites/time-range.vo.js';

export interface AttributionRepository extends BaseRepository<AttributionEntity, string> {
  findByConversionId(conversionId: string): Promise<AttributionEntity | null>;
  findByModel(model: string): Promise<readonly AttributionEntity[]>;
  findByModelInRange(model: string, range: TimeRangeVO): Promise<readonly AttributionEntity[]>;
  findHighValue(minValue: number, limit: number): Promise<readonly AttributionEntity[]>;
  deleteOlderThan(cutoff: string): Promise<number>;
}
