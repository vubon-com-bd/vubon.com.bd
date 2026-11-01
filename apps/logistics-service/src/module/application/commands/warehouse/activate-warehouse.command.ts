import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { ActivateWarehouseRequestDTO } from '@application/dtos/requests/warehouse/index.js';
export class ActivateWarehouseCommand extends BaseCommand {
  readonly type = 'logistics.warehouse.activate';
  constructor(public readonly dto: ActivateWarehouseRequestDTO, public readonly actorId: string) { super(); }
}
