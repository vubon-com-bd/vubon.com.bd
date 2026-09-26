import { BaseSagaCommand } from '@vubon/shared-kernel/application/sagas/base.saga.command';

export class SendSmsSagaCommand extends BaseSagaCommand {
  readonly type = 'saga.send-sms';

  constructor(
    public readonly userId: string,
    public readonly body: string,
  ) {
    super();
  }
}
