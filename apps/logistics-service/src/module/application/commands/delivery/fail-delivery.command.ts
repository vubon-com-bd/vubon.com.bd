import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class FailDeliveryCommand extends BaseCommand {
  readonly type = 'logistics.delivery.fail';

  constructor(
    public readonly deliveryId: string,
    public readonly reason: string,
  ) {
    super();
  }
}
