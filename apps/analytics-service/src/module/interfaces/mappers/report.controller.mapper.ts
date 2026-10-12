/**
 * Report Controller Mapper
 */
import type { ReportResponseData } from '../../application/dtos/responses/report-response.dto.js';
import { ReportResponseDto } from '../dtos/responses/report.response.dto.js';

export class ReportControllerMapper {
  static toHttp(data: ReportResponseData): ReportResponseDto {
    const dto = new ReportResponseDto();
    dto.id = data.id;
    dto.name = data.name;
    dto.type = data.type;
    dto.format = data.format;
    dto.status = data.status;
    dto.frequency = data.frequency;
    dto.ownerId = data.ownerId;
    dto.nextRunAt = data.nextRunAt ?? null;
    dto.lastRunAt = data.lastRunAt ?? null;
    dto.outputUrl = data.outputUrl ?? null;
    dto.rowCount = data.rowCount;
    dto.createdAt = data.createdAt;
    return dto;
  }

  static toHttpList(data: readonly ReportResponseData[]): ReportResponseDto[] {
    return data.map((d) => ReportControllerMapper.toHttp(d));
  }
}
