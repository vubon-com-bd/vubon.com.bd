import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class PackItemsCommand extends BaseCommand {
  readonly type = 'logistics.fulfillment.pack-items';

  constructor(
    public readonly fulfillmentId: string,
    public readonly packagingId?: string,
    public readonly notes?: string,
  ) {
    super();
  }
}
