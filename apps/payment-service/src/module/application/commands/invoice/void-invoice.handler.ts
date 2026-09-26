import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { VoidInvoiceCommand } from './void-invoice.command';
import type { InvoiceRepository } from '../../../domain/repositories/invoice.repository.interface';
import type { InvoiceResponseDTO } from '../../dtos/responses/invoice-response.dto';
import { InvoiceOperationFailedError } from '../../errors/invoice.errors';

@CommandHandler(VoidInvoiceCommand)
export class VoidInvoiceHandler
  extends BaseCommandHandler<VoidInvoiceCommand, InvoiceResponseDTO>
  implements ICommandHandler<VoidInvoiceCommand>
{
  readonly commandType = 'invoice.void';

  constructor(
    @Inject('InvoiceRepository')
    private readonly invoiceRepo: InvoiceRepository,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: VoidInvoiceCommand): Promise<InvoiceResponseDTO> {
    void this.invoiceRepo;
    void command;
    throw new InvoiceOperationFailedError('not yet wired');
  }
}
