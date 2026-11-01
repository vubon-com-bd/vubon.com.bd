import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { UpdatePriceRequestDTO } from '../../dtos/requests/pricing/index.js';

export class UpdatePriceCommand extends BaseCommand {
  readonly type = 'product.pricing.update';
  constructor(public readonly dto: UpdatePriceRequestDTO) {
    super();
  }
}
