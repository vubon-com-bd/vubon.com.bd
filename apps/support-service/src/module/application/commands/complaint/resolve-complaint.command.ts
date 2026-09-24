import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class ResolveComplaintCommand extends BaseCommand {
  readonly type = 'support.complaint.resolve';

  constructor(
    public readonly complaintId: string,
    public readonly resolution: string,
  ) {
    super();
  }
}
