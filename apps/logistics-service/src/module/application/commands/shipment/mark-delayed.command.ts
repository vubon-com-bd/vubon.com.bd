import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { MarkDelayedRequestDTO } from '@application/dtos/requests/shipment/index.js';

export class MarkDelayedCommand extends BaseCommand {
  readonly type = 'logistics.shipment.mark_delayed';
  constructor(
    public readonly dto: MarkDelayedRequestDTO,
    public readonly actorId: string,
  ) {
    super();
  }
}
