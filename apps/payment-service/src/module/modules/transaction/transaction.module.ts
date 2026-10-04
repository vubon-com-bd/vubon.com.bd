/**
 * TransactionModule — transaction feature wiring
 * @module payment-service/modules/transaction
 */
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { TransactionController } from '../../interfaces/controllers/rest/transaction.controller.js';
import { TransactionService } from '../../application/services/impl/transaction.service.js';
import { TRANSACTION_SERVICE } from '../../application/services/interfaces/transaction.service.interface.js';

import { TRANSACTION_QUERY_HANDLERS } from '../../application/queries/transaction/index.js';

@Module({
  imports: [CqrsModule],
  controllers: [TransactionController],
  providers: [
    TransactionService,
    { provide: TRANSACTION_SERVICE, useExisting: TransactionService },

    ...TRANSACTION_QUERY_HANDLERS,
  ],
  exports: [TransactionService, TRANSACTION_SERVICE],
})
export class TransactionModule {}
