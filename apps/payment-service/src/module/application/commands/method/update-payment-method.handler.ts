/**
 * UpdatePaymentMethodHandler
 * @module payment-service/application/commands/method
 */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UpdatePaymentMethodCommand } from './update-payment-method.command.js';
import {
  PAYMENT_METHOD_SERVICE,
  type IPaymentMethodService,
} from '@application/services/interfaces/payment-method.service.interface.js';
import type { MethodResponseDTO } from '@application/dtos/responses/method-response.dto.js';

@CommandHandler(UpdatePaymentMethodCommand)
export class UpdatePaymentMethodHandler
  implements ICommandHandler<UpdatePaymentMethodCommand, MethodResponseDTO>
{
  constructor(
    @Inject(PAYMENT_METHOD_SERVICE)
    private readonly service: IPaymentMethodService,
  ) {}
  async execute(c: UpdatePaymentMethodCommand): Promise<MethodResponseDTO> {
    return this.service.update(c.dto, c.userId);
  }
}
