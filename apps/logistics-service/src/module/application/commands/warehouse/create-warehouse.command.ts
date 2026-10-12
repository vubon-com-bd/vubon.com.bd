import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { CreateWarehouseRequestDTO } from '../../dtos/requests/warehouse/warehouse.dto.js';
export class CreateWarehouseCommand extends BaseCommand {
  readonly type = 'logistics.warehouse.create';
  constructor(public readonly dto: CreateWarehouseRequestDTO, public readonly actorId?: string) { super(); }
}
