import { BaseSagaCommand } from '@vubon/shared-kernel/application/sagas/base.saga.command';

export class NotifyLoginCommand extends BaseSagaCommand {
  readonly type = 'saga.notify-login';

  constructor(
    public readonly userId: string,
    public readonly ip?: string,
  ) {
    super();
  }
}
