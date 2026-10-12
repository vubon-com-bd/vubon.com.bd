import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { AddShippingRateInput } from '../../services/interfaces/vendor-shipping.service.interface.js';

export class AddShippingRateCommand extends BaseCommand {
  readonly type = 'vendor.shipping.add_rate';
  constructor(
    public readonly input: AddShippingRateInput,
    public readonly actorId?: string,
  ) { super(); }
}
