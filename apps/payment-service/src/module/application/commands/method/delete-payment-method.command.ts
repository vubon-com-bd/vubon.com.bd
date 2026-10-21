/**
 * DeletePaymentMethodCommand
 * @module payment-service/application/commands/method
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { DeletePaymentMethodRequestDTO } from '@application/dtos/requests/method/index.js';

export class DeletePaymentMethodCommand extends BaseCommand {
  readonly type = 'payment.method.delete';
  constructor(
    public readonly dto: DeletePaymentMethodRequestDTO,
    public readonly userId: string,
  ) {
    super();
  }
}
