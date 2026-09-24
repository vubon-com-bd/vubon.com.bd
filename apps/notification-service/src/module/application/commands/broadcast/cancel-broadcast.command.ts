import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class CancelBroadcastCommand extends BaseCommand {
  readonly type = 'broadcast.cancel';

  constructor(
    public readonly broadcastId: string,
    public readonly reason?: string,
  ) {
    super();
  }
}
