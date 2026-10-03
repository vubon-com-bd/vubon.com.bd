import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { AbandonCheckoutRequestDTO } from '../../dtos/requests/checkout/abandon-checkout.dto.js';

export class AbandonCheckoutCommand extends BaseCommand {
  readonly type = 'checkout.abandon';
  constructor(public readonly dto: AbandonCheckoutRequestDTO, public readonly actorId?: string) { super(); }
}
