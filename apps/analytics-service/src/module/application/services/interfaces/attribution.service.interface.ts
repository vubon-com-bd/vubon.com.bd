/**
 * Attribution Service Interface
 * @module analytics-service/application/services/interfaces
 */
import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services';
import type { AttributionEntity } from '../../../domain/entities/attribution.entity.js';
import type { AttributionResponseData } from '../../dtos/responses/attribution-response.dto.js';

export interface IAttributionService extends BaseServiceInterface<AttributionEntity, string> {
  compute(input: {
    conversionId: string;
    conversionValue: number;
    touchpointIds: readonly string[];
    model: string;
  }): Promise<AttributionResponseData>;
  findByConversionId(conversionId: string): Promise<AttributionResponseData | null>;
  findHighValue(minValue: number, limit: number): Promise<readonly AttributionResponseData[]>;
}
