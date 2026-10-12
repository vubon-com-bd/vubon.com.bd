import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { AssignCourierRequestDTO } from '../../dtos/requests/shipment/shipment.dto.js';
export class AssignCourierCommand extends BaseCommand {
  readonly type = 'logistics.shipment.assign_courier';
  constructor(public readonly dto: AssignCourierRequestDTO, public readonly actorId?: string) { super(); }
}
