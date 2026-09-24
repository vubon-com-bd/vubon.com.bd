import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class FileComplaintCommand extends BaseCommand {
  readonly type = 'support.complaint.file';

  constructor(
    public readonly userId: string,
    public readonly type_: string,
    public readonly severity: string,
    public readonly content: string,
  ) {
    super();
  }
}
