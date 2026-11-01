import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { InventoryLocationActionRequestDTO } from '@application/dtos/requests/inventory-location/index.js';
export class UnquarantineInventoryLocationCommand extends BaseCommand {
  readonly type = 'logistics.inventory_location.unquarantine';
  constructor(public readonly dto: InventoryLocationActionRequestDTO, public readonly actorId: string) { super(); }
}
