import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { ScheduleReportDto } from '../../dtos/requests/report/schedule-report.dto.js';

export class ScheduleReportCommand extends BaseCommand {
  readonly type = 'analytics.report.schedule';
  constructor(public readonly reportId: string, public readonly payload: ScheduleReportDto) { super(); }
}
