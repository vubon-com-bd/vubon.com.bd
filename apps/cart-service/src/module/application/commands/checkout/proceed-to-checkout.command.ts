import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { ProceedToCheckoutRequestDTO } from '../../dtos/requests/checkout/proceed-to-checkout.dto.js';

export class ProceedToCheckoutCommand extends BaseCommand {
  readonly type = 'checkout.proceed';
  constructor(public readonly dto: ProceedToCheckoutRequestDTO) { super(); }
}
