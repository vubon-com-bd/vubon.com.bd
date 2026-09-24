import { Injectable } from '@nestjs/common';
import { ReportEntity } from '../../domain/entities/report.entity';
import type { ReportResponseDTO } from '../dtos/responses';
import { toReportResponse } from '../dtos/responses';

@Injectable()
export class ReportMapper {
  toResponse(entity: ReportEntity): ReportResponseDTO {
    return toReportResponse(entity);
  }

  toResponseList(entities: readonly ReportEntity[]): readonly ReportResponseDTO[] {
    return entities.map((e) => toReportResponse(e));
  }
}
