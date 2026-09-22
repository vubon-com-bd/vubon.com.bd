import { BaseSagaCommand } from '@vubon/shared-kernel/application/sagas/base.saga.command';

export class NotifyKycStatusCommand extends BaseSagaCommand {
  readonly type = 'saga.user.notify-kyc-status';

  constructor(
    public readonly userId: string,
    public readonly status: string,
  ) {
    super();
  }
}
