/**
 * SetDefaultMethodHandler
 * @module payment-service/application/commands/method
 */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { SetDefaultMethodCommand } from './set-default-method.command.js';
import {
  PAYMENT_METHOD_SERVICE,
  type IPaymentMethodService,
} from '@application/services/interfaces/payment-method.service.interface.js';
import type { MethodResponseDTO } from '@application/dtos/responses/method-response.dto.js';

@CommandHandler(SetDefaultMethodCommand)
export class SetDefaultMethodHandler
  implements ICommandHandler<SetDefaultMethodCommand, MethodResponseDTO>
{
  constructor(
    @Inject(PAYMENT_METHOD_SERVICE)
    private readonly service: IPaymentMethodService,
  ) {}
  async execute(c: SetDefaultMethodCommand): Promise<MethodResponseDTO> {
    return this.service.setDefault(c.dto, c.userId);
  }
}
