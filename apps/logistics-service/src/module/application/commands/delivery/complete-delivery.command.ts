import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { CompleteDeliveryRequestDTO } from '@application/dtos/requests/delivery/index.js';
export class CompleteDeliveryCommand extends BaseCommand {
  readonly type = 'logistics.delivery.complete';
  constructor(public readonly dto: CompleteDeliveryRequestDTO, public readonly actorId: string) { super(); }
}
