import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { AttributionEntity } from '../entities/attribution.entity';
import { AttributionModelVO } from '../value-objects/primitives/attribution-model.vo';

export interface AttributionRepository
  extends BaseRepository<AttributionEntity, string> {
  findByConversionId(conversionId: string): Promise<AttributionEntity | null>;
  findByModel(model: AttributionModelVO): Promise<readonly AttributionEntity[]>;
}
