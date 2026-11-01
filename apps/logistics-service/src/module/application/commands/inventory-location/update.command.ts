import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { UpdateInventoryLocationRequestDTO } from '@application/dtos/requests/inventory-location/index.js';
export class UpdateInventoryLocationCommand extends BaseCommand {
  readonly type = 'logistics.inventory_location.update';
  constructor(public readonly dto: UpdateInventoryLocationRequestDTO, public readonly actorId: string) { super(); }
}
