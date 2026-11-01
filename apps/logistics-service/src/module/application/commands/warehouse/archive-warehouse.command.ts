import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { ArchiveWarehouseRequestDTO } from '@application/dtos/requests/warehouse/index.js';
export class ArchiveWarehouseCommand extends BaseCommand {
  readonly type = 'logistics.warehouse.archive';
  constructor(public readonly dto: ArchiveWarehouseRequestDTO, public readonly actorId: string) { super(); }
}
