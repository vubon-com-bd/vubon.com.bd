import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { FailDeliveryRequestDTO } from '@application/dtos/requests/delivery/index.js';
export class FailDeliveryCommand extends BaseCommand {
  readonly type = 'logistics.delivery.fail';
  constructor(public readonly dto: FailDeliveryRequestDTO, public readonly actorId: string) { super(); }
}
