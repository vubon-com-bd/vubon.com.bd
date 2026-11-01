import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { CancelDeliveryRequestDTO } from '@application/dtos/requests/delivery/index.js';
export class CancelDeliveryCommand extends BaseCommand {
  readonly type = 'logistics.delivery.cancel';
  constructor(public readonly dto: CancelDeliveryRequestDTO, public readonly actorId: string) { super(); }
}
