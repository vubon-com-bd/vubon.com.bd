import { BaseCommand } from '@vubon/shared-kernel/application/commands';

export class MarkPaidCommand extends BaseCommand {
  readonly type = 'payment.mark_paid';
  constructor(
    public readonly paymentId: string,
    public readonly actorId?: string,
  ) {
    super();
  }
}
