/**
 * NotifyProfileUpdateCommand
 */
import { BaseSagaCommand } from '@vubon/shared-kernel/application/sagas';

export class NotifyProfileUpdateCommand extends BaseSagaCommand {
  readonly type = 'saga.notify.profileUpdate';

  constructor(
    public readonly userId: string,
    public readonly changedFields: readonly string[]
  ) {
    super();
  }
}
