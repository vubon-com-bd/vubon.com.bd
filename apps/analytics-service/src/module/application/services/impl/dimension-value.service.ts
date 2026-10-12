/**
 * Dimension Value Service Implementation
 */
import { BaseService } from '@vubon/shared-kernel/application/services';
import type { DimensionValueEntity } from '../../../domain/entities/dimension-value.entity.js';
import type { DimensionValueRepository } from '../../../domain/repositories/dimension-value.repository.interface.js';
import { DimensionIdVO } from '../../../domain/value-objects/primitives/dimension-id.vo.js';
import { DimensionValueVO } from '../../../domain/value-objects/primitives/dimension-value.vo.js';
import type { IDimensionValueService } from '../interfaces/dimension-value.service.interface.js';

export class DimensionValueService extends BaseService<DimensionValueEntity, string> implements IDimensionValueService {
  readonly name = 'DimensionValueService';

  constructor(private readonly repository: DimensionValueRepository) {
    super();
  }

  async findByDimensionAndValue(dimensionId: string, value: string): Promise<DimensionValueEntity | null> {
    return this.repository.findByDimensionAndValue(
      DimensionIdVO.create(dimensionId),
      DimensionValueVO.create(value)
    );
  }

  async findTopByDimension(dimensionId: string, limit: number): Promise<readonly DimensionValueEntity[]> {
    return this.repository.findTopByDimension(DimensionIdVO.create(dimensionId), limit);
  }

  async upsertMany(entries: readonly DimensionValueEntity[]): Promise<number> {
    return this.repository.upsertMany(entries);
  }
}
