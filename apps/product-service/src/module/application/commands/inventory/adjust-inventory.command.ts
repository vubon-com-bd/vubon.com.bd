import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { AdjustInventoryRequestDTO } from '../../dtos/requests/inventory/index.js';

export class AdjustInventoryCommand extends BaseCommand {
  readonly type = 'product.inventory.adjust';
  constructor(public readonly dto: AdjustInventoryRequestDTO) {
    super();
  }
}
