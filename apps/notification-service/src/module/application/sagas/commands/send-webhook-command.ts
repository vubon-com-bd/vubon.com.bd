/**
 * SendWebhookCommand — saga-level webhook dispatch
 * @module notification-service/application/sagas/commands
 */
import { BaseSagaCommand } from '@vubon/shared-kernel/application/sagas';

export class SendWebhookCommand extends BaseSagaCommand {
  readonly type = 'notification.saga.send_webhook';

  constructor(
    public readonly webhookId: string,
    public readonly event: string,
    public readonly payload: Readonly<Record<string, unknown>>,
    public readonly sagaId?: string,
  ) {
    super();
  }
}
