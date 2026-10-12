/**
 * Attribution Response DTO
 * @module analytics-service/application/dtos/responses
 */
import { BaseResponseDTO } from '@vubon/shared-kernel/application/dtos';

export interface AttributionTouchpointData {
  readonly channel: string;
  readonly weight: number;
  readonly creditedRevenue: number;
  readonly timestamp: number;
}

export interface AttributionResponseData {
  readonly conversionId: string;
  readonly model: string;
  readonly conversionValue: number;
  readonly touchpointCount: number;
  readonly touchpoints: readonly AttributionTouchpointData[];
  readonly creditByChannel: Record<string, number>;
}

export class AttributionResponseDTO extends BaseResponseDTO<AttributionResponseData> {
  static of(data: AttributionResponseData, message?: string): AttributionResponseDTO {
    return BaseResponseDTO.ok(data, message) as AttributionResponseDTO;
  }
}
