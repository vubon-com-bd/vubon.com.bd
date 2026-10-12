import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { MarkReportReadyCommand } from './mark-report-ready.command.js';
import {
  VENDOR_REPORT_SERVICE,
  type IVendorReportService,
} from '../../services/interfaces/vendor-report.service.interface.js';
import type { VendorReportResponseDto } from '../../dtos/responses/vendor-report-response.dto.js';

@CommandHandler(MarkReportReadyCommand)
export class MarkReportReadyHandler
  implements ICommandHandler<MarkReportReadyCommand, VendorReportResponseDto>
{
  constructor(@Inject(VENDOR_REPORT_SERVICE) private readonly service: IVendorReportService) {}
  async execute(cmd: MarkReportReadyCommand): Promise<VendorReportResponseDto> {
    return this.service.markReady(cmd.reportId, cmd.fileUrl, cmd.fileSize, cmd.actorId);
  }
}
