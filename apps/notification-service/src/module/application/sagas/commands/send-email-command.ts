/**
 * SendEmailCommand — saga-level email dispatch
 * @module notification-service/application/sagas/commands
 */
import { BaseSagaCommand } from '@vubon/shared-kernel/application/sagas';

export class SagaSendEmailCommand extends BaseSagaCommand {
  readonly type = 'notification.saga.send_email';

  constructor(
    public readonly to: string,
    public readonly subject: string,
    public readonly body: string,
    public readonly templateId?: string,
    public readonly variables?: Readonly<Record<string, unknown>>,
    public readonly sagaId?: string,
  ) {
    super();
  }
}
