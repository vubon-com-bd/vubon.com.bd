import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class UpdateTrackingCommand extends BaseCommand {
  readonly type = 'tracking.update';

  constructor(
    public readonly trackingId: string,
    public readonly status: string,
  ) {
    super();
  }
}
