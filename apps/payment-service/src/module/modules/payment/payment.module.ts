import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

// Controller
import { PaymentController } from '../../interfaces/controllers/rest/payment.controller';

// Command handlers
import { InitiatePaymentHandler } from '../../application/commands/payment/initiate-payment.handler';
import { ConfirmPaymentHandler } from '../../application/commands/payment/confirm-payment.handler';
import { CancelPaymentHandler } from '../../application/commands/payment/cancel-payment.handler';
import { VerifyPaymentHandler } from '../../application/commands/payment/verify-payment.handler';
import { RetryPaymentHandler } from '../../application/commands/payment/retry-payment.handler';

// Query handlers
import { GetPaymentHandler } from '../../application/queries/payment/get-payment.handler';
import { ListPaymentsHandler } from '../../application/queries/payment/list-payments.handler';
import { GetPaymentByOrderHandler } from '../../application/queries/payment/get-payment-by-order.handler';

// Application services
import { PaymentService } from '../../application/services/impl/payment.service';

// Mappers
import { PaymentControllerMapper } from '../../interfaces/mappers/payment.controller.mapper';

// Sagas
import { PaymentProcessingSaga } from '../../application/sagas/payment-processing.saga';

@Module({
  imports: [CqrsModule],
  controllers: [PaymentController],
  providers: [
    PaymentService,
    PaymentControllerMapper,
    InitiatePaymentHandler,
    ConfirmPaymentHandler,
    CancelPaymentHandler,
    VerifyPaymentHandler,
    RetryPaymentHandler,
    GetPaymentHandler,
    ListPaymentsHandler,
    GetPaymentByOrderHandler,
    PaymentProcessingSaga,
  ],
  exports: [PaymentService],
})
export class PaymentModule {}
