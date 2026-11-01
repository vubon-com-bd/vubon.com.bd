import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { CreateDeliveryRequestDTO } from '@application/dtos/requests/delivery/index.js';
export class CreateDeliveryCommand extends BaseCommand {
  readonly type = 'logistics.delivery.create';
  constructor(public readonly dto: CreateDeliveryRequestDTO, public readonly actorId: string) { super(); }
}
