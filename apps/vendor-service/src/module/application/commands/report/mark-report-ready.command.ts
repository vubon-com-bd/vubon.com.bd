import { BaseCommand } from '@vubon/shared-kernel/application/commands';

export class MarkReportReadyCommand extends BaseCommand {
  readonly type = 'vendor.report.mark_ready';
  constructor(
    public readonly reportId: string,
    public readonly fileUrl: string,
    public readonly fileSize: number,
    public readonly actorId?: string,
  ) { super(); }
}
