import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { CreateTransactionCommand } from './create-transaction.command';
import type { TransactionRepository } from '../../../domain/repositories/transaction.repository.interface';
import type { TransactionResponseDTO } from '../../dtos/responses/transaction-response.dto';
import { TransactionOperationFailedError } from '../../errors/transaction.errors';

@CommandHandler(CreateTransactionCommand)
export class CreateTransactionHandler
  extends BaseCommandHandler<CreateTransactionCommand, TransactionResponseDTO>
  implements ICommandHandler<CreateTransactionCommand>
{
  readonly commandType = 'transaction.create';

  constructor(
    @Inject('TransactionRepository')
    private readonly txRepo: TransactionRepository,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: CreateTransactionCommand): Promise<TransactionResponseDTO> {
    void this.txRepo;
    void command;
    throw new TransactionOperationFailedError('not yet wired');
  }
}
