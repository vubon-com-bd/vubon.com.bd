import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { CreateReportDto } from '../../dtos/requests/report/create-report.dto.js';

export class CreateReportCommand extends BaseCommand {
  readonly type = 'analytics.report.create';
  constructor(public readonly payload: CreateReportDto, public readonly userId: string) { super(); }
}
