import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { CloseWarehouseRequestDTO } from '@application/dtos/requests/warehouse/index.js';
export class CloseWarehouseCommand extends BaseCommand {
  readonly type = 'logistics.warehouse.close';
  constructor(public readonly dto: CloseWarehouseRequestDTO, public readonly actorId: string) { super(); }
}
