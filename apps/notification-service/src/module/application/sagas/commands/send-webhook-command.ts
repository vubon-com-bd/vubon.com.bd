import { BaseSagaCommand } from '@vubon/shared-kernel/application/sagas/base.saga.command';

export class SendWebhookSagaCommand extends BaseSagaCommand {
  readonly type = 'saga.send-webhook';

  constructor(
    public readonly webhookId: string,
    public readonly event: string,
    public readonly data: Record<string, unknown>,
  ) {
    super();
  }
}
