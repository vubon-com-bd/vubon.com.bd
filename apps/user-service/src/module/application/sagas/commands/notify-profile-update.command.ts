import { BaseSagaCommand } from '@vubon/shared-kernel/application/sagas/base.saga.command';

export class NotifyProfileUpdateCommand extends BaseSagaCommand {
  readonly type = 'saga.user.notify-profile-update';

  constructor(public readonly userId: string) {
    super();
  }
}
