import { BaseSagaCommand } from '@vubon/shared-kernel/application/sagas/base.saga.command';

export class SendVerificationEmailCommand extends BaseSagaCommand {
  readonly type = 'saga.send-verification-email';
  constructor(
    public readonly userId: string,
    public readonly email: string,
    public readonly code: string,
    public readonly expiresAt: string,
  ) { super(); }
}
