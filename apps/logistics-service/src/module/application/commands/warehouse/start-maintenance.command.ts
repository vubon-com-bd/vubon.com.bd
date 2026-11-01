import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { StartMaintenanceRequestDTO } from '@application/dtos/requests/warehouse/index.js';
export class StartMaintenanceCommand extends BaseCommand {
  readonly type = 'logistics.warehouse.start_maintenance';
  constructor(public readonly dto: StartMaintenanceRequestDTO, public readonly actorId: string) { super(); }
}
