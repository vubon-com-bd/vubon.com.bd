import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { ReportEntity } from '../../../domain/entities/report.entity';
import type { ReportIdVO } from '../../../domain/value-objects/primitives/report-id.vo';
import type {
  CreateReportDTO,
  GenerateReportDTO,
  ScheduleReportDTO,
  ExportReportDTO,
} from '../../dtos/requests/report';
import type { ReportResponseDTO } from '../../dtos/responses';

export interface ReportServiceInterface
  extends BaseServiceInterface<ReportEntity, ReportIdVO> {
  create(input: CreateReportDTO): Promise<ReportResponseDTO>;
  generate(input: GenerateReportDTO): Promise<ReportResponseDTO>;
  schedule(input: ScheduleReportDTO): Promise<ReportResponseDTO>;
  export(input: ExportReportDTO): Promise<{
    readonly format: string;
    readonly filename: string;
    readonly mimeType: string;
  }>;
}
