/**
 * Memory Repositories Module
 * @module payment-service/infrastructure/persistence/memory
 *
 * Registers all InMemory repositories under the same DI tokens as
 * their Prisma counterparts. Activated when PERSISTENCE_DRIVER=memory.
 */
import { Module } from '@nestjs/common';
import { InMemoryModule } from '@vubon/shared-kernel/infrastructure/persistence/memory';

// ─── DI Tokens ───────────────────────────────
import { PAYMENT_REPOSITORY } from '@domain/repositories/payment.repository.interface';
import { PAYMENT_METHOD_REPOSITORY } from '@domain/repositories/payment-method.repository.interface';
import { PAYMENT_GATEWAY_REPOSITORY } from '@domain/repositories/payment-gateway.repository.interface';
import { TRANSACTION_REPOSITORY } from '@domain/repositories/transaction.repository.interface';
import { REFUND_REPOSITORY } from '@domain/repositories/refund.repository.interface';
import { SPLIT_PAYMENT_REPOSITORY } from '@domain/repositories/split-payment.repository.interface';
import { RECURRING_PAYMENT_REPOSITORY } from '@domain/repositories/recurring-payment.repository.interface';
import { SUBSCRIPTION_REPOSITORY } from '@domain/repositories/subscription.repository.interface';
import { INVOICE_REPOSITORY } from '@domain/repositories/invoice.repository.interface';
import { VERIFICATION_REPOSITORY } from '@domain/repositories/verification.repository.interface';

// ─── InMemory Repositories ───────────────────
import { InMemoryPaymentRepository } from './repositories/payment.memory.repository.js';
import { InMemoryPaymentMethodRepository } from './repositories/payment-method.memory.repository.js';
import { InMemoryPaymentGatewayRepository } from './repositories/payment-gateway.memory.repository.js';
import { InMemoryTransactionRepository } from './repositories/transaction.memory.repository.js';
import { InMemoryRefundRepository } from './repositories/refund.memory.repository.js';
import { InMemorySplitPaymentRepository } from './repositories/split-payment.memory.repository.js';
import { InMemoryRecurringPaymentRepository } from './repositories/recurring-payment.memory.repository.js';
import { InMemorySubscriptionRepository } from './repositories/subscription.memory.repository.js';
import { InMemoryInvoiceRepository } from './repositories/invoice.memory.repository.js';
import { InMemoryVerificationRepository } from './repositories/verification.memory.repository.js';
import { InMemoryWebhookEventRepository } from './repositories/webhook-event.memory.repository.js';

const REPO_PROVIDERS = [
  { provide: PAYMENT_REPOSITORY, useClass: InMemoryPaymentRepository },
  { provide: PAYMENT_METHOD_REPOSITORY, useClass: InMemoryPaymentMethodRepository },
  { provide: PAYMENT_GATEWAY_REPOSITORY, useClass: InMemoryPaymentGatewayRepository },
  { provide: TRANSACTION_REPOSITORY, useClass: InMemoryTransactionRepository },
  { provide: REFUND_REPOSITORY, useClass: InMemoryRefundRepository },
  { provide: SPLIT_PAYMENT_REPOSITORY, useClass: InMemorySplitPaymentRepository },
  { provide: RECURRING_PAYMENT_REPOSITORY, useClass: InMemoryRecurringPaymentRepository },
  { provide: SUBSCRIPTION_REPOSITORY, useClass: InMemorySubscriptionRepository },
  { provide: INVOICE_REPOSITORY, useClass: InMemoryInvoiceRepository },
  { provide: VERIFICATION_REPOSITORY, useClass: InMemoryVerificationRepository },
] as const;

@Module({
  imports: [InMemoryModule],
  providers: [
    InMemoryPaymentRepository,
    InMemoryPaymentMethodRepository,
    InMemoryPaymentGatewayRepository,
    InMemoryTransactionRepository,
    InMemoryRefundRepository,
    InMemorySplitPaymentRepository,
    InMemoryRecurringPaymentRepository,
    InMemorySubscriptionRepository,
    InMemoryInvoiceRepository,
    InMemoryVerificationRepository,
    InMemoryWebhookEventRepository,
    ...REPO_PROVIDERS,
  ],
  exports: [
    InMemoryPaymentRepository,
    InMemoryPaymentMethodRepository,
    InMemoryPaymentGatewayRepository,
    InMemoryTransactionRepository,
    InMemoryRefundRepository,
    InMemorySplitPaymentRepository,
    InMemoryRecurringPaymentRepository,
    InMemorySubscriptionRepository,
    InMemoryInvoiceRepository,
    InMemoryVerificationRepository,
    InMemoryWebhookEventRepository,
    ...REPO_PROVIDERS,
  ],
})
export class MemoryRepositoriesModule {}
