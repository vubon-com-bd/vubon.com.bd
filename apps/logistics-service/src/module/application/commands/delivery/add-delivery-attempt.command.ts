import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { AddDeliveryAttemptRequestDTO } from '../../dtos/requests/delivery/delivery.dto.js';
export class AddDeliveryAttemptCommand extends BaseCommand {
  readonly type = 'logistics.delivery.add_attempt';
  constructor(public readonly dto: AddDeliveryAttemptRequestDTO, public readonly actorId?: string) { super(); }
}
