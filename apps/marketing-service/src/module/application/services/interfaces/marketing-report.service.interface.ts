import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { MarketingReportEntity } from '../../../domain/entities/marketing-report.entity';
import type { GenerateReportRequestDTO } from '../../dtos/requests/report/generate-report.dto';
import type { MarketingReportResponseDTO } from '../../dtos/responses/marketing-report-response.dto';

export interface MarketingReportServiceInterface
  extends BaseServiceInterface<MarketingReportEntity, string> {
  generate(input: GenerateReportRequestDTO): Promise<MarketingReportResponseDTO>;
  findByType(type: string): Promise<readonly MarketingReportResponseDTO[]>;
}
