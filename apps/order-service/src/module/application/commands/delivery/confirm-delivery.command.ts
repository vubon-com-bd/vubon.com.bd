import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class ConfirmDeliveryCommand extends BaseCommand {
  readonly type = 'delivery.confirm';

  constructor(public readonly deliveryId: string) {
    super();
  }
}
