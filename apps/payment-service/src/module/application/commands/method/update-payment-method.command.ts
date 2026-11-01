/**
 * UpdatePaymentMethodCommand
 * @module payment-service/application/commands/method
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { UpdatePaymentMethodRequestDTO } from '@application/dtos/requests/method/index.js';

export class UpdatePaymentMethodCommand extends BaseCommand {
  readonly type = 'payment.method.update';
  constructor(
    public readonly dto: UpdatePaymentMethodRequestDTO,
    public readonly userId: string,
  ) {
    super();
  }
}
