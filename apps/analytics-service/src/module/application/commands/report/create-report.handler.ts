import { ReportService } from '../../services/impl/report.service.js';
import { Injectable } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands';
import { CreateReportCommand } from './create-report.command.js';
import type { ReportResponseData } from '../../dtos/responses/report-response.dto.js';

@Injectable()
@CommandHandler(CreateReportCommand)
export class CreateReportHandler extends BaseCommandHandler<CreateReportCommand, ReportResponseData>
  implements ICommandHandler<CreateReportCommand> {
  readonly commandType = 'analytics.report.create';
  constructor(private readonly service: ReportService) { super(); }
  async execute(command: CreateReportCommand): Promise<ReportResponseData> {
    return this.service.create(command.payload, command.userId);
  }
}
