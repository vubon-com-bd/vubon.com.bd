import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { PaymentMethodController } from '../../interfaces/controllers/rest/payment-method.controller';
import { PaymentMethodService } from '../../application/services/impl/payment-method.service';
import { MethodControllerMapper } from '../../interfaces/mappers/method.controller.mapper';
import { AddPaymentMethodHandler } from '../../application/commands/method/add-payment-method.handler';
import { UpdatePaymentMethodHandler } from '../../application/commands/method/update-payment-method.handler';
import { DeletePaymentMethodHandler } from '../../application/commands/method/delete-payment-method.handler';
import { SetDefaultMethodHandler } from '../../application/commands/method/set-default-method.handler';
import { ListMethodsHandler } from '../../application/queries/method/list-methods.handler';
import { GetMethodHandler } from '../../application/queries/method/get-method.handler';

@Module({
  imports: [CqrsModule],
  controllers: [PaymentMethodController],
  providers: [
    PaymentMethodService,
    MethodControllerMapper,
    AddPaymentMethodHandler,
    UpdatePaymentMethodHandler,
    DeletePaymentMethodHandler,
    SetDefaultMethodHandler,
    ListMethodsHandler,
    GetMethodHandler,
  ],
  exports: [PaymentMethodService],
})
export class PaymentMethodModule {}
