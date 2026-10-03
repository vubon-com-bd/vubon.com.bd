import { BaseCommand } from '@vubon/shared-kernel/application/commands';

export class SendAbandonedEmailCommand extends BaseCommand {
  readonly type = 'saga.abandoned.send-email';
  constructor(
    public readonly abandonedCartId: string,
    public readonly userId: string | undefined,
    public readonly email: string | undefined,
    public readonly reminderNumber: number,
  ) { super(); }
}
