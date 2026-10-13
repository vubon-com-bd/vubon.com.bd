import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { ReserveInventoryRequestDTO } from '../../dtos/requests/inventory/index.js';

export class ReserveInventoryCommand extends BaseCommand {
  readonly type = 'product.inventory.reserve';
  constructor(public readonly dto: ReserveInventoryRequestDTO) {
    super();
  }
}
