/**
 * Report Service Interface
 * @module analytics-service/application/services/interfaces
 */
import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services';
import type { ReportEntity } from '../../../domain/entities/report.entity.js';
import type { CreateReportDto } from '../../dtos/requests/report/create-report.dto.js';
import type { GenerateReportDto } from '../../dtos/requests/report/generate-report.dto.js';
import type { ReportResponseData } from '../../dtos/responses/report-response.dto.js';

export interface IReportService extends BaseServiceInterface<ReportEntity, string> {
  create(input: CreateReportDto, ownerId: string): Promise<ReportResponseData>;
  generate(id: string, input: GenerateReportDto): Promise<ReportResponseData>;
  findById(id: string): Promise<ReportResponseData | null>;
  listByOwner(ownerId: string): Promise<readonly ReportResponseData[]>;
  listScheduled(): Promise<readonly ReportResponseData[]>;
  processPending(limit: number): Promise<number>;
}
