import { BaseSagaCommand } from '@vubon/shared-kernel/application/sagas/base.saga.command';

export class SendAccountLockEmailCommand extends BaseSagaCommand {
  readonly type = 'saga.send-account-lock-email';

  constructor(
    public readonly userId: string,
    public readonly reason: string,
  ) {
    super();
  }
}
