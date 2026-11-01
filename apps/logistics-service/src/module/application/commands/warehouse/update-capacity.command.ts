import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { UpdateCapacityRequestDTO } from '@application/dtos/requests/warehouse/index.js';
export class UpdateCapacityCommand extends BaseCommand {
  readonly type = 'logistics.warehouse.update_capacity';
  constructor(public readonly dto: UpdateCapacityRequestDTO, public readonly actorId: string) { super(); }
}
