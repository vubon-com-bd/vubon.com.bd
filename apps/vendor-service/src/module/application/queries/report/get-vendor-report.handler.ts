import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetVendorReportQuery } from './get-vendor-report.query.js';
import {
  VENDOR_REPORT_SERVICE,
  type IVendorReportService,
} from '../../services/interfaces/vendor-report.service.interface.js';
import type { VendorReportResponseDto } from '../../dtos/responses/vendor-report-response.dto.js';

@QueryHandler(GetVendorReportQuery)
export class GetVendorReportHandler
  implements IQueryHandler<GetVendorReportQuery, VendorReportResponseDto>
{
  constructor(@Inject(VENDOR_REPORT_SERVICE) private readonly service: IVendorReportService) {}
  async execute(query: GetVendorReportQuery): Promise<VendorReportResponseDto> {
    return this.service.getById(query.reportId);
  }
}
