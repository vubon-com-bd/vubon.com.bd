import { BaseSagaCommand } from '@vubon/shared-kernel/application/sagas/base.saga.command';

export class SendMfaDisabledAlertCommand extends BaseSagaCommand {
  readonly type = 'saga.send-mfa-disabled-alert';
  constructor(
    public readonly authId: string,
    public readonly userId: string,
  ) {
    super();
  }
}
