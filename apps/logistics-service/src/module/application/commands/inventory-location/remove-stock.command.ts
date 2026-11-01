import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { RemoveInventoryStockRequestDTO } from '@application/dtos/requests/inventory-location/index.js';
export class RemoveStockInventoryLocationCommand extends BaseCommand {
  readonly type = 'logistics.inventory_location.remove_stock';
  constructor(public readonly dto: RemoveInventoryStockRequestDTO, public readonly actorId: string) { super(); }
}
