import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { ReleaseInventoryRequestDTO } from '../../dtos/requests/inventory/index.js';

export class ReleaseInventoryCommand extends BaseCommand {
  readonly type = 'product.inventory.release';
  constructor(public readonly dto: ReleaseInventoryRequestDTO) {
    super();
  }
}
