import { BaseCommand } from '@vubon/shared-kernel/application/commands';

export class ProcessRefundCommand extends BaseCommand {
  readonly type = 'saga.process_refund';
  constructor(
    public readonly orderId: string,
    public readonly amount: number,
    public readonly currency: string,
    public readonly reason: string,
  ) { super(); }
}
