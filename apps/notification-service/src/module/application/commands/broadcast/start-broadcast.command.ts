import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class StartBroadcastCommand extends BaseCommand {
  readonly type = 'broadcast.start';

  constructor(public readonly broadcastId: string) {
    super();
  }
}
