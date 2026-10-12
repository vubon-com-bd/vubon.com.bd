import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { AssignDeliveryDriverRequestDTO } from '../../dtos/requests/delivery/delivery.dto.js';
export class AssignDeliveryDriverCommand extends BaseCommand {
  readonly type = 'logistics.delivery.assign_driver';
  constructor(public readonly dto: AssignDeliveryDriverRequestDTO, public readonly actorId?: string) { super(); }
}
