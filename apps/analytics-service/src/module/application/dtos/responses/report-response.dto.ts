/**
 * Report Response DTO
 * @module analytics-service/application/dtos/responses
 */
import { BaseResponseDTO } from '@vubon/shared-kernel/application/dtos';

export interface ReportResponseData {
  readonly id: string;
  readonly name: string;
  readonly type: string;
  readonly format: string;
  readonly status: string;
  readonly frequency: string;
  readonly ownerId: string;
  readonly nextRunAt?: string | null;
  readonly lastRunAt?: string | null;
  readonly outputUrl?: string | null;
  readonly rowCount?: number;
  readonly createdAt: string;
}

export class ReportResponseDTO extends BaseResponseDTO<ReportResponseData> {
  static of(data: ReportResponseData, message?: string): ReportResponseDTO {
    return BaseResponseDTO.ok(data, message) as ReportResponseDTO;
  }
}
