import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class ScheduleDeliveryCommand extends BaseCommand {
  readonly type = 'delivery.schedule';

  constructor(
    public readonly orderId: string,
    public readonly deliveryType: string,
    public readonly methodId?: string,
    public readonly scheduledAt?: string,
  ) {
    super();
  }
}
