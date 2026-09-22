import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { SendInvoiceCommand } from './send-invoice.command';
import type { InvoiceRepository } from '../../../domain/repositories/invoice.repository.interface';
import { InvoiceIdVO } from '../../../domain/value-objects/primitives/invoice-id.vo';
import type { InvoiceResponseDTO } from '../../dtos/responses/invoice-response.dto';
import { InvoiceOperationFailedError } from '../../errors/invoice.errors';

@CommandHandler(SendInvoiceCommand)
export class SendInvoiceHandler
  extends BaseCommandHandler<SendInvoiceCommand, InvoiceResponseDTO>
  implements ICommandHandler<SendInvoiceCommand>
{
  readonly commandType = 'invoice.send';

  constructor(
    @Inject('InvoiceRepository')
    private readonly invoiceRepo: InvoiceRepository,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: SendInvoiceCommand): Promise<InvoiceResponseDTO> {
    const entity = await this.invoiceRepo.findById(
      InvoiceIdVO.create(command.invoiceId),
    );
    if (!entity) {
      throw new InvoiceOperationFailedError('invoice not found');
    }
    void this.eventBus;
    throw new InvoiceOperationFailedError('not yet wired');
  }
}
