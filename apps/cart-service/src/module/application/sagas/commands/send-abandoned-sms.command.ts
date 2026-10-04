import { BaseCommand } from '@vubon/shared-kernel/application/commands';

export class SendAbandonedSmsCommand extends BaseCommand {
  readonly type = 'saga.abandoned.send-sms';
  constructor(
    public readonly abandonedCartId: string,
    public readonly userId: string | undefined,
    public readonly phone: string | undefined,
    public readonly reminderNumber: number,
  ) { super(); }
}
