import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { RequestReportCommand } from './request-report.command.js';
import {
  VENDOR_REPORT_SERVICE,
  type IVendorReportService,
} from '../../services/interfaces/vendor-report.service.interface.js';
import type { VendorReportResponseDto } from '../../dtos/responses/vendor-report-response.dto.js';

@CommandHandler(RequestReportCommand)
export class RequestReportHandler
  implements ICommandHandler<RequestReportCommand, VendorReportResponseDto>
{
  constructor(@Inject(VENDOR_REPORT_SERVICE) private readonly service: IVendorReportService) {}
  async execute(cmd: RequestReportCommand): Promise<VendorReportResponseDto> {
    return this.service.request(cmd.input, cmd.requestedBy, cmd.actorId);
  }
}
