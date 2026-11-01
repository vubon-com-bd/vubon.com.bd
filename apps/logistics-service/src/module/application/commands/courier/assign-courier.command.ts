import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { AssignCourierToShipmentRequestDTO } from '@application/dtos/requests/courier/index.js';
export class AssignCourierToShipmentCommand extends BaseCommand {
  readonly type = 'logistics.courier.assign_to_shipment';
  constructor(public readonly dto: AssignCourierToShipmentRequestDTO, public readonly actorId: string) { super(); }
}
