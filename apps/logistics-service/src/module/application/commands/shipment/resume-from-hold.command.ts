import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { ResumeFromHoldRequestDTO } from '@application/dtos/requests/shipment/index.js';

export class ResumeFromHoldCommand extends BaseCommand {
  readonly type = 'logistics.shipment.resume_from_hold';
  constructor(
    public readonly dto: ResumeFromHoldRequestDTO,
    public readonly actorId: string,
  ) {
    super();
  }
}
