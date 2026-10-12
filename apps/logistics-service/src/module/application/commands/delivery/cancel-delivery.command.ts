import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { CancelDeliveryRequestDTO } from '../../dtos/requests/delivery/delivery.dto.js';
export class CancelDeliveryCommand extends BaseCommand {
  readonly type = 'logistics.delivery.cancel';
  constructor(public readonly dto: CancelDeliveryRequestDTO, public readonly actorId?: string) { super(); }
}
