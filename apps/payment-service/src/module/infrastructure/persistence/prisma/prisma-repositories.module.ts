/**
 * PrismaRepositoriesModule — wires Prisma repositories into DI
 * @module payment-service/infrastructure/persistence/prisma
 */
import { Global, Module } from '@nestjs/common';
import { PrismaModule } from '@vubon/shared-kernel/infrastructure/persistence/prisma';
import { PAYMENT_REPOSITORY } from '../../../domain/repositories/payment.repository.interface.js';
import { TRANSACTION_REPOSITORY } from '../../../domain/repositories/transaction.repository.interface.js';
import { REFUND_REPOSITORY } from '../../../domain/repositories/refund.repository.interface.js';
import { WEBHOOK_EVENT_REPOSITORY } from '../../../domain/repositories/webhook-event.repository.interface.js';

import { PaymentPrismaRepository } from './repositories/payment.prisma.repository.js';
import { TransactionPrismaRepository } from './repositories/transaction.prisma.repository.js';
import { RefundPrismaRepository } from './repositories/refund.prisma.repository.js';
import { WebhookEventPrismaRepository } from './repositories/webhook-event.prisma.repository.js';

@Global()
@Module({
  imports: [PrismaModule],
  providers: [
    PaymentPrismaRepository,
    TransactionPrismaRepository,
    RefundPrismaRepository,
    WebhookEventPrismaRepository,
    { provide: PAYMENT_REPOSITORY, useExisting: PaymentPrismaRepository },
    { provide: TRANSACTION_REPOSITORY, useExisting: TransactionPrismaRepository },
    { provide: REFUND_REPOSITORY, useExisting: RefundPrismaRepository },
    { provide: WEBHOOK_EVENT_REPOSITORY, useExisting: WebhookEventPrismaRepository },
  ],
  exports: [
    PaymentPrismaRepository,
    TransactionPrismaRepository,
    RefundPrismaRepository,
    WebhookEventPrismaRepository,
    PAYMENT_REPOSITORY,
    TRANSACTION_REPOSITORY,
    REFUND_REPOSITORY,
    WEBHOOK_EVENT_REPOSITORY,
  ],
})
export class PrismaRepositoriesModule {}
