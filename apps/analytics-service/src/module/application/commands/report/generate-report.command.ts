import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { GenerateReportDto } from '../../dtos/requests/report/generate-report.dto.js';

export class GenerateReportCommand extends BaseCommand {
  readonly type = 'analytics.report.generate';
  constructor(public readonly reportId: string, public readonly payload: GenerateReportDto) { super(); }
}
