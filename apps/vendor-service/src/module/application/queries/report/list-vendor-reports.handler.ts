import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ListVendorReportsQuery } from './list-vendor-reports.query.js';
import {
  VENDOR_REPORT_SERVICE,
  type IVendorReportService,
} from '../../services/interfaces/vendor-report.service.interface.js';
import type { VendorReportResponseDto } from '../../dtos/responses/vendor-report-response.dto.js';

@QueryHandler(ListVendorReportsQuery)
export class ListVendorReportsHandler
  implements IQueryHandler<ListVendorReportsQuery, readonly VendorReportResponseDto[]>
{
  constructor(@Inject(VENDOR_REPORT_SERVICE) private readonly service: IVendorReportService) {}
  async execute(query: ListVendorReportsQuery): Promise<readonly VendorReportResponseDto[]> {
    return this.service.listByVendor(query.vendorId);
  }
}
