/**
 * AddPaymentMethodHandler
 * @module payment-service/application/commands/method
 */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { AddPaymentMethodCommand } from './add-payment-method.command.js';
import {
  PAYMENT_METHOD_SERVICE,
  type IPaymentMethodService,
} from '@application/services/interfaces/payment-method.service.interface.js';
import type { MethodResponseDTO } from '@application/dtos/responses/method-response.dto.js';

@CommandHandler(AddPaymentMethodCommand)
export class AddPaymentMethodHandler
  implements ICommandHandler<AddPaymentMethodCommand, MethodResponseDTO>
{
  constructor(
    @Inject(PAYMENT_METHOD_SERVICE)
    private readonly service: IPaymentMethodService,
  ) {}
  async execute(c: AddPaymentMethodCommand): Promise<MethodResponseDTO> {
    return this.service.add(c.dto, c.userId);
  }
}
