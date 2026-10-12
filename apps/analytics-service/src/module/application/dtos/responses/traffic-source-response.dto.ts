/**
 * Traffic Source Response DTO
 * @module analytics-service/application/dtos/responses
 */
import { BaseResponseDTO } from '@vubon/shared-kernel/application/dtos';

export interface TrafficSourceResponseData {
  readonly source: string;
  readonly medium?: string;
  readonly campaign?: string;
  readonly referrer?: string;
  readonly channel: string;
  readonly isPaid: boolean;
  readonly isOrganic: boolean;
  readonly isDirect: boolean;
}

export class TrafficSourceResponseDTO extends BaseResponseDTO<TrafficSourceResponseData> {
  static of(data: TrafficSourceResponseData, message?: string): TrafficSourceResponseDTO {
    return BaseResponseDTO.ok(data, message) as TrafficSourceResponseDTO;
  }
}
