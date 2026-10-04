import { BaseCommand } from '@vubon/shared-kernel/application/commands';

export class SendAbandonedPushCommand extends BaseCommand {
  readonly type = 'saga.abandoned.send-push';
  constructor(
    public readonly abandonedCartId: string,
    public readonly userId: string | undefined,
    public readonly reminderNumber: number,
  ) { super(); }
}
