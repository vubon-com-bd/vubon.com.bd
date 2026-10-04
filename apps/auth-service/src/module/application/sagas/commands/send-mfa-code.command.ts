import { BaseSagaCommand } from '@vubon/shared-kernel/application/sagas/base.saga.command';

export class SendMfaCodeCommand extends BaseSagaCommand {
  readonly type = 'saga.send-mfa-code';
  constructor(
    public readonly userId: string,
    public readonly channel: 'sms' | 'email',
    public readonly destination: string,
    public readonly code: string,
  ) { super(); }
}
