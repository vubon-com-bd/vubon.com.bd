/**
 * DeletePaymentMethodHandler
 * @module payment-service/application/commands/method
 */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { DeletePaymentMethodCommand } from './delete-payment-method.command.js';
import {
  PAYMENT_METHOD_SERVICE,
  type IPaymentMethodService,
} from '@application/services/interfaces/payment-method.service.interface.js';

@CommandHandler(DeletePaymentMethodCommand)
export class DeletePaymentMethodHandler
  implements ICommandHandler<DeletePaymentMethodCommand, void>
{
  constructor(
    @Inject(PAYMENT_METHOD_SERVICE)
    private readonly service: IPaymentMethodService,
  ) {}
  async execute(c: DeletePaymentMethodCommand): Promise<void> {
    return this.service.remove(c.dto, c.userId);
  }
}
