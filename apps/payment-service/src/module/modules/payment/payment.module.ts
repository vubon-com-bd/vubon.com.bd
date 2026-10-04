/**
 * PaymentModule — payment aggregate feature wiring
 * @module payment-service/modules/payment
 */
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { PaymentController } from '../../interfaces/controllers/rest/payment.controller.js';
import { PaymentService } from '../../application/services/impl/payment.service.js';
import { PAYMENT_SERVICE } from '../../application/services/interfaces/payment.service.interface.js';

import { PAYMENT_COMMAND_HANDLERS } from '../../application/commands/payment/index.js';
import { PAYMENT_QUERY_HANDLERS } from '../../application/queries/payment/index.js';

import { PaymentLifecycleSaga } from '../../application/sagas/payment-lifecycle.saga.js';

import { PaymentOwnerGuard } from '../../interfaces/guards/payment-owner.guard.js';
import { PaymentStatusGuard } from '../../interfaces/guards/payment-status.guard.js';
import { PaymentCacheInterceptor } from '../../interfaces/interceptors/payment-cache.interceptor.js';

@Module({
  imports: [CqrsModule],
  controllers: [PaymentController],
  providers: [
    PaymentService,
    { provide: PAYMENT_SERVICE, useExisting: PaymentService },

    ...PAYMENT_COMMAND_HANDLERS,
    ...PAYMENT_QUERY_HANDLERS,

    PaymentLifecycleSaga,

    PaymentOwnerGuard,
    PaymentStatusGuard,
    PaymentCacheInterceptor,
  ],
  exports: [PaymentService, PAYMENT_SERVICE],
})
export class PaymentModule {}
