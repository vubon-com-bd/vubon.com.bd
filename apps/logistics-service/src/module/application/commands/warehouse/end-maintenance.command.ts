import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { EndMaintenanceRequestDTO } from '@application/dtos/requests/warehouse/index.js';
export class EndMaintenanceCommand extends BaseCommand {
  readonly type = 'logistics.warehouse.end_maintenance';
  constructor(public readonly dto: EndMaintenanceRequestDTO, public readonly actorId: string) { super(); }
}
