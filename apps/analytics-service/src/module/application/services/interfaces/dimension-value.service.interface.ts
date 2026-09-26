import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { DimensionValueEntity } from '../../../domain/entities/dimension-value.entity';

export interface DimensionValueServiceInterface
  extends BaseServiceInterface<DimensionValueEntity, string> {
  findByDimensionId(dimensionId: string): Promise<readonly DimensionValueEntity[]>;
  breakdown(dimensionId: string, limit: number): Promise<readonly {
    readonly value: string;
    readonly count: number;
    readonly percentage: number;
  }[]>;
}
