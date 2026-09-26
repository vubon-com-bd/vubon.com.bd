import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { ReverseTransactionCommand } from './reverse-transaction.command';
import type { TransactionRepository } from '../../../domain/repositories/transaction.repository.interface';
import { TransactionIdVO } from '../../../domain/value-objects/primitives/transaction-id.vo';
import type { TransactionResponseDTO } from '../../dtos/responses/transaction-response.dto';
import { TransactionOperationFailedError } from '../../errors/transaction.errors';

@CommandHandler(ReverseTransactionCommand)
export class ReverseTransactionHandler
  extends BaseCommandHandler<ReverseTransactionCommand, TransactionResponseDTO>
  implements ICommandHandler<ReverseTransactionCommand>
{
  readonly commandType = 'transaction.reverse';

  constructor(
    @Inject('TransactionRepository')
    private readonly txRepo: TransactionRepository,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: ReverseTransactionCommand): Promise<TransactionResponseDTO> {
    const entity = await this.txRepo.findById(
      TransactionIdVO.create(command.transactionId),
    );
    if (!entity) {
      throw new TransactionOperationFailedError('transaction not found');
    }
    void this.eventBus;
    throw new TransactionOperationFailedError('not yet wired');
  }
}
