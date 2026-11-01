import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { QuarantineInventoryLocationRequestDTO } from '@application/dtos/requests/inventory-location/index.js';
export class QuarantineInventoryLocationCommand extends BaseCommand {
  readonly type = 'logistics.inventory_location.quarantine';
  constructor(public readonly dto: QuarantineInventoryLocationRequestDTO, public readonly actorId: string) { super(); }
}
