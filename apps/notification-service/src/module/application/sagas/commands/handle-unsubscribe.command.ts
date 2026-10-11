import { BaseCommand } from '@vubon/shared-kernel/application/commands';

export class HandleUnsubscribeCommand extends BaseCommand {
  readonly type = 'saga.unsubscribe.handle';
  constructor(
    public readonly userId: string,
    public readonly scope: string,
    public readonly reason?: string,
  ) {
    super();
  }
}
