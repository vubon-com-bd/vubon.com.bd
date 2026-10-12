import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { AddDispatchShipmentRequestDTO } from '../../dtos/requests/dispatch/dispatch.dto.js';
export class AddDispatchShipmentCommand extends BaseCommand {
  readonly type = 'logistics.dispatch.add_shipment';
  constructor(public readonly dto: AddDispatchShipmentRequestDTO, public readonly actorId?: string) { super(); }
}
