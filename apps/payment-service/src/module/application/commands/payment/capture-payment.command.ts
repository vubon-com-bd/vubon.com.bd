import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { CapturePaymentRequestDTO } from '../../dtos/requests/payment/initiate-payment.dto.js';

export class CapturePaymentCommand extends BaseCommand {
  readonly type = 'payment.capture';
  constructor(
    public readonly dto: CapturePaymentRequestDTO,
    public readonly actorId?: string,
  ) {
    super();
  }
}
