import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { AddInventoryStockRequestDTO } from '@application/dtos/requests/inventory-location/index.js';
export class AddStockInventoryLocationCommand extends BaseCommand {
  readonly type = 'logistics.inventory_location.add_stock';
  constructor(public readonly dto: AddInventoryStockRequestDTO, public readonly actorId: string) { super(); }
}
