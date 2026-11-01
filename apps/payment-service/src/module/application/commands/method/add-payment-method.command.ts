/**
 * AddPaymentMethodCommand
 * @module payment-service/application/commands/method
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { AddPaymentMethodRequestDTO } from '@application/dtos/requests/method/index.js';

export class AddPaymentMethodCommand extends BaseCommand {
  readonly type = 'payment.method.add';
  constructor(
    public readonly dto: AddPaymentMethodRequestDTO,
    public readonly userId: string,
  ) {
    super();
  }
}
