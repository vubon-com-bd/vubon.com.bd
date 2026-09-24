import { BaseSagaCommand } from '@vubon/shared-kernel/application/sagas/base.saga.command';

export class SendPushSagaCommand extends BaseSagaCommand {
  readonly type = 'saga.send-push';

  constructor(
    public readonly userId: string,
    public readonly title: string,
    public readonly body: string,
  ) {
    super();
  }
}
