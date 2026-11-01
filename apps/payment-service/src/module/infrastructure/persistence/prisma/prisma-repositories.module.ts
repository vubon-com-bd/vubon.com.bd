/**
 * Prisma Repositories Module
 * @module payment-service/infrastructure/persistence/prisma
 *
 * Registers all Prisma-backed repositories under their DI tokens.
 */
import { Module } from '@nestjs/common';
import { PaymentPrismaModule } from './prisma.module.js';

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

import { PaymentPrismaRepository } from './repositories/payment.prisma.repository.js';
import { PaymentMethodPrismaRepository } from './repositories/payment-method.prisma.repository.js';
import { PaymentGatewayPrismaRepository } from './repositories/payment-gateway.prisma.repository.js';
import { TransactionPrismaRepository } from './repositories/transaction.prisma.repository.js';
import { RefundPrismaRepository } from './repositories/refund.prisma.repository.js';
import { SplitPaymentPrismaRepository } from './repositories/split.prisma.repository.js';
import { RecurringPaymentPrismaRepository } from './repositories/recurring.prisma.repository.js';
import { SubscriptionPrismaRepository } from './repositories/subscription.prisma.repository.js';
import { InvoicePrismaRepository } from './repositories/invoice.prisma.repository.js';
import { VerificationPrismaRepository } from './repositories/verification.prisma.repository.js';
import { WebhookEventPrismaRepository } from './repositories/webhook-event.prisma.repository.js';

const REPO_PROVIDERS = [
  { provide: PAYMENT_REPOSITORY, useClass: PaymentPrismaRepository },
  { provide: PAYMENT_METHOD_REPOSITORY, useClass: PaymentMethodPrismaRepository },
  { provide: PAYMENT_GATEWAY_REPOSITORY, useClass: PaymentGatewayPrismaRepository },
  { provide: TRANSACTION_REPOSITORY, useClass: TransactionPrismaRepository },
  { provide: REFUND_REPOSITORY, useClass: RefundPrismaRepository },
  { provide: SPLIT_PAYMENT_REPOSITORY, useClass: SplitPaymentPrismaRepository },
  { provide: RECURRING_PAYMENT_REPOSITORY, useClass: RecurringPaymentPrismaRepository },
  { provide: SUBSCRIPTION_REPOSITORY, useClass: SubscriptionPrismaRepository },
  { provide: INVOICE_REPOSITORY, useClass: InvoicePrismaRepository },
  { provide: VERIFICATION_REPOSITORY, useClass: VerificationPrismaRepository },
] as const;

@Module({
  imports: [PaymentPrismaModule],
  providers: [
    PaymentPrismaRepository,
    PaymentMethodPrismaRepository,
    PaymentGatewayPrismaRepository,
    TransactionPrismaRepository,
    RefundPrismaRepository,
    SplitPaymentPrismaRepository,
    RecurringPaymentPrismaRepository,
    SubscriptionPrismaRepository,
    InvoicePrismaRepository,
    VerificationPrismaRepository,
    WebhookEventPrismaRepository,
    ...REPO_PROVIDERS,
  ],
  exports: [
    PaymentPrismaRepository,
    PaymentMethodPrismaRepository,
    PaymentGatewayPrismaRepository,
    TransactionPrismaRepository,
    RefundPrismaRepository,
    SplitPaymentPrismaRepository,
    RecurringPaymentPrismaRepository,
    SubscriptionPrismaRepository,
    InvoicePrismaRepository,
    VerificationPrismaRepository,
    WebhookEventPrismaRepository,
    ...REPO_PROVIDERS,
  ],
})
export class PrismaRepositoriesModule {}
