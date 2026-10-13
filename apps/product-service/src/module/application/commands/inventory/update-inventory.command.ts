import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { UpdateInventoryCommandDTO } from '../../dtos/requests/inventory/index.js';

export class UpdateInventoryCommand extends BaseCommand {
  readonly type = 'product.inventory.update';
  constructor(public readonly dto: UpdateInventoryCommandDTO) {
    super();
  }
}
