/**
 * SendSmsCommand — saga-level SMS dispatch
 * @module notification-service/application/sagas/commands
 */
import { BaseSagaCommand } from '@vubon/shared-kernel/application/sagas';

export class SagaSendSmsCommand extends BaseSagaCommand {
  readonly type = 'notification.saga.send_sms';

  constructor(
    public readonly phone: string,
    public readonly message: string,
    public readonly senderId?: string,
    public readonly sagaId?: string,
  ) {
    super();
  }
}
