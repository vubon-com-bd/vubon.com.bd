import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class CreateBroadcastCommand extends BaseCommand {
  readonly type = 'broadcast.create';

  constructor(
    public readonly broadcastType: string,
    public readonly target: string,
    public readonly content: string,
    public readonly templateId?: string,
    public readonly subject?: string,
    public readonly scheduledAt?: string,
  ) {
    super();
  }
}
