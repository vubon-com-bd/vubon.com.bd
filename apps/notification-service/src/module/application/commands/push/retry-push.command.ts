import { BaseCommand } from '@vubon/shared-kernel/application/commands';

export class RetryPushCommand extends BaseCommand {
  readonly type = 'push.retry';
  constructor(public readonly pushId: string, public readonly actorId?: string) {
    super();
  }
}
