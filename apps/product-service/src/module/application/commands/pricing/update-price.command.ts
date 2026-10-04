/**
 * UpdatePriceCommand
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { UpdatePriceRequestDTO } from '../../dtos/requests/pricing/update-price.dto.js';

export class UpdatePriceCommand extends BaseCommand {
  readonly type = 'pricing.update';
  constructor(public readonly dto: UpdatePriceRequestDTO) { super(); }
}
