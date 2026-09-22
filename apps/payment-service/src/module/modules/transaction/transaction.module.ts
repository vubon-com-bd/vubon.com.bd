import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { TransactionController } from '../../interfaces/controllers/rest/transaction.controller';
import { TransactionService } from '../../application/services/impl/transaction.service';
import { TransactionMapper } from '../../application/mappers/transaction.mapper';
import { CreateTransactionHandler } from '../../application/commands/transaction/create-transaction.handler';
import { ReverseTransactionHandler } from '../../application/commands/transaction/reverse-transaction.handler';
import { GetTransactionHandler } from '../../application/queries/transaction/get-transaction.handler';
import { ListTransactionsByPaymentHandler } from '../../application/queries/transaction/list-transactions.handler';

@Module({
  imports: [CqrsModule],
  controllers: [TransactionController],
  providers: [
    TransactionService,
    TransactionMapper,
    CreateTransactionHandler,
    ReverseTransactionHandler,
    GetTransactionHandler,
    ListTransactionsByPaymentHandler,
  ],
  exports: [TransactionService],
})
export class TransactionModule {}
