import { Module } from '@nestjs/common';

// Kernel modules (already @Global) — re-imported for explicit DI
import {
  PrismaModule,
  RedisModule,
  EmailModule,
  SmsModule,
  PushModule,
  QueueModule,
} from '@vubon/shared-kernel/infrastructure';

// App-level Prisma module
import { PrismaModule as AppPrismaModule } from './persistence/prisma/prisma.module';

// Prisma repositories
import {
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
} from './persistence/prisma/repositories';

// Cache repositories
import {
  PaymentCacheRepository,
  MethodCacheRepository,
  GatewayCacheRepository,
} from './persistence/cache/repositories';

// Gateways
import { BkashModule } from './gateways/bkash/bkash.module';
import { NagadModule } from './gateways/nagad/nagad.module';
import { RocketModule } from './gateways/rocket/rocket.module';
import { StripeModule } from './gateways/stripe/stripe.module';
import { PaypalModule } from './gateways/paypal/paypal.module';
import { SslcommerzModule } from './gateways/sslcommerz/sslcommerz.module';
import { AamarpayModule } from './gateways/aamarpay/aamarpay.module';
import { CodModule } from './gateways/cod/cod.module';
import { CryptoModule } from './gateways/crypto/crypto.module';

// Internal services
import {
  CryptoService,
  SignatureService,
  IdempotencyService,
  CurrencyConverterService,
  FeeCalculatorService,
  RetryService,
  CircuitBreakerService,
  InvoiceGeneratorService,
  ReceiptGeneratorService,
} from './services/internal';

// External services
import {
  EmailService,
  SmsService,
  PushService,
  NotificationService,
} from './services/external';

// Queues
import {
  PaymentQueue,
  RefundQueue,
  SubscriptionQueue,
  InvoiceQueue,
  WebhookQueue,
  NotificationQueue,
} from './queues';

// Workers
import {
  PaymentProcessorWorker,
  PaymentRetryWorker,
  RefundProcessorWorker,
  SubscriptionRenewalWorker,
  InvoiceGeneratorWorker,
  WebhookRetryWorker,
  ReconciliationWorker,
  AnalyticsProcessorWorker,
} from './workers';

const PRISMA_REPOSITORIES = [
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
];

const CACHE_REPOSITORIES = [
  PaymentCacheRepository,
  MethodCacheRepository,
  GatewayCacheRepository,
];

const INTERNAL_SERVICES = [
  CryptoService,
  SignatureService,
  IdempotencyService,
  CurrencyConverterService,
  FeeCalculatorService,
  RetryService,
  CircuitBreakerService,
  InvoiceGeneratorService,
  ReceiptGeneratorService,
];

const EXTERNAL_SERVICES = [
  EmailService,
  SmsService,
  PushService,
  NotificationService,
];

const QUEUES = [
  PaymentQueue,
  RefundQueue,
  SubscriptionQueue,
  InvoiceQueue,
  WebhookQueue,
  NotificationQueue,
];

const WORKERS = [
  PaymentProcessorWorker,
  PaymentRetryWorker,
  RefundProcessorWorker,
  SubscriptionRenewalWorker,
  InvoiceGeneratorWorker,
  WebhookRetryWorker,
  ReconciliationWorker,
  AnalyticsProcessorWorker,
];

// ── Repository interface bindings ──
const REPOSITORY_BINDINGS = [
  { provide: 'PaymentRepository', useExisting: PaymentPrismaRepository },
  { provide: 'PaymentMethodRepository', useExisting: PaymentMethodPrismaRepository },
  { provide: 'PaymentGatewayRepository', useExisting: PaymentGatewayPrismaRepository },
  { provide: 'TransactionRepository', useExisting: TransactionPrismaRepository },
  { provide: 'RefundRepository', useExisting: RefundPrismaRepository },
  { provide: 'SplitPaymentRepository', useExisting: SplitPaymentPrismaRepository },
  { provide: 'RecurringPaymentRepository', useExisting: RecurringPaymentPrismaRepository },
  { provide: 'SubscriptionRepository', useExisting: SubscriptionPrismaRepository },
  { provide: 'InvoiceRepository', useExisting: InvoicePrismaRepository },
  { provide: 'VerificationRepository', useExisting: VerificationPrismaRepository },
];

// ── Service interface bindings ──
const SERVICE_BINDINGS = [
  { provide: 'CryptoService', useExisting: CryptoService },
  { provide: 'SignatureService', useExisting: SignatureService },
  { provide: 'IdempotencyService', useExisting: IdempotencyService },
  { provide: 'CurrencyConverterService', useExisting: CurrencyConverterService },
  { provide: 'FeeCalculatorService', useExisting: FeeCalculatorService },
  { provide: 'RetryService', useExisting: RetryService },
  { provide: 'CircuitBreakerService', useExisting: CircuitBreakerService },
  { provide: 'InvoiceGeneratorService', useExisting: InvoiceGeneratorService },
  { provide: 'ReceiptGeneratorService', useExisting: ReceiptGeneratorService },
  { provide: 'EmailService', useExisting: EmailService },
  { provide: 'SmsService', useExisting: SmsService },
  { provide: 'PushService', useExisting: PushService },
  { provide: 'NotificationService', useExisting: NotificationService },
];

@Module({
  imports: [
    // Kernel (global) — re-import for clarity
    PrismaModule,
    AppPrismaModule,
    RedisModule,
    EmailModule,
    SmsModule,
    PushModule,
    QueueModule,

    // Gateways
    BkashModule,
    NagadModule,
    RocketModule,
    StripeModule,
    PaypalModule,
    SslcommerzModule,
    AamarpayModule,
    CodModule,
    CryptoModule,
  ],
  providers: [
    ...PRISMA_REPOSITORIES,
    ...CACHE_REPOSITORIES,
    ...INTERNAL_SERVICES,
    ...EXTERNAL_SERVICES,
    ...QUEUES,
    ...WORKERS,
    ...REPOSITORY_BINDINGS,
    ...SERVICE_BINDINGS,
  ],
  exports: [
    AppPrismaModule,
    ...PRISMA_REPOSITORIES,
    ...CACHE_REPOSITORIES,
    ...INTERNAL_SERVICES,
    ...EXTERNAL_SERVICES,
    ...QUEUES,
    ...REPOSITORY_BINDINGS,
    ...SERVICE_BINDINGS,
  ],
})
export class InfrastructureModule {}
