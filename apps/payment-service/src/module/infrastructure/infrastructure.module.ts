/**
 * InfrastructureModule — aggregates all infrastructure sub-modules
 * @module payment-service/infrastructure
 */
import { Global, Module } from '@nestjs/common';

import { PaymentPrismaModule } from './persistence/prisma/prisma.module.js';
import { RedisRepositoriesModule } from './persistence/cache/redis-repositories.module.js';

import { GatewaysModule } from './gateways/gateways.module.js';
import { ExternalIntegrationsModule } from './external/external.module.js';
import { QueuesWorkersModule } from './queues-workers.module.js';

import { PaymentCryptoService } from './services/internal/crypto.service.js';
import { SignatureService } from './services/internal/signature.service.js';
import { IdempotencyService } from './services/internal/idempotency.service.js';
import { CurrencyConverterService } from './services/internal/currency-converter.service.js';
import { FeeCalculatorService } from './services/internal/fee-calculator.service.js';
import { RetryService } from './services/internal/retry.service.js';
import { CircuitBreakerService } from './services/internal/circuit-breaker.service.js';
import { InvoiceGeneratorService } from './services/internal/invoice-generator.service.js';
import { ReceiptGeneratorService } from './services/internal/receipt-generator.service.js';
import { InvoiceNumberService, INVOICE_NUMBER_SERVICE } from '@domain/services/invoice-number.service';

const INTERNAL_SERVICES = [
  PaymentCryptoService,
  SignatureService,
  IdempotencyService,
  CurrencyConverterService,
  FeeCalculatorService,
  RetryService,
  CircuitBreakerService,
  InvoiceNumberService,
  { provide: INVOICE_NUMBER_SERVICE, useExisting: InvoiceNumberService },
  InvoiceGeneratorService,
  ReceiptGeneratorService,
] as const;

@Global()
@Module({
  imports: [
    PaymentPrismaModule,
    RedisRepositoriesModule,
    GatewaysModule,
    ExternalIntegrationsModule,
    QueuesWorkersModule,
  ],
  providers: [...INTERNAL_SERVICES],
  exports: [
    PaymentPrismaModule,
    RedisRepositoriesModule,
    GatewaysModule,
    ExternalIntegrationsModule,
    QueuesWorkersModule,
    ...INTERNAL_SERVICES,
  ],
})
export class InfrastructureModule {}
