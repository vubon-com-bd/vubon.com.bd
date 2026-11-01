import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { CreateWarehouseRequestDTO } from '@application/dtos/requests/warehouse/index.js';
export class CreateWarehouseCommand extends BaseCommand {
  readonly type = 'logistics.warehouse.create';
  constructor(public readonly dto: CreateWarehouseRequestDTO, public readonly actorId: string) { super(); }
}
