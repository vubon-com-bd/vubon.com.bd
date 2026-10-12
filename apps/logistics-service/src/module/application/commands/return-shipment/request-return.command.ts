import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { RequestReturnRequestDTO } from '../../dtos/requests/return-shipment/return-shipment.dto.js';
export class RequestReturnCommand extends BaseCommand {
  readonly type = 'logistics.return_shipment.request';
  constructor(public readonly dto: RequestReturnRequestDTO, public readonly actorId?: string) { super(); }
}
