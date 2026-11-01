import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { AssignCourierRequestDTO } from '@application/dtos/requests/shipment/index.js';

export class AssignCourierCommand extends BaseCommand {
  readonly type = 'logistics.shipment.assign_courier';
  constructor(
    public readonly dto: AssignCourierRequestDTO,
    public readonly actorId: string,
  ) {
    super();
  }
}
