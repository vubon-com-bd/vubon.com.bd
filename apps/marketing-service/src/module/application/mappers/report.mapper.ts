import { Injectable } from '@nestjs/common';
import { MarketingReportEntity } from '../../domain/entities/marketing-report.entity';
import type { MarketingReportResponseDTO } from '../dtos/responses/marketing-report-response.dto';

@Injectable()
export class ReportMapper {
  toDTO(entity: MarketingReportEntity): MarketingReportResponseDTO {
    return {
      id: entity.id.value,
      type: entity.type.value,
      format: entity.format.value,
      generatedAt: entity.generatedAt.toISOString(),
      periodStart: entity.createdAt,
      periodEnd: entity.updatedAt,
    } as unknown as MarketingReportResponseDTO;
  }
}
