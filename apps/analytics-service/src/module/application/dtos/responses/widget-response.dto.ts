/**
 * Widget Response DTO
 * @module analytics-service/application/dtos/responses
 */
import { BaseResponseDTO } from '@vubon/shared-kernel/application/dtos';

export interface WidgetResponseData {
  readonly id: string;
  readonly dashboardId: string;
  readonly type: string;
  readonly title: string;
  readonly position: {
    readonly x: number;
    readonly y: number;
    readonly w: number;
    readonly h: number;
  };
  readonly data?: unknown;
  readonly hasError: boolean;
  readonly error?: string;
}

export class WidgetResponseDTO extends BaseResponseDTO<WidgetResponseData> {
  static of(data: WidgetResponseData, message?: string): WidgetResponseDTO {
    return BaseResponseDTO.ok(data, message) as WidgetResponseDTO;
  }
}
