import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { AttributionEntity } from '../../../domain/entities/attribution.entity';
import type { AttributionResponseDTO } from '../../dtos/responses';

export interface AttributionServiceInterface
  extends BaseServiceInterface<AttributionEntity, string> {
  compute(input: {
    conversionId: string;
    model: string;
    touchpoints: readonly string[];
    conversionValue: number;
  }): Promise<AttributionResponseDTO>;
}
