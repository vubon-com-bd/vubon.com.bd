/**
 * CreateSplitPaymentHandler
 * @module payment-service/application/commands/split
 */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { CreateSplitPaymentCommand } from './create-split-payment.command.js';
import {
  SPLIT_PAYMENT_SERVICE,
  type ISplitPaymentService,
} from '@application/services/interfaces/split-payment.service.interface.js';
import type { SplitResponseDTO } from '@application/dtos/responses/split-response.dto.js';

@CommandHandler(CreateSplitPaymentCommand)
export class CreateSplitPaymentHandler
  implements ICommandHandler<CreateSplitPaymentCommand, SplitResponseDTO>
{
  constructor(
    @Inject(SPLIT_PAYMENT_SERVICE)
    private readonly service: ISplitPaymentService,
  ) {}
  async execute(c: CreateSplitPaymentCommand): Promise<SplitResponseDTO> {
    return this.service.create(c.dto, c.actorId);
  }
}
