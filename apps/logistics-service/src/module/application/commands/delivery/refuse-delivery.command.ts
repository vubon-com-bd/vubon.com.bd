import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { RefuseDeliveryRequestDTO } from '@application/dtos/requests/delivery/index.js';
export class RefuseDeliveryCommand extends BaseCommand {
  readonly type = 'logistics.delivery.refuse';
  constructor(public readonly dto: RefuseDeliveryRequestDTO, public readonly actorId: string) { super(); }
}
