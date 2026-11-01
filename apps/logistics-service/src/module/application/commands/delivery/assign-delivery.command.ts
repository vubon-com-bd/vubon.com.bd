import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { AssignDeliveryRequestDTO } from '@application/dtos/requests/delivery/index.js';
export class AssignDeliveryCommand extends BaseCommand {
  readonly type = 'logistics.delivery.assign';
  constructor(public readonly dto: AssignDeliveryRequestDTO, public readonly actorId: string) { super(); }
}
