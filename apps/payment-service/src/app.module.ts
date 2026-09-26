import { Module } from '@nestjs/common';
import { KernelCommonModule } from '@vubon/shared-kernel/modules';

// Feature modules
import {
  PaymentModule,
  PaymentMethodModule,
  PaymentGatewayModule,
  TransactionModule,
  RefundModule,
  SplitPaymentModule,
  RecurringPaymentModule,
  SubscriptionModule,
  InvoiceModule,
  WebhookModule,
} from './module/modules';

@Module({
  imports: [
    // Kernel (includes ConfigModule, PrismaModule, RedisModule, etc.)
    KernelCommonModule,

    // Feature modules
    PaymentModule,
    PaymentMethodModule,
    PaymentGatewayModule,
    TransactionModule,
    RefundModule,
    SplitPaymentModule,
    RecurringPaymentModule,
    SubscriptionModule,
    InvoiceModule,
    WebhookModule,
  ],
})
export class AppModule {}
