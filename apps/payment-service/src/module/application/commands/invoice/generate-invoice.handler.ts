import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { GenerateInvoiceCommand } from './generate-invoice.command';
import type { InvoiceRepository } from '../../../domain/repositories/invoice.repository.interface';
import type { InvoiceResponseDTO } from '../../dtos/responses/invoice-response.dto';
import { InvoiceOperationFailedError } from '../../errors/invoice.errors';

@CommandHandler(GenerateInvoiceCommand)
export class GenerateInvoiceHandler
  extends BaseCommandHandler<GenerateInvoiceCommand, InvoiceResponseDTO>
  implements ICommandHandler<GenerateInvoiceCommand>
{
  readonly commandType = 'invoice.generate';

  constructor(
    @Inject('InvoiceRepository')
    private readonly invoiceRepo: InvoiceRepository,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: GenerateInvoiceCommand): Promise<InvoiceResponseDTO> {
    void this.invoiceRepo;
    void command;
    throw new InvoiceOperationFailedError('not yet wired');
  }
}
