import { BaseCommand } from '@vubon/shared-kernel/application/commands';

export class MarkReportFailedCommand extends BaseCommand {
  readonly type = 'vendor.report.mark_failed';
  constructor(
    public readonly reportId: string,
    public readonly reason: string,
    public readonly actorId?: string,
  ) { super(); }
}
