/**
 * Report Mapper
 */
import type { ReportEntity } from '../../domain/entities/report.entity.js';
import type { ReportResponseData } from '../dtos/responses/report-response.dto.js';

export class ReportMapper {
  static toResponse(entity: ReportEntity): ReportResponseData {
    return {
      id: entity.id,
      name: entity.name,
      type: entity.type.value,
      format: entity.format.value,
      status: entity.status.value,
      frequency: entity.frequency.value,
      ownerId: entity.ownerId.value,
      nextRunAt: entity.nextRunAt,
      lastRunAt: entity.lastRunAt,
      outputUrl: entity.outputUrl,
      rowCount: entity.rowCount,
      createdAt: entity.createdAt,
    };
  }

  static toResponseList(entities: readonly ReportEntity[]): readonly ReportResponseData[] {
    return entities.map((e) => ReportMapper.toResponse(e));
  }
}
