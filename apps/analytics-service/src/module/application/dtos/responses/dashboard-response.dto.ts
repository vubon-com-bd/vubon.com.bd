/**
 * Dashboard Response DTO
 * @module analytics-service/application/dtos/responses
 */
import { BaseResponseDTO } from '@vubon/shared-kernel/application/dtos';

export interface DashboardResponseData {
  readonly id: string;
  readonly name: string;
  readonly layout: string;
  readonly ownerId: string;
  readonly widgetCount: number;
  readonly isPublic: boolean;
  readonly isArchived: boolean;
  readonly createdAt: string;
}

export class DashboardResponseDTO extends BaseResponseDTO<DashboardResponseData> {
  static of(data: DashboardResponseData, message?: string): DashboardResponseDTO {
    return BaseResponseDTO.ok(data, message) as DashboardResponseDTO;
  }
}
