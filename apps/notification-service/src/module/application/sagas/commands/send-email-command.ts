import { BaseSagaCommand } from '@vubon/shared-kernel/application/sagas/base.saga.command';

export class SendEmailSagaCommand extends BaseSagaCommand {
  readonly type = 'saga.send-email';

  constructor(
    public readonly userId: string,
    public readonly templateName: string,
    public readonly variables: Record<string, string | number | boolean>,
  ) {
    super();
  }
}
