/**
 * SendPushCommand — saga-level push dispatch
 * @module notification-service/application/sagas/commands
 */
import { BaseSagaCommand } from '@vubon/shared-kernel/application/sagas';

export class SagaSendPushCommand extends BaseSagaCommand {
  readonly type = 'notification.saga.send_push';

  constructor(
    public readonly tokens: readonly string[],
    public readonly title: string,
    public readonly body: string,
    public readonly data?: Readonly<Record<string, unknown>>,
    public readonly sagaId?: string,
  ) {
    super();
  }
}
