import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class MarkDeliveryAttemptedCommand extends BaseCommand {
  readonly type = 'delivery.attempted';

  constructor(public readonly deliveryId: string) {
    super();
  }
}
