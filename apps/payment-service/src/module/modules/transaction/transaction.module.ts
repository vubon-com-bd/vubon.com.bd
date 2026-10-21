/**
 * TransactionModule — feature wiring for transactions
 * @module payment-service/modules/transaction
 */
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

// ─── Controller ─────────────────────────────
import { TransactionController } from '@interfaces/controllers/rest/transaction.controller';

// ─── Handler arrays ─────────────────────────
import { TRANSACTION_COMMAND_HANDLERS } from './commands/index.js';
import { TRANSACTION_QUERY_HANDLERS } from './queries/index.js';

// ─── Service + interface token ──────────────
import { TransactionService } from '@application/services/impl/transaction.service';
import { TRANSACTION_SERVICE } from '@application/services/interfaces/transaction.service.interface';

@Module({
  imports: [CqrsModule],
  controllers: [TransactionController],
  providers: [
    TransactionService,
    { provide: TRANSACTION_SERVICE, useExisting: TransactionService },
    ...(TRANSACTION_COMMAND_HANDLERS as readonly unknown[] as never[]),
    ...(TRANSACTION_QUERY_HANDLERS as readonly unknown[] as never[]),
  ],
  exports: [TransactionService, TRANSACTION_SERVICE],
})
export class TransactionModule {}
