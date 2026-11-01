import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { DeactivateWarehouseRequestDTO } from '@application/dtos/requests/warehouse/index.js';
export class DeactivateWarehouseCommand extends BaseCommand {
  readonly type = 'logistics.warehouse.deactivate';
  constructor(public readonly dto: DeactivateWarehouseRequestDTO, public readonly actorId: string) { super(); }
}
