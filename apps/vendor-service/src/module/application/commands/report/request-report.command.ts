import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { RequestReportInput } from '../../services/interfaces/vendor-report.service.interface.js';

export class RequestReportCommand extends BaseCommand {
  readonly type = 'vendor.report.request';
  constructor(
    public readonly input: RequestReportInput,
    public readonly requestedBy: string,
    public readonly actorId?: string,
  ) { super(); }
}
