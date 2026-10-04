import { BaseSagaCommand } from '@vubon/shared-kernel/application/sagas/base.saga.command';

export class SendPasswordResetEmailCommand extends BaseSagaCommand {
  readonly type = 'saga.send-password-reset-email';
  constructor(
    public readonly userId: string,
    public readonly email: string,
    public readonly resetUrl: string,
    public readonly expiresAt: string,
  ) { super(); }
}
