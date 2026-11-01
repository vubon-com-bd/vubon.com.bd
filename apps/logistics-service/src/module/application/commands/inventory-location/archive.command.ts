import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { ArchiveInventoryLocationRequestDTO } from '@application/dtos/requests/inventory-location/index.js';
export class ArchiveInventoryLocationCommand extends BaseCommand {
  readonly type = 'logistics.inventory_location.archive';
  constructor(public readonly dto: ArchiveInventoryLocationRequestDTO, public readonly actorId: string) { super(); }
}
