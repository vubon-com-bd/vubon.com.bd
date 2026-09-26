import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class AttemptDeliveryCommand extends BaseCommand {
  readonly type = 'logistics.delivery.attempt';

  constructor(
    public readonly deliveryId: string,
    public readonly status: string,
    public readonly note?: string,
  ) {
    super();
  }
}
