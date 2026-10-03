import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { ConfirmDeliveryRequestDTO } from '../../dtos/requests/delivery/confirm-delivery.dto.js';

export class ConfirmDeliveryCommand extends BaseCommand {
  readonly type = 'delivery.confirm';
  constructor(public readonly dto: ConfirmDeliveryRequestDTO, public readonly actorId?: string) { super(); }
}
