import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { ExportReportDto } from '../../dtos/requests/report/export-report.dto.js';

export class ExportReportCommand extends BaseCommand {
  readonly type = 'analytics.report.export';
  constructor(public readonly reportId: string, public readonly payload: ExportReportDto) { super(); }
}
