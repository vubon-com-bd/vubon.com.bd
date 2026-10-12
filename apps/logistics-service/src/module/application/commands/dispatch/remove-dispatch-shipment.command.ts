import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { RemoveDispatchShipmentRequestDTO } from '../../dtos/requests/dispatch/dispatch.dto.js';
export class RemoveDispatchShipmentCommand extends BaseCommand {
  readonly type = 'logistics.dispatch.remove_shipment';
  constructor(public readonly dto: RemoveDispatchShipmentRequestDTO, public readonly actorId?: string) { super(); }
}
