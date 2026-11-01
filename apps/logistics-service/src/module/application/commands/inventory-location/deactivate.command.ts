import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { DeactivateInventoryLocationRequestDTO } from '@application/dtos/requests/inventory-location/index.js';
export class DeactivateInventoryLocationCommand extends BaseCommand {
  readonly type = 'logistics.inventory_location.deactivate';
  constructor(public readonly dto: DeactivateInventoryLocationRequestDTO, public readonly actorId: string) { super(); }
}
