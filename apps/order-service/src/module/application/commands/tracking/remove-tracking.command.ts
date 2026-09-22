import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class RemoveTrackingCommand extends BaseCommand {
  readonly type = 'tracking.remove';

  constructor(public readonly trackingId: string) {
    super();
  }
}
