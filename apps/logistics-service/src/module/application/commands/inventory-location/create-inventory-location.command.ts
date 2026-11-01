import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { CreateInventoryLocationRequestDTO } from '@application/dtos/requests/inventory-location/index.js';
export class CreateInventoryLocationCommand extends BaseCommand {
  readonly type = 'logistics.inventory_location.create';
  constructor(public readonly dto: CreateInventoryLocationRequestDTO, public readonly actorId: string) { super(); }
}
