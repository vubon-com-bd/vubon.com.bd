import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { CalculateShippingRequestDTO } from '../../dtos/requests/shipping-method/shipping-method.dto.js';
export class CalculateShippingCommand extends BaseCommand {
  readonly type = 'logistics.shipping_method.calculate';
  constructor(public readonly dto: CalculateShippingRequestDTO, public readonly actorId?: string) { super(); }
}
