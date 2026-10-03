import { BaseCommand } from '@vubon/shared-kernel/application/commands';

export class ReleaseInventoryCommand extends BaseCommand {
  readonly type = 'saga.release_inventory';
  constructor(
    public readonly orderId: string,
    public readonly reason: string,
  ) { super(); }
}
