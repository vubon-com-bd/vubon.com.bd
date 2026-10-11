import { BaseCommand } from '@vubon/shared-kernel/application/commands';

export class UnsubscribePushCommand extends BaseCommand {
  readonly type = 'push.unsubscribe';
  constructor(public readonly token: string, public readonly actorId?: string) {
    super();
  }
}
