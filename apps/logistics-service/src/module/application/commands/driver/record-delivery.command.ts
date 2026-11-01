import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { RecordDeliveryRequestDTO } from '@application/dtos/requests/driver/index.js';
export class RecordDeliveryDriverCommand extends BaseCommand {
  readonly type = 'logistics.driver.record_delivery';
  constructor(public readonly dto: RecordDeliveryRequestDTO, public readonly actorId: string) { super(); }
}
