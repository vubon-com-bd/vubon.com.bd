import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class PackOrderCommand extends BaseCommand {
  readonly type = 'fulfillment.pack';

  constructor(
    public readonly fulfillmentId: string,
    public readonly packedBy: string,
  ) {
    super();
  }
}
