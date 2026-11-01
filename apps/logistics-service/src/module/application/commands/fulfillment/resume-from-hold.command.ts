import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { ResumeFulfillmentFromHoldRequestDTO } from '@application/dtos/requests/fulfillment/index.js';
export class ResumeFromHoldFulfillmentCommand extends BaseCommand {
  readonly type = 'logistics.fulfillment.resume-rom-old';
  constructor(public readonly dto: ResumeFulfillmentFromHoldRequestDTO, public readonly actorId: string) { super(); }
}
