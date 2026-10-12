import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { MarkReportFailedCommand } from './mark-report-failed.command.js';
import {
  VENDOR_REPORT_SERVICE,
  type IVendorReportService,
} from '../../services/interfaces/vendor-report.service.interface.js';
import type { VendorReportResponseDto } from '../../dtos/responses/vendor-report-response.dto.js';

@CommandHandler(MarkReportFailedCommand)
export class MarkReportFailedHandler
  implements ICommandHandler<MarkReportFailedCommand, VendorReportResponseDto>
{
  constructor(@Inject(VENDOR_REPORT_SERVICE) private readonly service: IVendorReportService) {}
  async execute(cmd: MarkReportFailedCommand): Promise<VendorReportResponseDto> {
    return this.service.markFailed(cmd.reportId, cmd.reason, cmd.actorId);
  }
}
