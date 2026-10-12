import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { GenerateLabelRequestDTO } from '../../dtos/requests/shipment/shipment.dto.js';
export class GenerateLabelCommand extends BaseCommand {
  readonly type = 'logistics.shipment.generate_label';
  constructor(public readonly dto: GenerateLabelRequestDTO, public readonly actorId?: string) { super(); }
}
