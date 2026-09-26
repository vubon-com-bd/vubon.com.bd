import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { DimensionEntity } from '../../../domain/entities/dimension.entity';
import type { DimensionIdVO } from '../../../domain/value-objects/primitives/dimension-id.vo';

export interface DimensionServiceInterface
  extends BaseServiceInterface<DimensionEntity, DimensionIdVO> {
  findByName(name: string): Promise<DimensionEntity | null>;
}
